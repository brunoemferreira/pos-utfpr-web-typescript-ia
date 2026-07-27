import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { PatientService } from "../src/services/patient.service.js";
import { TriagePriority } from "../src/types/priority.types.js";

describe("R01 & R02 — Testes do Serviço de Pacientes", () => {
  let service: PatientService;

  beforeEach(() => {
    service = new PatientService();
  });

  it("deve cadastrar um paciente com sucesso e gerar ID automático", () => {
    const patient = service.registerPatient({
      name: "Carlos Eduardo",
      age: 34,
      cpf: "123.456.789-00",
      phone: "(41) 98888-7777",
      email: "carlos@teste.com",
      symptoms: ["Dor de cabeca"],
      priority: TriagePriority.VERDE
    });

    assert.equal(patient.id, "PAT-0001");
    assert.equal(patient.name, "Carlos Eduardo");
    assert.equal(patient.priority, TriagePriority.VERDE);
    assert.ok(patient.arrivalTime instanceof Date);
  });

  it("deve rejeitar o cadastro de paciente com CPF duplicado", () => {
    service.registerPatient({
      name: "Paciente 1",
      age: 30,
      cpf: "123.456.789-00",
      phone: "(41) 98888-7777",
      email: "p1@teste.com",
      symptoms: ["Febre"]
    });

    assert.throws(
      () =>
        service.registerPatient({
          name: "Paciente 2",
          age: 40,
          cpf: "123.456.789-00",
          phone: "(41) 97777-6666",
          email: "p2@teste.com",
          symptoms: ["Tosse"]
        }),
      /já está cadastrado/
    );
  });

  it("deve atualizar os campos cadastrais de um paciente existente", () => {
    const created = service.registerPatient({
      name: "Ana Maria",
      age: 25,
      cpf: "987.654.321-11",
      phone: "(41) 91111-2222",
      email: "ana@teste.com",
      symptoms: ["Nausea"]
    });

    const updated = service.updatePatient(created.id, {
      age: 26,
      phone: "(41) 93333-4444"
    });

    assert.equal(updated.age, 26);
    assert.equal(updated.phone, "(41) 93333-4444");
    assert.equal(updated.id, created.id); // ID preservado
  });
});
