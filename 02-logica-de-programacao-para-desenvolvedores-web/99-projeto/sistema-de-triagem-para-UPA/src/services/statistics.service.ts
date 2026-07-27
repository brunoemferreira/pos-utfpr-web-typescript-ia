import { Patient } from "../types/patient.types.js";
import { TriagePriority } from "../types/priority.types.js";
import { getPrioritySLA } from "../utils/priority-matcher.util.js";

export interface QueueStatisticsReport {
  totalPatients: number;
  averageAge: number;
  priorityCounts: Record<TriagePriority, number>;
  hasEmergencyWaiting: boolean;
  elderlyCount: number;
  formattedSymptomList: string;
}

/**
 * R04 — Consulta, busca e geração de estatísticas
 * 
 * Demonstra a utilização prática de métodos de manipulação de Array:
 * map(), filter(), find(), some(), reduce() e join().
 */
export class StatisticsService {
  /**
   * Filtra pacientes por um nível de prioridade específico utilizando `filter()`.
   */
  public getPatientsByPriority(patients: Patient[], priority: TriagePriority): Patient[] {
    return patients.filter((patient) => patient.priority === priority);
  }

  /**
   * Localiza um paciente específico por CPF ou trecho do nome utilizando `find()`.
   */
  public findPatientBySearchTerm(patients: Patient[], term: string): Patient | undefined {
    const cleanTerm = term.trim().toLowerCase();
    return patients.find(
      (p) => p.cpf.toLowerCase() === cleanTerm || p.name.toLowerCase().includes(cleanTerm)
    );
  }

  /**
   * Verifica se existe algum paciente em estado crítico (VERMELHO) aguardando atendimento utilizando `some()`.
   */
  public hasCriticalPatientsWaiting(patients: Patient[]): boolean {
    return patients.some((patient) => patient.priority === TriagePriority.VERMELHO);
  }

  /**
   * Calcula a idade média dos pacientes cadastrados utilizando `reduce()`.
   */
  public calculateAverageAge(patients: Patient[]): number {
    if (patients.length === 0) return 0;
    const totalAge = patients.reduce((acc, curr) => acc + curr.age, 0);
    return Math.round((totalAge / patients.length) * 10) / 10;
  }

  /**
   * Gera a distribuição quantitativa de pacientes por nível de prioridade utilizando `reduce()`.
   */
  public getPriorityDistribution(patients: Patient[]): Record<TriagePriority, number> {
    const initialCounts: Record<TriagePriority, number> = {
      [TriagePriority.VERMELHO]: 0,
      [TriagePriority.LARANJA]: 0,
      [TriagePriority.AMARELO]: 0,
      [TriagePriority.VERDE]: 0,
      [TriagePriority.AZUL]: 0
    };

    return patients.reduce((acc, patient) => {
      acc[patient.priority] = (acc[patient.priority] || 0) + 1;
      return acc;
    }, initialCounts);
  }

  /**
   * Formata os sintomas dos pacientes em uma lista legível utilizando `map()` e `join()`.
   */
  public generateSymptomSummaryList(patients: Patient[]): string {
    if (patients.length === 0) return "Nenhum sintoma ativo registrado.";

    const summaries = patients.map(
      (p) => `[${p.id}] ${p.name} (${getPrioritySLA(p.priority).label}): ${p.symptoms.join(", ")}`
    );

    return summaries.join("\n");
  }

  /**
   * Consolida o relatório estatístico completo aplicando todos os métodos de array exigidos.
   */
  public generateConsolidatedReport(patients: Patient[]): QueueStatisticsReport {
    const totalPatients = patients.length;
    const averageAge = this.calculateAverageAge(patients);
    const priorityCounts = this.getPriorityDistribution(patients);
    const hasEmergencyWaiting = this.hasCriticalPatientsWaiting(patients);
    
    // Filtra pacientes idosos (>= 60 anos)
    const elderlyCount = patients.filter((p) => p.age >= 60).length;
    const formattedSymptomList = this.generateSymptomSummaryList(patients);

    return {
      totalPatients,
      averageAge,
      priorityCounts,
      hasEmergencyWaiting,
      elderlyCount,
      formattedSymptomList
    };
  }
}
