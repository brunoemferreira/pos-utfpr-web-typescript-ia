const userName: string = "Mariana";
const topic: string = "TypeScript";
const maxTokens: number = 200;
const premiumUser: boolean = true;

const promptMessage = `
User: ${userName}
Create a study guide about ${topic}.
Maximum tokens: ${maxTokens}
Access Level:${premiumUser ? "Premium User" : "Free User"}`;
console.log(promptMessage);
