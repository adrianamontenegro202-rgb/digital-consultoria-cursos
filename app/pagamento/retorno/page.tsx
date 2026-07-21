"use client";

import Image from "next/image";
import Link from "next/link";

export default function RetornoPagamento() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050505 0%, #171717 55%, #303030 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "38px",
          textAlign: "center",
          boxShadow: "0 20px 55px rgba(0,0,0,0.35)",
        }}
      >
        <Image
          src="/logo.jpg"
          alt="Logo Digital Consultoria"
          width={170}
          height={170}
          priority
          style={{
            width: "170px",
            height: "auto",
            objectFit: "contain",
          }}
        />

        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "20px auto",
            borderRadius: "50%",
            backgroundColor: "#fef3c7",
            color: "#92400e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          ⏳
        </div>

        <h1
          style={{
            color: "#111111",
            fontSize: "32px",
            margin: "10px 0",
          }}
        >
          Pagamento em análise
        </h1>

        <p
          style={{
            color: "#666666",
            fontSize: "17px",
            lineHeight: "1.7",
          }}
        >
          Seu pedido foi iniciado, mas o acesso ainda não significa que o
          pagamento foi aprovado.
        </p>

        <p
          style={{
            color: "#666666",
            fontSize: "17px",
            lineHeight: "1.7",
          }}
        >
          O curso ou a apostila será liberado somente depois que o PagBank
          confirmar o pagamento.
        </p>

        <div
          style={{
            marginTop: "25px",
            padding: "17px",
            backgroundColor: "#f3f4f6",
            borderRadius: "10px",
            color: "#555555",
            lineHeight: "1.6",
          }}
        >
          Pix costuma ser confirmado rapidamente. Cartões, boletos e outros
          meios podem levar mais tempo para análise ou compensação.
        </div>

        <Link
          href="/aluno"
          style={{
            display: "block",
            marginTop: "27px",
            backgroundColor: "#111111",
            color: "#ffffff",
            padding: "15px",
            borderRadius: "9px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Verificar Área do Aluno
        </Link>

        <Link
          href="/"
          style={{
            display: "block",
            marginTop: "13px",
            color: "#555555",
            padding: "12px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Voltar para a página inicial
        </Link>
      </section>
    </main>
  );
}