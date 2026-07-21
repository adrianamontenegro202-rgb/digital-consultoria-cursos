"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { cursos } from "../../../../data/cursos";
import { provas } from "../../../../data/provas";

type AlunoLogado = {
  id: number;
  nome?: string;
  email?: string;
};

type Resultado = {
  acertos: number;
  nota: number;
  aprovado: boolean;
};

type RespostaDaApi = {
  erro?: string;
  mensagem?: string;
  aprovado?: boolean;
};

export default function PaginaDaProva() {
  const router = useRouter();
  const params = useParams<{ slug: string | string[] }>();

  const parametroSlug = params?.slug;
  const slug = String(
    Array.isArray(parametroSlug) ? parametroSlug[0] : parametroSlug || "",
  ).toLowerCase();

  const curso = useMemo(() => {
    return cursos.find((item) => item.slug.toLowerCase() === slug);
  }, [slug]);

  const prova = provas[slug];

  const [alunoId, setAlunoId] = useState<number | null>(null);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      const alunoSalvo = localStorage.getItem("aluno");

      if (!alunoSalvo) {
        router.replace("/login");
        return;
      }

      const aluno: AlunoLogado = JSON.parse(alunoSalvo);

      if (!Number.isInteger(aluno.id) || aluno.id <= 0) {
        localStorage.removeItem("aluno");
        router.replace("/login");
        return;
      }

      setAlunoId(aluno.id);
    } catch (error) {
      console.error("Erro ao carregar o aluno:", error);
      localStorage.removeItem("aluno");
      router.replace("/login");
    }
  }, [router]);

  function marcarResposta(indiceQuestao: number, indiceAlternativa: number) {
    if (salvando) {
      return;
    }

    setRespostas((respostasAnteriores) => ({
      ...respostasAnteriores,
      [indiceQuestao]: indiceAlternativa,
    }));

    setResultado(null);
    setErro("");
  }

  async function corrigirProva() {
    if (!prova || salvando) {
      return;
    }

    if (prova.questoes.length === 0) {
      setErro("Esta prova ainda não possui questões cadastradas.");
      return;
    }

    const todasRespondidas = prova.questoes.every(
      (_questao, indice) => respostas[indice] !== undefined,
    );

    if (!todasRespondidas) {
      window.alert("Responda todas as questões antes de finalizar.");
      return;
    }

    if (!alunoId) {
      window.alert("Sua sessão expirou. Entre novamente para fazer a prova.");
      router.push("/login");
      return;
    }

    const acertos = prova.questoes.reduce((total, questao, indice) => {
      return respostas[indice] === questao.correta ? total + 1 : total;
    }, 0);

    const nota = Number(((acertos / prova.questoes.length) * 10).toFixed(1));

    const aprovadoCalculado = nota >= prova.notaMinima;

    setSalvando(true);
    setErro("");

    try {
      const resposta = await fetch("/api/provas/resultado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alunoId,
          cursoSlug: slug,
          nota,
        }),
      });

      const dados = (await resposta.json()) as RespostaDaApi;

      if (!resposta.ok) {
        throw new Error(
          dados.erro || "Não foi possível registrar o resultado da prova.",
        );
      }

      setResultado({
        acertos,
        nota,
        aprovado:
          typeof dados.aprovado === "boolean"
            ? dados.aprovado
            : aprovadoCalculado,
      });

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Erro ao salvar o resultado da prova:", error);
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar o resultado da prova.",
      );
    } finally {
      setSalvando(false);
    }
  }

  function refazerProva() {
    setRespostas({});
    setResultado(null);
    setErro("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!curso) {
    return (
      <main style={estiloPagina}>
        <div style={estiloMensagem}>
          <h1>Curso não encontrado</h1>

          <p>O curso informado não está cadastrado na plataforma.</p>

          <Link href="/aluno" style={botaoVoltar}>
            Voltar para a Área do Aluno
          </Link>
        </div>
      </main>
    );
  }

  if (!prova) {
    return (
      <main style={estiloPagina}>
        <div style={estiloMensagem}>
          <h1>{curso.nome}</h1>

          <p>A avaliação deste curso ainda não foi cadastrada.</p>

          <p>
            Quando as questões forem adicionadas ao arquivo{" "}
            <strong>data/provas.ts</strong>, a prova aparecerá automaticamente.
          </p>

          <Link href="/aluno" style={botaoVoltar}>
            Voltar para a Área do Aluno
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={estiloPagina}>
      <section style={estiloConteudo}>
        <div style={estiloTopo}>
          <div>
            <p style={estiloCategoria}>{curso.categoria}</p>

            <h1 style={estiloTitulo}>{prova.titulo}</h1>

            <p style={estiloSubtitulo}>
              Responda todas as questões e clique em finalizar.
            </p>
          </div>

          <Link href="/aluno" style={botaoVoltar}>
            Voltar
          </Link>
        </div>

        <div style={estiloAviso}>
          <strong>Nota mínima para aprovação:</strong>{" "}
          {prova.notaMinima.toFixed(1)}
        </div>

        <div style={estiloListaQuestoes}>
          {prova.questoes.map((questao, indiceQuestao) => (
            <article key={`${slug}-${indiceQuestao}`} style={estiloQuestao}>
              <h2 style={estiloPergunta}>
                {indiceQuestao + 1}. {questao.pergunta}
              </h2>

              <div style={estiloAlternativas}>
                {questao.alternativas.map((alternativa, indiceAlternativa) => {
                  const selecionada =
                    respostas[indiceQuestao] === indiceAlternativa;

                  return (
                    <label
                      key={`${indiceQuestao}-${indiceAlternativa}`}
                      style={{
                        ...estiloAlternativa,
                        borderColor: selecionada ? "#111111" : "#dddddd",
                        backgroundColor: selecionada ? "#f3f4f6" : "#ffffff",
                        opacity: salvando ? 0.7 : 1,
                      }}
                    >
                      <input
                        type="radio"
                        name={`questao-${indiceQuestao}`}
                        checked={selecionada}
                        disabled={salvando}
                        onChange={() =>
                          marcarResposta(indiceQuestao, indiceAlternativa)
                        }
                      />

                      <span>{alternativa}</span>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {erro && (
          <div role="alert" style={estiloErro}>
            {erro}
          </div>
        )}

        {!resultado && (
          <button
            type="button"
            onClick={corrigirProva}
            disabled={salvando || !alunoId}
            style={{
              ...botaoFinalizar,
              opacity: salvando || !alunoId ? 0.65 : 1,
              cursor: salvando || !alunoId ? "not-allowed" : "pointer",
            }}
          >
            {salvando ? "Registrando resultado..." : "Finalizar prova"}
          </button>
        )}

        {resultado && (
          <div
            style={{
              ...estiloResultado,
              backgroundColor: resultado.aprovado ? "#dcfce7" : "#fee2e2",
              color: resultado.aprovado ? "#166534" : "#991b1b",
              borderColor: resultado.aprovado ? "#86efac" : "#fecaca",
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              {resultado.aprovado
                ? "Parabéns, você foi aprovado!"
                : "Você ainda não foi aprovado."}
            </h2>

            <p>
              Você acertou <strong>{resultado.acertos}</strong> de{" "}
              <strong>{prova.questoes.length}</strong> questões.
            </p>

            <p>
              Sua nota foi: <strong>{resultado.nota.toFixed(1)}</strong>
            </p>

            {resultado.aprovado ? (
              <p>
                Sua aprovação foi registrada. O certificado foi liberado na Área
                do Aluno.
              </p>
            ) : (
              <p>
                O resultado foi registrado. Revise a apostila e tente novamente.
              </p>
            )}

            <button type="button" onClick={refazerProva} style={botaoRefazer}>
              Refazer prova
            </button>

            <Link href="/aluno" style={botaoAreaAluno}>
              Voltar para a Área do Aluno
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

const estiloPagina: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f3f4f6",
  padding: "40px 20px",
  color: "#111111",
  fontFamily: "Arial, sans-serif",
};

const estiloConteudo: CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
};

const estiloTopo: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "25px",
};

const estiloCategoria: CSSProperties = {
  color: "#666666",
  marginBottom: "8px",
};

const estiloTitulo: CSSProperties = {
  fontSize: "clamp(32px, 6vw, 46px)",
  margin: "0 0 10px",
};

const estiloSubtitulo: CSSProperties = {
  color: "#666666",
  lineHeight: "1.6",
  margin: 0,
};

const estiloAviso: CSSProperties = {
  backgroundColor: "#111111",
  color: "#ffffff",
  padding: "16px",
  borderRadius: "10px",
  marginBottom: "25px",
};

const estiloListaQuestoes: CSSProperties = {
  display: "grid",
  gap: "20px",
};

const estiloQuestao: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const estiloPergunta: CSSProperties = {
  fontSize: "21px",
  lineHeight: "1.5",
  marginTop: 0,
};

const estiloAlternativas: CSSProperties = {
  display: "grid",
  gap: "10px",
};

const estiloAlternativa: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  border: "2px solid #dddddd",
  borderRadius: "9px",
  cursor: "pointer",
};

const botaoFinalizar: CSSProperties = {
  width: "100%",
  marginTop: "25px",
  backgroundColor: "#111111",
  color: "#ffffff",
  border: "none",
  borderRadius: "9px",
  padding: "16px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer",
};

const estiloErro: CSSProperties = {
  marginTop: "25px",
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  border: "1px solid #fecaca",
  borderRadius: "10px",
  padding: "15px",
  fontWeight: "bold",
};

const estiloResultado: CSSProperties = {
  marginTop: "25px",
  border: "1px solid",
  borderRadius: "12px",
  padding: "24px",
};

const estiloMensagem: CSSProperties = {
  maxWidth: "650px",
  margin: "80px auto",
  backgroundColor: "#ffffff",
  padding: "35px",
  borderRadius: "14px",
  textAlign: "center",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const botaoVoltar: CSSProperties = {
  display: "inline-block",
  backgroundColor: "#111111",
  color: "#ffffff",
  textDecoration: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const botaoRefazer: CSSProperties = {
  display: "inline-block",
  backgroundColor: "#ffffff",
  color: "#111111",
  border: "2px solid #111111",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: "10px",
  marginTop: "10px",
};

const botaoAreaAluno: CSSProperties = {
  display: "inline-block",
  backgroundColor: "#111111",
  color: "#ffffff",
  textDecoration: "none",
  padding: "14px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  marginTop: "10px",
};