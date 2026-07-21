"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Aluno = {
  id: number;
  nome: string;
  cpf?: string;
  email?: string;
};

type Matricula = {
  id: number;
  cursoSlug: string;
  status: string;
  notaFinal?: number | null;
  concluidoEm?: string | null;
};

type CursoCertificado = {
  nome: string;
  subtitulo: string;
  cargaHoraria: string;
};

const conteudosProgramaticos: Record<string, string[]> = {
  "nr-01": [
    "Disposições gerais e campo de aplicação",
    "Direitos e deveres de empregadores e trabalhadores",
    "Gerenciamento de Riscos Ocupacionais — GRO",
    "Programa de Gerenciamento de Riscos — PGR",
    "Identificação de perigos e avaliação de riscos",
    "Medidas de prevenção e acompanhamento",
    "Capacitação e documentação de segurança",
  ],
  "nr-05": [
    "Objetivos e campo de aplicação da CIPA",
    "Constituição e organização da comissão",
    "Atribuições dos representantes",
    "Processo eleitoral e mandato",
    "Reuniões, documentos e plano de trabalho",
    "Prevenção de acidentes e doenças ocupacionais",
    "Prevenção e combate ao assédio no trabalho",
  ],
  "nr-06": [
    "Conceitos e responsabilidades sobre EPI",
    "Certificado de Aprovação — CA",
    "Seleção e fornecimento dos equipamentos",
    "Uso, guarda, conservação e higienização",
    "Treinamento e orientação dos trabalhadores",
    "Registro de entrega e fiscalização",
  ],
  "nr-10": [
    "Introdução à segurança em eletricidade",
    "Riscos elétricos e medidas de controle",
    "Choque elétrico, arco elétrico e queimaduras",
    "Desenergização, bloqueio e sinalização",
    "Equipamentos de proteção coletiva e individual",
    "Procedimentos de trabalho e documentação",
    "Proteção e combate a incêndios",
    "Primeiros socorros em acidentes elétricos",
  ],
  "nr-11": [
    "Transporte e movimentação de materiais",
    "Equipamentos de movimentação e içamento",
    "Armazenagem segura de materiais",
    "Inspeção e manutenção dos equipamentos",
    "Sinalização e procedimentos operacionais",
    "Prevenção de acidentes nas operações",
  ],
  "nr-12": [
    "Princípios gerais de segurança em máquinas",
    "Arranjo físico e instalações",
    "Sistemas de segurança e proteções",
    "Dispositivos de parada de emergência",
    "Manutenção, inspeção e operação segura",
    "Capacitação e procedimentos de trabalho",
  ],
  "nr-18": [
    "Organização e planejamento do canteiro",
    "Programa de Gerenciamento de Riscos",
    "Áreas de vivência e instalações",
    "Trabalho em altura e proteção contra quedas",
    "Máquinas, equipamentos e ferramentas",
    "Sinalização e prevenção de acidentes",
  ],
  "nr-20": [
    "Características dos inflamáveis e combustíveis",
    "Riscos, perigos e fontes de ignição",
    "Classificação das instalações",
    "Procedimentos operacionais seguros",
    "Prevenção e controle de vazamentos",
    "Plano de resposta a emergências",
  ],
  "nr-23": [
    "Princípios de prevenção contra incêndios",
    "Classes de incêndio",
    "Tipos e utilização de extintores",
    "Rotas de fuga e saídas de emergência",
    "Abandono seguro de área",
    "Procedimentos em situações de emergência",
  ],
  "nr-29": [
    "Segurança e saúde no trabalho portuário",
    "Operações de carga e descarga",
    "Movimentação e armazenagem de cargas",
    "Riscos em equipamentos portuários",
    "Medidas de prevenção e emergência",
    "Responsabilidades e procedimentos seguros",
  ],
  "nr-30": [
    "Segurança e saúde no trabalho aquaviário",
    "Riscos nas atividades embarcadas",
    "Organização do trabalho a bordo",
    "Equipamentos de proteção e salvatagem",
    "Prevenção de acidentes e emergências",
    "Primeiros socorros e abandono de embarcação",
  ],
  "nr-32": [
    "Riscos biológicos em serviços de saúde",
    "Riscos químicos e perfurocortantes",
    "Medidas de proteção e higiene",
    "Resíduos dos serviços de saúde",
    "Vacinação e saúde ocupacional",
    "Procedimentos em caso de exposição",
  ],
  "nr-33": [
    "Reconhecimento de espaços confinados",
    "Perigos, riscos e medidas de controle",
    "Permissão de Entrada e Trabalho — PET",
    "Monitoramento atmosférico e ventilação",
    "Funções do trabalhador, vigia e supervisor",
    "Emergência, salvamento e primeiros socorros",
  ],
  "nr-35": [
    "Requisitos e responsabilidades no trabalho em altura",
    "Análise de Risco e Permissão de Trabalho",
    "Sistemas e equipamentos de proteção contra quedas",
    "Inspeção e utilização de EPIs",
    "Planejamento, organização e supervisão",
    "Emergência, resgate e primeiros socorros",
  ],
  sep: [
    "Organização do Sistema Elétrico de Potência",
    "Riscos em instalações elétricas de alta tensão",
    "Procedimentos de trabalho e desenergização",
    "Equipamentos de proteção coletiva e individual",
    "Sinalização, bloqueio e liberação para serviço",
    "Acidentes típicos e medidas preventivas",
    "Primeiros socorros e combate a incêndios",
  ],
};

