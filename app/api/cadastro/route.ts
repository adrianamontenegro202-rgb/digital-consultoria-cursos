import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { nome, cpf, telefone, email, senha } = await request.json();

    const senhaHash = await bcrypt.hash(senha, 10);

    const aluno = await prisma.aluno.create({
      data: {
        nome,
        cpf,
        telefone,
        email,
        senha: senhaHash,
      },
    });

    return NextResponse.json(
      {
        mensagem: "Aluno cadastrado com sucesso!",
        aluno,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        mensagem: "Erro ao cadastrar aluno.",
      },
      { status: 500 }
    );
  }
}