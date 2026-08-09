# 🏥 Sistema de Triagem e Gerenciamento de Atendimento para UPA

Sistema de Triagem para Unidade de Pronto Atendimento (UPA) desenvolvido em **TypeScript** e **Node.js**, sem interface gráfica (via terminal CLI), aplicando os princípios de **Código Limpo (Clean Code)** e **Arquitetura Limpa (Clean Architecture)**.

---

## 🚀 Tecnologias e Recursos Utilizados

- **Linguagem**: TypeScript (v5.3+)
- **Runtime**: Node.js (v20+)
- **Pattern Matching**: `ts-pattern` (v5.6+)
- **Test Runner**: Node.js Test Runner nativo (`node:test` e `node:assert`)
- **Executor TypeScript**: `tsx`
- **Validação de Dados**: Expressões Regulares (Regex)
- **Modelagem Tipada**: Interfaces, Type Aliases e Utility Types (`Partial`, `Pick`, `Omit`, `Readonly`, `Record`)

---

## 📁 Estrutura do Projeto (Clean Architecture)

```text
sistema-de-triagem-para-upa/
├── data/
│   └── initial_patients.json        # Dados simulados para carga externa assíncrona (R06)
├── src/
│   ├── domain/
│   │   ├── enums/
│   │   │   └── priority-level.enum.ts# Níveis de urgência da triagem (Vermelho, Laranja, Amarelo, Verde, Azul)
│   │   ├── entities/
│   │   │   └── patient.entity.ts    # Entidade Paciente e tipos do domínio (R05)
│   │   └── types/
│   │       └── utility-types.ts     # Tipos utilitários do TypeScript (RA02)
│   ├── validators/
│   │   └── patient.validator.ts     # Validadores com Expressões Regulares (RA01)
│   ├── services/
│   │   ├── classification.service.ts# Classificação de Risco com ts-pattern (R03, RA03)
│   │   ├── patient.service.ts       # Gestão e Cadastro de Pacientes (R01, R02)
│   │   ├── queue.service.ts         # Fila de Atendimento com ordenação por prioridade (R03)
│   │   └── stats.service.ts         # Consultas e Estatísticas da UPA (R04)
│   ├── infrastructure/
│   │   └── api-simulator.service.ts # Simulação de API externa com Promises/JSON (R06)
│   ├── cli/
│   │   └── menu.ts                  # Menu Interativo via Terminal (Regra 04)
│   └── index.ts                     # Ponto de entrada da aplicação
├── tests/
│   ├── classification.test.ts       # Testes da classificação de risco (R07)
│   ├── queue.test.ts                # Testes da ordenação da fila (R07)
│   ├── validation.test.ts           # Testes das validações Regex (R07)
│   └── api-simulator.test.ts        # Testes das operações assíncronas (R07)
├── package.json
├── tsconfig.json
└── README.md                        # Documentação detalhada do projeto
```

---

## 📑 Mapeamento e Detalhamento dos Requisitos

### **R01 — Cadastro e Gerenciamento de Pacientes**
- **Implementação**: O serviço `PatientService` centraliza as operações de criação, consulta e atualização dos pacientes.
- **Campos**: Nome, Idade, Sintomas, CPF, Telefone, E-mail, Data de Chegada (`Timestamp`) e Grau de Prioridade de Atendimento.
- **Decisão Técnica**: O cadastro armazena o histórico do paciente mantendo imutabilidade via cópias profundas e gera IDs únicos baseados no timestamp e índice.

### **R02 — Organização das Funcionalidades do Sistema**
- **Implementação**: Código estritamente modularizado em camadas de responsabilidade única (Domínio, Serviços de Negócio, Validações, Infraestrutura e CLI).
- **Decisão Técnica**: Uso de funções puras e exportações nomeadas para facilitar reutilização, testes isolados e baixo acoplamento.

### **R03 — Classificação e Gerenciamento da Fila de Atendimento**
- **Implementação**: O `QueueService` gerencia a fila de pacientes utilizando uma estrutura de prioridade estrita baseada no Protocolo de Manchester:
  1. **Vermelho** (Emergência - Atendimento Imediato)
  2. **Laranja** (Muito Urgente - Atendimento em até 10 min)
  3. **Amarelo** (Urgente - Atendimento em até 60 min)
  4. **Verde** (Pouco Urgente - Atendimento em até 120 min)
  5. **Azul** (Não Urgente - Atendimento em até 240 min)
- **Ordenação**: Pacientes com a mesma prioridade são atendidos em ordem de chegada (*FIFO* por timestamp).

### **R04 — Consulta, Busca e Geração de Estatísticas**
- **Implementação**: O `StatsService` disponibiliza relatórios agregados:
  - Listagem de pacientes por nível de prioridade.
  - Busca de pacientes por CPF, nome ou ID.
  - Estatísticas de atendimento: quantidade total de pacientes, distribuição por cor/prioridade (usando `reduce`), idade média e tempo médio de espera.

### **R05 — Modelagem das Entidades do Sistema**
- **Implementação**: Interfaces estritas em `src/domain/entities/patient.entity.ts` e enum `PriorityLevel`.
- **Decisão Técnica**: Tipagem estrita de todos os atributos para eliminar inconsistências de dados e erros de runtime em potencial.

