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

---

## Laboratório 3: Controle de Acesso e Monitoramento de Atividades na Plataforma Educacional

Neste laboratório, você irá analisar o comportamento do escopo das variáveis em TypeScript e utilizar closures para implementar um contador de atividades de estudantes em uma plataforma educacional.

### Condições de conclusão

Durante a atividade, serão praticados:

- escopo de bloco em TypeScript
- análise de variáveis com `let` e `var`
- diferenças comportamentais entre declarações
- implementação de closures
- preservação de estado entre execuções de funções
- compreensão de escopos globais, de função e de bloco
- análise crítica de conceitos apresentados por ferramentas de IA

### Contextualização

Em uma plataforma educacional, é fundamental registrar as atividades dos estudantes de forma segura e controlada. O escopo das variáveis determina onde e como essas informações podem ser acessadas dentro do código, afetando diretamente a segurança e a previsibilidade da aplicação.

As diferenças entre `var`, `let` e `const` não são apenas sintáticas - elas impactam significativamente como o código se comporta em tempo de execução. Além disso, closures são um padrão poderoso em JavaScript/TypeScript que permite preservar estado entre diferentes execuções de funções, sendo especialmente úteis para implementar contadores, cache e padrões de encapsulamento.

### Cenário

Você faz parte da equipe de desenvolvimento da plataforma educacional e precisa implementar um sistema robusto de contadores de acessos a conteúdos. Cada curso deve manter seu próprio contador de visualizações, independentemente dos demais. Para isso, você precisará compreender profundamente como o escopo funciona em TypeScript e como utilizar closures para preservar estado de forma segura.

---

## Tarefas

### Tarefa 1: Explorando Escopo de Bloco

Crie um arquivo chamado `lab-escopo.ts`.

Declare uma variável `studentName` utilizando `let` dentro de um bloco `if`.

**Requisitos:**

- Exiba o valor da variável dentro do bloco
- Tente acessar a mesma variável fora do bloco
- Compile o código e observe o erro gerado pelo TypeScript

**Código base:**

```typescript
if (true) {
    let studentName: string = "Maria";
    console.log(studentName);
}

// Tente acessar studentName aqui
```

**Analise:** O que acontece quando você tenta acessar `studentName` fora do bloco? Por que TypeScript gera um erro?

---

### Tarefa 2: Comparando var e let

Crie uma função chamada `checkEnrollment`.

Dentro da função, declare uma variável `enrollmentStatus` utilizando `var` dentro de um bloco `if`.

**Requisitos:**

- Exiba seu valor fora do bloco
- Execute o código e observe o resultado
- Substitua `var` por `let`
- Compare os comportamentos e registre suas observações em comentários

**Código base:**

```typescript
function checkEnrollment(): void {
    if (true) {
        var enrollmentStatus: string = "Active";
    }

    console.log(enrollmentStatus);
}

checkEnrollment();
```

**Analise:** Qual é a diferença entre `var` e `let`? Por que `var` é considerado menos seguro em TypeScript moderno?

---

### Tarefa 3: Criando um Contador de Acessos com Closure

Na plataforma educacional, cada vez que um estudante acessa um conteúdo, o sistema deve registrar a quantidade de visualizações realizadas.

**Requisitos:**

- Crie uma função chamada `createLessonCounter`
- Declare uma variável `lessonViews` inicializada com zero
- Retorne uma função responsável por incrementar o contador
- Armazene a função retornada em uma constante chamada `registerView`
- Execute a função três vezes
- Verifique se o contador mantém o valor entre as chamadas

**Estrutura sugerida:**

```typescript
function createLessonCounter() {
    let lessonViews: number = 0;

    return function(): void {
        lessonViews++;
        console.log(lessonViews);
    };
}
```

**Analise:** Como é possível que `lessonViews` mantenha seu valor entre as chamadas? O que é um closure?

---

### Tarefa 4: Simulando Diferentes Cursos

Uma plataforma pode possuir vários cursos independentes.

**Requisitos:**

- Crie duas instâncias do contador utilizando a função `createLessonCounter`
- Nomeie as constantes como `webCourseViews` e `typescriptCourseViews`
- Realize chamadas alternadas em cada contador
- Observe que cada closure mantém seu próprio estado

**Exemplo esperado:**

```typescript
const webCourseViews = createLessonCounter();
const typescriptCourseViews = createLessonCounter();

webCourseViews();                    // 1
typescriptCourseViews();            // 1
webCourseViews();                    // 2
typescriptCourseViews();            // 2
webCourseViews();                    // 3
```

**Analise:** Por que cada contador mantém seu próprio valor? Como o escopo e closures trabalham juntos para criar esse comportamento?

---

### Tarefa 5: Utilizando Inteligência Artificial para Análise

**Requisitos:**

- Utilize uma ferramenta de IA generativa
- Solicite uma explicação sobre a diferença entre escopo global, escopo de função e escopo de bloco
- Solicite também uma explicação sobre por que cada contador criado na Tarefa 4 mantém seu próprio valor
- Compare as respostas obtidas com os conceitos estudados na aula
- Produza um breve texto (5 a 10 linhas) resumindo suas conclusões

Resposta da IA : 

Vou fornecer as explicações solicitadas como um especialista em TypeScript e depois gerar o texto de conclusão.

