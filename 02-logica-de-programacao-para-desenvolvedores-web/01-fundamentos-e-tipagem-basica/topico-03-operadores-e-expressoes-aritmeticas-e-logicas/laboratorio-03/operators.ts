// Tarefa 1 — Operadores Aritméticos e Métricas
let completedLessons = 18;
let totalLessons = 24;

let progress = (completedLessons / totalLessons) * 100;
console.log(`Progresso do aluno: ${progress}%`);

// Tarefa 2 — Precedência de Operadores
let result1 = 10 + 5 * 2;
let result2 = (10 + 5) * 2;

console.log(`Resultado 1: ${result1}`); // Esperado: 20
console.log(`Resultado 2: ${result2}`); // Esperado: 30

// Tarefa 3 — Operadores Relacionais e Tipos Booleanos
let average = 7.5;
let approved = average >= 7;

console.log(`Aluno aprovado? ${approved}`);

// Tarefa 4 — Operadores Lógicos e Curto-Circuito (AND / OR)
let hasSubscription = true;
let completedPayment = false;

// O operador && busca o primeiro valor falso (falsy)
let canAccessCourse = hasSubscription && completedPayment;
console.log(`Acesso liberado ao curso? ${canAccessCourse}`);

// Testes diretos de curto-circuito
console.log(true && "Avançou");       // O que acontece aqui?
console.log(false && "Não avançou");  // O motor lê o segundo argumento?

let studentName = "";
let defaultName = "Nome Padrão";
console.log(studentName || defaultName);

// Tarefa 5 — A Armadilha do OR (||) vs o Nullish Coalescing (??)
let bonusConfigurado: number = 0;

let bonusComOr = bonusConfigurado || 1.5;
let bonusComNullish = bonusConfigurado ?? 1.5;

console.log(`Bônus com operador OR: ${bonusComOr}`);          // O que foi impresso?
console.log(`Bônus com operador Nullish: ${bonusComNullish}`); // Qual está correto?

// Tarefa 6 — Operadores de Incremento e Decremento

/* Atue como um Engenheiro de Software especialista em TypeScript.
Analise este código focado em operadores e responda de forma objetiva:

1. Explique como o mecanismo de curto-circuito se comportou na Tarefa 4.
2. Na Tarefa 5, qual foi o impacto arquitetural e o risco de negócio gerado pelo operador OR (||)?
3. Do ponto de vista de Truthiness e Falsiness, por que o Nullish Coalescing (??) resolveu o problema do número 0?
4. Sugira uma melhoria de legibilidade para as expressões lógicas apresentadas.

Resposta : 

No Tarefa 4, o curto-circuito do && parou assim que encontrou o primeiro valor falso:

hasSubscription && completedPayment devolveu false porque completedPayment é false.
false && "Não avançou" nem avaliou o segundo operando, retornando false imediatamente.
true && "Avançou" retornou "Avançou" porque o primeiro valor era verdadeiro e o && então retornou o segundo.
Na Tarefa 5, o operador || gerou um risco de negócio crítico:

Ele confundiu “valor válido” com “valor verdadeiro”.
Como 0 é falsy, bonusConfigurado || 1.5 descartou um bônus legítimo e aplicou o padrão 1.5.
Isso cria um bug silencioso e arquitetural: valores reais como 0, "" ou false são tratados como ausência de dados.
O ?? resolveu porque ele considera apenas null e undefined como ausência:

bonusConfigurado ?? 1.5 aceita 0 como um valor válido.
Em termos de truthiness/falsiness, 0 é falsy, mas não é nullish.
Assim, o ?? preserva o dado legítimo 0 e só usa o fallback quando o valor realmente não existe.
Sugestão de melhoria de legibilidade:

use nomes de variáveis explícitos e extraia expressões em constantes.
exemplo:
outra boa prática é evitar lógica inline muito densa e comentar quando a intenção é “fallback de ausência” versus “teste de verdade”.
 */