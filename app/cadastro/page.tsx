"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrarAluno(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf,
          telefone,
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.mensagem || "Não foi possível criar a conta.");
        return;
      }

      setMensagem("Conta criada com sucesso!");

      setNome("");
      setCpf("");
      setTelefone("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
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
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#ffffff",
          padding: "38px",
          borderRadius: "18px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          <Image
            src="/logo.jpg"
            alt="Logo Digital Consultoria"
            width={220}
            height={220}
            priority
            style={{
              width: "220px",
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
            Criar conta
          </h1>

          <p
            style={{
              color: "#666666",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            Preencha seus dados para acessar os cursos.
          </p>
        </div>

        <form onSubmit={cadastrarAluno}>
          <label htmlFor="nome" style={estiloLabel}>
            Nome completo
          </label>

          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
            style={estiloInput}
          />

          <label htmlFor="cpf" style={estiloLabel}>
            CPF
          </label>

          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
            style={estiloInput}
          />

          <label htmlFor="telefone" style={estiloLabel}>
            Telefone
          </label>

          <input
            id="telefone"
            type="tel"
            placeholder="(92) 99999-9999"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            required
            style={estiloInput}
          />

          <label htmlFor="email" style={estiloLabel}>
            E-mail
          </label>

          <input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={estiloInput}
          />

          <label htmlFor="senha" style={estiloLabel}>
            Senha
          </label>

          <input
            id="senha"
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
            style={estiloInput}
          />

          <label htmlFor="confirmarSenha" style={estiloLabel}>
            Confirmar senha
          </label>

          <input
            id="confirmarSenha"
            type="password"
            placeholder="Digite novamente sua senha"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            required
            style={estiloInput}
          />

          {mensagem && (
            <p
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor:
                  mensagem === "Conta criada com sucesso!"
                    ? "#dcfce7"
                    : "#fee2e2",
                color:
                  mensagem === "Conta criada com sucesso!"
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
            {carregando ? "Criando conta..." : "Criar minha conta"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#666666",
            marginTop: "24px",
          }}
        >
          Já possui uma conta?
        </p>

        <Link
          href="/login"
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            backgroundColor: "#ffffff",
            color: "#111111",
            border: "1px solid #111111",
            padding: "14px",
            borderRadius: "9px",
            fontSize: "16px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Entrar na plataforma
        </Link>

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#555555",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </section>
    </main>
  );
}

const estiloLabel = {
  display: "block",
  color: "#222222",
  fontWeight: "bold",
  marginBottom: "8px",
};

const estiloInput = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "14px",
  marginBottom: "18px",
  border: "1px solid #cccccc",
  borderRadius: "9px",
  fontSize: "16px",
  outline: "none",
};