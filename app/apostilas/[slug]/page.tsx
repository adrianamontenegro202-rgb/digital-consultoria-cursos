import Link from "next/link";
import { notFound } from "next/navigation";

const apostilas = [
  {
    slug: "nr01",
    nome: "Apostila NR-01",
    categoria: "Segurança do Trabalho",
    preco: 29.9,
    descricao:
      "Material completo sobre gerenciamento de riscos ocupacionais e disposições gerais da NR-01.",
    arquivo: "/apostilas/nr01.pdf",
  },
  {
    slug: "nr05",
    nome: "Apostila NR-05",
    categoria: "Segurança do Trabalho",
    preco: 29.9,
    descricao:
      "Conteúdo atualizado sobre CIPA, prevenção de acidentes e organização interna.",
    arquivo: "/apostilas/nr05.pdf",
  },
  {
    slug: "nr06",
    nome: "Apostila NR-06",
    categoria: "Segurança do Trabalho",
    preco: 29.9,
    descricao:
      "Material didático sobre Equipamentos de Proteção Individual.",
    arquivo: "/apostilas/nr06.pdf",
  },
  {
    slug: "nr10",
    nome: "Apostila NR-10",
    categoria: "Elétrica",
    preco: 79.9,
    descricao:
      "Conteúdo completo de segurança em instalações e serviços em eletricidade.",
    arquivo: "/apostilas/nr10.pdf",
  },
  {
    slug: "nr35",
    nome: "Apostila NR-35",
    categoria: "Segurança do Trabalho",
    preco: 39.9,
    descricao:
      "Material voltado para segurança e prevenção em trabalhos em altura.",
    arquivo: "/apostilas/nr35.pdf",
  },
  {
    slug: "primeiros-socorros",
    nome: "Apostila de Primeiros Socorros",
    categoria: "Saúde",
    preco: 49.9,
    descricao:
      "Conteúdo prático para atendimento inicial em situações de emergência.",
    arquivo: "/apostilas/primeiros-socorros.pdf",
  },
];

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PaginaApostila({ params }: Props) {
  const { slug } = await params;

  const apostila = apostilas.find(
    (item) => item.slug === slug
  );

  if (!apostila) {
    notFound();
  }

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
              color: "#111111",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            DIGITAL
          </Link>

          <Link
            href="/apostilas"
            style={{
              color: "#6b21a8",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ← Voltar para apostilas
          </Link>
        </div>
      </header>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "70px 20px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#7e22ce",
              fontSize: "13px",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {apostila.categoria}
          </p>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 62px)",
              margin: "12px 0 20px",
            }}
          >
            {apostila.nome}
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "19px",
              lineHeight: "1.8",
              maxWidth: "650px",
            }}
          >
            {apostila.descricao}
          </p>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "30px",
            }}
          >
            <p style={{ margin: 0 }}>✓ Arquivo digital em PDF</p>
            <p style={{ margin: 0 }}>✓ Acesso após confirmação do pagamento</p>
            <p style={{ margin: 0 }}>✓ Material para estudo e capacitação</p>
            <p style={{ margin: 0 }}>✓ Sem prova e sem certificado</p>
          </div>
        </div>

        <aside
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "22px",
            boxShadow: "0 18px 45px rgba(48,20,68,0.14)",
            border: "1px solid #eee7f3",
          }}
        >
          <div
            style={{
              fontSize: "62px",
              marginBottom: "18px",
            }}
          >
            📘
          </div>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "6px",
            }}
          >
            Valor da apostila
          </p>

          <strong
            style={{
              display: "block",
              fontSize: "42px",
              marginBottom: "24px",
            }}
          >
            {apostila.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>

          <Link
            href={`/api/pagbank/apostila?slug=${apostila.slug}`}
            style={{
              display: "block",
              backgroundColor: "#111111",
              color: "#ffffff",
              textAlign: "center",
              textDecoration: "none",
              padding: "16px",
              borderRadius: "11px",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Comprar apostila
          </Link>

          <p
            style={{
              color: "#6b7280",
              fontSize: "13px",
              lineHeight: "1.6",
              marginTop: "18px",
              textAlign: "center",
            }}
          >
            O PDF será liberado depois da confirmação do pagamento.
          </p>
        </aside>
      </section>
    </main>
  );
}