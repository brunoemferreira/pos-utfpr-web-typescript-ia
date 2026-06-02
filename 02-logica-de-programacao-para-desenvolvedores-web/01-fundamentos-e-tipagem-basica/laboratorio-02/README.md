# Laboratório 02 — Inferência de Tipo vs. Tipagem Explícita

## Condições de conclusão

Neste laboratório, você continuará o desenvolvimento dos conceitos estudados em TypeScript, explorando como o compilador realiza inferência automática de tipos e quando a tipagem explícita se torna necessária.

Durante a atividade, serão praticados:
- inferência de tipos;
- tipagem explícita;
- análise de comportamento do compilador;
- boas práticas modernas de TypeScript;
- diagnóstico de problemas envolvendo `any`;
- uso de IA para auditoria e revisão de código.

## Contextualização

O TypeScript não é apenas um "verificador de erros". Ele funciona como um mecanismo inteligente de análise estática capaz de interpretar o fluxo do código, prever comportamentos e auxiliar o desenvolvedor em tempo real.

Na prática, isso significa que o compilador frequentemente consegue identificar automaticamente os tipos das variáveis sem necessidade de anotações explícitas. Porém, em cenários maiores e colaborativos, existem situações em que declarar os tipos manualmente melhora:
- legibilidade;
- manutenção;
- documentação do código;
- integração com IDEs e IA;
- segurança em contratos de funções e módulos.

Neste laboratório, você investigará esse equilíbrio entre inferência e anotação explícita.

## Cenário

Você está desenvolvendo parte de uma plataforma educacional com IA capaz de gerar explicações automáticas sobre conteúdos técnicos. O sistema recebe perguntas dos usuários, processa prompts e organiza informações que posteriormente serão enviadas para um modelo de IA generativa.

## Tarefa 1 — Inferência Inteligente do TypeScript

Crie um arquivo chamado `type-inference.ts`.

Declare as seguintes variáveis utilizando tipagem explícita:

```ts
let userName: string = "Mariana";
let promptTokens: number = 1200;
let responseTime: number = 1.8;
```

Agora crie uma variável chamada `estimatedCost` responsável por calcular o custo estimado da execução da IA:

```ts
let estimatedCost = promptTokens * 0.002;
```

### Análise

Passe o mouse sobre a variável `estimatedCost` no VS Code. Observe que:
- o TypeScript identifica automaticamente o tipo;
- nenhuma anotação explícita foi necessária;
- o compilador inferiu o tipo como `number`.

## Tarefa 2 — Tipagem Explícita vs Inferência

Crie duas variáveis:

```ts
let explicitScore: number = 10;
let inferredScore = 10;
```

### Analise

Observe que:
- ambas possuem o mesmo comportamento;
- o TypeScript infere automaticamente `number`;
- a segunda versão é mais limpa e moderna.

#### Teste de Segurança

Tente alterar o tipo da variável inferida:

```ts
inferredScore = "dez";
```

Observe o erro exibido pelo compilador.

### Analise

Perceba que:
- o TypeScript “lembra” o tipo inferido;
- inferência não significa ausência de tipagem;
- o código continua sendo estaticamente tipado.

## Tarefa 3 — O Problema da Inferência Tardia

Agora declare uma variável sem valor inicial:

```ts
let aiResponse;
```

Em seguida:

```ts
aiResponse = "Resposta gerada pela IA";
aiResponse = 404;
```

### Observe

Perceba que:
- o TypeScript não apresenta erro;
- a variável foi inferida como `any`;
- isso reduz a segurança do código.

### Correção do Problema

Agora reescreva utilizando tipagem explícita:

```ts
let aiResponse: string;
aiResponse = "Resposta gerada pela IA";
aiResponse = 404;
```

### Observe o novo comportamento do compilador

Analise:
- o erro aparece imediatamente;
- o contrato da variável ficou claro;
- o código se torna mais previsível.

## Tarefa 4 — Best Practices

Analise os exemplos abaixo.

Exemplo recomendado

```ts
let modelName = "GPT-4";
let maxTokens = 2048;
```

Exemplo redundante

```ts
let modelName: string = "GPT-4";
let maxTokens: number = 2048;
```

## Tarefa 5 — Auditoria com Inteligência Artificial

Copie seu código e envie para uma IA utilizando o prompt abaixo:

> Atue como um especialista em TypeScript.
>
> Analise este código e responda:
> 1. Quais anotações de tipo são redundantes?
> 2. Quais são importantes para documentação e manutenção?
> 3. Existe algum risco de uso implícito de any?
> 4. O código segue boas práticas modernas?

## Reflexão

Após analisar as sugestões da IA, reflita:
- quais tipos poderiam ser removidos;
- quais tipos deveriam permanecer;
- como a inferência melhora a produtividade;
- como a tipagem explícita melhora a manutenção;
- como IA e TypeScript trabalham juntos para aumentar a qualidade do código.

## Resultado Esperado

Ao final do laboratório, você deverá compreender que:
- inferência de tipos não reduz a segurança;
- o TypeScript continua sendo estaticamente tipado;
- tipagem explícita deve ser usada estrategicamente;
- o tipo `any` normalmente surge em variáveis sem inicialização;
- inferência e anotação trabalham juntas para produzir código limpo e seguro.

## Competências Desenvolvidas

Ao final deste laboratório, espera-se que o estudante seja capaz de:
- compreender o funcionamento da inferência de tipos;
- diferenciar inferência e tipagem explícita;
- identificar situações de uso implícito de `any`;
- aplicar boas práticas modernas de TypeScript;
- utilizar IA como ferramenta de auditoria de código;
- produzir código mais limpo, legível e seguro.
