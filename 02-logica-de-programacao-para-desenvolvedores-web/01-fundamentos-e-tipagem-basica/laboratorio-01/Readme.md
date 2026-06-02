# Laboratório 1: Gerador de Prompt para IA com TypeScript

## Objetivo
Neste laboratório, você irá desenvolver um pequeno gerador de prompts para Inteligência Artificial utilizando TypeScript.

O objetivo é praticar:
- declaração de variáveis tipadas
- utilização de tipos primitivos
- uso de Template Literals
- geração dinâmica de texto
- boas práticas de tipagem estática
- integração entre TypeScript e ferramentas de IA

## Tarefa 1 — Estrutura Base
Crie um arquivo chamado `ai-prompt.ts`.

Declare as seguintes variáveis tipadas:

```ts
let userName: string = "Mariana";
let topic: string = "TypeScript";
let maxTokens: number = 200;
let premiumUser: boolean = true;
```

## Tarefa 2 — Construção do Prompt
Crie uma variável chamada `promptMessage`.

Utilizando Template Literals:
- exiba o nome do usuário
- informe o tema solicitado
- mostre a quantidade máxima de tokens
- informe o tipo de acesso do usuário

Exemplo:

```ts
let promptMessage = `User: ${userName}
Create a study guide about ${topic}.
Maximum tokens: ${maxTokens}
Access Level: ${premiumUser ? "Premium User" : "Free User"}`;
```

## Tarefa 3 — Exibição do Resultado
Exiba o conteúdo utilizando:

```ts
console.log(promptMessage);
```

## Tarefa 4 — Testes de Tipagem
Realize os seguintes testes no VS Code.

- Teste 1 — Alteração válida:

```ts
maxTokens = 500;
```

- Teste 2 — Erro proposital de tipagem:

```ts
maxTokens = "500";
```

Observe:
- o comportamento do compilador
- o erro exibido pelo TypeScript
- a diferença entre tipagem dinâmica e tipagem estática

## Tarefa 5 — Revisão com Inteligência Artificial
Copie seu código e envie para uma IA utilizando o prompt:

> Atue como um revisor de código TypeScript. Verifique se os tipos primitivos foram utilizados corretamente e sugira melhorias de legibilidade e organização.

Analise:
- sugestões recebidas
- melhorias propostas
- como a tipagem auxilia ferramentas modernas de IA

## Resultado Esperado
Ao executar o programa, o terminal deverá apresentar uma saída semelhante a:

```
User: Mariana
Create a study guide about TypeScript.
Maximum tokens: 200
Access Level: Premium User
```

## Competências Desenvolvidas
Ao final deste laboratório, espera-se que o estudante seja capaz de:
- compreender tipagem estática
- utilizar tipos primitivos em TypeScript
- construir strings dinâmicas com Template Literals
- identificar erros de tipagem
- utilizar IA como apoio ao desenvolvimento moderno
