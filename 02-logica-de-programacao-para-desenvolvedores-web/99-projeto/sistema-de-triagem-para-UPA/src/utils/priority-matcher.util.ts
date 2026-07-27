import { match } from "ts-pattern";
import { TriagePriority, PrioritySLA } from "../types/priority.types.js";

/**
 * RA03 — Aplicação de recurso avançado do ecossistema TypeScript:
 * Pattern Matching utilizando a biblioteca `ts-pattern`.
 * 
 * Retorna os detalhes de SLA, tempo máximo de espera recomendado e nível de risco médico para uma dada prioridade.
 */
export function getPrioritySLA(priority: TriagePriority): PrioritySLA {
  return match<TriagePriority, PrioritySLA>(priority)
    .with(TriagePriority.VERMELHO, () => ({
      priority: TriagePriority.VERMELHO,
      targetWaitMinutes: 0,
      label: "🔴 Emergência (Vermelho)",
      description: "Atendimento imediato. Risco de morte iminente.",
      emergencyLevel: "CRITICAL"
    }))
    .with(TriagePriority.LARANJA, () => ({
      priority: TriagePriority.LARANJA,
      targetWaitMinutes: 10,
      label: "🟠 Muito Urgente (Laranja)",
      description: "Atendimento em até 10 minutos. Risco alto.",
      emergencyLevel: "HIGH"
    }))
    .with(TriagePriority.AMARELO, () => ({
      priority: TriagePriority.AMARELO,
      targetWaitMinutes: 60,
      label: "🟡 Urgente (Amarelo)",
      description: "Atendimento em até 60 minutos. Gravidade moderada.",
      emergencyLevel: "MEDIUM"
    }))
    .with(TriagePriority.VERDE, () => ({
      priority: TriagePriority.VERDE,
      targetWaitMinutes: 120,
      label: "🟢 Pouco Urgente (Verde)",
      description: "Atendimento em até 120 minutos. Gravidade baixa.",
      emergencyLevel: "LOW"
    }))
    .with(TriagePriority.AZUL, () => ({
      priority: TriagePriority.AZUL,
      targetWaitMinutes: 240,
      label: "🔵 Não Urgente (Azul)",
      description: "Atendimento em até 240 minutos. Casos de menor complexidade.",
      emergencyLevel: "MINIMAL"
    }))
    .exhaustive();
}

/**
 * Utiliza Pattern Matching para inferir a prioridade de triagem com base em palavras-chave nos sintomas.
 * Demonstração de Pattern Matching aplicável a coleções de dados.
 */
export function inferPriorityFromSymptoms(symptoms: string[]): TriagePriority {
  const normalized = symptoms.map((s) => s.toLowerCase());

  const hasCritical = normalized.some(
    (s) =>
      s.includes("parada") ||
      s.includes("inconsciente") ||
      s.includes("choque") ||
      s.includes("hemorragia severa")
  );

  const hasHigh = normalized.some(
    (s) =>
      s.includes("dor no peito") ||
      s.includes("falta de ar") ||
      s.includes("convulsao")
  );

  const hasMedium = normalized.some(
    (s) =>
      s.includes("febre alta") ||
      s.includes("fratura") ||
      s.includes("vomito persistente")
  );

  return match({ hasCritical, hasHigh, hasMedium })
    .with({ hasCritical: true }, () => TriagePriority.VERMELHO)
    .with({ hasHigh: true }, () => TriagePriority.LARANJA)
    .with({ hasMedium: true }, () => TriagePriority.AMARELO)
    .otherwise(() => TriagePriority.VERDE);
}
