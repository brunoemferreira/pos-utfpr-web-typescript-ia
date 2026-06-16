function calculateDiscount(
    price: number
): number {
    return price * 0.9;
}

/*
function isApproved(
    score: number
): boolean {
    return score >= 7;
}*/

// Retorno Explícito
const formatUserName = (
    name: string
): string => {
    const upperName = name.toUpperCase();
    const message = `Olá ${upperName}`;
    return message;
};

console.log(formatUserName("Bruno"));
console.log(formatUserName("Emanuele"));

// Retorno Implícito
const isApproved = (
    score: number
): boolean =>
    score >= 7;

console.log(isApproved(8)); // true    


/*

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

*/