export type Questao = {
  pergunta: string;
  alternativas: string[];
  correta: number;
};

export type Prova = {
  titulo: string;
  notaMinima: number;
  questoes: Questao[];
};

export const provas: Record<string, Prova> = {
  "nr01": {
    titulo: "Avaliação NR-01",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-01?",
        alternativas: [
          "Estabelecer disposições gerais e o gerenciamento de riscos ocupacionais",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-01, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-01?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa GRO neste contexto?",
        alternativas: [
          "Gerenciamento de Riscos Ocupacionais",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-01?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-01, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-01 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-01 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-01 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-01, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr05": {
    titulo: "Avaliação NR-05",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-05?",
        alternativas: [
          "Regulamentar a cipa e promover a prevenção de acidentes e assédio",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-05, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-05?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa CIPA neste contexto?",
        alternativas: [
          "Comissão Interna de Prevenção de Acidentes e de Assédio",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-05?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-05, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-05 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-05 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-05 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-05, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr06": {
    titulo: "Avaliação NR-06",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-06?",
        alternativas: [
          "Estabelecer requisitos para equipamentos de proteção individual",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-06, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-06?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa EPI neste contexto?",
        alternativas: [
          "Equipamento de Proteção Individual",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-06?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-06, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-06 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-06 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-06 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-06, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr10": {
    titulo: "Avaliação NR-10",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-10?",
        alternativas: [
          "Garantir segurança em instalações e serviços com eletricidade",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-10, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-10?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa PIE neste contexto?",
        alternativas: [
          "Prontuário das Instalações Elétricas",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-10?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-10, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-10 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-10 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-10 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-10, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "sep": {
    titulo: "Avaliação NR-10 SEP",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-10 SEP?",
        alternativas: [
          "Garantir segurança em atividades no sistema elétrico de potência",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-10 SEP, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-10 SEP?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa SEP neste contexto?",
        alternativas: [
          "Sistema Elétrico de Potência",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-10 SEP?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-10 SEP, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-10 SEP devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-10 SEP deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-10 SEP serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-10 SEP, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr11": {
    titulo: "Avaliação NR-11",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-11?",
        alternativas: [
          "Prevenir acidentes no transporte, movimentação, armazenagem e manuseio de materiais",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-11, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-11?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa carga segura neste contexto?",
        alternativas: [
          "carga movimentada com equipamento e procedimento adequados",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-11?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-11, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-11 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-11 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-11 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-11, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr12": {
    titulo: "Avaliação NR-12",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-12?",
        alternativas: [
          "Prevenir acidentes com máquinas e equipamentos",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-12, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-12?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa proteção de máquina neste contexto?",
        alternativas: [
          "dispositivo que impede acesso à zona de perigo",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-12?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-12, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-12 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-12 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-12 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-12, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr18": {
    titulo: "Avaliação NR-18",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-18?",
        alternativas: [
          "Estabelecer medidas de segurança na indústria da construção",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-18, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-18?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa canteiro de obras neste contexto?",
        alternativas: [
          "área onde são executadas atividades da construção",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-18?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-18, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-18 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-18 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-18 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-18, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr20": {
    titulo: "Avaliação NR-20",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-20?",
        alternativas: [
          "Controlar riscos com inflamáveis e combustíveis",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-20, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-20?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa inflamável neste contexto?",
        alternativas: [
          "substância que pode entrar em combustão com facilidade",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-20?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-20, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-20 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-20 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-20 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-20, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr23": {
    titulo: "Avaliação NR-23",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-23?",
        alternativas: [
          "Estabelecer medidas de prevenção e resposta a incêndios",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-23, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-23?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa rota de fuga neste contexto?",
        alternativas: [
          "caminho seguro para abandono da área",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-23?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-23, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-23 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-23 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-23 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-23, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr29": {
    titulo: "Avaliação NR-29",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-29?",
        alternativas: [
          "Proteger trabalhadores nas operações portuárias",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-29, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-29?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa operação portuária neste contexto?",
        alternativas: [
          "movimentação de cargas e serviços em área portuária",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-29?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-29, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-29 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-29 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-29 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-29, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr30": {
    titulo: "Avaliação NR-30",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-30?",
        alternativas: [
          "Proteger trabalhadores em embarcações e atividades aquaviárias",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-30, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-30?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa trabalho aquaviário neste contexto?",
        alternativas: [
          "atividade realizada em embarcações e meios navegáveis",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-30?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-30, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-30 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-30 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-30 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-30, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr32": {
    titulo: "Avaliação NR-32",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-32?",
        alternativas: [
          "Prevenir riscos nos serviços de saúde",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-32, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-32?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa risco biológico neste contexto?",
        alternativas: [
          "exposição a microrganismos capazes de causar doença",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-32?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-32, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-32 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-32 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-32 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-32, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr33": {
    titulo: "Avaliação NR-33",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-33?",
        alternativas: [
          "Controlar riscos em espaços confinados",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-33, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-33?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa espaço confinado neste contexto?",
        alternativas: [
          "área não projetada para ocupação contínua e com entrada e saída limitadas",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-33?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-33, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-33 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-33 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-33 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-33, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "nr35": {
    titulo: "Avaliação NR-35",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de NR-35?",
        alternativas: [
          "Prevenir quedas em trabalhos realizados em altura",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a NR-35, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em NR-35?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa trabalho em altura neste contexto?",
        alternativas: [
          "atividade acima de dois metros com risco de queda",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em NR-35?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de NR-35, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em NR-35 devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de NR-35 deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em NR-35 serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em NR-35, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "pgr": {
    titulo: "Avaliação PGR",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de PGR?",
        alternativas: [
          "Identificar perigos, avaliar riscos e estabelecer medidas de prevenção",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a PGR, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em PGR?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa inventário de riscos neste contexto?",
        alternativas: [
          "registro dos perigos, avaliações e controles",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em PGR?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de PGR, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em PGR devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de PGR deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em PGR serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em PGR, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "primeiros-socorros": {
    titulo: "Avaliação de Primeiros Socorros",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de Primeiros Socorros?",
        alternativas: [
          "Prestar atendimento inicial seguro até a chegada de ajuda especializada",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a Primeiros Socorros, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em Primeiros Socorros?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa primeiros socorros neste contexto?",
        alternativas: [
          "cuidados imediatos prestados a uma vítima",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em Primeiros Socorros?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de Primeiros Socorros, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em Primeiros Socorros devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de Primeiros Socorros deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em Primeiros Socorros serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em Primeiros Socorros, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "eletricista-bt": {
    titulo: "Avaliação Eletricista BT",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de Eletricista BT?",
        alternativas: [
          "Executar serviços em baixa tensão com segurança",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a Eletricista BT, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em Eletricista BT?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa BT neste contexto?",
        alternativas: [
          "Baixa Tensão",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em Eletricista BT?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de Eletricista BT, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em Eletricista BT devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de Eletricista BT deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em Eletricista BT serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em Eletricista BT, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "inspetor-qualidade": {
    titulo: "Avaliação Inspetor da Qualidade",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de Inspeção da Qualidade?",
        alternativas: [
          "Verificar a conformidade de produtos, processos e serviços",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a Inspeção da Qualidade, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em Inspeção da Qualidade?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa não conformidade neste contexto?",
        alternativas: [
          "descumprimento de um requisito especificado",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em Inspeção da Qualidade?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de Inspeção da Qualidade, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em Inspeção da Qualidade devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de Inspeção da Qualidade deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em Inspeção da Qualidade serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em Inspeção da Qualidade, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "7-ferramentas": {
    titulo: "Avaliação 7 Ferramentas da Qualidade",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de 7 Ferramentas da Qualidade?",
        alternativas: [
          "Apoiar a análise e solução de problemas de qualidade",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a 7 Ferramentas da Qualidade, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em 7 Ferramentas da Qualidade?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa Diagrama de Pareto neste contexto?",
        alternativas: [
          "ferramenta que ajuda a priorizar causas ou problemas",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em 7 Ferramentas da Qualidade?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de 7 Ferramentas da Qualidade, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em 7 Ferramentas da Qualidade devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de 7 Ferramentas da Qualidade deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em 7 Ferramentas da Qualidade serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em 7 Ferramentas da Qualidade, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "cozinheira": {
    titulo: "Avaliação de Cozinheira",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de Boas Práticas de Cozinha?",
        alternativas: [
          "Preparar alimentos com higiene, segurança e qualidade",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a Boas Práticas de Cozinha, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em Boas Práticas de Cozinha?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa contaminação cruzada neste contexto?",
        alternativas: [
          "transferência de contaminantes entre alimentos, superfícies ou utensílios",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em Boas Práticas de Cozinha?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de Boas Práticas de Cozinha, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em Boas Práticas de Cozinha devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de Boas Práticas de Cozinha deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em Boas Práticas de Cozinha serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em Boas Práticas de Cozinha, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
  "tbo": {
    titulo: "Avaliação TBO",
    notaMinima: 7,
    questoes: [
      {
        pergunta: "Qual é o principal objetivo do curso de TBO?",
        alternativas: [
          "Preparar o trabalhador para executar rotinas operacionais com segurança",
          "Tratar apenas de rotinas administrativas",
          "Substituir todas as normas de segurança",
          "Ensinar somente atividades comerciais",
        ],
        correta: 0,
      },
      {
        pergunta: "Antes de iniciar uma atividade relacionada a TBO, o trabalhador deve:",
        alternativas: [
          "Começar imediatamente",
          "Realizar análise de risco e seguir os procedimentos",
          "Ignorar a sinalização",
          "Usar qualquer ferramenta disponível",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual medida ajuda na prevenção em TBO?",
        alternativas: [
          "Planejamento, treinamento e controle dos riscos",
          "Improvisação durante a tarefa",
          "Retirada dos equipamentos de proteção",
          "Execução sem supervisão",
        ],
        correta: 0,
      },
      {
        pergunta: "O que significa procedimento operacional neste contexto?",
        alternativas: [
          "sequência padronizada para executar uma tarefa",
          "Um documento de vendas",
          "Uma atividade sem relação com segurança",
          "Um equipamento usado apenas no escritório",
        ],
        correta: 0,
      },
      {
        pergunta: "Quem deve cumprir os procedimentos de segurança em TBO?",
        alternativas: [
          "Somente o supervisor",
          "Somente o empregador",
          "Todos os envolvidos, conforme suas responsabilidades",
          "Apenas visitantes",
        ],
        correta: 2,
      },
      {
        pergunta: "Quando houver risco grave durante uma atividade de TBO, o trabalhador deve:",
        alternativas: [
          "Continuar normalmente",
          "Interromper a atividade e comunicar o responsável",
          "Esconder a situação",
          "Esperar o fim do expediente",
        ],
        correta: 1,
      },
      {
        pergunta: "Os equipamentos utilizados em TBO devem estar:",
        alternativas: [
          "Improvisados",
          "Em boas condições e adequados à atividade",
          "Sem identificação",
          "Sempre emprestados",
        ],
        correta: 1,
      },
      {
        pergunta: "A capacitação para atividades de TBO deve ser:",
        alternativas: [
          "Compatível com os riscos e com a função",
          "Opcional em qualquer situação",
          "Feita somente após acidentes",
          "Substituída por experiência informal",
        ],
        correta: 0,
      },
      {
        pergunta: "A sinalização de segurança em TBO serve para:",
        alternativas: [
          "Orientar e alertar sobre riscos e procedimentos",
          "Decorar o ambiente",
          "Substituir o treinamento",
          "Eliminar automaticamente todos os riscos",
        ],
        correta: 0,
      },
      {
        pergunta: "Após identificar uma condição insegura em TBO, deve-se:",
        alternativas: [
          "Ignorá-la",
          "Adotar medidas corretivas e registrar quando necessário",
          "Aguardar um acidente",
          "Transferir a responsabilidade ao colega",
        ],
        correta: 1,
      },
    ],
  },
};