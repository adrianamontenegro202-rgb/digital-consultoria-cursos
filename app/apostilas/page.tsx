import Link from "next/link";

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

export default function PaginaApostilas() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f3f7",
        color: "#111111",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #ece7f0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "18px 20px",
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
              textDecoration: "none",
              color: "#111111",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            DIGITAL
          </Link>

          <nav
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={linkMenu}>
              Início
            </Link>

            <Link href="/#cursos" style={linkMenu}>
              Cursos
            </Link>

            <Link href="/apostilas" style={linkMenu}>
              Apostilas
            </Link>

            <Link href="/aluno" style={linkMenu}>
              Área do Aluno
            </Link>
          </nav>
        </div>
      </header>

      <section
        style={{
          background:
            "linear-gradient(135deg, #120b17 0%, #281035 55%, #4c1675 100%)",
          color: "#ffffff",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#d8b4fe",
              fontSize: "13px",
              fontWeight: "bold",
              letterSpacing: "3px",
              margin: "0 0 12px",
            }}
          >
            MATERIAIS DIGITAIS
          </p>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 64px)",
              margin: "0 0 16px",
            }}
          >
            Apostilas Profissionais
          </h1>

          <p
            style={{
              maxWidth: "720px",
              color: "#e5e7eb",
              fontSize: "19px",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            Materiais completos em PDF para estudo, capacitação e
            atualização profissional.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 20px 90px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "24px",
          }}
        >
          {apostilas.map((apostila) => (
            <article
              key={apostila.slug}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow:
                  "0 12px 35px rgba(48, 20, 68, 0.10)",
                border: "1px solid #eee7f3",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #6b21a8, #9333ea)",
                  padding: "28px",
                  color: "#ffffff",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor:
                      "rgba(255,255,255,0.16)",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "18px",
                  }}
                >
                  {apostila.categoria}
                </span>

                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "12px",
                  }}
                >
                  📘
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                  }}
                >
                  {apostila.nome}
                </h2>
              </div>

              <div
                style={{
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.7",
                    margin: "0 0 24px",
                    flex: 1,
                  }}
                >
                  {apostila.descricao}
                </p>

                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      color: "#6b7280",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Valor
                  </span>

                  <strong
                    style={{
                      fontSize: "32px",
                      color: "#111111",
                    }}
                  >
                    {apostila.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>

                <Link
                  href={`/apostilas/${apostila.slug}`}
                  style={{
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    textDecoration: "none",
                    textAlign: "center",
                    padding: "15px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Comprar apostila
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const linkMenu = {
  color: "#111111",
  textDecoration: "none",
  fontWeight: "bold",
};