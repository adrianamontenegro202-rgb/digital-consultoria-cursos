import { prisma } from "../../../lib/prisma";
import { cursos } from "../../../data/cursos";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const alunoId = Number(url.searchParams.get("alunoId"));

    if (!Number.isInteger(alunoId) || alunoId <= 0) {
      return Response.json(
        { erro: "O ID do aluno é inválido." },
        { status: 400 }
      );
    }

    const matriculas = await prisma.matricula.findMany({
      where: {
        alunoId,
        status: "LIBERADO",
      },
      select: {
        id: true,
        cursoSlug: true,
        status: true,
        notaFinal: true,
        criadoEm: true,
        liberadoEm: true,
        concluidoEm: true,
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    return Response.json({ matriculas });
  } catch (erro) {
    console.error("Erro ao buscar matrículas:", erro);

    return Response.json(
      { erro: "Não foi possível buscar os cursos do aluno." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const dados = await request.json();

    const alunoId = Number(dados.alunoId);
    const cursoSlug = String(dados.cursoSlug || "").trim();

    if (!Number.isInteger(alunoId) || alunoId <= 0) {
      return Response.json(
        { erro: "O ID do aluno é inválido." },
        { status: 400 }
      );
    }

    const cursoExiste = cursos.some(
      (curso) => curso.slug === cursoSlug
    );

    if (!cursoExiste) {
      return Response.json(
        { erro: "O curso informado não existe." },
        { status: 404 }
      );
    }

    const alunoExiste = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
      },
      select: {
        id: true,
      },
    });

    if (!alunoExiste) {
      return Response.json(
        { erro: "Aluno não encontrado." },
        { status: 404 }
      );
    }

    const matriculaExistente =
      await prisma.matricula.findUnique({
        where: {
          alunoId_cursoSlug: {
            alunoId,
            cursoSlug,
          },
        },
      });

    if (matriculaExistente) {
      return Response.json({
        mensagem: "Esta matrícula já existe.",
        matricula: matriculaExistente,
      });
    }

    const matricula = await prisma.matricula.create({
      data: {
        alunoId,
        cursoSlug,
        status: "PENDENTE",
      },
    });

    return Response.json(
      {
        mensagem: "Matrícula criada e aguardando pagamento.",
        matricula,
      },
      {
        status: 201,
      }
    );
  } catch (erro) {
    console.error("Erro ao criar matrícula:", erro);

    return Response.json(
      { erro: "Não foi possível iniciar a matrícula." },
      { status: 500 }
    );
  }
}