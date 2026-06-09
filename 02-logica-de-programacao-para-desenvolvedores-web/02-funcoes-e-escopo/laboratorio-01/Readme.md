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

## Laboratório 1: Modernizando Funções da Plataforma Educacional

Neste laboratório, você irá desenvolver e modernizar funções de uma plataforma educacional que utiliza Inteligência Artificial para auxiliar estudantes na aprendizagem de conteúdos técnicos.

### Condições de conclusão

Durante a atividade, serão praticados:

- criação de funções em TypeScript
- parâmetros obrigatórios
- parâmetros opcionais
- valores default
- retorno de valores
- reutilização de código
- uso de IA como ferramenta de apoio ao desenvolvimento

### Contextualização

A plataforma educacional da empresa está passando por um processo de evolução tecnológica. Diversas funcionalidades foram implementadas para auxiliar estudantes durante seus estudos, incluindo geração de recomendações personalizadas, perfis de usuário e explicações produzidas por Inteligência Artificial.

Para organizar melhor o sistema, a equipe decidiu criar funções reutilizáveis responsáveis por processar informações dos usuários e configurar comportamentos da aplicação. Neste laboratório, você implementará algumas dessas funcionalidades utilizando recursos fundamentais de funções em TypeScript.

### Cenário

Você faz parte da equipe responsável pelo desenvolvimento de uma plataforma educacional com recursos de IA. Seu objetivo será implementar funções que permitam:

- exibir informações do sistema
- processar dados dos usuários
- criar perfis
- configurar comportamentos padrão da plataforma

## Tarefas

### Tarefa 1: Criando as Funções da Plataforma

Crie um arquivo chamado `app.ts`.

Neste arquivo serão implementadas as funções responsáveis por algumas funcionalidades da plataforma educacional. Ao final do laboratório, o arquivo deverá conter:

- uma função sem retorno
- uma função com retorno
- uma função com parâmetro opcional
- uma função com valor default

### Tarefa 2: Criar um Procedimento

Criar uma função chamada `showSystemHeader`.

A função deve apenas exibir:

`Plataforma Educacional com IA`

Requisitos:

- utilizar retorno `void`
- não receber parâmetros
- executar a função no programa principal

Analise: por que funções sem retorno são chamadas de procedimentos; quando esse tipo de função é útil em aplicações reais.

### Tarefa 3: Criar Funções com Retorno

Criar uma função chamada `calculateBirthYear`.

Receber:

- nome do estudante
- idade

Retornar:

- ano aproximado de nascimento

Exibir o resultado no console.

Exemplo: `Mariana nasceu aproximadamente em 2000.`

Analise: diferença entre uma função com retorno e um procedimento; importância da reutilização desse cálculo em diferentes partes do sistema.

### Tarefa 4: Trabalhar com Parâmetros Opcionais

Criar uma função chamada `createStudentProfile`.

Receber:

- nome (obrigatório)
- e-mail (opcional)

Exibir os dados formatados.

Exemplos:

`Nome: Mariana`
`Email: mariana@email.com`

`Nome: João`
`Email não informado`

Teste chamadas:

- com e-mail
- sem e-mail

Analise: quando parâmetros opcionais podem simplificar o uso das funções; como evitar a criação de múltiplas versões da mesma função.

### Tarefa 5: Trabalhar com Valores Default

Criar uma função chamada `generateUserProfile`.

Receber:

- nome
- perfil com valor padrão `"Aluno"`

Exibir:

`Usuário: João - Perfil: Aluno`

Realizar testes:

- sem informar o perfil
- informando um perfil personalizado

Exemplos:

`Usuário: João - Perfil: Aluno`
`Usuário: Renata - Perfil: Professor`

Analise: vantagens dos valores default; situações em que eles reduzem repetição de código.

### Tarefa 6: Uso de IA como Apoio ao Desenvolvimento

Utilize uma ferramenta de IA para revisar as funções desenvolvidas.

Envie o seguinte prompt:

> Atue como um especialista em TypeScript.
> Analise as funções abaixo e responda:
>
> - Existem melhorias de nomenclatura?
> - Há oportunidades para simplificar o código?
> - Os parâmetros opcionais foram utilizados corretamente?
> - Os valores default estão adequados?
> - O código segue boas práticas modernas de TypeScript?

Registre:

- quais sugestões a IA apresentou
- quais sugestões foram aproveitadas
- quais sugestões foram descartadas
- justificativa para as decisões tomadas

## Resultado Esperado

Ao final do laboratório, você deverá possuir um pequeno conjunto de funções reutilizáveis para uma plataforma educacional com IA, utilizando parâmetros obrigatórios, opcionais e valores default.

As funções deverão executar corretamente, demonstrar a validação de tipos realizada pelo TypeScript e apresentar código organizado e legível.

## Competências Desenvolvidas

Ao final deste laboratório, espera-se que o estudante seja capaz de:

- criar funções reutilizáveis em TypeScript
- diferenciar procedimentos e funções com retorno
- utilizar parâmetros obrigatórios e opcionais
- aplicar valores default adequadamente
- organizar funcionalidades em pequenas unidades reutilizáveis
- analisar criticamente sugestões produzidas por IA
- desenvolver código mais legível, seguro e fácil de manter
