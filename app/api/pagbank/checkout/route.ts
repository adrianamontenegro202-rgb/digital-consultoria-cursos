import { prisma } from "../../../../lib/prisma";
import { cursos } from "../../../../data/cursos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LinkPagBank = {
  rel?: string;
  href?: string;
};

type RespostaPagBank = {
  id?: string;
  links?: LinkPagBank[];
  error_messages?: unknown;
  message?: string;
};

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

    if (!cursoSlug) {
      return Response.json(
        { erro: "O curso não foi informado." },
        { status: 400 }
      );
    }

    const curso = cursos.find(
      (item) => item.slug === cursoSlug
    );

    if (!curso) {
      return Response.json(
        { erro: "Curso não encontrado." },
        { status: 404 }
      );
    }

    const aluno = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!aluno) {
      return Response.json(
        { erro: "Aluno não encontrado." },
        { status: 404 }
      );
    }

    let matricula = await prisma.matricula.findUnique({
      where: {
        alunoId_cursoSlug: {
          alunoId,
          cursoSlug,
        },
      },
    });

    if (matricula?.status === "LIBERADO") {
      return Response.json(
        {
          erro:
            "Este curso já está liberado na Área do Aluno.",
        },
        { status: 409 }
      );
    }

    if (!matricula) {
      matricula = await prisma.matricula.create({
        data: {
          alunoId,
          cursoSlug,
          status: "PENDENTE",
        },
      });
    }

    const token = process.env.PAGBANK_TOKEN;
    const apiUrl = process.env.PAGBANK_API_URL;
    const siteUrl =
      process.env.SITE_URL ||
      "https://digitalconsultoria.netlify.app";

    if (!token || !apiUrl) {
      console.error(
        "PAGBANK_TOKEN ou PAGBANK_API_URL não configurado."
      );

      return Response.json(
        {
          erro:
            "A configuração do PagBank está incompleta.",
        },
        { status: 500 }
      );
    }

    const valorEmCentavos = Math.round(
      curso.preco * 100
    );

    const enderecoDaApi = apiUrl.replace(/\/$/, "");
    const enderecoDoSite = siteUrl.replace(/\/$/, "");

    const referencia =
      `matricula-${matricula.id}-${Date.now()}`;

    const corpoDaRequisicao = {
      reference_id: referencia,

      items: [
        {
          reference_id: curso.slug,
          name: curso.nome.slice(0, 100),
          description:
            `Curso ${curso.nome} - Digital Consultoria`.slice(
              0,
              255
            ),
          quantity: 1,
          unit_amount: valorEmCentavos,
        },
      ],

      payment_methods: [
        {
          type: "PIX",
        },
        {
          type: "CREDIT_CARD",
        },
        {
          type: "DEBIT_CARD",
        },
        {
          type: "BOLETO",
        },
      ],

      payment_notification_urls: [
        `${enderecoDoSite}/api/pagbank/webhook`,
      ],

      redirect_url:
        `${enderecoDoSite}/pagamento/retorno`,

      return_url:
        `${enderecoDoSite}/pagamento/retorno`,

      redirect_waiting_time: 5,
    };

    console.log(
      "PAGBANK_HOMOLOGACAO_REQUEST:",
      JSON.stringify(corpoDaRequisicao, null, 2)
    );

    const respostaPagBank = await fetch(
      `${enderecoDaApi}/checkouts`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(corpoDaRequisicao),

        cache: "no-store",
      }
    );

    const textoResposta =
      await respostaPagBank.text();

    console.log(
      "PAGBANK_HOMOLOGACAO_STATUS:",
      respostaPagBank.status
    );

    console.log(
      "PAGBANK_HOMOLOGACAO_RESPONSE:",
      textoResposta
    );

    let checkout: RespostaPagBank = {};

    try {
      checkout = JSON.parse(textoResposta);
    } catch {
      checkout = {
        message: textoResposta,
      };
    }

    if (!respostaPagBank.ok) {
      console.error(
        "Erro devolvido pelo PagBank:",
        checkout
      );

      return Response.json(
        {
          erro:
            "O PagBank não conseguiu criar o pagamento.",
          detalhes:
            checkout.error_messages ||
            checkout.message ||
            "Erro não informado.",
        },
        { status: respostaPagBank.status }
      );
    }

    const linkPagamento = checkout.links?.find(
      (link) => link.rel === "PAY"
    )?.href;

    if (!checkout.id || !linkPagamento) {
      console.error(
        "Checkout criado sem link de pagamento:",
        checkout
      );

      return Response.json(
        {
          erro:
            "O PagBank não devolveu o link de pagamento.",
        },
        { status: 500 }
      );
    }

    await prisma.matricula.update({
      where: {
        id: matricula.id,
      },
      data: {
        pagamentoId: checkout.id,
        status: "PENDENTE",
      },
    });

    return Response.json({
      mensagem: "Checkout criado com sucesso.",
      url: linkPagamento,
      checkoutId: checkout.id,
      matriculaId: matricula.id,
    });
  } catch (erro) {
    console.error(
      "Erro ao criar checkout PagBank:",
      erro
    );

    return Response.json(
      {
        erro:
          "Não foi possível preparar o pagamento.",
      },
      { status: 500 }
    );
  }
}