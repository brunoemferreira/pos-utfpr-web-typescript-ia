/**
 * Prioridade de Triagem baseada no Sistema de Triagem de Manchester utilizado em UPAs.
 * Classificação oficial das cores em Português.
 */
export enum TriagePriority {
  VERMELHO = "VERMELHO", // Emergência / Crítico (Atendimento imediato)
  LARANJA = "LARANJA",   // Muito Urgente (Atendimento em até 10 minutos)
  AMARELO = "AMARELO",   // Urgente (Atendimento em até 60 minutos)
  VERDE = "VERDE",       // Pouco Urgente (Atendimento em até 120 minutos)
  AZUL = "AZUL"          // Não Urgente (Atendimento em até 240 minutos)
}

/**
 * Detalhes do Acordo de Nível de Serviço (SLA) para cada nível de prioridade.
 */
export interface PrioritySLA {
  priority: TriagePriority;
  targetWaitMinutes: number;
  label: string;
  description: string;
  emergencyLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "MINIMAL";
}

/**
 * Tipo para peso numérico de urgência utilizado na ordenação da fila de prioridade.
 * Quanto maior o número, maior a prioridade de atendimento.
 */
export type PriorityWeight = 5 | 4 | 3 | 2 | 1;

/**
 * Mapeamento de cada nível de prioridade em Português para seu respectivo peso de ordenação.
 * Ilustra o uso do Utility Type `Record<K, T>` (Requisito RA02).
 */
export const PRIORITY_WEIGHTS: Record<TriagePriority, PriorityWeight> = {
  [TriagePriority.VERMELHO]: 5,
  [TriagePriority.LARANJA]: 4,
  [TriagePriority.AMARELO]: 3,
  [TriagePriority.VERDE]: 2,
  [TriagePriority.AZUL]: 1
};
