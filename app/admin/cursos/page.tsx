import Link from "next/link";
import { cursos } from "../../../data/cursos";

function formatarPreco(preco: number) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AdministrarCursos() {
  const categorias = Array.from(
    new Set(cursos.map((curso) => curso.categoria))
  );

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
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "22px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                color: "#bdbdbd",
                margin: "0 0 6px",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Painel Administrativo
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
              Cursos da Digital
            </h1>
          </div>

          <Link
            href="/admin"
            style={{
              backgroundColor: "#ffffff",
              color: "#111111",
              padding: "12px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ← Voltar ao painel
          </Link>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "45px 20px 70px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #171717 55%, #303030 100%)",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "35px",
          }}
        >
          <p
            style={{
              color: "#cccccc",
              margin: 0,
            }}
          >
            Catálogo oficial da plataforma
          </p>

          <h2
            style={{
              fontSize: "40px",
              margin: "10px 0",
            }}
          >
            {cursos.length} cursos cadastrados
          </h2>

          <p
            style={{
              color: "#d4d4d4",
              lineHeight: "1.6",
              marginBottom: 0,
            }}
          >
            Consulte os nomes, categorias e preços dos cursos oferecidos pela
            Digital Consultoria.
          </p>
        </div>

        <div
          style={{
            marginTop: "28px",
            backgroundColor: "#fff7ed",
            border: "1px solid #fed7aa",
            color: "#9a3412",
            borderRadius: "12px",
            padding: "18px",
            lineHeight: "1.6",
          }}
        >
          Nesta primeira versão, os cursos podem ser consultados. Depois
          colocaremos os botões para cadastrar, editar e excluir pelo painel.
        </div>

        {categorias.map((categoria) => {
          const cursosDaCategoria = cursos.filter(
            (curso) => curso.categoria === categoria
          );

          return (
            <section
              key={categoria}
              style={{
                marginTop: "45px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  borderBottom: "1px solid #d5d5d5",
                  paddingBottom: "14px",
                  marginBottom: "22px",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                  }}
                >
                  {categoria}
                </h2>

                <span
                  style={{
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    padding: "7px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  {cursosDaCategoria.length}{" "}
                  {cursosDaCategoria.length === 1 ? "curso" : "cursos"}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                }}
              >
                {cursosDaCategoria.map((curso) => (
                  <article
                    key={curso.slug}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "14px",
                      padding: "24px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "#eeeeee",
                        color: "#444444",
                        borderRadius: "20px",
                        padding: "6px 11px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {curso.categoria}
                    </span>

                    <h3
                      style={{
                        fontSize: "23px",
                        margin: "18px 0 10px",
                        minHeight: "55px",
                      }}
                    >
                      {curso.nome}
                    </h3>

                    <p
                      style={{
                        color: "#111111",
                        fontSize: "25px",
                        fontWeight: "bold",
                        margin: "15px 0 22px",
                      }}
                    >
                      {formatarPreco(curso.preco)}
                    </p>

                    <Link
                      href={`/cursos/${curso.slug}`}
                      target="_blank"
                      style={{
                        display: "block",
                        backgroundColor: "#111111",
                        color: "#ffffff",
                        padding: "12px",
                        borderRadius: "8px",
                        textAlign: "center",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Visualizar no site
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}