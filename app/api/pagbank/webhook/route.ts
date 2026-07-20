import { createHash, timingSafeEqual } from "crypto";
import { prisma } from "../../../../lib/prisma";

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

function compararAssinaturas(
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

function ambienteSandbox() {
  return String(process.env.PAGBANK_API_URL || "")
    .toLowerCase()
    .includes("sandbox");
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
      console.error("PAGBANK_TOKEN não configurado.");

      return Response.json(
        {
          erro: "Configuração do PagBank incompleta.",
        },
        {
          status: 500,
        }
      );
    }

    const corpoOriginal = await request.text();

    const assinaturaRecebida =
      request.headers.get("x-authenticity-token");

    if (!assinaturaRecebida) {
      if (!ambienteSandbox()) {
        console.error(
          "Webhook recebido sem x-authenticity-token."
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

      console.warn(
        "Webhook Sandbox recebido sem x-authenticity-token."
      );
    } else {
      const assinaturaCalculada = createHash("sha256")
        .update(`${token}-${corpoOriginal}`)
        .digest("hex");

      const assinaturaValida = compararAssinaturas(
        assinaturaRecebida,
        assinaturaCalculada
      );

      if (!assinaturaValida) {
        console.error(
          "Webhook recebido com assinatura inválida."
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
    }

    let notificacao: NotificacaoPagBank;

    try {
      notificacao = JSON.parse(corpoOriginal);
    } catch {
      console.error("Webhook recebeu JSON inválido.");

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
      cobranca?.status ||
        notificacao.status ||
        ""
    )
      .trim()
      .toUpperCase();

    const referencia = String(
      notificacao.reference_id ||
        cobranca?.reference_id ||
        ""
    ).trim();

    console.log("Webhook PagBank recebido:", {
      notificacaoId: notificacao.id || null,
      cobrancaId: cobranca?.id || null,
      referencia,
      status,
    });

    /*
      COMPRA DE APOSTILA

      Formato:
      apostila-2-1720000000000
    */
    const referenciaApostila = referencia.match(
      /^apostila-(\d+)-/
    );

    if (referenciaApostila) {
      const compraId = Number(referenciaApostila[1]);

      if (
        Number.isInteger(compraId) &&
        compraId > 0
      ) {
        const compra =
          await prisma.compraApostila.findUnique({
            where: {
              id: compraId,
            },
          });

        if (!compra) {
          return Response.json({
            recebido: true,
            ignorado: true,
            motivo: "Compra da apostila não encontrada.",
            referencia,
            status,
          });
        }

        if (status === "PAID") {
          const compraLiberada =
            await prisma.compraApostila.update({
              where: {
                id: compra.id,
              },
              data: {
                status: "LIBERADO",
                liberadoEm:
                  compra.liberadoEm || new Date(),
              },
            });

          console.log(
            `Compra de apostila ${compraLiberada.id} liberada automaticamente.`
          );

          return Response.json({
            recebido: true,
            tipo: "APOSTILA",
            liberado: true,
            compraId: compraLiberada.id,
            apostilaSlug:
              compraLiberada.apostilaSlug,
            status,
          });
        }

        return Response.json({
          recebido: true,
          tipo: "APOSTILA",
          liberado: false,
          compraId: compra.id,
          apostilaSlug: compra.apostilaSlug,
          status,
        });
      }
    }

    /*
      COMPRA DE CURSO

      Formato:
      matricula-2-1720000000000
    */
    const referenciaMatricula = referencia.match(
      /^matricula-(\d+)-/
    );

    let matricula = null;

    if (referenciaMatricula) {
      const matriculaId = Number(
        referenciaMatricula[1]
      );

      if (
        Number.isInteger(matriculaId) &&
        matriculaId > 0
      ) {
        matricula =
          await prisma.matricula.findUnique({
            where: {
              id: matriculaId,
            },
          });
      }
    }

    if (!matricula && notificacao.id) {
      matricula =
        await prisma.matricula.findFirst({
          where: {
            pagamentoId: notificacao.id,
          },
        });
    }

    if (!matricula && cobranca?.id) {
      matricula =
        await prisma.matricula.findFirst({
          where: {
            pagamentoId: cobranca.id,
          },
        });
    }

    if (!matricula) {
      console.error(
        "Webhook recebido, mas nenhuma compra foi encontrada.",
        {
          referencia,
          notificacaoId: notificacao.id,
          cobrancaId: cobranca?.id,
          status,
        }
      );

      return Response.json({
        recebido: true,
        ignorado: true,
        motivo:
          "Matrícula ou compra de apostila não encontrada.",
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
        `Matrícula ${matriculaLiberada.id} liberada automaticamente.`
      );

      return Response.json({
        recebido: true,
        tipo: "CURSO",
        liberado: true,
        matriculaId: matriculaLiberada.id,
        cursoSlug: matriculaLiberada.cursoSlug,
        status,
      });
    }

    return Response.json({
      recebido: true,
      tipo: "CURSO",
      liberado: false,
      matriculaId: matricula.id,
      cursoSlug: matricula.cursoSlug,
      status,
    });
  } catch (erro) {
    console.error(
      "Erro ao processar webhook do PagBank:",
      erro
    );

    return Response.json(
      {
        erro:
          "Não foi possível processar a notificação.",
        detalhe:
          erro instanceof Error
            ? erro.message
            : "Erro desconhecido.",
      },
      {
        status: 500,
      }
    );
  }
}