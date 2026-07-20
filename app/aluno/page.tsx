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

        const alunoConvertido: AlunoLogado =
          JSON.parse(alunoSalvo);

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
            dados.erro ||
              "Não foi possível carregar seus cursos."
          );
          return;
        }

        setMatriculas(dados.matriculas || []);
      } catch (erro) {
        console.error(
          "Erro ao carregar a área do aluno:",
          erro
        );

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
      ): curso is NonNullable<typeof curso> =>
        curso !== null
    );

  if (carregando) {
    return (
      <main style={paginaCarregando}>
        <div style={caixaCarregando}>
          <div style={iconeCarregando}>🎓</div>
          <p style={textoCarregando}>
            Carregando seus cursos...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={pagina}>
      <header style={cabecalho}>
        <div style={cabecalhoConteudo}>
          <Link href="/" style={marca}>
            <div style={logo}>D</div>

            <div>
              <strong style={nomeEmpresa}>DIGITAL</strong>

              <span style={descricaoEmpresa}>
                Consultoria e Serviços Técnicos LTDA
              </span>
            </div>
          </Link>

          <div style={acoesCabecalho}>
            <Link href="/" style={botaoInicio}>
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
      </header>

      <section style={banner}>
        <div style={bannerConteudo}>
          <div>
            <p style={etiqueta}>PLATAFORMA EAD</p>

            <h1 style={titulo}>Área do Aluno</h1>

            <p style={subtitulo}>
              {aluno
                ? `Olá, ${aluno.nome}. Continue seus estudos e acesse seus cursos liberados.`
                : "Acesse seus cursos liberados."}
            </p>
          </div>

          <div style={resumo}>
            <span style={numeroCursos}>
              {cursosLiberados.length}
            </span>

            <span style={textoResumo}>
              {cursosLiberados.length === 1
                ? "curso liberado"
                : "cursos liberados"}
            </span>
          </div>
        </div>
      </section>

      <section style={conteudo}>
        {mensagem && (
          <div style={avisoErro}>
            <strong>Não foi possível continuar.</strong>

            <p style={{ margin: "8px 0 0" }}>
              {mensagem}
            </p>
          </div>
        )}

        {!mensagem && cursosLiberados.length === 0 && (
          <div style={semCursos}>
            <div style={iconeSemCursos}>📚</div>

            <h2 style={tituloSemCursos}>
              Nenhum curso liberado
            </h2>

            <p style={textoSemCursos}>
              Você ainda não possui cursos com pagamento
              aprovado.
            </p>

            <Link href="/#cursos" style={botaoComprar}>
              Ver cursos disponíveis
            </Link>
          </div>
        )}

        {cursosLiberados.length > 0 && (
          <>
            <div style={tituloSecao}>
              <div>
                <p style={etiquetaRoxa}>MEUS CURSOS</p>

                <h2 style={tituloCursos}>
                  Continue aprendendo
                </h2>
              </div>

              <p style={descricaoCursos}>
                Abra a apostila, estude o conteúdo e realize
                sua avaliação.
              </p>
            </div>

            <div style={grade}>
              {cursosLiberados.map((curso) => (
                <article key={curso.slug} style={cartao}>
                  <div style={topoCartao}>
                    <div style={iconeCurso}>📘</div>

                    <span style={status}>
                      Acesso liberado
                    </span>
                  </div>

                  <div style={corpoCartao}>
                    <p style={categoria}>
                      {curso.categoria}
                    </p>

                    <h3 style={nomeCurso}>
                      {curso.nome}
                    </h3>

                    <p style={texto}>
                      Seu acesso está liberado. Você já pode
                      estudar o material e realizar a
                      avaliação.
                    </p>

                    {curso.matricula.notaFinal !== null && (
                      <div style={caixaNota}>
                        <span style={textoNota}>
                          Nota atual
                        </span>

                        <strong style={valorNota}>
                          {curso.matricula.notaFinal.toFixed(
                            1
                          )}
                        </strong>
                      </div>
                    )}
                  </div>

                  <div style={acoes}>
                    <a
                      href={curso.apostilaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={botaoApostila}
                    >
                      <span>📄</span>
                      Abrir apostila
                    </a>

                    <Link
                      href={`/aluno/${curso.slug}/prova`}
                      style={botaoProva}
                    >
                      <span>✏️</span>
                      Acessar avaliação
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      <footer style={rodape}>
        <p style={{ margin: 0 }}>
          © 2026 Digital Consultoria e Serviços Técnicos
          LTDA
        </p>
      </footer>
    </main>
  );
}

const pagina: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f5f3f7",
  color: "#111111",
  fontFamily: "Arial, sans-serif",
};

const paginaCarregando: CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #130b1c 0%, #2d0c46 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const caixaCarregando: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "35px",
  textAlign: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const iconeCarregando: CSSProperties = {
  fontSize: "42px",
  marginBottom: "12px",
};

const textoCarregando: CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: 0,
};

const cabecalho: CSSProperties = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #ece7f0",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

const cabecalhoConteudo: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "18px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const marca: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
  color: "#111111",
};

const logo: CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg, #6b21a8, #9333ea)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "bold",
};

const nomeEmpresa: CSSProperties = {
  display: "block",
  fontSize: "20px",
  letterSpacing: "1px",
};

const descricaoEmpresa: CSSProperties = {
  display: "block",
  marginTop: "3px",
  color: "#6b7280",
  fontSize: "13px",
};

const acoesCabecalho: CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const botaoInicio: CSSProperties = {
  backgroundColor: "#111111",
  color: "#ffffff",
  textDecoration: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: "bold",
};

const botaoSair: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#991b1b",
  border: "1px solid #dc2626",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};

const banner: CSSProperties = {
  background:
    "linear-gradient(135deg, #120b17 0%, #281035 55%, #4c1675 100%)",
  color: "#ffffff",
  padding: "70px 20px",
};

const bannerConteudo: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap",
};

