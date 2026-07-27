import { describe, it } from "node:test";
import assert from "node:assert";
import { ExternalPatientAPI } from "../src/api/external-patient-api.js";

describe("R06 — Testes de API Assíncrona e Simulação JSON", () => {
  const api = new ExternalPatientAPI(50);

  it("deve buscar prontuário médico externo assincronamente para CPF cadastrado", async () => {
    const res = await api.fetchMedicalHistoryByCPF("123.456.789-00");
    assert.equal(res.success, true);
    assert.equal(res.statusCode, 200);
    assert.equal(res.data?.bloodType, "O+");
    assert.ok(res.data?.knownAllergies.includes("Penicilina"));
  });

  it("deve retornar 404 para CPF não existente na base externa", async () => {
    const res = await api.fetchMedicalHistoryByCPF("000.000.000-00");
    assert.equal(res.success, false);
    assert.equal(res.statusCode, 404);
  });

  it("deve processar lote de registros de pacientes a partir de string JSON válida", async () => {
    const json = JSON.stringify([
      {
        name: "Paciente Teste",
        age: 30,
        cpf: "123.456.789-00",
        phone: "(41) 99999-0000",
        email: "teste@teste.com",
        symptoms: ["Tosse"]
      }
    ]);

    const res = await api.importBatchPatientsFromJSON(json);
    assert.equal(res.success, true);
    assert.equal(res.data?.length, 1);
    assert.equal(res.data?.[0].name, "Paciente Teste");
  });

  it("deve retornar erro para payload JSON malformado", async () => {
    const res = await api.importBatchPatientsFromJSON("json-invalido{");
    assert.equal(res.success, false);
    assert.equal(res.statusCode, 400);
  });
});
