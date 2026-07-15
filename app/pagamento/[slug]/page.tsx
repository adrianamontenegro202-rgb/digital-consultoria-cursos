"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cursos } from "../../../data/cursos";

type Aluno = {
  id: number;
  nome: string;
  email: string;
};

type RespostaCheckout = {
  mensagem?: string;
  url?: string;
  checkoutId?: string;
  erro?: string;
  detalhes?: unknown;
};

function formatarPreco(preco: number) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Pagamento() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const slug = params?.slug ?? "";

  const curso = cursos.find((item) => item.slug === slug);

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [carregandoAluno, setCarregandoAluno] = useState(true);
  const [carregandoPagamento, setCarregandoPagamento] =
    useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const alunoSalvo = localStorage.getItem("aluno");

    if (!alunoSalvo) {
      setCarregandoAluno(false);
      return;
    }

    try {
      const alunoEncontrado: Aluno = JSON.parse(alunoSalvo);

      setAluno(alunoEncontrado);
    } catch (error) {
      console.error("Erro ao ler dados do aluno:", error);
      localStorage.removeItem("aluno");
    } finally {
      setCarregandoAluno(false);
    }
  }, []);

  async function iniciarPagamento() {
    if (!curso) {
      setErro("O curso selecionado não foi encontrado.");
      return;
    }

    if (!aluno) {
      router.push(`/login?curso=${curso.slug}`);
      return;
    }

    setCarregandoPagamento(true);
    setErro("");
    setMensagem("");

    try {
      const resposta = await fetch("/api/pagbank/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alunoId: aluno.id,
          cursoSlug: curso.slug,
        }),
      });

      const dados: RespostaCheckout = await resposta.json();

      if (!resposta.ok) {
        console.error("Erro recebido do checkout:", dados);

        throw new Error(
          dados.erro || "Não foi possível criar o pagamento."
        );
      }

      if (!dados.url) {
        throw new Error(
          "O PagBank não devolveu o endereço de pagamento."
        );
      }

      setMensagem("Abrindo a página segura do PagBank...");

      window.location.assign(dados.url);
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível abrir o pagamento."
      );
    } finally {
      setCarregandoPagamento(false);
    }
  }

  if (!curso) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #050505 0%, #171717 55%, #303030 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "38px",
              marginBottom: "15px",
            }}
          >
            Curso não encontrado
          </h1>

          <p
            style={{
              color: "#d4d4d4",
              lineHeight: "1.6",
            }}
          >
            O curso selecionado não existe ou não está disponível.
          </p>

          <Link
            href="/#cursos"
            style={{
              display: "inline-block",
              marginTop: "18px",
              backgroundColor: "#ffffff",
              color: "#111111",
              padding: "14px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Voltar para os cursos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050505 0%, #171717 55%, #303030 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Logo Digital Consultoria"
              width={90}
              height={90}
              priority
              style={{
                width: "90px",
                height: "auto",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "18px",
                }}
              >
                Digital Consultoria
              </strong>

              <span
                style={{
                  color: "#bdbdbd",
                  fontSize: "12px",
                }}
              >
                Serviços Técnicos LTDA
              </span>
            </div>
          </Link>

          <Link
            href={`/cursos/${curso.slug}`}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ← Voltar ao curso
          </Link>
        </header>

        <section
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 20px 55px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              color: "#ffffff",
              padding: "32px",
            }}
          >
            <p
              style={{
                color: "#bdbdbd",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: "13px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Finalizar matrícula
            </p>

            <h1
              style={{
                fontSize: "38px",
                margin: "12px 0",
              }}
            >
              {curso.nome}
            </h1>

            <p
              style={{
                color: "#d4d4d4",
                marginBottom: 0,
              }}
            >
              {curso.categoria}
            </p>
          </div>

          <div
            style={{
              padding: "32px",
            }}
          >
            <div
              style={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "22px",
              }}
            >
              <p
                style={{
                  color: "#666666",
                  margin: "0 0 6px",
                }}
              >
                Valor do curso
              </p>

              <strong
                style={{
                  color: "#111111",
                  fontSize: "34px",
                }}
              >
                {formatarPreco(curso.preco)}
              </strong>
            </div>

            {carregandoAluno ? (
              <div
                style={{
                  marginTop: "22px",
                  padding: "18px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "10px",
                  color: "#666666",
                  textAlign: "center",
                }}
              >
                Carregando seus dados...
              </div>
            ) : aluno ? (
              <div
                style={{
                  marginTop: "22px",
                  padding: "18px",
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 7px",
                    color: "#666666",
                  }}
                >
                  Matrícula para:
                </p>

                <strong
                  style={{
                    display: "block",
                    color: "#111111",
                    fontSize: "17px",
                  }}
                >
                  {aluno.nome}
                </strong>

                <p
                  style={{
                    color: "#666666",
                    margin: "7px 0 0",
                    overflowWrap: "anywhere",
                  }}
                >
                  {aluno.email}
                </p>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "22px",
                  padding: "18px",
                  backgroundColor: "#fff7ed",
                  color: "#9a3412",
                  border: "1px solid #fed7aa",
                  borderRadius: "10px",
                  lineHeight: "1.6",
                }}
              >
                Entre na sua conta antes de continuar com a
                matrícula.
              </div>
            )}

            <div
              style={{
                marginTop: "22px",
                padding: "18px",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Sua matrícula inclui:
              </strong>

              <p style={itemIncluido}>✓ Material didático em PDF</p>
              <p style={itemIncluido}>✓ Avaliação online</p>
              <p style={itemIncluido}>
                ✓ Certificado digital após aprovação
              </p>
              <p style={itemIncluido}>✓ Acesso pela Área do Aluno</p>
            </div>

            {mensagem && (
              <div
                style={{
                  marginTop: "22px",
                  padding: "16px",
                  backgroundColor: "#dcfce7",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  lineHeight: "1.6",
                }}
              >
                {mensagem}
              </div>
            )}

            {erro && (
              <div
                style={{
                  marginTop: "22px",
                  padding: "16px",
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  lineHeight: "1.6",
                }}
              >
                {erro}
              </div>
            )}

            <button
              type="button"
              onClick={iniciarPagamento}
              disabled={
                carregandoAluno || carregandoPagamento
              }
              style={{
                width: "100%",
                marginTop: "28px",
                backgroundColor:
                  carregandoAluno || carregandoPagamento
                    ? "#666666"
                    : "#111111",
                color: "#ffffff",
                border: "none",
                textAlign: "center",
                padding: "16px",
                borderRadius: "9px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor:
                  carregandoAluno || carregandoPagamento
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {carregandoAluno
                ? "Carregando..."
                : carregandoPagamento
                  ? "Abrindo o PagBank..."
                  : aluno
                    ? "Continuar para o pagamento"
                    : "Entrar para continuar"}
            </button>

            {!aluno && !carregandoAluno && (
              <Link
                href="/cadastro"
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                  marginTop: "12px",
                  backgroundColor: "#ffffff",
                  color: "#111111",
                  border: "1px solid #111111",
                  textAlign: "center",
                  padding: "15px",
                  borderRadius: "9px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Criar uma conta
              </Link>
            )}

            <p
              style={{
                color: "#777777",
                fontSize: "13px",
                lineHeight: "1.6",
                textAlign: "center",
                margin: "22px 0 0",
              }}
            >
              Você será encaminhado para o ambiente seguro de
              pagamento do PagBank.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

const itemIncluido = {
  color: "#555555",
  lineHeight: "1.6",
  margin: "8px 0",
};