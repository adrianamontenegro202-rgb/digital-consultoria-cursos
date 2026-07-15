"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.mensagem || "E-mail ou senha inválidos.");
        return;
      }

      localStorage.setItem("aluno", JSON.stringify(dados.aluno));

      setMensagem("Login realizado com sucesso!");

      setTimeout(() => {
        router.push("/aluno");
      }, 800);
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050505 0%, #171717 55%, #2c2c2c 100%)",
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
          maxWidth: "430px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <Image
            src="/logo.jpg"
            alt="Logo Digital Consultoria"
            width={190}
            height={190}
            priority
            style={{
              width: "190px",
              height: "auto",
              objectFit: "contain",
            }}
          />

          <h1
            style={{
              color: "#111111",
              fontSize: "30px",
              margin: "15px 0 8px",
            }}
          >
            Área do Aluno
          </h1>

          <p
            style={{
              color: "#666666",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            Entre com seu e-mail e senha.
          </p>
        </div>

        <form onSubmit={entrar}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              color: "#222222",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              border: "1px solid #cccccc",
              borderRadius: "9px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label
            htmlFor="senha"
            style={{
              display: "block",
              color: "#222222",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Senha
          </label>

          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              border: "1px solid #cccccc",
              borderRadius: "9px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          {mensagem && (
            <p
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor:
                  mensagem === "Login realizado com sucesso!"
                    ? "#dcfce7"
                    : "#fee2e2",
                color:
                  mensagem === "Login realizado com sucesso!"
                    ? "#166534"
                    : "#991b1b",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            style={{
              width: "100%",
              backgroundColor: carregando ? "#555555" : "#111111",
              color: "#ffffff",
              border: "none",
              padding: "15px",
              borderRadius: "9px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: carregando ? "not-allowed" : "pointer",
            }}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#666666",
            marginTop: "24px",
          }}
        >
          Ainda não possui uma conta?
        </p>

        <Link
          href="/cadastro"
          style={{
            display: "block",
            textAlign: "center",
            color: "#111111",
            border: "1px solid #111111",
            padding: "14px",
            borderRadius: "9px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Criar conta
        </Link>
      </section>
    </main>
  );
}