"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

const apostilas = [
  {
    slug: "nr01",
    nome: "Apostila NR-01",
    categoria: "Segurança do Trabalho",
    preco: 29.9,
    descricao:
      "Material completo sobre gerenciamento de riscos ocupacionais e disposições gerais da NR-01.",
  },
  {
    slug: "nr05",
    nome: "Apostila NR-05",
    categoria: "Segurança do Trabalho",
    preco: 29.9,
    descricao:
      "Conteúdo atualizado sobre CIPA, prevenção de acidentes e organização interna.",
  },
  {
    slug: "nr06",
    nome: "Apostila NR-06",
    categoria: "Segurança do Trabalho",
    preco: 29.9,
    descricao:
      "Material didático sobre Equipamentos de Proteção Individual.",
  },
  {
    slug: "nr10",
    nome: "Apostila NR-10",
    categoria: "Elétrica",
    preco: 79.9,
    descricao:
      "Conteúdo completo de segurança em instalações e serviços em eletricidade.",
  },
  {
    slug: "nr35",
    nome: "Apostila NR-35",
    categoria: "Segurança do Trabalho",
    preco: 39.9,
    descricao:
      "Material voltado para segurança e prevenção em trabalhos em altura.",
  },
  {
    slug: "primeiros-socorros",
    nome: "Apostila de Primeiros Socorros",
    categoria: "Saúde",
    preco: 49.9,
    descricao:
      "Conteúdo prático para atendimento inicial em situações de emergência.",
  },
];

export default function PaginaApostila() {
  const params = useParams();
  const router = useRouter();

  const slug = String(params.slug || "");

  const apostila = useMemo(
    () => apostilas.find((item) => item.slug === slug),
    [slug]
  );

  const [nomeComprador, setNomeComprador] = useState("");
  const [emailComprador, setEmailComprador] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function comprarApostila(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensagem("");

    if (!apostila) {
      setMensagem("Apostila não encontrada.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch("/api/pagbank/apostila", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeComprador,
          emailComprador,
          apostilaSlug: apostila.slug,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(
          dados.erro || "Não foi possível iniciar o pagamento."
        );
        return;
      }

      if (!dados.url) {
        setMensagem("O PagBank não devolveu o link de pagamento.");
        return;
      }

      router.push(dados.url);
    } catch (erro) {
      console.error("Erro ao comprar apostila:", erro);
      setMensagem("Não foi possível iniciar o pagamento.");
    } finally {
      setCarregando(false);
    }
  }

  if (!apostila) {
    return (
      <main style={paginaCentralizada}>
        <div style={caixaErro}>
          <h1>Apostila não encontrada</h1>

          <Link href="/apostilas" style={botaoVoltar}>
            Voltar para apostilas
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={pagina}>
      <header style={cabecalho}>
        <div style={cabecalhoConteudo}>
          <Link href="/" style={marca}>
            DIGITAL
          </Link>

          <Link href="/apostilas" style={linkVoltar}>
            ← Voltar para apostilas
          </Link>
        </div>
      </header>

      <section style={conteudo}>
        <div>
          <p style={categoria}>{apostila.categoria}</p>

          <h1 style={titulo}>{apostila.nome}</h1>

          <p style={descricao}>{apostila.descricao}</p>

          <div style={listaBeneficios}>
            <p style={beneficio}>✓ Arquivo digital em PDF</p>
            <p style={beneficio}>
              ✓ Acesso após confirmação do pagamento
            </p>
            <p style={beneficio}>
              ✓ Material para estudo e capacitação
            </p>
            <p style={beneficio}>
              ✓ Sem prova e sem certificado
            </p>
          </div>
        </div>

        <aside style={caixaCompra}>
          <div style={icone}>📘</div>

          <p style={rotuloValor}>Valor da apostila</p>

          <strong style={preco}>
            {apostila.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>

          <form onSubmit={comprarApostila} style={formulario}>
            <label style={label}>
              Nome completo
              <input
                type="text"
                value={nomeComprador}
                onChange={(evento) =>
                  setNomeComprador(evento.target.value)
                }
                placeholder="Digite seu nome completo"
                style={input}
                required
              />
            </label>

            <label style={label}>
              E-mail
              <input
                type="email"
                value={emailComprador}
                onChange={(evento) =>
                  setEmailComprador(evento.target.value)
                }
                placeholder="Digite seu e-mail"
                style={input}
                required
              />
            </label>

            {mensagem && (
              <div style={avisoErro}>
                <p style={{ margin: 0 }}>{mensagem}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              style={{
                ...botaoComprar,
                opacity: carregando ? 0.7 : 1,
                cursor: carregando ? "not-allowed" : "pointer",
              }}
            >
              {carregando
                ? "Preparando pagamento..."
                : "Comprar apostila"}
            </button>
          </form>

          <p style={observacao}>
            Você será redirecionado para o PagBank para concluir o
            pagamento.
          </p>
        </aside>
      </section>
    </main>
  );
}

const pagina = {
  minHeight: "100vh",
  backgroundColor: "#f5f3f7",
  color: "#111111",
  fontFamily: "Arial, sans-serif",
};

const paginaCentralizada = {
  minHeight: "100vh",
  backgroundColor: "#f5f3f7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const caixaErro = {
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  padding: "35px",
  textAlign: "center" as const,
};

const cabecalho = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #ece7f0",
};

const cabecalhoConteudo = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "18px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap" as const,
};

const marca = {
  color: "#111111",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: "bold",
};

const linkVoltar = {
  color: "#6b21a8",
  textDecoration: "none",
  fontWeight: "bold",
};

const conteudo = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "70px 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "40px",
  alignItems: "center",
};

const categoria = {
  color: "#7e22ce",
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
};

const titulo = {
  fontSize: "clamp(38px, 7vw, 62px)",
  margin: "12px 0 20px",
};

const descricao = {
  color: "#6b7280",
  fontSize: "19px",
  lineHeight: "1.8",
  maxWidth: "650px",
};

const listaBeneficios = {
  display: "grid",
  gap: "12px",
  marginTop: "30px",
};

const beneficio = {
  margin: 0,
};

const caixaCompra = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "22px",
  boxShadow: "0 18px 45px rgba(48,20,68,0.14)",
  border: "1px solid #eee7f3",
};

const icone = {
  fontSize: "62px",
  marginBottom: "18px",
};

const rotuloValor = {
  color: "#6b7280",
  marginBottom: "6px",
};

const preco = {
  display: "block",
  fontSize: "42px",
  marginBottom: "24px",
};

const formulario = {
  display: "grid",
  gap: "16px",
};

const label = {
  display: "grid",
  gap: "8px",
  fontWeight: "bold",
};

const input = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
};

const botaoComprar = {
  width: "100%",
  border: "none",
  backgroundColor: "#111111",
  color: "#ffffff",
  textAlign: "center" as const,
  padding: "16px",
  borderRadius: "11px",
  fontWeight: "bold",
  fontSize: "17px",
};

const avisoErro = {
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  padding: "13px",
  borderRadius: "10px",
};

const observacao = {
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "1.6",
  marginTop: "18px",
  textAlign: "center" as const,
};

const botaoVoltar = {
  display: "inline-block",
  marginTop: "15px",
  backgroundColor: "#6b21a8",
  color: "#ffffff",
  textDecoration: "none",
  padding: "13px 18px",
  borderRadius: "9px",
  fontWeight: "bold",
};