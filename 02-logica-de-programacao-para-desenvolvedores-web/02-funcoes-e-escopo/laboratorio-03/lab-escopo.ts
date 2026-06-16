if (true) {
    let studentName: string = "Maria";
    console.log(studentName);
}

// console.log(studentName); // Erro: studentName não está definido fora do bloco if

function checkEnrollment(): void {
    if (true) {
        var enrollmentStatus: string = "Active";
    }

    console.log(enrollmentStatus);
}

checkEnrollment(); // Saída: "Active" - var tem escopo de função, então enrollmentStatus é acessível dentro da função checkEnrollment, mesmo fora do bloco if.


function createLessonCounter() {
    let lessonViews: number = 0;

    return function(): void {
        lessonViews++;
        console.log(lessonViews);
    };
}

createLessonCounter()(); // Saída: 1 - A função interna tem acesso à variável lessonViews devido ao escopo léxico, permitindo que ela incremente e exiba o número de visualizações de aulas.
createLessonCounter()(); // Saída: 1 - Cada chamada a createLessonCounter() cria um novo escopo, então lessonViews é reinicializado para 0 a cada vez.


const webCourseViews = createLessonCounter();
const typescriptCourseViews = createLessonCounter();

webCourseViews();                    // 1 - A função webCourseViews tem seu próprio escopo, então lessonViews é independente do escopo de typescriptCourseViews.
typescriptCourseViews();            // 1 - A função typescriptCourseViews tem seu próprio escopo, então lessonViews é independente do escopo de webCourseViews.
webCourseViews();                    // 2 - A função webCourseViews tem seu próprio escopo, então lessonViews é independente do escopo de typescriptCourseViews.
typescriptCourseViews();            // 2 - A função typescriptCourseViews tem seu próprio escopo, então lessonViews é independente do escopo de webCourseViews.
webCourseViews();                    // 3 - A função webCourseViews tem seu próprio escopo, então lessonViews é independente do escopo de typescriptCourseViews.
