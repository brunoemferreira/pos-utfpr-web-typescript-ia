# Sistema de Triagem para UPA

Uma Unidade de Pronto Atendimento (UPA) realiza diariamente centenas de atendimentos. O processo de triagem precisa classificar pacientes conforme o grau de urgência, organizar a fila de atendimento, registrar alterações de prioridade e disponibilizar estatísticas para a equipe médica.

Sua tarefa será desenvolver um Sistema de Triagem e Gerenciamento de Atendimento utilizando exclusivamente TypeScript, sem interface gráfica obrigatória. O sistema poderá ser executado via terminal (Node.js), simulando a entrada de pacientes, classificação de risco, gerenciamento das filas e geração de relatórios.

Ao longo do desenvolvimento, você deverá aplicar os principais conceitos estudados na disciplina, organizando o código em módulos e implementando funcionalidades de forma incremental. Além disso, o projeto inclui desafios de pesquisa para incentivar a consulta à documentação oficial do TypeScript e a exploração de recursos modernos do ecossistema.

## Requisitos do Projeto

Os requisitos abaixo descrevem as funcionalidades esperadas para o sistema, bem como as tecnologias, práticas e recursos técnicos que deverão ser aplicados durante o desenvolvimento.

| Requisito | Funcionalidade / Descrição | Conteúdos Avaliados |
| --- | --- | --- |
| **R01 — Cadastro e gerenciamento de pacientes** | O sistema deve permitir cadastrar pacientes contendo informações como nome, idade, sintomas, data de chegada e prioridade de atendimento. Também deve permitir consultar e atualizar informações dos pacientes cadastrados. | **Módulo 1 — Fundamentos e Tipagem Básica:**<br>Variáveis, tipos primitivos (string, number, boolean), inferência de tipos, tipagem explícita, operadores e expressões. |
| **R02 — Organização das funcionalidades do sistema** | O sistema deve ser estruturado utilizando funções reutilizáveis e módulos independentes, permitindo separar responsabilidades como cadastro, fila, estatísticas e validações. | **Módulo 2 — Funções e Escopo:**<br>Declaração de funções, parâmetros obrigatórios, opcionais e default, Arrow Functions, escopo de variáveis.<br><br>**Módulo 6 — Modularização:**<br>Importação e exportação (named e default). |
| **R03 — Classificação e gerenciamento da fila de atendimento** | O sistema deve aplicar regras de negócio para classificar pacientes e controlar a ordem de atendimento conforme a prioridade definida. Deve utilizar estruturas de decisão e repetição para controlar o fluxo da aplicação. | **Módulo 3 — Estruturas de Controle e Decisão:**<br>if/else, switch, operador ternário, for, while, Truthiness e Falsiness. |
| **R04 — Consulta, busca e geração de estatísticas** | O sistema deve disponibilizar operações de análise dos dados dos pacientes, como listar pacientes por prioridade, localizar pacientes específicos, verificar condições e gerar informações consolidadas. | **Módulo 4 — Manipulação Avançada de Arrays:**<br>map(), filter(), find(), some(), reduce() e join(). |
| **R05 — Modelagem das entidades do sistema** | O sistema deve representar corretamente as entidades do domínio utilizando estruturas de dados tipadas, garantindo maior segurança e organização do código. | **Módulo 5 — Tipagem de Objetos e Estruturas de Dados:**<br>Interfaces, Type Aliases, Union Types, Arrays de Objetos, Destructuring e Spread Operator. |
| **R06 — Simulação de comunicação com uma API** | O sistema deve implementar uma camada simulando o carregamento de dados externos, utilizando operações assíncronas e manipulação de informações no formato JSON. | **Módulo 6 — Modularização e Assincronismo:**<br>Promises, tipagem de retornos e manipulação de JSON. |
| **R07 — Validação automatizada das funcionalidades** | O sistema deve possuir testes automatizados para validar as principais regras de negócio, incluindo cadastro, classificação de prioridade, consultas e operações assíncronas. Os testes devem ser implementados utilizando o Node.js Test Runner (node:test). | **Competência transversal:**<br>Testes automatizados, validação de regras de negócio, qualidade de código e uso consciente de IA como ferramenta de apoio ao desenvolvimento. |
| **RA01 — Validação de dados com Expressões Regulares** | O estudante deve pesquisar e implementar validações utilizando Regex para garantir a qualidade dos dados de entrada do sistema (ex.: CPF, telefone, e-mail ou outros campos relevantes). | **Pesquisa e aprofundamento:**<br>Expressões Regulares, validação de dados e consulta à documentação técnica. |
| **RA02 — Aperfeiçoamento da tipagem utilizando Utility Types** | O estudante deve aplicar pelo menos um recurso avançado de tipagem do TypeScript, como Partial, Pick, Omit, Readonly ou Record, justificando sua utilização no contexto do projeto. | **Pesquisa e aprofundamento:**<br>Recursos avançados de tipagem do TypeScript e boas práticas de modelagem de dados. |
| **RA03 — Aplicação de recurso avançado do ecossistema TypeScript** | O estudante deve pesquisar e incorporar um recurso moderno ao projeto, como Pattern Matching utilizando ts-pattern ou outra biblioteca/técnica equivalente, justificando sua escolha e aplicação. | **Pesquisa e aprofundamento:**<br>Ecossistema TypeScript, bibliotecas modernas, leitura de documentação e aprendizagem autônoma. |

---

## 🛠️ Detalhamento Técnico da Implementação dos 10 Requisitos