const cursos: Record<string, CursoCertificado> = {
  "nr-01": {
    nome: "CURSO DA NR-01",
    subtitulo:
      "Disposições Gerais e Gerenciamento de Riscos Ocupacionais",
    cargaHoraria: "08 horas",
  },

  "nr-05": {
    nome: "CURSO DA NR-05",
    subtitulo: "Comissão Interna de Prevenção de Acidentes e de Assédio",
    cargaHoraria: "20 horas",
  },

  "nr-06": {
    nome: "CURSO DA NR-06",
    subtitulo: "Equipamento de Proteção Individual — EPI",
    cargaHoraria: "08 horas",
  },

  "nr-10": {
    nome: "CURSO DA NR-10",
    subtitulo:
      "Segurança em Instalações e Serviços em Eletricidade",
    cargaHoraria: "40 horas",
  },

  "nr-11": {
    nome: "CURSO DA NR-11",
    subtitulo:
      "Transporte, Movimentação, Armazenagem e Manuseio de Materiais",
    cargaHoraria: "16 horas",
  },

  "nr-12": {
    nome: "CURSO DA NR-12",
    subtitulo:
      "Segurança no Trabalho em Máquinas e Equipamentos",
    cargaHoraria: "08 horas",
  },

  "nr-18": {
    nome: "CURSO DA NR-18",
    subtitulo:
      "Segurança e Saúde no Trabalho na Indústria da Construção",
    cargaHoraria: "08 horas",
  },

  "nr-20": {
    nome: "CURSO DA NR-20",
    subtitulo:
      "Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis",
    cargaHoraria: "08 horas",
  },

  "nr-23": {
    nome: "CURSO DA NR-23",
    subtitulo: "Proteção Contra Incêndios",
    cargaHoraria: "08 horas",
  },

  "nr-29": {
    nome: "CURSO DA NR-29",
    subtitulo:
      "Segurança e Saúde no Trabalho Portuário",
    cargaHoraria: "08 horas",
  },

  "nr-30": {
    nome: "CURSO DA NR-30",
    subtitulo:
      "Segurança e Saúde no Trabalho Aquaviário",
    cargaHoraria: "08 horas",
  },

  "nr-32": {
    nome: "CURSO DA NR-32",
    subtitulo:
      "Segurança e Saúde no Trabalho em Serviços de Saúde",
    cargaHoraria: "08 horas",
  },

  "nr-33": {
    nome: "CURSO DA NR-33",
    subtitulo:
      "Segurança e Saúde nos Trabalhos em Espaços Confinados",
    cargaHoraria: "08 horas",
  },

  "nr-35": {
    nome: "CURSO DA NR-35",
    subtitulo: "Trabalho em Altura",
    cargaHoraria: "08 horas",
  },

  sep: {
    nome: "CURSO DE SEP",
    subtitulo: "Sistema Elétrico de Potência",
    cargaHoraria: "40 horas",
  },
};

