/**
 * RA01 — Validação de dados com Expressões Regulares (Regex)
 * Módulo para validação e sanitização de dados de entrada do paciente.
 */

// Expressões regulares para validação de formato
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const PHONE_REGEX = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valida uma string de CPF utilizando Expressão Regular.
 * @param cpf String contendo o CPF formatado (000.000.000-00)
 */
export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;
  return CPF_REGEX.test(cpf);
}

/**
 * Sanitiza e formata um número de telefone para o padrão brasileiro (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 * Aceita números com apenas dígitos numéricos (ex: 19992922054 ou 1933334444) ou já formatados.
 */
export function formatPhone(raw: string): string {
  if (!raw) return "";
  const clean = raw.replace(/\D/g, "");

  // Celular com DDD (11 dígitos, ex: 19992922054)
  if (clean.length === 11) {
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  // Telefone Fixo com DDD (10 dígitos, ex: 1933334444)
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return raw.trim();
}

/**
 * Valida um número de telefone brasileiro (aceita entradas apenas com dígitos ou já formatadas).
 * @param phone Telefone bruto ou formatado
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const formatted = formatPhone(phone);
  return PHONE_REGEX.test(formatted);
}

/**
 * Valida um endereço de e-mail utilizando Expressão Regular.
 * @param email String com o e-mail
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  return EMAIL_REGEX.test(email);
}

/**
 * Sanitiza a entrada numérica de CPF inserindo a máscara oficial (XXX.XXX.XXX-XX).
 */
export function formatCPF(digitsOnly: string): string {
  const clean = digitsOnly.replace(/\D/g, "");
  if (clean.length !== 11) return digitsOnly;
  return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Validador completo dos dados de entrada do paciente para cadastro.
 */
export function validatePatientInput(data: {
  name: string;
  age: number;
  cpf: string;
  phone: string;
  email: string;
  symptoms: string[];
}): ValidationResult {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("O nome do paciente deve conter ao menos 2 caracteres.");
  }

  if (typeof data.age !== "number" || data.age < 0 || data.age > 130) {
    errors.push("A idade deve ser um número válido entre 0 e 130 anos.");
  }

  if (!validateCPF(data.cpf)) {
    errors.push("Formato de CPF inválido. Esperado: 000.000.000-00.");
  }

  if (!validatePhone(data.phone)) {
    errors.push("Formato de telefone inválido. Informe o DDD e o número (ex: 19992922054 ou (19) 99929-2205).");
  }

  if (!validateEmail(data.email)) {
    errors.push("Formato de e-mail inválido. Exemplo: usuario@dominio.com.");
  }

  if (!Array.isArray(data.symptoms) || data.symptoms.length === 0) {
    errors.push("Ao menos um sintoma deve ser informado para o paciente.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
