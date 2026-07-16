"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Aluno = {
  id: number;
  nome: string;
  email: string;
  criadoEm: string;
  _count: {
    matriculas: number;
  };
};

export default function AdminAlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const resposta = await fetch("/api/admin/alunos", {
          cache: "no-store",
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.erro || "Não foi possível carregar os alunos.");
        }

        setAlunos(dados.alunos);
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar os alunos."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarAlunos();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "35px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#111111",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/admin"
          style={{
            color: "#111111",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          ← Voltar ao painel
        </Link>

        <div
          style={{
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
              marginBottom: "8px",
            }}
          >
            Alunos cadastrados
          </h1>

          <p
            style={{
              color: "#666666",
              margin: 0,
            }}
          >
            Consulte os alunos registrados na plataforma.
          </p>
        </div>

        {carregando && <p>Carregando alunos...</p>}

        {erro && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            {erro}
          </div>
        )}

        {!carregando && !erro && alunos.length === 0 && (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "30px",
              borderRadius: "14px",
              textAlign: "center",
            }}
          >
            Nenhum aluno cadastrado.
          </div>
        )}

        {!carregando && !erro && alunos.length > 0 && (
          <div
            style={{
              overflowX: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  <th style={celulaCabecalho}>ID</th>
                  <th style={celulaCabecalho}>Nome</th>
                  <th style={celulaCabecalho}>E-mail</th>
                  <th style={celulaCabecalho}>Matrículas</th>
                  <th style={celulaCabecalho}>Cadastro</th>
                </tr>
              </thead>

              <tbody>
                {alunos.map((aluno) => (
                  <tr
                    key={aluno.id}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <td style={celula}>{aluno.id}</td>
                    <td style={celula}>{aluno.nome}</td>
                    <td style={celula}>{aluno.email}</td>
                    <td style={celula}>{aluno._count.matriculas}</td>
                    <td style={celula}>
                      {new Date(aluno.criadoEm).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const celulaCabecalho = {
  padding: "16px",
  fontSize: "14px",
};

const celula = {
  padding: "16px",
  color: "#333333",
};