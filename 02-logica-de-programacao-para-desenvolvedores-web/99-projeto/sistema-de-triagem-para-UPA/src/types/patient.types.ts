import { TriagePriority } from "./priority.types.js";

/**
 * Entidade de domínio que representa um Paciente no Sistema de Triagem da UPA.
 */
export interface Patient {
  id: string;
  name: string;
  age: number;
  cpf: string;
  phone: string;
  email: string;
  symptoms: string[];
  arrivalTime: Date;
  priority: TriagePriority;
  vitalSigns?: {
    bloodPressure?: string;
    temperatureCelsius?: number;
    heartRateBpm?: number;
    oxygenSaturationPercentage?: number;
  };
}

/**
 * RA02 — Aplicação de Utility Types no TypeScript:
 * 
 * 1. Omit & Partial: `CreatePatientInput` exclui campos gerados automaticamente
 *    pelo sistema (id, arrivalTime) e torna a prioridade opcional (default: BLUE).
 */
export type CreatePatientInput = Omit<Patient, "id" | "arrivalTime" | "priority"> & {
  priority?: TriagePriority;
};

/**
 * 2. Partial & Omit: `UpdatePatientInput` permite atualizar atributos selecionados do paciente
 *    sem modificar identificadores imutáveis (id, arrivalTime).
 */
export type UpdatePatientInput = Partial<Omit<Patient, "id" | "arrivalTime">>;

/**
 * 3. Readonly: `ReadonlyPatient` garante imutabilidade ao expor registros de pacientes
 *    para serviços de relatório somente-leitura.
 */
export type ReadonlyPatient = Readonly<Patient>;
