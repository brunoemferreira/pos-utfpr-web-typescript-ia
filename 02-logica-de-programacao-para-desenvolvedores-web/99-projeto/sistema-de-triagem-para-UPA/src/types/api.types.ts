/**
 * Estrutura genérica de resposta de API para serviços simulados externos.
 */
export interface APIResponse<T> {
  success: boolean;
  statusCode: number;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * Estrutura do prontuário médico externo do paciente carregado de um serviço externo ou JSON.
 */
export interface ExternalMedicalHistory {
  patientCpf: string;
  bloodType: string;
  knownAllergies: string[];
  chronicConditions: string[];
  lastVisitDate?: string;
}
