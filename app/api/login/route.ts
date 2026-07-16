import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json(
        { mensagem: "Informe o e-mail e a senha." },
        { status: 400 }
      );
    }

    const aluno = await prisma.aluno.findUnique({
      where: {
        email: String(email).trim().toLowerCase(),
      },
    });

    if (!aluno) {
      return NextResponse.json(
        { mensagem: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const senhaCorreta = await bcrypt.compare(
      String(senha),
      aluno.senha
    );

    if (!senhaCorreta) {
      return NextResponse.json(
        { mensagem: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        mensagem: "Login realizado com sucesso!",
        aluno: {
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);

    const detalhe =
      error instanceof Error
        ? error.message
        : "Erro desconhecido no servidor.";

    return NextResponse.json(
      {
        mensagem: "Erro interno do servidor.",
        detalhe,
      },
      { status: 500 }
    );
  }
}