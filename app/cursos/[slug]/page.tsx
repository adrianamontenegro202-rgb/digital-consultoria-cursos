import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cursos } from "../../../data/cursos";

function formatarPreco(preco: number) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default async function PaginaDoCurso({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const curso = cursos.find((item) => item.slug === slug);

  if (!curso) {
    notFound();
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
          padding: "16px 20px",
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

          <Link
            href="/login"
            style={{
              color: "#111111",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Área do aluno
          </Link>
        </div>
      </header>

      <section
        style={{
          background:
            "linear-gradient(135deg, #050505 0%, #171717 55%, #303030 100%)",
          color: "#ffffff",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#cccccc",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "bold",
                marginTop: 0,
              }}
            >
              {curso.categoria}
            </p>

            <h1
              style={{
                fontSize: "clamp(40px, 7vw, 65px)",
                margin: "15px 0",
              }}
            >
              {curso.nome}
            </h1>

            <p
              style={{
                color: "#d4d4d4",
                fontSize: "19px",
                lineHeight: "1.7",
              }}
            >
              Capacitação profissional com material didático em PDF,
              avaliação online e certificado digital.
            </p>
          </div>

          <aside
            style={{
              backgroundColor: "#ffffff",
              color: "#111111",
              padding: "32px",
              borderRadius: "17px",
              boxShadow: "0 18px 45px rgba(0,0,0,0.3)",
            }}
          >
            <p
              style={{
                color: "#666666",
                marginTop: 0,
              }}
            >
              Valor do curso
            </p>

            <p
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                margin: "10px 0",
              }}
            >
              {formatarPreco(curso.preco)}
            </p>

            <p
              style={{
                color: "#666666",
                lineHeight: "1.6",
              }}
            >
              Material em PDF, avaliação e certificado digital.
            </p>

            <Link
              href={`/pagamento/${curso.slug}`}
              style={{
                display: "block",
                marginTop: "25px",
                backgroundColor: "#111111",
                color: "#ffffff",
                padding: "16px",
                borderRadius: "9px",
                textAlign: "center",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Comprar curso
            </Link>
          </aside>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          <div style={cartao}>
            <h2>📄 Material didático</h2>

            <p style={texto}>
              O aluno terá acesso à apostila em PDF depois que a matrícula for
              liberada.
            </p>
          </div>

          <div style={cartao}>
            <h2>📝 Avaliação</h2>

            <p style={texto}>
              Depois de estudar o conteúdo, o aluno poderá realizar uma
              avaliação online.
            </p>
          </div>

          <div style={cartao}>
            <h2>🏆 Certificado</h2>

            <p style={texto}>
              O certificado digital será liberado depois da conclusão e
              aprovação.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "35px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2>O curso inclui</h2>

          <ul
            style={{
              color: "#555555",
              lineHeight: "2.1",
              paddingLeft: "22px",
            }}
          >
            <li>Apostila digital em PDF</li>
            <li>Conteúdo profissional</li>
            <li>Avaliação online</li>
            <li>Resultado da avaliação</li>
            <li>Certificado digital após aprovação</li>
            <li>Acesso pela Área do Aluno</li>
          </ul>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <Link
            href="/#cursos"
            style={{
              color: "#111111",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            ← Voltar para todos os cursos
          </Link>
        </div>
      </section>
    </main>
  );
}

const cartao = {
  backgroundColor: "#ffffff",
  padding: "27px",
  borderRadius: "15px",
  boxShadow: "0 7px 22px rgba(0,0,0,0.07)",
};

const texto = {
  color: "#555555",
  lineHeight: "1.7",
};