const etiqueta: CSSProperties = {
  color: "#d8b4fe",
  fontSize: "13px",
  fontWeight: "bold",
  letterSpacing: "3px",
  margin: "0 0 12px",
};

const titulo: CSSProperties = {
  fontSize: "clamp(38px, 7vw, 64px)",
  margin: "0 0 14px",
};

const subtitulo: CSSProperties = {
  color: "#e5e7eb",
  fontSize: "18px",
  lineHeight: "1.6",
  maxWidth: "700px",
  margin: 0,
};

const resumo: CSSProperties = {
  minWidth: "180px",
  backgroundColor: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "18px",
  padding: "24px",
  textAlign: "center",
  backdropFilter: "blur(8px)",
};

const numeroCursos: CSSProperties = {
  display: "block",
  fontSize: "46px",
  fontWeight: "bold",
};

const textoResumo: CSSProperties = {
  display: "block",
  color: "#e9d5ff",
  marginTop: "4px",
};

const conteudo: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "55px 20px 80px",
};

const tituloSecao: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "28px",
};

const etiquetaRoxa: CSSProperties = {
  color: "#7e22ce",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "2px",
  margin: "0 0 8px",
};

const tituloCursos: CSSProperties = {
  fontSize: "32px",
  margin: 0,
};

const descricaoCursos: CSSProperties = {
  color: "#6b7280",
  margin: 0,
  maxWidth: "500px",
  lineHeight: "1.6",
};

const grade: CSSProperties = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(310px, 1fr))",
  gap: "24px",
};

const cartao: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 12px 35px rgba(48, 20, 68, 0.10)",
  border: "1px solid #eee7f3",
  display: "flex",
  flexDirection: "column",
};

const topoCartao: CSSProperties = {
  background:
    "linear-gradient(135deg, #6b21a8, #9333ea)",
  padding: "22px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const iconeCurso: CSSProperties = {
  width: "48px",
  height: "48px",
  backgroundColor: "rgba(255,255,255,0.16)",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const status: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#6b21a8",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
};

const corpoCartao: CSSProperties = {
  padding: "25px",
  flex: 1,
};

const categoria: CSSProperties = {
  color: "#7e22ce",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 10px",
};

const nomeCurso: CSSProperties = {
  fontSize: "27px",
  margin: "0 0 14px",
};

const texto: CSSProperties = {
  color: "#6b7280",
  lineHeight: "1.7",
  margin: 0,
};

const caixaNota: CSSProperties = {
  marginTop: "20px",
  backgroundColor: "#f3e8ff",
  borderRadius: "12px",
  padding: "13px 15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const textoNota: CSSProperties = {
  color: "#6b21a8",
  fontWeight: "bold",
};

const valorNota: CSSProperties = {
  color: "#4c1d95",
  fontSize: "20px",
};

const acoes: CSSProperties = {
  display: "grid",
  gap: "10px",
  padding: "0 25px 25px",
};

const botaoApostila: CSSProperties = {
  backgroundColor: "#7e22ce",
  color: "#ffffff",
  textDecoration: "none",
  textAlign: "center",
  padding: "14px",
  borderRadius: "10px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const botaoProva: CSSProperties = {
  backgroundColor: "#111111",
  color: "#ffffff",
  textDecoration: "none",
  textAlign: "center",
  padding: "14px",
  borderRadius: "10px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const avisoErro: CSSProperties = {
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  padding: "20px",
  borderRadius: "14px",
};

const semCursos: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "55px 25px",
  textAlign: "center",
  boxShadow: "0 12px 35px rgba(48, 20, 68, 0.10)",
};

const iconeSemCursos: CSSProperties = {
  fontSize: "48px",
  marginBottom: "15px",
};

const tituloSemCursos: CSSProperties = {
  fontSize: "30px",
  margin: "0 0 12px",
};

const textoSemCursos: CSSProperties = {
  color: "#6b7280",
  fontSize: "17px",
  lineHeight: "1.6",
  margin: 0,
};

const botaoComprar: CSSProperties = {
  display: "inline-block",
  marginTop: "22px",
  backgroundColor: "#7e22ce",
  color: "#ffffff",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "10px",
  fontWeight: "bold",
};

const rodape: CSSProperties = {
  backgroundColor: "#110b15",
  color: "#d1d5db",
  textAlign: "center",
  padding: "25px 20px",
  fontSize: "14px",
};