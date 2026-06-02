<p align="center">
  <img src="../../../assets/logo_utfpr.png" alt="UTPR Logo" width="200" />
</p>

<h1 align="center"><strong>Pós-Graduação em Desenvolvimento Web com TypeScript e Inteligência Artificial</strong></h1>

<p align="center">
  👨‍🎓 <strong>Aluno:</strong> Bruno E. M. Ferreira  |  🎓 <strong>Turma:</strong> 2026
</p>

<p align="center">
  <strong>Tecnologias utilizadas nessa disciplina</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge" />
  <img src="https://img.shields.io/badge/Inteligência%20Artificial-FF6A00?style=for-the-badge&logo=robot&logoColor=white" alt="AI Badge" />
</p>

## Laboratório 3 — Operadores e Expressões Aritméticas e Lógicas

## Condições de conclusão

Laboratório 3: Operadores, Expressões e Valores de Contingência (`||` e `??`)

Neste laboratório, você desenvolverá operações matemáticas e lógicas utilizando TypeScript, analisando como expressões são avaliadas, como o mecanismo de curto-circuito funciona e como a escolha entre os operadores `||` e `??` influencia diretamente a integridade de sistemas reais.

Durante a atividade, serão praticados:

- Operadores aritméticos e relacionais;
- Operadores lógicos e o mecanismo de curto-circuito;
- Diferenciação prática entre os operadores `||` (OR) e `??` (Nullish Coalescing);
- Precedência de operadores e validação de regras de negócio;
- Uso de IA para revisão, auditoria e teste de mesa de expressões complexas.

## Contextualização

Sistemas corporativos e plataformas educacionais modernas dependem constantemente de expressões lógicas e de estratégias de contingência (fallbacks) para lidar com ausência de dados. Compreender como expressões são avaliadas e como a linguagem criva valores falsos é essencial para produzir código previsível, seguro e livre de bugs silenciosos.

Neste laboratório, você simulará partes de uma Plataforma Educacional Inteligente, sendo responsável por calcular progressos, validar acessos e aplicar configurações padrão com segurança.

## Cenário

Você está desenvolvendo as regras de negócio de um sistema backend de ensino. Suas tarefas envolvem desde o cálculo métrico de progresso de alunos até a resolução de problemas críticos de atribuição de valores padrão quando dados opcionais não são preenchidos.

Seu objetivo será implementar e auditar essas regras utilizando o TypeScript.

## Tarefa 1 — Operadores Aritméticos e Métricas

Crie um arquivo chamado `operators.ts` e declare as variáveis de controle de lições de um estudante:

```ts
let completedLessons = 18;
let totalLessons = 24;

let progress = (completedLessons / totalLessons) * 100;
console.log(`Progresso do aluno: ${progress}%`);
```

### Análise

Observe que:

- O operador `/` realiza a divisão e o `*` a multiplicação.
- Expressões podem combinar múltiplos operadores para gerar uma nova informação (uma taxa percentual).

## Tarefa 2 — Precedência de Operadores

No mesmo arquivo, adicione as seguintes expressões para testar o comportamento do motor de avaliação:

```ts
let result1 = 10 + 5 * 2;
let result2 = (10 + 5) * 2;

console.log(`Resultado 1: ${result1}`); // Esperado: 20
console.log(`Resultado 2: ${result2}`); // Esperado: 30
```

### Análise

Observe que:

- A multiplicação possui precedência nativa sobre a soma.
- O uso explícito de parênteses altera a ordem de execução, isolando operações.
- Na engenharia de software, parênteses são frequentemente usados para garantir a legibilidade e evitar ambiguidades.

## Tarefa 3 — Operadores Relacionais e Tipos Booleanos

Implemente uma validação de aprovação utilizando operadores relacionais:

```ts
let average = 7.5;
let approved = average >= 7;

console.log(`Aluno aprovado? ${approved}`);
```

### Análise

Perceba que os operadores relacionais (`>`, `>=`, `<`, `<=`, `===`, `!==`) produzem invariavelmente valores booleanos (`true` ou `false`), servindo como base para tomadas de decisão estruturais.

## Tarefa 4 — Operadores Lógicos e Curto-Circuito (AND / OR)

Declare as variáveis de controle de acesso ao curso e analise o comportamento do operador AND (`&&`):

```ts
let hasSubscription = true;
let completedPayment = false;

// O operador && busca o primeiro valor falso (falsy)
let canAccessCourse = hasSubscription && completedPayment;
console.log(`Acesso liberado ao curso? ${canAccessCourse}`);
```

