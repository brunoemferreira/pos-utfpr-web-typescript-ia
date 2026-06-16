# Laboratório 1: Modernizando Funções com Arrow Functions

Condições de conclusão

Laboratório 1: Modernizando Funções com Arrow Functions

Neste laboratório, você irá explorar a utilização de Arrow Functions em TypeScript, comparando-as com funções tradicionais e analisando situações em que o retorno explícito e o retorno implícito tornam o código mais legível e eficiente.

Durante a atividade, serão praticados:

- declaração de Arrow Functions;
- tipagem de parâmetros e retornos;
- retorno explícito;
- retorno implícito;
- modernização de código TypeScript;
- análise de legibilidade;
- uso de IA para revisão de código.

Contextualização

Em aplicações modernas desenvolvidas com TypeScript, funções são utilizadas constantemente para processar dados, validar informações, transformar estruturas e implementar regras de negócio.

Com o crescimento dos frameworks modernos, as Arrow Functions passaram a ser amplamente utilizadas por oferecerem uma sintaxe mais concisa e adequada para operações frequentes envolvendo componentes, eventos e manipulação de dados. Entretanto, utilizar Arrow Functions não significa apenas escrever menos código. O desenvolvedor precisa compreender quando utilizar retorno explícito, quando utilizar retorno implícito e como manter a legibilidade em funções que crescem ao longo do projeto.

Neste laboratório, você investigará essas diferenças por meio da modernização de funções escritas em TypeScript.

Cenário

Você está participando do desenvolvimento de uma plataforma educacional que utiliza Inteligência Artificial para gerar recomendações de conteúdo aos estudantes. Parte do sistema foi desenvolvida utilizando funções tradicionais e a equipe decidiu padronizar a base de código utilizando Arrow Functions para melhorar a consistência e facilitar a manutenção do projeto.

Sua tarefa será converter funções existentes e avaliar os impactos dessa mudança.

Tarefa 1: Convertendo Funções Tradicionais

Crie um arquivo chamado: `arrow-functions.ts`

Implemente as seguintes funções utilizando a sintaxe tradicional:

```ts
function calculateDiscount(price: number): number {
  return price * 0.9;
}

function isApproved(score: number): boolean {
  return score >= 7;
}
```

Agora converta ambas para Arrow Functions.

Analise:

- o que mudou na sintaxe;
- o que permaneceu igual;
- como a tipagem continua sendo aplicada.

Tarefa 2: Trabalhando com Retorno Explícito

Crie a seguinte função:

```ts
const formatUserName = (name: string): string => {
  const upperName = name.toUpperCase();

  const message = `Olá ${upperName}`;

  return message;
};
```

Execute a função utilizando diferentes nomes.

Observe:

- a utilização do bloco com chaves;
- a existência de múltiplas instruções;
- a necessidade da palavra `return`.

Analise: por que o retorno explícito é necessário; quais etapas são executadas antes do retorno.

Tarefa 3: Trabalhando com Retorno Implícito

Crie a função abaixo:

```ts
const isApproved = (score: number): boolean => score >= 7;
```

Execute alguns testes utilizando diferentes notas.

Observe:

- ausência das chaves;
- ausência da palavra `return`;
- simplificação da sintaxe.

Analise: quando esse formato é adequado; quais limitações ele possui.

Tarefa 4: Comparando Legibilidade

Compare os dois exemplos:

Versão com retorno implícito

```ts
const calculateFinalPrice = (price: number): number => price * 0.9;
```

Versão com retorno explícito

```ts
const calculateFinalPrice = (price: number): number => {
  const discount = price * 0.1;

  const finalPrice = price - discount;

  return finalPrice;
};
```

Reflita:

- qual versão é mais simples;
- qual versão seria mais fácil de expandir futuramente;
- em qual situação cada abordagem seria mais apropriada.

Tarefa 5: Revisão com Inteligência Artificial

Utilize uma ferramenta de IA para revisar as funções desenvolvidas.

Envie o seguinte prompt:

> Atue como um especialista em TypeScript.
> Analise as Arrow Functions abaixo e responda:
>
> - Existem oportunidades de utilizar retorno implícito?
> - Alguma função ficou excessivamente compacta?
> - Há melhorias de legibilidade?
> - A tipagem foi utilizada adequadamente?
> - O código segue boas práticas modernas?

Reflexão

Após analisar as sugestões fornecidas pela IA, reflita:

- quando utilizar retorno explícito;
- quando utilizar retorno implícito;
- como equilibrar concisão e legibilidade;
- quais decisões melhoram a manutenção do código;
- como ferramentas de IA podem auxiliar revisões técnicas.

Resultado Esperado

Ao final do laboratório, você deverá ser capaz de converter funções tradicionais para Arrow Functions, compreender as diferenças entre retorno explícito e retorno implícito e identificar situações em que cada abordagem produz código mais claro e sustentável.

Além disso, deverá compreender que a modernização da sintaxe não elimina a necessidade de escrever código legível e bem estruturado.

Competências Desenvolvidas

Ao final deste laboratório, espera-se que o estudante seja capaz de:

- utilizar Arrow Functions em TypeScript;
- aplicar tipagem em parâmetros e retornos;
- diferenciar retorno explícito e retorno implícito;
- avaliar a legibilidade de diferentes implementações;
- modernizar código utilizando recursos atuais da linguagem;
- utilizar IA como ferramenta de revisão e melhoria de código;
- produzir funções mais claras, consistentes e fáceis de manter.