### **R06 — Simulação de Comunicação com uma API**
- **Implementação**: O `ApiSimulatorService` lê e escreve arquivos JSON em `data/initial_patients.json` através de `fs/promises`, simulando atrasos de rede assíncronos (`setTimeout` envelopado em `Promise`).
- **Decisão Técnica**: Permite carregar uma base inicial de pacientes para testes e salvar o estado do atendimento sem depender de um banco de dados externo.

### **R07 — Validação Automatizada das Funcionalidades**
- **Implementação**: Suíte de testes criada com o **Node.js Test Runner (`node:test`)** e asserções nativas (`node:assert`).
- **Escopo de Testes**: Validações Regex, ordenação de prioridade da fila, regras de classificação de risco e persistência assíncrona.

### **RA01 — Validação de Dados com Expressões Regulares (Regex)**
- **Implementação**: O módulo `src/validators/patient.validator.ts` aplica Expressões Regulares para validar os formatos dos campos de entrada:
  - **CPF**: `^\d{3}\.\d{3}\.\d{3}-\d{2}$` ou `^\d{11}$` (formato com ou sem pontuação).
  - **Telefone**: `^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$` (suporta fixo e celular com DDD).
  - **E-mail**: `^[^\s@]+@[^\s@]+\.[^\s@]+$` (padrão RFC de endereço de e-mail).

### **RA02 — Aperfeiçoamento da Tipagem utilizando Utility Types**
- **Implementação**: Aplicação explícita dos Utility Types do TypeScript em `src/domain/types/utility-types.ts`:
  - `Partial<Patient>`: Utilizado no DTO de atualização (`PatientUpdateDTO`), permitindo alterar apenas os campos informados pelo usuário.
  - `Omit<Patient, 'id' | 'dataDeChegada' | 'prioridade'>`: Utilizado no DTO de cadastro (`PatientRegistrationDTO`), exigindo do usuário apenas os dados de entrada sem expor campos gerados pelo sistema.
  - `Pick<Patient, 'id' | 'nome' | 'prioridade'>`: Utilizado no resumo de atendimento (`PatientSummaryDTO`).
  - `Readonly<Patient>`: Garante que os registros do paciente não sejam alterados acidentalmente fora do serviço responsável.
  - `Record<PriorityLevel, number>`: Utilizado na contagem e estatísticas agregadas por prioridade (`PriorityCountRecord`).

### **RA03 — Aplicação de Recurso Avançado do Ecossistema TypeScript (`ts-pattern`)**
- **Implementação**: Integração da biblioteca **`ts-pattern`** em `src/services/classification.service.ts` para realizar *Pattern Matching* declarativo e seguro durante a triagem.
- **Justificativa**: Substitui longas estruturas de `if/else` ou `switch` por correspondência de padrões fortemente tipada (`match(sintomas)...`), garantindo que todas as combinações de sintomas e sinais vitais (ex.: parada cardiorrespiratória, dor no peito, febre alta, ferimentos leves) sejam tratadas sem risco de `undefined`.

---

## 🛠️ Instruções de Instalação e Execução

### **Pré-requisitos**
- Node.js (versão 20.0.0 ou superior)
- NPM (versão 9.0.0 ou superior)

### **1. Instalação das Dependências**
Navegue até a pasta do projeto e execute:
```bash
npm install
```

### **2. Executar a Aplicação (Menu Interativo Terminal)**
Para iniciar o sistema em modo de produção/execução direta:
```bash
npm start
```

Para iniciar em modo de desenvolvimento com hot-reload (watch):
```bash
npm run dev
```

---

## 🧪 Instruções para Execução dos Testes Automatizados

Os testes do sistema foram desenvolvidos com o test runner nativo do Node.js (`node:test`).

Para executar a suíte completa de testes:
```bash
npm test
```

---

## 📋 Exemplos de Uso do Sistema (Terminal CLI)

Ao iniciar a aplicação (`npm start`), o menu interativo apresentará as seguintes opções:

```text
==================================================
   🏥 SISTEMA DE TRIAGEM E GERENCIAMENTO DA UPA
==================================================
1. Cadastrar Novo Paciente
2. Classificar Paciente & Adicionar à Fila de Triagem
3. Atender Próximo Paciente (Maior Prioridade)
4. Consultar Fila de Atendimento
5. Buscar Pacientes (por Nome ou CPF)
6. Atualizar Cadastro de Paciente
7. Exibir Estatísticas do Atendimento
8. Carregar Dados de Exemplo da API Externa (Assíncrono)
0. Sair do Sistema
==================================================
```

### **Exemplo 1: Cadastrar um Paciente e Classificar Risco**
1. Selecione a opção `1` para cadastrar.
2. Informe Nome: `Maria Silva`, Idade: `45`, CPF: `123.456.789-00`, Telefone: `(41) 99999-8888`, E-mail: `maria@email.com`, Sintomas: `Dor no peito intensa e falta de ar`.
3. Selecione a opção `2` para classificar. O motor `ts-pattern` analisará os sintomas e atribuirá automaticamente a prioridade **VERMELHO (Emergência)**, inserindo Maria no topo da fila.

### **Exemplo 2: Atendimento por Prioridade**
1. Com os pacientes Maria (Vermelho - Emergência) e João (Verde - Pouco Urgente) na fila, selecione a opção `3` (Atender Próximo).
2. O sistema chamará **Maria Silva** primeiro, independentemente de ter chegado depois de João, respeitando o Protocolo de Manchester.
