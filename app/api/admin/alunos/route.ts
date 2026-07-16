import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const alunos = await prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
        _count: {
          select: {
            matriculas: true,
          },
        },
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    return Response.json({ alunos });
  } catch (erro) {
    console.error("Erro ao listar alunos:", erro);

    return Response.json(
      { erro: "Não foi possível carregar os alunos." },
      { status: 500 }
    );
  }
}