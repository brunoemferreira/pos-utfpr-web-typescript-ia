import { APIResponse, ExternalMedicalHistory } from "../types/api.types.js";
import { CreatePatientInput } from "../types/patient.types.js";

/**
 * Base de dados simulada contendo prontuários médicos externos de pacientes.
 */
const MOCK_MEDICAL_RECORDS: Record<string, ExternalMedicalHistory> = {
  "123.456.789-00": {
    patientCpf: "123.456.789-00",
    bloodType: "O+",
    knownAllergies: ["Penicilina", "Aspirina"],
    chronicConditions: ["Hipertensao Arterial"],
    lastVisitDate: "2025-11-15"
  },
  "987.654.321-11": {
    patientCpf: "987.654.321-11",
    bloodType: "A-",
    knownAllergies: ["Poeira", "Amoxicilina"],
    chronicConditions: ["Diabetes Tipo 2", "Asma"],
    lastVisitDate: "2026-01-10"
  }
};

/**
 * R06 — Simulação de comunicação com uma API
 * 
 * Serviço assíncrono que simula a consulta de prontuários médicos externos e manipulação de JSON.
 */
export class ExternalPatientAPI {
  private simulatedLatencyMs: number;

  constructor(simulatedLatencyMs = 200) {
    this.simulatedLatencyMs = simulatedLatencyMs;
  }

  /**
   * Simula uma requisição HTTP GET assíncrona para buscar o prontuário de um paciente pelo CPF.
   */
  public async fetchMedicalHistoryByCPF(cpf: string): Promise<APIResponse<ExternalMedicalHistory>> {
    await this.delay(this.simulatedLatencyMs);

    const record = MOCK_MEDICAL_RECORDS[cpf];

    if (!record) {
      return {
        success: false,
        statusCode: 404,
        error: `Nenhum prontuario externo foi encontrado para o CPF ${cpf}`,
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      statusCode: 200,
      data: record,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Simula o parse e importação de um lote de pacientes a partir de um payload JSON.
   */
  public async importBatchPatientsFromJSON(jsonPayload: string): Promise<APIResponse<CreatePatientInput[]>> {
    await this.delay(this.simulatedLatencyMs);

    try {
      const parsedData = JSON.parse(jsonPayload);
      if (!Array.isArray(parsedData)) {
        throw new Error("Estrutura de JSON invalida: Esperado um array de registros de pacientes.");
      }

      return {
        success: true,
        statusCode: 200,
        data: parsedData as CreatePatientInput[],
        timestamp: new Date().toISOString()
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Falha ao processar o payload JSON";
      return {
        success: false,
        statusCode: 400,
        error: errorMessage,
        timestamp: new Date().toISOString()
      };
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
