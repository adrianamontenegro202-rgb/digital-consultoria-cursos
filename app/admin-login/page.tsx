"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginAdmin() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario === "admin" && senha === "123456") {
      localStorage.setItem("admin", "logado");
      router.push("/admin");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={140}
            height={140}
          />

          <h1>Painel Administrativo</h1>

          <p>Digital Consultoria e Serviços Técnicos LTDA</p>
        </div>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={entrar}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "17px",
          }}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}