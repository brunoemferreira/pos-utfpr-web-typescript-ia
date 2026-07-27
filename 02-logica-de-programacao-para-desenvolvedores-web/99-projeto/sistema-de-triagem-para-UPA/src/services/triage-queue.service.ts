import { Patient } from "../types/patient.types.js";
import { TriagePriority, PRIORITY_WEIGHTS } from "../types/priority.types.js";

/**
 * R03 — Classificação e gerenciamento da fila de atendimento
 * 
 * Gerencia a fila de triagem por nível de prioridade médica e horário de chegada.
 * Demonstra estruturas de controle (if/else, switch, ternário, while, for).
 */
export class TriageQueueService {
  private queue: Patient[] = [];

  /**
   * Adiciona um paciente à fila e reorganiza a ordem imediatamente conforme o risco médico.
   */
  public enqueue(patient: Patient): void {
    if (!patient || !patient.id) {
      throw new Error("Objeto de paciente inválido fornecido para a fila de triagem.");
    }

    // Verifica se já está na fila
    const exists = this.queue.some((p) => p.id === patient.id);
    if (exists) {
      this.reorderQueue();
      return;
    }

    this.queue.push(patient);
    this.reorderQueue();
  }

  /**
   * Ordena a fila utilizando o peso da prioridade (decrescente) e o horário de chegada (crescente - FIFO).
   */
  private reorderQueue(): void {
    this.queue.sort((a, b) => {
      const weightA = PRIORITY_WEIGHTS[a.priority];
      const weightB = PRIORITY_WEIGHTS[b.priority];

      if (weightA !== weightB) {
        return weightB - weightA; // Maior peso de prioridade vem primeiro
      }

      // Mesma prioridade: ordem de chegada (FIFO)
      return a.arrivalTime.getTime() - b.arrivalTime.getTime();
    });
  }

  /**
   * Remove e retorna o próximo paciente a ser atendido pela equipe médica.
   */
  public dequeueNextPatient(): Patient | undefined {
    let nextPatient: Patient | undefined = undefined;

    // Utiliza laço while para extrair o primeiro paciente válido da fila
    while (this.queue.length > 0 && !nextPatient) {
      const candidate = this.queue.shift();
      if (candidate) {
        nextPatient = candidate;
      }
    }

    return nextPatient;
  }

  /**
   * Atualiza o nível de prioridade de um paciente ativo na fila e reordena a fila.
   */
  public updatePatientPriority(patientId: string, newPriority: TriagePriority): boolean {
    const patient = this.queue.find((p) => p.id === patientId);
    
    // Verificação de Truthiness
    if (!patient) {
      return false;
    }

    // Registra alteração de prioridade no console utilizando switch
    switch (newPriority) {
      case TriagePriority.VERMELHO:
        console.log(`[ALERTA 🔴] Paciente ${patient.name} (${patient.id}) elevado para EMERGÊNCIA VERMELHA!`);
        break;
      case TriagePriority.LARANJA:
        console.log(`[NOTIFICAÇÃO 🟠] Paciente ${patient.name} (${patient.id}) atualizado para Prioridade LARANJA.`);
        break;
      default:
        console.log(`[INFORMAÇÃO] Prioridade do paciente ${patient.name} alterada para ${newPriority}.`);
        break;
    }

    patient.priority = newPriority;
    this.reorderQueue();
    return true;
  }

  /**
   * Retorna uma cópia do estado atual da fila de atendimento.
   */
  public getQueueSnapshot(): Patient[] {
    return [...this.queue];
  }

  /**
   * Visualiza o próximo paciente da fila sem removê-lo.
   */
  public peekNextPatient(): Patient | undefined {
    return this.queue.length > 0 ? this.queue[0] : undefined;
  }
}