Experimente no terminal substituindo as variáveis por testes diretos de curto-circuito e observe quem é retornado:

```ts
console.log(true && "Avançou"); // O que acontece aqui?
console.log(false && "Não avançou"); // O motor lê o segundo argumento?
console.log("" || "Nome Padrão"); // O OR rejeita a string vazia?
```

### Análise

- O operador `&&` realiza curto-circuito assim que encontra o primeiro valor falso, interrompendo a varredura para proteger o fluxo.
- O operador `||` busca o primeiro valor verdadeiro. Se o lado esquerdo for considerado falso (como uma string vazia `""`), ele pula para o próximo elemento.

## Tarefa 5 — A Armadilha do OR (`||`) vs A Segurança do Nullish Coalescing (`??`)

Nesta tarefa, simularemos uma regra de negócio de configuração da plataforma. O sistema permite que o professor configure uma nota bônus opcional para os alunos. Se o professor não configurar nada, o sistema deve aplicar um bônus padrão de `1.5` pontos.

No entanto, o professor configurou o bônus especificamente como `0` (zero), pois a turma não mereceu bônus.

Adicione o seguinte código no seu arquivo e compare as duas estratégias de fallback:

```ts
// Cenário: O professor definiu o bônus como ZERO
let bonusConfigurado: number = 0;

// Estratégia Antiga com OR (||)
let bonusComOr = bonusConfigurado || 1.5;

// Estratégia Moderna com Nullish Coalescing (??)
let bonusComNullish = bonusConfigurado ?? 1.5;

console.log(`Bônus com operador OR: ${bonusComOr}`); // O que foi impresso?
console.log(`Bônus com operador Nullish: ${bonusComNullish}`); // Qual está correto?
```

### Análise Crítica

Perceba o bug silencioso:

- O operador `||` avalia o número `0` como um valor falso (falsy). Por isso, ele rejeita o zero e aplica o valor padrão de `1.5` de forma incorreta.
- O operador `??` busca apenas por valores inexistentes. Como o número `0` é um dado real e existente (não é `null` nem `undefined`), o operador aceita o zero e encerra a execução por curto-circuito, mantendo a integridade da regra de negócio.

## Tarefa 6 — Uso de IA para Auditoria de Expressões e Regras de Negócio

Envie todo o código gerado no arquivo `operators.ts` para uma IA utilizando o prompt estruturado abaixo:

> Atue como um Engenheiro de Software especialista em TypeScript.
> Analise este código focado em operadores e responda de forma objetiva:
>
> 1. Explique como o mecanismo de curto-circuito se comportou na Tarefa 4.
> 2. Na Tarefa 5, qual foi o impacto arquitetural e o risco de negócio gerado pelo operador OR (`||`)?
> 3. Do ponto de vista de Truthiness e Falsiness, por que o Nullish Coalescing (`??`) resolveu o problema do número 0?
> 4. Sugira uma melhoria de legibilidade para as expressões lógicas apresentadas.

## Reflexão

Após analisar o retorno da IA e os testes executados no terminal, responda mentalmente ou no seu caderno de estudos:

- Em quais cenários de desenvolvimento de sistemas eu NUNCA devo utilizar o operador `||` para valores padrão?
- Como o curto-circuito pode ser utilizado como uma barreira de proteção antes de realizarmos operações lógicas complexas?
- Qual é a diferença conceitual entre uma "ausência de dado" (`null`/`undefined`) e um "dado zerado" ou "string vazia"?

## Resultado Esperado

Ao final deste laboratório, você deve ter compreendido que:

- Operadores aritméticos e relacionais ditam o comportamento de transformações e testes.
- Os operadores lógicos utilizam o princípio de curto-circuito para otimizar e proteger a execução do código.
- O operador `||` pode gerar falhas críticas ao desconsiderar valores válidos como `0`, `""` e `false`.
- O operador `??` é a ferramenta de engenharia correta e segura para tratar dados nulos ou indefinidos sem corromper valores numéricos legítimos.

## Competências Desenvolvidas

- Modelar e implementar regras de negócio restritas em TypeScript;
- Identificar e mitigar riscos de bugs lógicos ligados à coerção implícita e crivos de falsidade da linguagem;
- Escolher estrategicamente entre soluções com `||` e `??` baseando-se no comportamento dos dados;
- Utilizar IA de forma analítica para auditar a consistência lógica e a legibilidade de códigos de back-end.