function transformarSlug(slug: string): CursoCertificado {
  const numero = slug.match(/\d+/)?.[0];

  if (numero) {
    return {
      nome: `CURSO DA NR-${numero.padStart(2, "0")}`,
      subtitulo: "Segurança e Saúde no Trabalho",
      cargaHoraria: "08 horas",
    };
  }

  const nome = slug
    .replaceAll("-", " ")
    .split(" ")
    .map(
      (palavra) =>
        palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(" ");

  return {
    nome: nome.toUpperCase(),
    subtitulo: "Curso de Qualificação Profissional",
    cargaHoraria: "08 horas",
  };
}

function formatarData(data?: string | null) {
  const dataFinal = data ? new Date(data) : new Date();

  return dataFinal.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function limparCPF(cpf?: string) {
  if (!cpf) return "";

  const numeros = cpf.replace(/\D/g, "");

  if (numeros.length !== 11) return cpf;

  return numeros.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
}

export default function PaginaCertificado() {
  const params = useParams();
  const router = useRouter();

  const slug = String(params.slug || "");

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [matricula, setMatricula] =
    useState<Matricula | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const curso = useMemo(() => {
    return cursos[slug] || transformarSlug(slug);
  }, [slug]);

  const conteudoProgramatico = useMemo(() => {
    return (
      conteudosProgramaticos[slug] || [
        "Introdução e fundamentos do curso",
        "Legislação e normas aplicáveis",
        "Identificação de perigos e avaliação de riscos",
        "Medidas de prevenção e proteção",
        "Procedimentos operacionais seguros",
        "Responsabilidades dos participantes",
        "Prevenção de acidentes e situações de emergência",
      ]
    );
  }, [slug]);

  useEffect(() => {
    async function carregarCertificado() {
      try {
        const alunoSalvo = localStorage.getItem("aluno");

        if (!alunoSalvo) {
          router.push("/login");
          return;
        }

        const alunoEncontrado: Aluno = JSON.parse(alunoSalvo);
        setAluno(alunoEncontrado);

        const resposta = await fetch(
          `/api/matriculas?alunoId=${alunoEncontrado.id}`
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível verificar a matrícula.");
        }

        const dados = await resposta.json();

        const lista: Matricula[] = Array.isArray(dados)
          ? dados
          : dados.matriculas || [];

        const matriculaEncontrada = lista.find(
          (item) => item.cursoSlug === slug
        );

        if (!matriculaEncontrada) {
          setErro("Matrícula não encontrada para este curso.");
          return;
        }

        const aprovado =
          matriculaEncontrada.notaFinal !== null &&
          matriculaEncontrada.notaFinal !== undefined &&
          matriculaEncontrada.notaFinal >= 7;

        if (!aprovado) {
          setErro(
            "O certificado é liberado somente após a aprovação na prova."
          );
          return;
        }

        setMatricula(matriculaEncontrada);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar o certificado.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCertificado();
  }, [router, slug]);

  const numeroCertificado = useMemo(() => {
    if (!aluno || !matricula) return "";

    const ano = new Date(
      matricula.concluidoEm || Date.now()
    ).getFullYear();

    return `${ano}.${String(aluno.id).padStart(
      5,
      "0"
    )}.${String(matricula.id).padStart(4, "0")}`;
  }, [aluno, matricula]);

  const dadosQrCode = useMemo(() => {
    if (!aluno || !matricula || !numeroCertificado) return "";

    const texto = [
      "CERTIFICADO DIGITAL",
      `Aluno: ${aluno.nome}`,
      `Curso: ${curso.nome}`,
      `Carga horária: ${curso.cargaHoraria}`,
      `Conclusão: ${formatarData(matricula.concluidoEm)}`,
      `Registro: ${numeroCertificado}`,
      "Digital Consultoria e Serviços Técnicos LTDA",
    ].join("\n");

    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
      texto
    )}`;
  }, [aluno, matricula, numeroCertificado, curso]);

  function imprimirCertificado() {
    window.print();
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-slate-700">
          Carregando certificado...
        </p>
      </main>
    );
  }

  if (erro || !aluno || !matricula) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
          <h1 className="mb-3 text-2xl font-bold text-red-600">
            Certificado indisponível
          </h1>

          <p className="mb-6 text-slate-700">{erro}</p>

          <button
            onClick={() => router.push("/aluno")}
            className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
          >
            Voltar para a Área do Aluno
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-200 px-4 py-8 print:bg-white print:p-0">
      <div className="mb-6 flex justify-center gap-3 print:hidden">
        <button
          onClick={() => router.push("/aluno")}
          className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Voltar
        </button>

        <button
          onClick={imprimirCertificado}
          className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
        >
          Imprimir / Salvar em PDF
        </button>
      </div>

      <section
        style={{ pageBreakAfter: "always" }}
        className="
          certificado
          relative
          mx-auto
          flex
          min-h-[720px]
          w-full
          max-w-[1120px]
          flex-col
          overflow-hidden
          bg-white
          p-10
          shadow-2xl
          print:min-h-screen
          print:max-w-none
          print:shadow-none
        "
      >
        <div className="absolute inset-3 border-[3px] border-purple-800" />
        <div className="absolute inset-5 border border-amber-500" />

        <div className="absolute left-0 top-0 h-40 w-40 rounded-br-full bg-purple-900 opacity-10" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-tl-full bg-amber-500 opacity-10" />

        <div className="relative z-10 flex h-full flex-1 flex-col text-center">
          <header className="flex items-center justify-center">
            <img
              src="/logo.jpg"
              alt="Digital Consultoria e Serviços Técnicos"
              className="h-28 w-auto object-contain"
            />
          </header>

          <h1 className="mt-2 font-serif text-5xl font-bold tracking-[0.16em] text-purple-900">
            CERTIFICADO
          </h1>

          <div className="mx-auto mt-3 h-1 w-64 bg-amber-500" />

          <p className="mt-8 text-xl text-slate-700">
            Conferido a:
          </p>

          <h2 className="mx-auto mt-3 max-w-4xl border-b-2 border-slate-700 px-8 pb-2 font-serif text-4xl font-bold uppercase text-slate-900">
            {aluno.nome}
          </h2>

          {aluno.cpf && (
            <p className="mt-2 text-sm text-slate-600">
              CPF: {limparCPF(aluno.cpf)}
            </p>
          )}

          <p className="mt-8 text-xl leading-relaxed text-slate-700">
            Por sua participação e aprovação no:
          </p>

          <h3 className="mt-4 text-3xl font-extrabold text-purple-900">
            {curso.nome}
          </h3>

          <p className="mx-auto mt-2 max-w-4xl text-2xl font-semibold uppercase text-slate-800">
            {curso.subtitulo}
          </p>

          <p className="mt-8 text-lg text-slate-700">
            Com carga horária de{" "}
            <strong>{curso.cargaHoraria}</strong>, tendo cumprido
            satisfatoriamente os requisitos estabelecidos.
          </p>

          <p className="mt-7 text-lg text-slate-700">
            Manaus (AM),{" "}
            {formatarData(matricula.concluidoEm)}.
          </p>

          <div className="mt-auto grid grid-cols-2 items-end gap-16 px-16 pt-12">
            <div className="text-center">
              <div className="mx-auto mb-2 w-72 border-t border-slate-800" />

              <p className="font-bold uppercase text-slate-900">
                {aluno.nome}
              </p>

              <p className="text-sm text-slate-600">
                Participante
              </p>
            </div>

            <div className="text-center">
              <img
                src="/assinatura-prof-aldemir.png"
                alt="Assinatura do Prof. Aldemir Amaral"
                className="mx-auto mb-2 h-24 w-auto object-contain"
              />

              <div className="mx-auto mb-2 w-72 border-t border-slate-800" />

              <p className="font-bold uppercase text-slate-900">
                Prof. Aldemir Amaral
              </p>

              <p className="text-sm text-slate-600">
                Responsável Técnico
              </p>
            </div>
          </div>

          <footer className="mt-8 border-t border-slate-300 pt-3 text-xs text-slate-600">
            <p className="font-semibold">
              Digital Consultoria e Serviços Técnicos LTDA
            </p>

            <p>
              Registro do certificado: Nº {numeroCertificado}
            </p>
          </footer>
        </div>
      </section>

      <section
        className="
          certificado
          relative
          mx-auto
          mt-8
          flex
          min-h-[720px]
          w-full
          max-w-[1120px]
          flex-col
          overflow-hidden
          bg-white
          p-10
          shadow-2xl
          print:mt-0
          print:min-h-screen
          print:max-w-none
          print:shadow-none
        "
      >
        <div className="absolute inset-3 border-[3px] border-purple-800" />
        <div className="absolute inset-5 border border-amber-500" />

        <div className="absolute left-0 top-0 h-40 w-40 rounded-br-full bg-purple-900 opacity-10" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-tl-full bg-amber-500 opacity-10" />

        <div className="relative z-10 flex h-full flex-1 flex-col">
          <header className="flex items-center justify-center">
            <img
              src="/logo.jpg"
              alt="Digital Consultoria e Serviços Técnicos"
              className="h-24 w-auto object-contain"
            />
          </header>

          <h1 className="mt-2 text-center font-serif text-4xl font-bold tracking-[0.12em] text-purple-900">
            CONTEÚDO PROGRAMÁTICO
          </h1>

          <div className="mx-auto mt-3 h-1 w-64 bg-amber-500" />

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div className="rounded-xl border border-slate-300 p-5">
              <p className="text-sm font-semibold uppercase text-slate-500">
                Participante
              </p>
              <p className="mt-1 text-xl font-bold uppercase text-slate-900">
                {aluno.nome}
              </p>

              {aluno.cpf && (
                <p className="mt-2 text-sm text-slate-600">
                  CPF: {limparCPF(aluno.cpf)}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-300 p-5">
              <p className="text-sm font-semibold uppercase text-slate-500">
                Curso
              </p>
              <p className="mt-1 text-xl font-bold text-purple-900">
                {curso.nome}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Carga horária: <strong>{curso.cargaHoraria}</strong>
              </p>
            </div>
          </div>

          <div className="mt-8 flex-1 rounded-xl border border-slate-300 p-7">
            <h2 className="mb-5 text-center text-2xl font-bold text-slate-900">
              Componentes curriculares
            </h2>

            <ol className="grid grid-cols-2 gap-x-10 gap-y-4 text-lg text-slate-800">
              {conteudoProgramatico.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-purple-800">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto_auto] items-center gap-8">
            <div className="rounded-xl border border-slate-300 p-5">
              <p className="text-sm font-semibold uppercase text-slate-500">
                Validação do certificado
              </p>

              <p className="mt-2 text-base text-slate-700">
                Registro: <strong>Nº {numeroCertificado}</strong>
              </p>

              <p className="mt-1 text-base text-slate-700">
                Data de conclusão:{" "}
                <strong>{formatarData(matricula.concluidoEm)}</strong>
              </p>

              <p className="mt-3 text-sm text-slate-600">
                Escaneie o QR Code para conferir os dados deste certificado.
              </p>
            </div>

            <div className="text-center">
              {dadosQrCode && (
                <img
                  src={dadosQrCode}
                  alt="QR Code de validação do certificado"
                  className="mx-auto h-32 w-32 object-contain"
                />
              )}

              <p className="mt-2 text-xs font-semibold uppercase text-slate-600">
                Validar certificado
              </p>
            </div>

            <div className="text-center">
              <img
                src="/assinatura-prof-aldemir.png"
                alt="Assinatura do Prof. Aldemir Amaral"
                className="mx-auto h-20 w-auto object-contain"
              />

              <div className="mx-auto mb-2 w-64 border-t border-slate-800" />

              <p className="font-bold uppercase text-slate-900">
                Prof. Aldemir Amaral
              </p>

              <p className="text-sm text-slate-600">
                Responsável Técnico
              </p>
            </div>
          </div>

          <footer className="mt-6 border-t border-slate-300 pt-3 text-center text-xs text-slate-600">
            Digital Consultoria e Serviços Técnicos LTDA — Manaus, Amazonas
          </footer>
        </div>
      </section>
    </main>
  );
}