import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const arquivosApostilas: Record<string, string> = {
  nr01: "nr01.pdf",
  nr05: "nr05.pdf",
  nr06: "nr06.pdf",
  nr10: "nr10.pdf",
  nr35: "nr35.pdf",
  "primeiros-socorros": "primeiros-socorros.pdf",
};

type ContextoRota = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  contexto: ContextoRota
) {
  try {
    const { id } = await contexto.params;

    const compraId = Number(id);

    const url = new URL(request.url);

    const email = String(
      url.searchParams.get("email") || ""
    )
      .trim()
      .toLowerCase();

    if (
      !Number.isInteger(compraId) ||
      compraId <= 0
    ) {
      return Response.json(
        {
          erro: "Identificação da compra inválida.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email || !email.includes("@")) {
      return Response.json(
        {
          erro: "Informe um e-mail válido.",
        },
        {
          status: 400,
        }
      );
    }

    const compra =
      await prisma.compraApostila.findUnique({
        where: {
          id: compraId,
        },
      });

    if (!compra) {
      return Response.json(
        {
          erro: "Compra não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      compra.emailComprador
        .trim()
        .toLowerCase() !== email
    ) {
      return Response.json(
        {
          erro:
            "Este e-mail não pertence a esta compra.",
        },
        {
          status: 403,
        }
      );
    }

    if (compra.status !== "LIBERADO") {
      return Response.json(
        {
          erro:
            "O pagamento desta apostila ainda não foi confirmado.",
        },
        {
          status: 403,
        }
      );
    }

    const nomeArquivo =
      arquivosApostilas[compra.apostilaSlug];

    if (!nomeArquivo) {
      return Response.json(
        {
          erro:
            "O arquivo desta apostila não foi configurado.",
        },
        {
          status: 404,
        }
      );
    }

    const caminhoArquivo = path.join(
      process.cwd(),
      "public",
      "apostilas",
      nomeArquivo
    );

    let arquivo: Buffer;

    try {
      arquivo = await readFile(caminhoArquivo);
    } catch (erro) {
      console.error(
        "PDF da apostila não encontrado:",
        caminhoArquivo,
        erro
      );

      return Response.json(
        {
          erro:
            "O arquivo PDF desta apostila ainda não foi enviado.",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(new Uint8Array(arquivo), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `attachment; filename="${nomeArquivo}"`,
        "Content-Length":
          arquivo.length.toString(),
        "Cache-Control":
          "private, no-store, max-age=0",
      },
    });
  } catch (erro) {
    console.error(
      "Erro ao baixar apostila:",
      erro
    );

    return Response.json(
      {
        erro:
          "Não foi possível baixar a apostila.",
      },
      {
        status: 500,
      }
    );
  }
}