---

## **Explicação 1: Diferença entre Escopo Global, Escopo de Função e Escopo de Bloco**

### **Escopo Global**
Variáveis declaradas fora de qualquer função ou bloco são acessíveis em todo o programa. São as mais perigosas pois podem ser modificadas de qualquer lugar.

```typescript
const appName = "Plataforma Educacional"; // Escopo Global

function showInfo() {
    console.log(appName); // Acessível aqui
}
```

### **Escopo de Função**
Variáveis declaradas dentro de uma função são acessíveis apenas naquela função e em funções aninhadas. Quando a função termina, a variável é destruída (exceto em closures).

```typescript
function calculateBirthYear() {
    const currentYear = 2026; // Escopo de Função
    
    console.log(currentYear); // Funciona
}

console.log(currentYear); // ❌ Erro: variável não definida
```

### **Escopo de Bloco**
Variáveis declaradas com `let` ou `const` dentro de um bloco `{}` (if, for, while) são acessíveis apenas naquele bloco. Isso oferece mais segurança e previsibilidade.

```typescript
if (true) {
    let studentName = "Maria"; // Escopo de Bloco
    console.log(studentName);  // ✅ Funciona
}

console.log(studentName); // ❌ Erro: variável não definida
```

**Diferença `var` vs `let`:**
- `var` ignora escopo de bloco (hoisting)
- `let` respeita escopo de bloco (mais seguro)

---

## **Explicação 2: Por que Cada Contador Mantém seu Próprio Valor (Tarefa 4)**

A resposta está em **closures** e como o escopo léxico funciona em JavaScript/TypeScript.

```typescript
function createLessonCounter() {
    let lessonViews = 0; // ← Esta variável é CAPTURADA pelo closure
    
    return function() {
        lessonViews++;
        console.log(lessonViews);
    };
}

// Cada chamada de createLessonCounter() cria um novo espaço de memória
const webCourseViews = createLessonCounter();        // Closure 1
const typescriptCourseViews = createLessonCounter(); // Closure 2

webCourseViews();              // 1 - usa a variável de Closure 1
typescriptCourseViews();       // 1 - usa a variável de Closure 2
webCourseViews();              // 2 - a variável de Closure 1 foi incrementada
typescriptCourseViews();       // 2 - a variável de Closure 2 foi incrementada
```

**Por quê cada um mantém seu próprio valor?**

1. **Espaço de memória separado**: Cada chamada de `createLessonCounter()` cria uma nova instância da variável `lessonViews`
2. **Captura léxica**: A função retornada "lembra" qual variável `lessonViews` pertence a ela
3. **Persistência**: A variável não é destruída quando a função retorna - ela persiste porque a função interna a referencia
4. **Isolamento**: Não há acesso compartilhado entre os closures - cada um manipula sua própria cópia

---

## **Análise Comparativa com Conceitos da Aula**

| Conceito | Comportamento | Aplicação na Tarefa 4 |
|----------|---------------|----------------------|
| **Escopo de Bloco** | Variáveis limitadas ao bloco `{}` | `lessonViews` está no escopo da função `createLessonCounter` |
| **Closure** | Função interna acessa variáveis da função externa | A função retornada acessa `lessonViews` |
| **Persistência** | Variável não é destruída apesar da função terminar | `lessonViews` persiste entre chamadas |
| **Isolamento** | Cada execução cria seu próprio contexto | `webCourseViews` e `typescriptCourseViews` não compartilham `lessonViews` |

---

## **Conclusões (5-10 linhas)**

Os conceitos de escopo, closures e isolamento de estado são fundamentais para construir aplicações robustas em TypeScript. A diferença entre escopo global, de função e de bloco determina a visibilidade e o ciclo de vida das variáveis. Closures são um padrão elegante que permite preservar estado privado entre execuções, sem expor dados globalmente - cada contador mantém seu próprio valor porque cada execução de `createLessonCounter()` cria um espaço de memória independente que é capturado pela função retornada. Compreender esses mecanismos é essencial para implementar encapsulamento, evitar colisões de dados e construir código mais seguro e previsível. Em plataformas educacionais, isso garante que contadores de cursos diferentes não se interferem, preservando a integridade dos dados de cada estudante.

---

Deseja que eu implemente as tarefas práticas (lab-escopo.ts, checkEnrollment, createLessonCounter) no arquivo TypeScript para consolidar esses conceitos?



---

## Resultado Esperado

Ao final do laboratório, você deverá compreender:

- Como o escopo controla a visibilidade das variáveis
- As diferenças entre `var` e `let`
- Implementação de closures capazes de preservar o estado de contadores independentes para diferentes cursos da plataforma educacional

---

## Competências Desenvolvidas

Ao concluir este laboratório, você será capaz de:

- ✅ Identificar os diferentes tipos de escopo de variáveis em TypeScript
- ✅ Analisar o comportamento das palavras-chave `var`, `let` e `const`
- ✅ Aplicar o conceito de escopo de bloco na construção de programas mais seguros e previsíveis
- ✅ Compreender como funções acessam variáveis de escopos externos
- ✅ Implementar closures para preservar estado entre diferentes execuções de funções
- ✅ Avaliar explicações geradas por ferramentas de Inteligência Artificial, relacionando-as aos conceitos estudados em aula
