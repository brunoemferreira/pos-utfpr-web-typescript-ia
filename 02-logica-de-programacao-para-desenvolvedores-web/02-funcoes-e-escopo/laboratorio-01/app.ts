function showSystemHeader(): void {
    console.log("Plataforma Educacional com IA");
}

function calculateBirthYear(name: string, age: number): string {
    const birthYear = new Date().getFullYear() - age;
    return `${name} nasceu aproximadamente em ${birthYear}.`;
}

function createStudentProfile(name: string, email?: string): string {
    const emailText = email ?? 'Email não informado';
    return `Nome: ${name}
Email: ${emailText}`;
}

function generateUserProfile(name: string, profileType: string = "Aluno"): string {
    return `Usuário: ${name} - Perfil: ${profileType}`;
}

showSystemHeader();
console.log(calculateBirthYear("Bruno", 45));
console.log(createStudentProfile("Bruno"));
console.log(createStudentProfile("Bruno", "bruno@example.com"));
console.log(generateUserProfile("Bruno", "Professor"));
console.log(generateUserProfile("Bruno"));


/*
# Prompt:

Atue como um especialista em TypeScript.
Analise as funções abaixo e responda:
Existem melhorias de nomenclatura?
Há oportunidades para simplificar o código?
Os parâmetros opcionais foram utilizados corretamente?
Os valores default estão adequados?
O código segue boas práticas modernas de TypeScript?

Resposta : 

1. Nomenclatura: Melhorar calculateBirthYear porque o nome sugere retorno numérico; use formatBirthYearMessage ou faça calculateBirthYear retornar number e crie formatBirthYearMessage para a string. createStudentProfile e generateUserProfile sugerem criação de objetos — se retornam strings, prefira formatStudentProfile / formatUserProfile ou, melhor, retorne um StudentProfile/UserProfile (interface). showSystemHeader está OK; displaySystemHeader ou printSystemHeader são alternativas.

2. Simplificação: Use const em vez de let para valores imutáveis (currentYear, birthYear). Simplifique createStudentProfile com nullish coalescing:
const emailText = email ?? 'Email não informado';
return Nome: ${name}\nEmail: ${emailText};
Também simplifique calculateBirthYear em uma linha calculando diretamente const birthYear = new Date().getFullYear() - age;.

3. Parâmetros opcionais: Uso de email?: string está correto. Recomendo tratar outputs e tipos: se o perfil precisa ser manipulado programaticamente, aceite email?: string e retorne um objeto com email?: string em vez de só string formatada.

4. Valores default: profileType: string = "Aluno" é adequado. Considere usar um union type ou enum para perfis (ex.: type Profile = 'Aluno' | 'Professor' | 'Admin') para segurança de tipos.

5. Boas práticas TS: Em geral está bem tipado. Recomendações:

Prefira const quando possível.
Use interfaces/types para perfis: interface StudentProfile { name: string; email?: string }.
Faça funções puras quando possível (separar cálculo de formatação).
Explícite tipos de retorno (já feito) e ative strict/noImplicitAny no tsconfig.
Considere exportar funções e adicionar testes simples.
Use template literals com quebras de linha literais em vez de \n quando desejar legibilidade:
const txt = Linha 1 Linha 2;

*/
