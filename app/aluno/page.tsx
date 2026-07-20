"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { cursos } from "../../data/cursos";

type AlunoLogado = {
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

  const [aluno, setAluno] = useState<AlunoLogado | null>(null);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarCursos() {
      try {
        const alunoSalvo = localStorage.getItem("aluno");

        if (!alunoSalvo) {
          router.push("/login");
          return;
        }

        const alunoConvertido: AlunoLogado = JSON.parse(alunoSalvo);

        if (!alunoConvertido.id) {
          localStorage.removeItem("aluno");
          router.push("/login");
          return;
        }

        setAluno(alunoConvertido);

        const resposta = await fetch(
          `/api/matriculas?alunoId=${alunoConvertido.id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          setMensagem(
            dados.erro || "Não foi possível carregar seus cursos."
          );
          return;
        }

        setMatriculas(dados.matriculas || []);
      } catch (erro) {
        console.error("Erro ao carregar a área do aluno:", erro);

        setMensagem(
          "Não foi possível carregar a Área do Aluno."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarCursos();
  }, [router]);

  function sair() {
    localStorage.removeItem("aluno");
    router.push("/login");
  }

  const cursosLiberados = matriculas
    .map((matricula) => {
      const curso = cursos.find(
        (item) => item.slug === matricula.cursoSlug
      );

      if (!curso) {
        return null;
      }

      return {
        ...curso,
        matricula,
      };
    })
    .filter(
      (
        curso
      ): curso is NonNullable<typeof curso> => curso !== null
    );

  if (carregando) {
    return (
      <main style={paginaCentralizada}>
        <p style={textoCarregando}>Carregando seus cursos...</p>
      </main>
    );
  }

  return (
    <main style={pagina}>
      <section style={conteudo}>
        <div style={topo}>
          <div>
            <p style={pequenoTitulo}>PLATAFORMA EAD</p>

            <h1 style={titulo}>Área do Aluno</h1>

            <p style={subtitulo}>
              {aluno
                ? `Olá, ${aluno.nome}. Acesse seus cursos liberados.`
                : "Acesse seus cursos liberados."}
            </p>
          </div>

          <div style={acoesTopo}>
            <Link href="/" style={botaoVoltar}>
              Voltar ao início
            </Link>

            <button
              type="button"
              onClick={sair}
              style={botaoSair}
            >
              Sair
            </button>
          </div>
        </div>

        {mensagem && (
          <div style={avisoErro}>
            <p style={{ margin: 0 }}>{mensagem}</p>
          </div>
        )}

        {!mensagem && cursosLiberados.length === 0 && (
          <div style={semCursos}>
            <h2 style={tituloSemCursos}>
              Nenhum curso liberado
            </h2>

            <p style={textoSemCursos}>
              Você ainda não possui cursos com pagamento aprovado.
            </p>

            <Link href="/#cursos" style={botaoComprar}>
              Ver cursos disponíveis
            </Link>
          </div>
        )}

        {cursosLiberados.length > 0 && (
          <div style={grade}>
            {cursosLiberados.map((curso) => (
              <article key={curso.slug} style={cartao}>
                <div>
                  <p style={categoria}>{curso.categoria}</p>

                  <h2 style={nomeCurso}>{curso.nome}</h2>

                  <p style={texto}>
                    Seu acesso está liberado. Você já pode estudar
                    o material e realizar a avaliação.
                  </p>

                  {curso.matricula.notaFinal !== null && (
                    <p style={nota}>
                      Nota atual:{" "}
                      {curso.matricula.notaFinal.toFixed(1)}
                    </p>
                  )}
                </div>

                <div style={acoes}>
                  <a
                    href={curso.apostilaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={botaoCurso}
                  >
                    Abrir apostila
                  </a>

                  <Link
                    href={`/aluno/${curso.slug}/prova`}
                    style={botaoProva}
                  >
                    Fazer prova
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const pagina: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f3f4f6",
  color: "#111111",
  padding: "40px 20px",
  fontFamily: "Arial, sans-serif",
};

const paginaCentralizada: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
};

const textoCarregando: CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
};

const conteudo: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const topo: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "35px",
};

const acoesTopo: CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const pequenoTitulo: CSSProperties = {
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "2px",
  color: "#6b21a8",
  marginBottom: "8px",
};

const titulo: CSSProperties = {
  fontSize: "clamp(34px, 6vw, 52px)",
  margin: "0 0 10px",
};

const subtitulo: CSSProperties = {
  color: "#666666",
  fontSize: "18px",
  margin: 0,
};

const grade: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const cartao: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "260px",
};

const categoria: CSSProperties = {
  color: "#6b21a8",
  fontSize: "13px",
  fontWeight: "bold",
  textTransform: "uppercase",
  marginTop: 0,
};

const nomeCurso: CSSProperties = {
  fontSize: "24px",
  margin: "10px 0",
};

const texto: CSSProperties = {
  color: "#666666",
  lineHeight: "1.6",
};

const nota: CSSProperties = {
  backgroundColor: "#f3e8ff",
  color: "#6b21a8",
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const acoes: CSSProperties = {
  display: "grid",
  gap: "10px",
  marginTop: "20px",
};

const botaoCurso: CSSProperties = {
  backgroundColor: "#6b21a8",
  color: "#ffffff",
  textDecoration: "none",
  textAlign: "center",
  padding: "13px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const botaoProva: CSSProperties = {
  backgroundColor: "#111111",
  color: "#ffffff",
  textDecoration: "none",
  textAlign: "center",
  padding: "13px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const botaoVoltar: CSSProperties = {
  backgroundColor: "#111111",
  color: "#ffffff",
  textDecoration: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const botaoSair: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#991b1b",
  border: "1px solid #991b1b",
  padding: "12px 18px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

const avisoErro: CSSProperties = {
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  padding: "18px",
  borderRadius: "12px",
  fontWeight: "bold",
};

const semCursos: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "45px 25px",
  textAlign: "center",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
};

const tituloSemCursos: CSSProperties = {
  fontSize: "28px",
  marginTop: 0,
};

const textoSemCursos: CSSProperties = {
  color: "#666666",
  fontSize: "17px",
  lineHeight: "1.6",
};

const botaoComprar: CSSProperties = {
  display: "inline-block",
  marginTop: "15px",
  backgroundColor: "#6b21a8",
  color: "#ffffff",
  textDecoration: "none",
  padding: "13px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
};