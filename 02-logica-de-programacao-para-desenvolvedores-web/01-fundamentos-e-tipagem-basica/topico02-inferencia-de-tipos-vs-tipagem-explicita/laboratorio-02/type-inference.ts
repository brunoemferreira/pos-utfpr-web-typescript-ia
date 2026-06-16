// Laboratório 02 — Exemplos de inferência e tipagem explícita

// Tarefa 1 — Inferência Inteligente
let userName: string = "Mariana";
let promptTokens: number = 1200;
let responseTime: number = 1.8;

let estimatedCost = promptTokens * 0.002; // inferido como number
console.log('estimatedCost:', estimatedCost);

// Tarefa 2 — Tipagem explícita vs inferência
let explicitScore: number = 10;
let inferredScore = 10; // inferido como number
console.log('explicitScore / inferredScore:', explicitScore, inferredScore);

// Teste de segurança (descomente para ver o erro do compilador)
// inferredScore = "dez"; // Erro: Type 'string' is not assignable to type 'number'.

// Tarefa 3 — O problema da inferência tardia
let aiResponse; // inferido como any
aiResponse = "Resposta gerada pela IA";
aiResponse = 404; // permitido quando é any
console.log('aiResponse (any):', aiResponse);

// Correção do problema com tipagem explícita
let aiResponseStr: string;
aiResponseStr = "Resposta gerada pela IA";
// aiResponseStr = 404; // Erro: Type 'number' is not assignable to type 'string'.
console.log('aiResponseStr:', aiResponseStr);

// Tarefa 4 — Boas práticas
let modelName = "GPT-4"; // recomendação: inferido
let maxTokens = 2048;     // inferido

// Versão redundante (normalmente desnecessária)
let modelNameRedundant: string = "GPT-4";
let maxTokensRedundant: number = 2048;

console.log({ modelName, maxTokens, modelNameRedundant, maxTokensRedundant });

// Observações: experimente passar o cursor sobre as variáveis no VS Code
// para ver os tipos inferidos e os erros quando descomentar as linhas indicadas.
