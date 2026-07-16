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

    /*
      O corpo precisa ser lido como texto antes de transformar em JSON,
      porque a assinatura é calculada usando exatamente o corpo recebido.
    */
    const corpoOriginal = await request.text();

    const assinaturaRecebida =
      request.headers.get("x-authenticity-token");

    /*
      No ambiente de produção, a assinatura é obrigatória.

      No Sandbox, permitimos continuar sem assinatura para facilitar
      os testes, mas registramos um aviso no log.
    */
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
      A referência criada no checkout tem este formato:

      matricula-2-1720000000000

      Aqui retiramos o número da matrícula.
    */
    const referenciaEncontrada = referencia.match(
      /^matricula-(\d+)-/
    );

    let matricula = null;

    if (referenciaEncontrada) {
      const matriculaId = Number(
        referenciaEncontrada[1]
      );

      if (
        Number.isInteger(matriculaId) &&
        matriculaId > 0
      ) {
        matricula = await prisma.matricula.findUnique({
          where: {
            id: matriculaId,
          },
        });
      }
    }

    /*
      Segunda tentativa:
      procura pelo ID salvo no campo pagamentoId.
    */
    if (!matricula && notificacao.id) {
      matricula = await prisma.matricula.findFirst({
        where: {
          pagamentoId: notificacao.id,
        },
      });
    }

    /*
      Terceira tentativa:
      procura pelo ID da cobrança.
    */
    if (!matricula && cobranca?.id) {
      matricula = await prisma.matricula.findFirst({
        where: {
          pagamentoId: cobranca.id,
        },
      });
    }

    if (!matricula) {
      console.error(
        "Webhook recebido, mas a matrícula não foi encontrada.",
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
        motivo: "Matrícula não encontrada.",
        referencia,
        status,
      });
    }

    /*
      PAID significa pagamento capturado/concluído.
      Somente nesse status o curso será liberado.
    */
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
        liberado: true,
        matriculaId: matriculaLiberada.id,
        cursoSlug: matriculaLiberada.cursoSlug,
        status,
      });
    }

    console.log(
      `Matrícula ${matricula.id} continua pendente. Status recebido: ${status}`
    );

    return Response.json({
      recebido: true,
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
        erro: "Não foi possível processar a notificação.",
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