"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cursos } from "../../data/cursos";

const opcoes = [
  {
    titulo: "Cursos",
    descricao: "Consultar e organizar os cursos da plataforma.",
    simbolo: "📚",
    href: "/admin/cursos",
    ativo: true,
  },
  {
    titulo: "Alunos",
    descricao: "Ver os alunos cadastrados e suas informações.",
    simbolo: "👥",
    href: "",
    ativo: false,
  },
  {
    titulo: "Pagamentos",
    descricao: "Acompanhar compras, pagamentos e matrículas.",
    simbolo: "💳",
    href: "",
    ativo: false,
  },
  {
    titulo: "Apostilas",
    descricao: "Adicionar e organizar os materiais em PDF.",
    simbolo: "📄",
    href: "",
    ativo: false,
  },
  {
    titulo: "Avaliações",
    descricao: "Criar provas, perguntas e notas mínimas.",
    simbolo: "📝",
    href: "",
    ativo: false,
  },
  {
    titulo: "Certificados",
    descricao: "Emitir, consultar e validar certificados.",
    simbolo: "🏆",
    href: "",
    ativo: false,
  },
  {
    titulo: "Relatórios",
    descricao: "Consultar números e resultados da plataforma.",
    simbolo: "📊",
    href: "",
    ativo: false,
  },
];

export default function Admin() {
  const router = useRouter();

  function sair() {
    localStorage.removeItem("admin");
    router.push("/");
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
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
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
              color: "#ffffff",
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
                backgroundColor: "#ffffff",
                borderRadius: "10px",
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
                Painel Administrativo
              </strong>

              <span
                style={{
                  color: "#bdbdbd",
                  fontSize: "13px",
                }}
              >
                Digital Consultoria e Serviços Técnicos LTDA
              </span>
            </div>
          </Link>

          <button
            onClick={sair}
            style={{
              backgroundColor: "#ffffff",
              color: "#111111",
              border: "none",
              padding: "11px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sair do painel
          </button>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "45px 20px 70px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #050505 0%, #171717 55%, #333333 100%)",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "38px",
          }}
        >
          <p
            style={{
              color: "#bdbdbd",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            Administração da plataforma
          </p>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 50px)",
              margin: "12px 0",
            }}
          >
            Olá, Administrador 👋
          </h1>

          <p
            style={{
              color: "#d4d4d4",
              fontSize: "18px",
              lineHeight: "1.6",
              marginBottom: 0,
            }}
          >
            Aqui você poderá cuidar dos cursos, alunos, pagamentos, materiais,
            avaliações e certificados.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cartaoResumo}>
            <strong style={numeroResumo}>{cursos.length}</strong>
            <span style={textoResumo}>Cursos cadastrados</span>
          </div>

          <div style={cartaoResumo}>
            <strong style={numeroResumo}>1</strong>
            <span style={textoResumo}>Aluno cadastrado</span>
          </div>

          <div style={cartaoResumo}>
            <strong style={numeroResumo}>0</strong>
            <span style={textoResumo}>Vendas realizadas</span>
          </div>

          <div style={cartaoResumo}>
            <strong style={numeroResumo}>0</strong>
            <span style={textoResumo}>Certificados emitidos</span>
          </div>
        </div>

        <h2
          style={{
            fontSize: "30px",
            marginTop: "48px",
            marginBottom: "22px",
          }}
        >
          O que você deseja fazer?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "22px",
          }}
        >
          {opcoes.map((opcao) =>
            opcao.ativo ? (
              <Link
                key={opcao.titulo}
                href={opcao.href}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e2e2",
                  borderRadius: "15px",
                  padding: "26px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "36px",
                    marginBottom: "15px",
                  }}
                >
                  {opcao.simbolo}
                </span>

                <strong
                  style={{
                    display: "block",
                    color: "#111111",
                    fontSize: "21px",
                    marginBottom: "9px",
                  }}
                >
                  {opcao.titulo}
                </strong>

                <span
                  style={{
                    display: "block",
                    color: "#666666",
                    lineHeight: "1.6",
                  }}
                >
                  {opcao.descricao}
                </span>

                <span
                  style={{
                    display: "inline-block",
                    color: "#111111",
                    fontWeight: "bold",
                    marginTop: "18px",
                  }}
                >
                  Abrir →
                </span>
              </Link>
            ) : (
              <div
                key={opcao.titulo}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e2e2",
                  borderRadius: "15px",
                  padding: "26px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
                  opacity: 0.65,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "36px",
                    marginBottom: "15px",
                  }}
                >
                  {opcao.simbolo}
                </span>

                <strong
                  style={{
                    display: "block",
                    fontSize: "21px",
                    marginBottom: "9px",
                  }}
                >
                  {opcao.titulo}
                </strong>

                <span
                  style={{
                    display: "block",
                    color: "#666666",
                    lineHeight: "1.6",
                  }}
                >
                  {opcao.descricao}
                </span>

                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#eeeeee",
                    color: "#666666",
                    padding: "6px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "18px",
                  }}
                >
                  Em breve
                </span>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

const cartaoResumo = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "25px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
};

const numeroResumo = {
  display: "block",
  color: "#111111",
  fontSize: "34px",
  marginBottom: "8px",
};

const textoResumo = {
  color: "#666666",
  lineHeight: "1.5",
};