Abaixo está o mapeamento detalhado de como cada um dos 10 requisitos técnicos foi implementado e contemplado no projeto:

### 1. **R01 — Cadastro e Gerenciamento de Pacientes**
- **Implementação:** Arquivo [`src/services/patient.service.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/services/patient.service.ts) e [`src/cli/cli-menu.service.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/cli/cli-menu.service.ts).
- **Decisão Técnica:** A classe `PatientService` gerencia o cadastro e atualização de pacientes em memória com validações estritas (Nome, Idade, CPF, Telefone com formatação automática sem pontuação obrigatória, E-mail, Sintomas) e prevenção de duplicidade de CPF.

### 2. **R02 — Organização das Funcionalidades do Sistema**
- **Implementação:** Estrutura modular limpa em `src/`:
  - `src/types/`: Definição de interfaces e enums oficial em Português (`TriagePriority.VERMELHO`, `LARANJA`, `AMARELO`, `VERDE`, `AZUL`).
  - `src/validators/`: Validações de entrada em Regex.
  - `src/utils/`: Pattern Matching via `ts-pattern`.
  - `src/services/`: Serviços de negócios.
  - `src/api/`: Simulação de API externa.
  - `src/cli/`: Interface de menu interativo de linha de comando.

### 3. **R03 — Classificação e Gerenciamento da Fila de Atendimento**
- **Implementação:** Arquivo [`src/services/triage-queue.service.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/services/triage-queue.service.ts).
- **Decisão Técnica:** Fila ordenada por severidade médica de Manchester (`VERMELHO` > `LARANJA` > `AMARELO` > `VERDE` > `AZUL`) combinada com a ordem de chegada (FIFO). Permite reavaliar a prioridade de um paciente na fila a qualquer momento.

### 4. **R04 — Consulta, Busca e Geração de Estatísticas**
- **Implementação:** Arquivo [`src/services/statistics.service.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/services/statistics.service.ts).
- **Decisão Técnica:** Aplicação prática dos métodos funcionais de Array: `filter()`, `find()`, `some()`, `reduce()`, `map()` e `join()`. Exibe relatórios com distribuição agrupada por cores em Português: `{ VERMELHO: X, LARANJA: X, AMARELO: X, VERDE: X, AZUL: X }`.

### 5. **R05 — Modelagem das Entidades do Sistema**
- **Implementação:** Arquivos em `src/types/` (`patient.types.ts`, `priority.types.ts`, `api.types.ts`).
- **Decisão Técnica:** Interfaces, Enums em Português, Union Types, Arrays de Objetos, Destructuring e Spread Operator.

### 6. **R06 — Simulação de Comunicação com uma API**
- **Implementação:** Arquivo [`src/api/external-patient-api.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/api/external-patient-api.ts).
- **Decisão Técnica:** Comunicação assíncrona baseada em `Promise` e manipulação de payloads JSON.

### 7. **R07 — Validação Automatizada das Funcionalidades**
- **Implementação:** Suíte de 28 testes em `tests/` utilizando o **Node.js Test Runner** (`node:test`).

### 8. **RA01 — Validação de Dados com Expressões Regulares (Regex)**
- **Implementação:** Arquivo [`src/validators/patient.validator.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/validators/patient.validator.ts).
- **Decisão Técnica:** Validações de formato para CPF, Telefone (aceitando entradas com ou sem máscara via `formatPhone`) e E-mail, além de formatação sanitizada de CPF.

### 9. **RA02 — Aperfeiçoamento da Tipagem utilizando Utility Types**
- **Implementação:** Arquivos `src/types/patient.types.ts` e `src/types/priority.types.ts`.
- **Decisão Técnica:** `Omit`, `Partial`, `Readonly` e `Record`.

### 10. **RA03 — Aplicação de Recurso Avançado do Ecossistema TypeScript (`ts-pattern`)**
- **Implementação:** Arquivo [`src/utils/priority-matcher.util.ts`](file:///d:/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/99-projeto/sistema-de-triagem-para-UPA/src/utils/priority-matcher.util.ts).
- **Decisão Técnica:** Pattern Matching declarativo para SLAs com emojis de identificação visual (🔴 🟠 🟡 🟢 🔵) e inferência automática de prioridade por sintomas.

---

## 🚀 Instruções de Instalação e Execução

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Compilação do TypeScript
```bash
npm run build
```

### 3. Execução do Sistema Interativo no Terminal
```bash
npm start
```

---

## 💻 Menu Interativo do Terminal

Ao rodar `npm start`, o sistema exibe o menu interativo com suporte a opções numeradas de 1 a 5 com emojis para escolha de prioridade:

```text
Selecione a cor de prioridade de Manchester do paciente:
  1 - 🔴 Vermelho (Emergência — Atendimento Imediato)
  2 - 🟠 Laranja  (Muito Urgente — Até 10 min)
  3 - 🟡 Amarelo  (Urgente — Até 60 min)
  4 - 🟢 Verde    (Pouco Urgente — Até 120 min)
  5 - 🔵 Azul     (Não Urgente — Até 240 min)
```

---

## 🧪 Instruções para Execução dos Testes Automatizados

```bash
npm test
```

---

## 📦 Entrega

- **Link do Repositório público GitHub:** [Link do repositório a ser inserido]
- **Projeto completo:** Estruturado em `src/` e `tests/`.
- **README.md:** Detalhando os 10 requisitos (R01-R07 e RA01-RA03).
- **Instruções de execução e testes:** Documentadas acima.
- **Exemplos de uso:** Apresentados acima.
