import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const apostilas = [
  {
    slug: "nr01",
    nome: "Apostila NR-01",
    preco: 29.9,
  },
  {
    slug: "nr05",
    nome: "Apostila NR-05",
    preco: 29.9,
  },
  {
    slug: "nr06",
    nome: "Apostila NR-06",
    preco: 29.9,
  },
  {
    slug: "nr10",
    nome: "Apostila NR-10",
    preco: 79.9,
  },
  {
    slug: "nr35",
    nome: "Apostila NR-35",
    preco: 39.9,
  },
  {
    slug: "primeiros-socorros",
    nome: "Apostila de Primeiros Socorros",
    preco: 49.9,
  },
];

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

    const nomeComprador = String(
      dados.nomeComprador || ""
    ).trim();

    const emailComprador = String(
      dados.emailComprador || ""
    )
      .trim()
      .toLowerCase();

    const apostilaSlug = String(
      dados.apostilaSlug || ""
    ).trim();

    if (nomeComprador.length < 3) {
      return Response.json(
        {
          erro: "Informe o nome completo do comprador.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !emailComprador ||
      !emailComprador.includes("@")
    ) {
      return Response.json(
        {
          erro: "Informe um e-mail válido.",
        },
        {
          status: 400,
        }
      );
    }

    if (!apostilaSlug) {
      return Response.json(
        {
          erro: "A apostila não foi informada.",
        },
        {
          status: 400,
        }
      );
    }

    const apostila = apostilas.find(
      (item) => item.slug === apostilaSlug
    );

    if (!apostila) {
      return Response.json(
        {
          erro: "Apostila não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    const token = process.env.PAGBANK_TOKEN;
    const apiUrl = process.env.PAGBANK_API_URL;

    const siteUrl =
      process.env.SITE_URL ||
      "https://rainbow-sundae-51618e.netlify.app";

    if (!token || !apiUrl) {
      console.error(
        "PAGBANK_TOKEN ou PAGBANK_API_URL não configurado."
      );

      return Response.json(
        {
          erro:
            "A configuração do PagBank está incompleta.",
        },
        {
          status: 500,
        }
      );
    }

    const compra =
      await prisma.compraApostila.create({
        data: {
          nomeComprador,
          emailComprador,
          apostilaSlug,
          status: "PENDENTE",
        },
      });

    const valorEmCentavos = Math.round(
      apostila.preco * 100
    );

    const enderecoDaApi = apiUrl.replace(/\/$/, "");
    const enderecoDoSite = siteUrl.replace(/\/$/, "");

    const referencia =
      `apostila-${compra.id}-${Date.now()}`;

    const respostaPagBank = await fetch(
      `${enderecoDaApi}/checkouts`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          reference_id: referencia,

          customer: {
            name: nomeComprador,
            email: emailComprador,
          },

          items: [
            {
              reference_id: apostila.slug,
              name: apostila.nome.slice(0, 100),
              description:
                `${apostila.nome} em PDF - Digital Consultoria`.slice(
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
            `${enderecoDoSite}/pagamento/retorno?tipo=apostila&compra=${compra.id}`,

          return_url:
            `${enderecoDoSite}/pagamento/retorno?tipo=apostila&compra=${compra.id}`,

          redirect_waiting_time: 5,
        }),

        cache: "no-store",
      }
    );

    const textoResposta =
      await respostaPagBank.text();

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

      await prisma.compraApostila.delete({
        where: {
          id: compra.id,
        },
      });

      return Response.json(
        {
          erro:
            "O PagBank não conseguiu criar o pagamento.",
          detalhes:
            checkout.error_messages ||
            checkout.message ||
            "Erro não informado.",
        },
        {
          status: respostaPagBank.status,
        }
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

      await prisma.compraApostila.delete({
        where: {
          id: compra.id,
        },
      });

      return Response.json(
        {
          erro:
            "O PagBank não devolveu o link de pagamento.",
        },
        {
          status: 500,
        }
      );
    }

    await prisma.compraApostila.update({
      where: {
        id: compra.id,
      },

      data: {
        pagamentoId: checkout.id,
        status: "PENDENTE",
      },
    });

    return Response.json({
      mensagem:
        "Checkout da apostila criado com sucesso.",
      url: linkPagamento,
      checkoutId: checkout.id,
      compraId: compra.id,
    });
  } catch (erro) {
    console.error(
      "Erro ao criar checkout da apostila:",
      erro
    );

    return Response.json(
      {
        erro:
          "Não foi possível preparar o pagamento da apostila.",
      },
      {
        status: 500,
      }
    );
  }
}