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
