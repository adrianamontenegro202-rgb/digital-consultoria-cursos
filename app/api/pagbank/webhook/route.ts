import { createHash, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CobrancaPagBank = {
  id?: string;
  reference_id?: string;
  status?: string;
};

type NotificacaoPagBank = {
  id?: string;
  reference_id?: string;
  status?: string;
  charges?: CobrancaPagBank[];
};

function assinaturasIguais(
  assinaturaRecebida: string,
  assinaturaCalculada: string
) {
  try {
    const recebida = Buffer.from(
      assinaturaRecebida.trim().toLowerCase(),
      "utf8"
    );

    const calculada = Buffer.from(
      assinaturaCalculada.trim().toLowerCase(),
      "utf8"
    );

    if (recebida.length !== calculada.length) {
      return false;
    }

    return timingSafeEqual(recebida, calculada);
  } catch {
    return false;
  }
}

export async function GET() {
  return Response.json({
    funcionando: true,
    mensagem: "Webhook do PagBank disponível.",
  });
}

export async function POST(request: Request) {
  try {
    const token = process.env.PAGBANK_TOKEN;

    if (!token) {
      console.error("PAGBANK_TOKEN não configurado no Netlify.");

      return Response.json(
        {
          erro: "Configuração do PagBank incompleta.",
        },
        {
          status: 500,
        }
      );
    }

    const assinaturaRecebida =
      request.headers.get("x-authenticity-token");

    if (!assinaturaRecebida) {
      console.error(
        "Notificação recebida sem x-authenticity-token."
      );

      return Response.json(
        {
          erro: "Assinatura da notificação não encontrada.",
        },
        {
          status: 401,
        }
      );
    }

    const corpoOriginal = await request.text();

    const assinaturaCalculada = createHash("sha256")
      .update(`${token}-${corpoOriginal}`)
      .digest("hex");

    if (
      !assinaturasIguais(
        assinaturaRecebida,
        assinaturaCalculada
      )
    ) {
      console.error(
        "Notificação do PagBank com assinatura inválida."
      );

      return Response.json(
        {
          erro: "Notificação não autorizada.",
        },
        {
          status: 401,
        }
      );
    }

    let notificacao: NotificacaoPagBank;

    try {
      notificacao = JSON.parse(corpoOriginal);
    } catch {
      return Response.json(
        {
          erro: "Conteúdo da notificação inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const cobranca = notificacao.charges?.[0];

    const status = String(
      cobranca?.status || notificacao.status || ""
    ).toUpperCase();

    const referencia = String(
      notificacao.reference_id ||
        cobranca?.reference_id ||
        ""
    );

    console.log("Notificação PagBank recebida:", {
      notificacaoId: notificacao.id,
      cobrancaId: cobranca?.id,
      referencia,
      status,
    });

    const resultadoReferencia = referencia.match(
      /^matricula-(\d+)-/
    );

    if (!resultadoReferencia) {
      console.log(
        "Notificação ignorada: referência da matrícula não encontrada."
      );

      return Response.json({
        recebido: true,
        ignorado: true,
        motivo: "Referência da matrícula não encontrada.",
      });
    }

    const matriculaId = Number(resultadoReferencia[1]);

    if (
      !Number.isInteger(matriculaId) ||
      matriculaId <= 0
    ) {
      return Response.json({
        recebido: true,
        ignorado: true,
        motivo: "ID da matrícula inválido.",
      });
    }

    /*
      O Prisma é carregado somente aqui.
      Assim, abrir o GET do webhook não depende do banco.
    */
    const { prisma } = await import(
      "../../../../lib/prisma"
    );

    const matricula = await prisma.matricula.findUnique({
      where: {
        id: matriculaId,
      },
    });

    if (!matricula) {
      console.log(
        `Matrícula ${matriculaId} não encontrada.`
      );

      return Response.json({
        recebido: true,
        ignorado: true,
        motivo: "Matrícula não encontrada.",
      });
    }

    if (status === "PAID") {
      const matriculaLiberada =
        await prisma.matricula.update({
          where: {
            id: matriculaId,
          },
          data: {
            status: "LIBERADO",
            liberadoEm:
              matricula.liberadoEm || new Date(),
          },
        });

      console.log(
        `Matrícula ${matriculaId} liberada automaticamente.`
      );

      return Response.json({
        recebido: true,
        liberado: true,
        matriculaId: matriculaLiberada.id,
      });
    }

    console.log(
      `Matrícula ${matriculaId} não liberada. Status recebido: ${status}`
    );

    return Response.json({
      recebido: true,
      liberado: false,
      matriculaId,
      status,
    });
  } catch (erro) {
    console.error(
      "Erro ao processar webhook do PagBank:",
      erro
    );

    return Response.json(
      {
        erro: "Não foi possível processar a notificação.",
      },
      {
        status: 500,
      }
    );
  }
}