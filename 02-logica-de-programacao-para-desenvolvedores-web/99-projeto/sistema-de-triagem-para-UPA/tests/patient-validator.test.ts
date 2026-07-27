import { describe, it } from "node:test";
import assert from "node:assert";
import {
  validateCPF,
  validatePhone,
  validateEmail,
  validatePatientInput,
  formatCPF,
  formatPhone
} from "../src/validators/patient.validator.js";

describe("RA01 — Testes do Validador de Pacientes com Regex", () => {
  it("deve validar corretamente o formato de CPF", () => {
    assert.equal(validateCPF("123.456.789-00"), true);
    assert.equal(validateCPF("12345678900"), false);
    assert.equal(validateCPF("abc.def.ghi-jk"), false);
  });

  it("deve formatar 11 dígitos numéricos de CPF para a máscara XXX.XXX.XXX-XX", () => {
    assert.equal(formatCPF("12345678900"), "123.456.789-00");
  });

  it("deve formatar telefone celular com 11 dígitos numéricos (ex: 19992922054) para (19) 99292-2054", () => {
    assert.equal(formatPhone("19992922054"), "(19) 99292-2054");
  });

  it("deve formatar telefone fixo com 10 dígitos numéricos (ex: 1933334444) para (19) 3333-4444", () => {
    assert.equal(formatPhone("1933334444"), "(19) 3333-4444");
  });

  it("deve validar o formato do telefone (formatado ou apenas dígitos numéricos)", () => {
    assert.equal(validatePhone("(41) 99999-8888"), true);
    assert.equal(validatePhone("19992922054"), true);
    assert.equal(validatePhone("1933334444"), true);
    assert.equal(validatePhone("9999"), false);
  });

  it("deve validar o formato do endereço de e-mail", () => {
    assert.equal(validateEmail("usuario@dominio.com"), true);
    assert.equal(validateEmail("email-invalido"), false);
  });

  it("deve retornar erros detalhados para dados de entrada inválidos", () => {
    const result = validatePatientInput({
      name: "A", // muito curto
      age: 150, // idade inválida
      cpf: "12345", // cpf inválido
      phone: "9999", // telefone inválido
      email: "email@invalido", // email inválido
      symptoms: [] // sintomas vazios
    });

    assert.equal(result.isValid, false);
    assert.ok(result.errors.length >= 5);
  });
});
