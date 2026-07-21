import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { alunoId, cursoSlug, nota } = body;

    if (!alunoId || !cursoSlug || nota === undefined) {
      return NextResponse.json(
        {
          erro: "Dados obrigatórios não informados.",
        },
        {
          status: 400,
        }
      );
    }

    const matricula = await prisma.matricula.findUnique({
      where: {
        alunoId_cursoSlug: {
          alunoId: Number(alunoId),
          cursoSlug,
        },
      },
    });

    if (!matricula) {
      return NextResponse.json(
        {
          erro: "Matrícula não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    const aprovado = Number(nota) >= 7;

    const atualizada = await prisma.matricula.update({
      where: {
        id: matricula.id,
      },
      data: {
        notaFinal: Number(nota),

        ...(aprovado && {
          concluidoEm: new Date(),
        }),
      },
    });

    return NextResponse.json({
      sucesso: true,
      aprovado,
      matricula: atualizada,
    });
  } catch (erro) {
    console.error(erro);

    return NextResponse.json(
      {
        erro: "Erro interno.",
      },
      {
        status: 500,
      }
    );
  }
}