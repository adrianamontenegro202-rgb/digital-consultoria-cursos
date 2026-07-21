import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const email = String(
      searchParams.get("email") || ""
    )
      .trim()
      .toLowerCase();

    if (!email) {
      return Response.json(
        {
          erro: "Informe o e-mail usado na compra.",
        },
        {
          status: 400,
        }
      );
    }

    const apostilas =
      await prisma.compraApostila.findMany({
        where: {
          emailComprador: {
            equals: email,
            mode: "insensitive",
          },
          status: "LIBERADO",
        },
        select: {
          id: true,
          apostilaSlug: true,
          status: true,
          liberadoEm: true,
        },
        orderBy: {
          liberadoEm: "desc",
        },
      });

    return Response.json({
      apostilas,
    });
  } catch (erro) {
    console.error(
      "Erro ao buscar apostilas compradas:",
      erro
    );

    return Response.json(
      {
        erro:
          "Não foi possível buscar as apostilas.",
      },
      {
        status: 500,
      }
    );
  }
}