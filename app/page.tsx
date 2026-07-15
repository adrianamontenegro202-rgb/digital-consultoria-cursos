import Image from "next/image";
import Link from "next/link";
import { cursos } from "../data/cursos";

const ordemCategorias = [
  "Segurança do Trabalho",
  "Elétrica",
  "Qualidade",
  "Saúde",
  "Alimentação",
  "Operacional",
];

const iconesCategorias: Record<string, string> = {
  "Segurança do Trabalho": "🦺",
  Elétrica: "⚡",
  Qualidade: "🏭",
  Saúde: "❤️",
  Alimentação: "👩‍🍳",
  Operacional: "📋",
};

const descricoesCursos: Record<string, string> = {
  nr01: "Gerenciamento de riscos ocupacionais e disposições gerais.",
  nr05: "Comissão Interna de Prevenção de Acidentes e de Assédio.",
  nr06: "Uso, conservação e responsabilidades sobre equipamentos de proteção.",
  nr10: "Segurança em instalações e serviços com eletricidade.",
  "nr10-sep": "Sistema Elétrico de Potência e suas proximidades.",
  nr11: "Transporte, movimentação e armazenagem de materiais.",
  nr12: "Segurança na operação de máquinas e equipamentos.",
  nr18: "Segurança e saúde na indústria da construção.",
  nr20: "Segurança com inflamáveis e combustíveis.",
  nr23: "Proteção, prevenção e combate a incêndios.",
  nr29: "Segurança e saúde no trabalho portuário.",
  nr30: "Segurança e saúde no trabalho aquaviário.",
  nr32: "Segurança e saúde nos serviços de saúde.",
  nr33: "Segurança e saúde em espaços confinados.",
  nr35: "Segurança para realização de trabalho em altura.",
  pgr: "Elaboração e aplicação do Programa de Gerenciamento de Riscos.",
  "primeiros-socorros":
    "Procedimentos básicos para atendimento inicial em emergências.",
  "eletricista-bt":
    "Formação profissional para atuação em instalações elétricas de baixa tensão.",
  "inspetor-qualidade":
    "Formação para inspeção e controle da qualidade de produtos e processos.",
  "7-ferramentas":
    "Aplicação das sete ferramentas essenciais para gestão da qualidade.",
  cozinheira:
    "Capacitação profissional para preparação de alimentos e organização da cozinha.",
  tbo: "Treinamento Básico Operacional para atividades e rotinas profissionais.",
};

