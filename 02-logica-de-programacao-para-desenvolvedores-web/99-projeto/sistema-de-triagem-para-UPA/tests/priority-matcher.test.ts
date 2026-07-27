import { describe, it } from "node:test";
import assert from "node:assert";
import { TriagePriority } from "../src/types/priority.types.js";
import { getPrioritySLA, inferPriorityFromSymptoms } from "../src/utils/priority-matcher.util.js";

describe("RA03 — Testes de Pattern Matching com ts-pattern", () => {
  it("deve retornar detalhes do SLA para prioridade VERMELHO", () => {
    const sla = getPrioritySLA(TriagePriority.VERMELHO);
    assert.equal(sla.targetWaitMinutes, 0);
    assert.equal(sla.emergencyLevel, "CRITICAL");
  });

  it("deve retornar detalhes do SLA para prioridade VERDE", () => {
    const sla = getPrioritySLA(TriagePriority.VERDE);
    assert.equal(sla.targetWaitMinutes, 120);
    assert.equal(sla.emergencyLevel, "LOW");
  });

  it("deve inferir prioridade VERMELHO para sintomas de parada cardiorrespiratória", () => {
    const priority = inferPriorityFromSymptoms(["Paciente em parada cardiorrespiratoria"]);
    assert.equal(priority, TriagePriority.VERMELHO);
  });

  it("deve inferir prioridade LARANJA para sintomas de dor no peito", () => {
    const priority = inferPriorityFromSymptoms(["Dor no peito intensa"]);
    assert.equal(priority, TriagePriority.LARANJA);
  });

  it("deve inferir prioridade VERDE para sintomas leves comuns", () => {
    const priority = inferPriorityFromSymptoms(["Resfriado comum", "Tosse"]);
    assert.equal(priority, TriagePriority.VERDE);
  });
});
