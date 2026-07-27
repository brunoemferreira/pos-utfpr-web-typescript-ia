import { describe, it } from "node:test";
import assert from "node:assert";
import { StatisticsService } from "../src/services/statistics.service.js";
import { Patient } from "../src/types/patient.types.js";
import { TriagePriority } from "../src/types/priority.types.js";

describe("R04 — Testes dos Métodos de Array do Serviço de Estatísticas", () => {
  const statsService = new StatisticsService();

  const mockPatients: Patient[] = [
    {
      id: "PAT-0001",
      name: "Maria Silva",
      age: 70,
      cpf: "123.456.789-00",
      phone: "(41) 98888-1111",
      email: "maria@teste.com",
      symptoms: ["Dor no peito"],
      arrivalTime: new Date(),
      priority: TriagePriority.VERMELHO
    },
    {
      id: "PAT-0002",
      name: "João Santos",
      age: 50,
      cpf: "987.654.321-11",
      phone: "(41) 97777-2222",
      email: "joao@teste.com",
      symptoms: ["Febre alta"],
      arrivalTime: new Date(),
      priority: TriagePriority.AMARELO
    },
    {
      id: "PAT-0003",
      name: "Ana Costa",
      age: 30,
      cpf: "456.789.123-33",
      phone: "(41) 96666-3333",
      email: "ana@teste.com",
      symptoms: ["Gripe"],
      arrivalTime: new Date(),
      priority: TriagePriority.AZUL
    }
  ];

  it("deve filtrar pacientes por prioridade utilizando filter()", () => {
    const redPatients = statsService.getPatientsByPriority(mockPatients, TriagePriority.VERMELHO);
    assert.equal(redPatients.length, 1);
    assert.equal(redPatients[0].name, "Maria Silva");
  });

  it("deve localizar paciente por termo de busca utilizando find()", () => {
    const found = statsService.findPatientBySearchTerm(mockPatients, "joão");
    assert.ok(found);
    assert.equal(found?.id, "PAT-0002");
  });

  it("deve verificar se existe emergência crítica aguardando utilizando some()", () => {
    assert.equal(statsService.hasCriticalPatientsWaiting(mockPatients), true);

    const nonCritical = mockPatients.filter((p) => p.priority !== TriagePriority.VERMELHO);
    assert.equal(statsService.hasCriticalPatientsWaiting(nonCritical), false);
  });

  it("deve calcular a idade média utilizando reduce()", () => {
    // (70 + 50 + 30) / 3 = 50
    const avgAge = statsService.calculateAverageAge(mockPatients);
    assert.equal(avgAge, 50);
  });

  it("deve gerar síntese de sintomas formatada utilizando map() e join()", () => {
    const list = statsService.generateSymptomSummaryList(mockPatients);
    assert.ok(list.includes("[PAT-0001] Maria Silva"));
    assert.ok(list.includes("[PAT-0002] João Santos"));
    assert.ok(list.includes("\n"));
  });
});
