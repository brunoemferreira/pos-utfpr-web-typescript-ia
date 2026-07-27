import { Patient, CreatePatientInput, UpdatePatientInput, ReadonlyPatient } from "../types/patient.types.js";
import { TriagePriority } from "../types/priority.types.js";
import { validatePatientInput } from "../validators/patient.validator.js";

/**
 * R01 — Cadastro e gerenciamento de pacientes
 * R02 — Organização das funcionalidades do sistema em módulos reutilizáveis
 * 
 * Repositório e serviço em memória para gerenciamento dos registros de pacientes.
 */
export class PatientService {
  private patients: Map<string, Patient> = new Map();
  private idCounter = 1;

  /**
   * Realiza o cadastro de um novo paciente após executar as validações de regra de negócio.
   */
  public registerPatient(input: CreatePatientInput): Patient {
    const validation = validatePatientInput({
      name: input.name,
      age: input.age,
      cpf: input.cpf,
      phone: input.phone,
      email: input.email,
      symptoms: input.symptoms
    });

    if (!validation.isValid) {
      throw new Error(`Falha no cadastro do paciente: ${validation.errors.join("; ")}`);
    }

    // Verifica duplicidade de CPF
    if (this.getPatientByCPF(input.cpf)) {
      throw new Error(`Um paciente com o CPF '${input.cpf}' já está cadastrado no sistema.`);
    }

    const patientId = `PAT-${String(this.idCounter++).padStart(4, "0")}`;
    const newPatient: Patient = {
      ...input,
      id: patientId,
      arrivalTime: new Date(),
      priority: input.priority ?? TriagePriority.AZUL
    };

    this.patients.set(patientId, newPatient);
    return newPatient;
  }

  /**
   * Localiza e retorna um paciente pelo seu número de CPF.
   */
  public getPatientByCPF(cpf: string): Patient | undefined {
    for (const patient of this.patients.values()) {
      if (patient.cpf === cpf) {
        return patient;
      }
    }
    return undefined;
  }

  /**
   * Atualiza as informações cadastrais de um paciente existente.
   */
  public updatePatient(id: string, updates: UpdatePatientInput): Patient {
    const existing = this.patients.get(id);
    if (!existing) {
      throw new Error(`Paciente com o ID '${id}' não foi encontrado.`);
    }

    // Valida se o CPF informado na atualização já pertence a outro paciente
    if (updates.cpf && updates.cpf !== existing.cpf && this.getPatientByCPF(updates.cpf)) {
      throw new Error(`Não é possível atualizar: O CPF '${updates.cpf}' já pertence a outro paciente.`);
    }

    const updatedPatient: Patient = {
      ...existing,
      ...updates,
      // Preserva ID e horário de chegada originais
      id: existing.id,
      arrivalTime: existing.arrivalTime
    };

    this.patients.set(id, updatedPatient);
    return updatedPatient;
  }

  /**
   * Retorna a lista de todos os pacientes cadastrados como registros somente-leitura.
   */
  public listAllPatients(): ReadonlyPatient[] {
    return Array.from(this.patients.values());
  }
}
