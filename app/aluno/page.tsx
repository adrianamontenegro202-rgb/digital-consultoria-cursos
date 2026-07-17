"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { cursos } from "../../data/cursos";

type Aluno = {
  id: number;
  nome: string;
  email: string;
};

type Matricula = {
  id: number;
  cursoSlug: string;
  status: string;
  notaFinal: number | null;
  criadoEm: string;
  liberadoEm: string | null;
  concluidoEm: string | null;
};

export default function AreaDoAluno() {
  const router = useRouter();

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAreaDoAluno() {
      const alunoSalvo = localStorage.getItem("aluno");

      if (!alunoSalvo) {
        router.replace("/login");
        return;
      }

      try {
        const alunoEncontrado: Aluno = JSON.parse(alunoSalvo);

        setAluno(alunoEncontrado);

        const resposta = await fetch(
          `/api/matriculas?alunoId=${alunoEncontrado.id}`,
          {
            cache: "no-store",
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          setErro(
            dados.erro ||
              "Não foi possível carregar seus cursos."
          );
          return;
        }

        setMatriculas(dados.matriculas || []);
      } catch (error) {
        console.error(
          "Erro ao carregar Área do Aluno:",
          error
        );

        setErro(
          "Não foi possível carregar sua Área do Aluno."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarAreaDoAluno();
  }, [router]);

  function sair() {
    localStorage.removeItem("aluno");
    router.push("/login");
  }

  const cursosLiberados = matriculas.flatMap(
    (matricula) => {
      const curso = cursos.find(
        (item) => item.slug === matricula.cursoSlug
      );

      if (!curso) {
        return [];
      }

      return [
        {
          ...curso,
          matricula,
          apostilaUrl: `/apostilas/${curso.slug}.pdf`,
        },
      ];
    }
  );

  const cursosConcluidos = matriculas.filter(
    (matricula) => matricula.concluidoEm
  ).length;

  const certificadosDisponiveis = matriculas.filter(
    (matricula) =>
      matricula.concluidoEm &&
      matricula.notaFinal !== null &&
      matricula.notaFinal >= 7
  ).length;

  if (!aluno || carregando) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>Carregando sua área...</p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "Arial, sans-serif",
        color: "#111111",
      }}
    >
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #dddddd",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              color: "#111111",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Logo Digital Consultoria"
              width={100}
              height={100}
              priority
              style={{
                width: "100px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "22px",
                }}
              >
                Área do Aluno
              </strong>

              <span
                style={{
                  color: "#666666",
                  fontSize: "14px",
                }}
              >
                Digital Consultoria e Serviços Técnicos
                LTDA
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={sair}
            style={{
              backgroundColor: "#111111",
              color: "#ffffff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "50px 20px 70px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #171717 55%, #2c2c2c 100%)",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "38px",
          }}
        >
          <p
            style={{
              color: "#cccccc",
              margin: 0,
            }}
          >
            Bem-vindo à plataforma
          </p>

          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 46px)",
              margin: "10px 0",
            }}
          >
            Olá, {aluno.nome} 👋
          </h1>

          <p
            style={{
              color: "#d4d4d4",
              marginBottom: 0,
              lineHeight: "1.6",
            }}
          >
            Acesse suas apostilas, avaliações e
            certificados.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={estiloResumo}>
            <strong style={numeroResumo}>
              {cursosLiberados.length}
            </strong>

            <span style={textoResumo}>
              {cursosLiberados.length === 1
                ? "Curso liberado"
                : "Cursos liberados"}
            </span>
          </div>

          <div style={estiloResumo}>
            <strong style={numeroResumo}>
              {cursosConcluidos}
            </strong>

            <span style={textoResumo}>
              {cursosConcluidos === 1
                ? "Curso concluído"
                : "Cursos concluídos"}
            </span>
          </div>

          <div style={estiloResumo}>
            <strong style={numeroResumo}>
              {certificadosDisponiveis}
            </strong>

            <span style={textoResumo}>
              {certificadosDisponiveis === 1
                ? "Certificado disponível"
                : "Certificados disponíveis"}
            </span>
          </div>
        </div>

        <h2
          style={{
            marginTop: "45px",
            fontSize: "30px",
          }}
        >
          Meus cursos
        </h2>

        {erro && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              padding: "16px",
              marginTop: "20px",
            }}
          >
            {erro}
          </div>
        )}

        {!erro && cursosLiberados.length === 0 && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "30px",
              marginTop: "20px",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                marginTop: 0,
              }}
            >
              Você ainda não possui cursos liberados
            </h3>

            <p
              style={{
                color: "#666666",
                lineHeight: "1.6",
              }}
            >
              Depois que uma compra for aprovada, o curso
              aparecerá nesta área.
            </p>

            <Link
              href="/#cursos"
              style={{
                display: "inline-block",
                marginTop: "12px",
                backgroundColor: "#111111",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Ver cursos disponíveis
            </Link>
          </div>
        )}

        {!erro && cursosLiberados.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            {cursosLiberados.map((curso) => {
              const aprovado =
                curso.matricula.notaFinal !== null &&
                curso.matricula.notaFinal >= 7;

              return (
                <article
                  key={curso.matricula.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "15px",
                    overflow: "hidden",
                    border: "1px solid #e5e5e5",
                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #111111 0%, #303030 100%)",
                      color: "#ffffff",
                      padding: "27px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "#ffffff",
                        color: "#111111",
                        padding: "6px 11px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Acesso liberado
                    </span>

                    <h3
                      style={{
                        fontSize: "30px",
                        margin: "20px 0 5px",
                      }}
                    >
                      {curso.nome}
                    </h3>

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
                      padding: "24px",
                    }}
                  >
                    <p
                      style={{
                        color: "#166534",
                        backgroundColor: "#dcfce7",
                        borderRadius: "8px",
                        padding: "11px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      ✓ Matrícula liberada
                    </p>

                    <div
                      style={{
                        borderTop: "1px solid #eeeeee",
                        borderBottom:
                          "1px solid #eeeeee",
                        padding: "16px 0",
                        margin: "18px 0",
                      }}
                    >
                      <p style={linhaCurso}>
                        📄 Apostila em PDF
                      </p>

                      <p style={linhaCurso}>
                        📝 Avaliação online
                      </p>

                      <p style={linhaCurso}>
                        🏆 Certificado após aprovação
                      </p>

                      {curso.matricula.notaFinal !==
                        null && (
                        <p style={linhaCurso}>
                          📊 Nota final:{" "}
                          <strong>
                            {curso.matricula.notaFinal.toFixed(
                              1
                            )}
                          </strong>
                        </p>
                      )}
                    </div>

                    <a
                      href={curso.apostilaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={botaoPrincipal}
                    >
                      📄 Abrir apostila
                    </a>

                    <Link
                      href={`/cursos/${curso.slug}`}
                      style={botaoSecundario}
                    >
                      📝 Acessar avaliação
                    </Link>

                    {aprovado ? (
                      <Link
                        href={`/certificados/${curso.matricula.id}`}
                        style={botaoCertificado}
                      >
                        🏆 Baixar certificado
                      </Link>
                    ) : (
                      <div style={certificadoBloqueado}>
                        🔒 Certificado liberado após
                        aprovação
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div style={estiloCartao}>
            <h3>Meu perfil</h3>

            <p style={estiloTexto}>
              Nome: <strong>{aluno.nome}</strong>
            </p>

            <p style={estiloTexto}>
              E-mail: <strong>{aluno.email}</strong>
            </p>
          </div>

          <div style={estiloCartao}>
            <h3>Certificados</h3>

            <p style={estiloTexto}>
              Os certificados serão liberados depois da
              aprovação nas avaliações.
            </p>
          </div>

          <div style={estiloCartao}>
            <h3>Avaliações</h3>

            <p style={estiloTexto}>
              Estude a apostila e realize a avaliação do
              curso para concluir sua formação.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

const estiloResumo: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "24px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
};

const numeroResumo: CSSProperties = {
  display: "block",
  color: "#111111",
  fontSize: "34px",
  marginBottom: "8px",
};

const textoResumo: CSSProperties = {
  color: "#666666",
};

const estiloCartao: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const estiloTexto: CSSProperties = {
  color: "#666666",
  lineHeight: "1.6",
  overflowWrap: "anywhere",
};

const linhaCurso: CSSProperties = {
  color: "#555555",
  lineHeight: "1.6",
  margin: "7px 0",
};

const botaoPrincipal: CSSProperties = {
  display: "block",
  backgroundColor: "#111111",
  color: "#ffffff",
  padding: "14px",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "10px",
};

const botaoSecundario: CSSProperties = {
  display: "block",
  backgroundColor: "#ffffff",
  color: "#111111",
  border: "2px solid #111111",
  padding: "12px",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "10px",
};

const botaoCertificado: CSSProperties = {
  display: "block",
  backgroundColor: "#166534",
  color: "#ffffff",
  padding: "14px",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
  fontWeight: "bold",
};

const certificadoBloqueado: CSSProperties = {
  backgroundColor: "#eeeeee",
  color: "#666666",
  padding: "13px",
  borderRadius: "8px",
  textAlign: "center",
  fontWeight: "bold",
};