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

Resposta da IA : 

Vou ler o arquivo de arrow functions e depois enviar para análise da IA. 

Read [](file:///d%3A/workspace/pos-utfpr-web-typescript-ia/02-logica-de-programacao-para-desenvolvedores-web/02-funcoes-e-escopo/laboratorio-02/arrow-functions.ts)

Perfeito! Obtive as funções do laboratório. Agora vou analisar usando o prompt que você forneceu como um especialista em TypeScript:

---

## Análise de Arrow Functions - TypeScript

### **Código Analisado:**

```typescript
function calculateDiscount(
    price: number
): number {
    return price * 0.9;
}

// Retorno Explícito
const formatUserName = (
    name: string
): string => {
    const upperName = name.toUpperCase();
    const message = `Olá ${upperName}`;
    return message;
};

// Retorno Implícito
const isApproved = (
    score: number
): boolean =>
    score >= 7;
```

---

### **Análise Detalhada:**

#### **1. Oportunidades de Retorno Implícito** ✅

**`formatUserName`** - Pode utilizar retorno implícito:
```typescript
const formatUserName = (name: string): string => 
    `Olá ${name.toUpperCase()}`;
```

**`calculateDiscount`** - Ainda é uma function declaration. Pode ser convertida para arrow function com retorno implícito:
```typescript
const calculateDiscount = (price: number): number => price * 0.9;
```

#### **2. Funções Excessivamente Compactas** ⚠️

- **`isApproved`** e **`calculateDiscount`** são boas candidatas para retorno implícito exatamente por essa razão - lógica simples não justifica múltiplas linhas.
- **`formatUserName`** com retorno implícito seria mais legível que a versão atual.

#### **3. Melhorias de Legibilidade** 📝

- A variável intermediária `upperName` em `formatUserName` é **desnecessária**. Combine com template string.
- `calculateDiscount`: Considere usar constantes de negócio:
```typescript
const DISCOUNT_RATE = 0.1; // ou 10% para clareza
const calculateDiscount = (price: number): number => price * (1 - DISCOUNT_RATE);
```

#### **4. Tipagem Adequada** ✅

Todos os parâmetros e retornos estão **adequadamente tipados**. TypeScript strict mode está sendo respeitado.

#### **5. Boas Práticas Modernas** 🎯

| Aspecto | Status | Observação |
|---------|--------|-----------|
| Arrow functions | ✅ | Use em lugar de `function` |
| Tipagem explícita | ✅ | Muito bom |
| Composição | ⚠️ | Funções são independentes - bom para começo |
| Imutabilidade | ✅ | Constantes usadas corretamente |
| One-liner functions | ⚠️ | Melhorar usando retorno implícito |

---

### **Recomendações Finais:**

```typescript
const DISCOUNT_RATE = 0.1;

const calculateDiscount = (price: number): number => price * (1 - DISCOUNT_RATE);

const formatUserName = (name: string): string => `Olá ${name.toUpperCase()}`;

const isApproved = (score: number): boolean => score >= 7;
```

**Resumo:** O código está bem estruturado! Principais melhorias: aplicar retorno implícito em funções simples, remover variáveis intermediárias desnecessárias e considerar constantes de negócio.





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
