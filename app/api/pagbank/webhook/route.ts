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
      console.error(
        "PAGBANK_TOKEN não configurado no servidor."
      );

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
    )
      .trim()
      .toUpperCase();

    const referencia = String(
      notificacao.reference_id ||
        cobranca?.reference_id ||
        ""
    ).trim();

    const pagamentoId = String(
      notificacao.id || cobranca?.id || ""
    ).trim();

    console.log("Notificação PagBank recebida:", {
      notificacaoId: notificacao.id,
      cobrancaId: cobranca?.id,
      referencia,
      pagamentoId,
      status,
    });

    const { prisma } = await import(
      "../../../../lib/prisma"
    );

    let matriculaId: number | null = null;

    const resultadoReferencia = referencia.match(
      /^matricula-(\d+)-/
    );

    if (resultadoReferencia) {
      const idEncontrado = Number(resultadoReferencia[1]);

      if (
        Number.isInteger(idEncontrado) &&
        idEncontrado > 0
      ) {
        matriculaId = idEncontrado;
      }
    }

    let matricula = matriculaId
      ? await prisma.matricula.findUnique({
          where: {
            id: matriculaId,
          },
        })
      : null;

    if (!matricula && pagamentoId) {
      matricula = await prisma.matricula.findFirst({
        where: {
          pagamentoId,
        },
      });
    }

    if (!matricula && notificacao.id) {
      matricula = await prisma.matricula.findFirst({
        where: {
          pagamentoId: notificacao.id,
        },
      });
    }

    if (!matricula) {
      console.log(
        "Notificação ignorada: matrícula não encontrada."
      );

      return Response.json({
        recebido: true,
        ignorado: true,
        motivo: "Matrícula não encontrada.",
        referencia,
        status,
      });
    }

    if (status === "PAID") {
      const matriculaLiberada =
        await prisma.matricula.update({
          where: {
            id: matricula.id,
          },
          data: {
            status: "LIBERADO",
            liberadoEm:
              matricula.liberadoEm || new Date(),
          },
        });

      console.log(
        `Matrícula ${matricula.id} liberada automaticamente.`
      );

      return Response.json({
        recebido: true,
        liberado: true,
        matriculaId: matriculaLiberada.id,
        status,
      });
    }

    if (
      status === "DECLINED" ||
      status === "CANCELED"
    ) {
      await prisma.matricula.update({
        where: {
          id: matricula.id,
        },
        data: {
          status: "PENDENTE",
        },
      });
    }

    console.log(
      `Matrícula ${matricula.id} não liberada. Status recebido: ${status}`
    );

    return Response.json({
      recebido: true,
      liberado: false,
      matriculaId: matricula.id,
      status,
    });
  } catch (erro) {
    console.error(
      "Erro ao processar webhook do PagBank:",
      erro
    );

    const detalhe =
      erro instanceof Error
        ? erro.message
        : "Erro desconhecido.";

    return Response.json(
      {
        erro: "Não foi possível processar a notificação.",
        detalhe,
      },
      {
        status: 500,
      }
    );
  }
}