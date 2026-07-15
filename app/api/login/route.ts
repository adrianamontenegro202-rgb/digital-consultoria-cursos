import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    const aluno = await prisma.aluno.findUnique({
      where: {
        email,
      },
    });

    if (!aluno) {
      return NextResponse.json(
        { mensagem: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);

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
    console.error(error);

    return NextResponse.json(
      { mensagem: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}