function formatarPreco(preco: number) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Home() {
  const categorias = ordemCategorias
    .map((categoria) => ({
      nome: categoria,
      cursos: cursos.filter((curso) => curso.categoria === categoria),
    }))
    .filter((categoria) => categoria.cursos.length > 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        color: "#111111",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "22px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "#111111",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Logo Digital Consultoria"
              width={135}
              height={135}
              priority
              style={{
                width: "135px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  letterSpacing: "1px",
                }}
              >
                DIGITAL
              </strong>

              <span
                style={{
                  color: "#666666",
                  fontSize: "13px",
                }}
              >
                Consultoria e Serviços Técnicos LTDA
              </span>
            </div>
          </Link>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <a href="#inicio" style={estiloLink}>
              Início
            </a>

            <a href="#categorias" style={estiloLink}>
              Categorias
            </a>

            <a href="#cursos" style={estiloLink}>
              Cursos
            </a>

            <a href="#certificados" style={estiloLink}>
              Certificados
            </a>

            <a href="#contato" style={estiloLink}>
              Contato
            </a>

            <Link
              href="/login"
              style={{
                backgroundColor: "#111111",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Área do aluno
            </Link>
          </nav>
        </div>
      </header>

      <section
        id="inicio"
        style={{
          position: "relative",
          minHeight: "650px",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.68)), url('/fundo-cursos.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#ffffff",
          padding: "95px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "950px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "4px",
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.95)",
            }}
          >
            Treinamentos e qualificação profissional
          </p>

          <h1
            style={{
              fontSize: "clamp(42px, 7vw, 72px)",
              lineHeight: "1.08",
              margin: "24px auto",
              color: "#ffffff",
              textShadow:
                "0 4px 16px rgba(0,0,0,0.95), 0 2px 5px rgba(0,0,0,0.95)",
            }}
          >
            Digital Consultoria e Serviços Técnicos LTDA
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#f4f4f4",
              fontSize: "20px",
              lineHeight: "1.7",
              textShadow: "0 2px 8px rgba(0,0,0,0.95)",
            }}
          >
            Cursos profissionais, materiais em PDF, avaliações online e
            certificados digitais sob a responsabilidade do Prof. Aldemir
            Amaral.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "38px",
            }}
          >
            <a
              href="#cursos"
              style={{
                backgroundColor: "#ffffff",
                color: "#111111",
                padding: "16px 30px",
                borderRadius: "9px",
                textDecoration: "none",
                fontWeight: "bold",
                boxShadow: "0 7px 20px rgba(0,0,0,0.35)",
              }}
            >
              Conhecer os cursos
            </a>

            <Link
              href="/login"
              style={{
                backgroundColor: "rgba(0,0,0,0.62)",
                color: "#ffffff",
                border: "2px solid #ffffff",
                padding: "14px 30px",
                borderRadius: "9px",
                textDecoration: "none",
                fontWeight: "bold",
                boxShadow: "0 7px 20px rgba(0,0,0,0.35)",
                backdropFilter: "blur(2px)",
              }}
            >
              Entrar na plataforma
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          padding: "35px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <strong style={destaqueNumero}>{cursos.length}</strong>
            <p style={textoDestaque}>Cursos disponíveis</p>
          </div>

          <div>
            <strong style={destaqueNumero}>100%</strong>
            <p style={textoDestaque}>Acesso online</p>
          </div>

          <div>
            <strong style={destaqueNumero}>PDF</strong>
            <p style={textoDestaque}>Material didático</p>
          </div>

          <div>
            <strong style={destaqueNumero}>Digital</strong>
            <p style={textoDestaque}>Certificação profissional</p>
          </div>
        </div>
      </section>

      <section
        id="categorias"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "75px 20px 35px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "38px",
          }}
        >
          <p style={subtituloSecao}>Encontre sua capacitação</p>

          <h2 style={tituloSecao}>Categorias de cursos</h2>

          <p style={descricaoSecao}>
            Escolha uma área profissional e veja os treinamentos disponíveis.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {categorias.map((categoria) => (
            <a
              key={categoria.nome}
              href={`#${categoria.nome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")}`}
              style={{
                backgroundColor: "#ffffff",
                color: "#111111",
                border: "1px solid #e5e5e5",
                borderRadius: "15px",
                padding: "27px",
                textDecoration: "none",
                boxShadow: "0 7px 22px rgba(0,0,0,0.06)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "38px",
                  marginBottom: "15px",
                }}
              >
                {iconesCategorias[categoria.nome] || "📚"}
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "20px",
                  marginBottom: "8px",
                }}
              >
                {categoria.nome}
              </strong>

              <span
                style={{
                  color: "#666666",
                  fontSize: "14px",
                }}
              >
                {categoria.cursos.length}{" "}
                {categoria.cursos.length === 1
                  ? "curso disponível"
                  : "cursos disponíveis"}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="cursos"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "50px 20px 80px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <p style={subtituloSecao}>Catálogo oficial</p>

          <h2 style={tituloSecao}>Cursos da Digital Consultoria</h2>

          <p style={descricaoSecao}>
            Escolha seu curso, consulte os detalhes e realize sua matrícula.
          </p>
        </div>

        {categorias.map((categoria) => {
          const idCategoria = categoria.nome
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");

          return (
            <div
              id={idCategoria}
              key={categoria.nome}
              style={{
                marginBottom: "65px",
                scrollMarginTop: "150px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "25px",
                  borderBottom: "1px solid #dddddd",
                  paddingBottom: "16px",
                }}
              >
                <span style={{ fontSize: "34px" }}>
                  {iconesCategorias[categoria.nome] || "📚"}
                </span>

                <div>
                  <h3
                    style={{
                      fontSize: "29px",
                      margin: 0,
                    }}
                  >
                    {categoria.nome}
                  </h3>

                  <p
                    style={{
                      color: "#666666",
                      margin: "5px 0 0",
                    }}
                  >
                    {categoria.cursos.length} cursos nesta categoria
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "24px",
                }}
              >
                {categoria.cursos.map((curso) => (
                  <article
                    key={curso.slug}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "15px",
                      overflow: "hidden",
                      border: "1px solid #e5e5e5",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        minHeight: "145px",
                        padding: "27px",
                        background:
                          "linear-gradient(135deg, #101010 0%, #313131 100%)",
                        color: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          alignSelf: "flex-start",
                          backgroundColor: "#ffffff",
                          color: "#111111",
                          padding: "7px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {curso.categoria}
                      </span>

                      <h4
                        style={{
                          fontSize:
                            curso.nome.length > 24 ? "24px" : "31px",
                          lineHeight: "1.2",
                          margin: "22px 0 0",
                        }}
                      >
                        {curso.nome}
                      </h4>
                    </div>

                    <div
                      style={{
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <p
                        style={{
                          color: "#4b4b4b",
                          lineHeight: "1.6",
                          minHeight: "76px",
                          marginTop: 0,
                        }}
                      >
                        {descricoesCursos[curso.slug] ||
                          "Capacitação profissional com material didático e certificado digital."}
                      </p>

                      <p
                        style={{
                          color: "#111111",
                          fontSize: "17px",
                          letterSpacing: "2px",
                          margin: "5px 0",
                        }}
                      >
                        ★★★★★
                      </p>

                      <p
                        style={{
                          color: "#777777",
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        Material em PDF, avaliação e certificado digital.
                      </p>

                      <p
                        style={{
                          color: "#111111",
                          fontSize: "28px",
                          fontWeight: "bold",
                          margin: "18px 0",
                        }}
                      >
                        {formatarPreco(curso.preco)}
                      </p>

                      <Link
                        href={`/cursos/${curso.slug}`}
                        style={{
                          display: "block",
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor: "#111111",
                          color: "#ffffff",
                          padding: "14px",
                          borderRadius: "8px",
                          textAlign: "center",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Comprar curso
                      </Link>

                      <Link
                        href={`/cursos/${curso.slug}`}
                        style={{
                          display: "block",
                          width: "100%",
                          boxSizing: "border-box",
                          marginTop: "10px",
                          backgroundColor: "#ffffff",
                          color: "#111111",
                          border: "1px solid #111111",
                          padding: "13px",
                          borderRadius: "8px",
                          textAlign: "center",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section
        style={{
          backgroundColor: "#111111",
          color: "#ffffff",
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",
            gap: "30px",
          }}
        >
          <div>
            <h3 style={tituloBeneficio}>Material em PDF</h3>
            <p style={textoBeneficio}>
              Acesse o conteúdo do curso pela plataforma após a liberação da
              matrícula.
            </p>
          </div>

          <div>
            <h3 style={tituloBeneficio}>Avaliação online</h3>
            <p style={textoBeneficio}>
              Responda às questões e acompanhe o resultado pela Área do Aluno.
            </p>
          </div>

          <div>
            <h3 style={tituloBeneficio}>Certificado digital</h3>
            <p style={textoBeneficio}>
              Certificado disponível após a conclusão e aprovação no curso.
            </p>
          </div>

          <div>
            <h3 style={tituloBeneficio}>Suporte ao aluno</h3>
            <p style={textoBeneficio}>
              Atendimento para auxiliar o aluno durante sua capacitação.
            </p>
          </div>
        </div>
      </section>

      <section
        id="certificados"
        style={{
          backgroundColor: "#ffffff",
          padding: "75px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={tituloSecao}>Certificação profissional</h2>

        <p style={descricaoSecao}>
          Após concluir o material e ser aprovado na avaliação, o aluno poderá
          emitir seu certificado digital diretamente pela plataforma.
        </p>

        <button
          type="button"
          style={{
            marginTop: "28px",
            backgroundColor: "#111111",
            color: "#ffffff",
            border: "none",
            padding: "15px 27px",
            borderRadius: "9px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Validar certificado
        </button>
      </section>

      <footer
        id="contato"
        style={{
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "55px 20px 25px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "35px",
          }}
        >
          <div>
            <h3 style={tituloRodape}>Digital Consultoria</h3>

            <p style={textoRodape}>
              Cursos, treinamentos, avaliações e certificação profissional.
            </p>

            <div
              style={{
                marginTop: "22px",
                paddingTop: "17px",
                borderTop: "1px solid #2d2d2d",
              }}
            >
              <p style={rotuloRodape}>Responsável</p>
              <p style={informacaoRodape}>Prof. Aldemir Amaral</p>
            </div>
          </div>

          <div>
            <h3 style={tituloRodape}>Empresa</h3>

            <div style={itemRodape}>
              <p style={rotuloRodape}>CNPJ</p>
              <p style={informacaoRodape}>04.432.314/0001-14</p>
            </div>

            <div style={itemRodape}>
              <p style={rotuloRodape}>Endereço</p>
              <p style={informacaoRodape}>
                Rua Xavier de Mendonça, 77 — Aparecida
              </p>
              <p style={informacaoRodape}>Manaus — Amazonas</p>
            </div>
          </div>

          <div>
            <h3 style={tituloRodape}>Contato</h3>

            <div style={itemRodape}>
              <p style={rotuloRodape}>WhatsApp</p>

              <a
                href="https://wa.me/5592991168247"
                target="_blank"
                rel="noopener noreferrer"
                style={linkRodape}
              >
                (92) 99116-8247
              </a>
            </div>

            <div style={itemRodape}>
              <p style={rotuloRodape}>E-mail</p>

              <a
                href="mailto:prof.aldemir1964@gmail.com"
                style={linkRodape}
              >
                prof.aldemir1964@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 style={tituloRodape}>Acesso rápido</h3>

            <a href="#cursos" style={linkMenuRodape}>
              Cursos
            </a>

            <a href="#certificados" style={linkMenuRodape}>
              Certificados
            </a>

            <Link href="/login" style={linkMenuRodape}>
              Área do aluno
            </Link>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1100px",
            margin: "43px auto 0",
            paddingTop: "23px",
            borderTop: "1px solid #333333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#999999",
              margin: 0,
              lineHeight: "1.6",
            }}
          >
            © 2026 Digital Consultoria e Serviços Técnicos LTDA
          </p>

          <Link
            href="/admin-login"
            title="Acesso administrativo"
            aria-label="Acesso administrativo"
            style={{
              color: "#555555",
              textDecoration: "none",
              fontSize: "15px",
              opacity: 0.7,
            }}
          >
            🔒
          </Link>
        </div>
      </footer>
    </main>
  );
}

const estiloLink = {
  color: "#111111",
  textDecoration: "none",
  fontWeight: "bold",
};

const destaqueNumero = {
  display: "block",
  color: "#111111",
  fontSize: "30px",
};

const textoDestaque = {
  color: "#666666",
  margin: "8px 0 0",
};

const subtituloSecao = {
  color: "#666666",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  marginBottom: "8px",
};

const tituloSecao = {
  color: "#111111",
  fontSize: "clamp(32px, 5vw, 42px)",
  margin: "8px 0 14px",
};

const descricaoSecao = {
  maxWidth: "720px",
  margin: "0 auto",
  color: "#666666",
  fontSize: "18px",
  lineHeight: "1.7",
};

const tituloBeneficio = {
  fontSize: "22px",
  marginBottom: "10px",
};

const textoBeneficio = {
  color: "#d4d4d4",
  lineHeight: "1.7",
};

const tituloRodape = {
  fontSize: "21px",
  marginTop: 0,
  marginBottom: "16px",
};

const textoRodape = {
  color: "#bdbdbd",
  lineHeight: "1.7",
  margin: 0,
};

const itemRodape = {
  marginBottom: "21px",
};

const rotuloRodape = {
  color: "#777777",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "1.4px",
  margin: "0 0 7px",
};

const informacaoRodape = {
  color: "#d4d4d4",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: 0,
};

const linkRodape = {
  color: "#d4d4d4",
  fontSize: "15px",
  lineHeight: "1.6",
  textDecoration: "none",
  wordBreak: "break-word" as const,
};

const linkMenuRodape = {
  display: "block",
  color: "#bdbdbd",
  lineHeight: "1.6",
  textDecoration: "none",
  marginBottom: "12px",
};