import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { TriageQueueService } from "../src/services/triage-queue.service.js";
import { TriagePriority } from "../src/types/priority.types.js";
import { Patient } from "../src/types/patient.types.js";

describe("R03 — Testes do Serviço de Fila de Triagem", () => {
  let queueService: TriageQueueService;

  beforeEach(() => {
    queueService = new TriageQueueService();
  });

  it("deve ordenar pacientes estritamente por prioridade médica (VERMELHO antes de VERDE)", () => {
    const greenPatient: Patient = {
      id: "PAT-0001",
      name: "Paciente Verde",
      age: 20,
      cpf: "111.111.111-11",
      phone: "(41) 91111-1111",
      email: "verde@teste.com",
      symptoms: ["Tosse leve"],
      arrivalTime: new Date(Date.now() - 10000), // chegou 10 segundos atrás
      priority: TriagePriority.VERDE
    };

    const redPatient: Patient = {
      id: "PAT-0002",
      name: "Paciente Vermelho",
      age: 50,
      cpf: "222.222.222-22",
      phone: "(41) 92222-2222",
      email: "vermelho@teste.com",
      symptoms: ["Dor no peito"],
      arrivalTime: new Date(), // chegou agora
      priority: TriagePriority.VERMELHO
    };

    queueService.enqueue(greenPatient);
    queueService.enqueue(redPatient);

    const snapshot = queueService.getQueueSnapshot();
    assert.equal(snapshot[0].id, "PAT-0002"); // Paciente VERMELHO fica na primeira posição
    assert.equal(snapshot[1].id, "PAT-0001");
  });

  it("deve manter a ordem FIFO para pacientes de mesma prioridade", () => {
    const yellow1: Patient = {
      id: "PAT-0001",
      name: "Amarelo 1",
      age: 30,
      cpf: "111.111.111-11",
      phone: "(41) 91111-1111",
      email: "y1@teste.com",
      symptoms: ["Febre"],
      arrivalTime: new Date(Date.now() - 5000),
      priority: TriagePriority.AMARELO
    };

    const yellow2: Patient = {
      id: "PAT-0002",
      name: "Amarelo 2",
      age: 40,
      cpf: "222.222.222-22",
      phone: "(41) 92222-2222",
      email: "y2@teste.com",
      symptoms: ["Febre"],
      arrivalTime: new Date(),
      priority: TriagePriority.AMARELO
    };

    queueService.enqueue(yellow1);
    queueService.enqueue(yellow2);

    assert.equal(queueService.dequeueNextPatient()?.id, "PAT-0001");
    assert.equal(queueService.dequeueNextPatient()?.id, "PAT-0002");
  });

  it("deve reordenar a fila quando a prioridade de um paciente é atualizada", () => {
    const p1: Patient = {
      id: "PAT-0001",
      name: "Paciente 1",
      age: 30,
      cpf: "111.111.111-11",
      phone: "(41) 91111-1111",
      email: "p1@teste.com",
      symptoms: ["Dor de cabeca"],
      arrivalTime: new Date(),
      priority: TriagePriority.AZUL
    };

    const p2: Patient = {
      id: "PAT-0002",
      name: "Paciente 2",
      age: 40,
      cpf: "222.222.222-22",
      phone: "(41) 92222-2222",
      email: "p2@teste.com",
      symptoms: ["Dor abdominal"],
      arrivalTime: new Date(),
      priority: TriagePriority.VERDE
    };

    queueService.enqueue(p1);
    queueService.enqueue(p2);

    // Reavaliando p1 de AZUL para VERMELHO
    queueService.updatePatientPriority("PAT-0001", TriagePriority.VERMELHO);

    assert.equal(queueService.peekNextPatient()?.id, "PAT-0001");
  });
});
