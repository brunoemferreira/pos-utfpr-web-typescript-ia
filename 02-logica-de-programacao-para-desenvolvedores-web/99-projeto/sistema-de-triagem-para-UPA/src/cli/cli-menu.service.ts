import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { PatientService } from "../services/patient.service.js";
import { TriageQueueService } from "../services/triage-queue.service.js";
import { StatisticsService } from "../services/statistics.service.js";
import { ExternalPatientAPI } from "../api/external-patient-api.js";
import { TriagePriority } from "../types/priority.types.js";
import { getPrioritySLA, inferPriorityFromSymptoms } from "../utils/priority-matcher.util.js";
import { CreatePatientInput } from "../types/patient.types.js";
import {
  validateCPF,
  validatePhone,
  validateEmail,
  formatCPF,
  formatPhone
} from "../validators/patient.validator.js";

/**
 * Serviço responsável por gerenciar a Interface de Linha de Comando (CLI) interativa
 * com validação dinâmica de dados de entrada.
 */
export class CLIMenuService {
  private patientService = new PatientService();
  private queueService = new TriageQueueService();
  private statsService = new StatisticsService();
  private externalApi = new ExternalPatientAPI(150);

  /**
   * Inicia o loop principal de navegação do menu no terminal.
   */
  public async start(): Promise<void> {
    const rl = readline.createInterface({ input, output });

    let running = true;
    while (running) {
      this.printMenuHeader();
      const answer = (await rl.question("\nOpção desejada [0-7]: ")).trim();

      switch (answer) {
        case "1":
          await this.handleRegisterPatient(rl);
          break;
        case "2":
          await this.handleFetchMedicalHistory(rl);
          break;
        case "3":
          this.handleViewQueue();
          break;
        case "4":
          await this.handleReevaluateRisk(rl);
          break;
        case "5":
          this.handleAttendNextPatient();
          break;
        case "6":
          this.handleGenerateReport();
          break;
        case "7":
          await this.handleRunFullSimulation();
          break;
        case "0":
          console.log("\nEncerrando o Sistema de Triagem UPA. Até logo!");
          running = false;
          break;
        default:
          console.log("\n❌ Opção inválida! Por favor, escolha um número de 0 a 7.");
          break;
      }

      if (running) {
        await rl.question("\nPressione [ENTER] para continuar...");
      }
    }

    rl.close();
  }

  private printMenuHeader(): void {
    console.log("\n=================================================");
    console.log("    SISTEMA DE TRIAGEM E GERENCIAMENTO — UPA    ");
    console.log("=================================================");
    console.log("1. Cadastrar Paciente");
    console.log("2. Consultar Prontuário Médico Externo");
    console.log("3. Consultar Fila de Atendimento por Prioridade");
    console.log("4. Reavaliação de Risco (Alterar Prioridade)");
    console.log("5. Simulação de Atendimento Médico");
    console.log("6. Relatório Estatístico de Atendimento");
    console.log("7. Executar Simulação Completa");
    console.log("0. Sair");
    console.log("=================================================");
  }

  /**
   * Opção 1: Cadastrar Paciente com validações interativas em tempo real.
   */
  private async handleRegisterPatient(rl: readline.Interface): Promise<void> {
    console.log("\n--- [1] CADASTRAR PACIENTE ---");

    // 1. Nome
    let name = "";
    while (name.trim().length < 2) {
      name = await rl.question("Nome Completo do Paciente: ");
      if (name.trim().length < 2) {
        console.log("❌ O nome deve possuir ao menos 2 caracteres. Tente novamente.");
      }
    }

    // 2. Idade
    let age = -1;
    while (age < 0 || age > 130 || isNaN(age)) {
      const ageStr = await rl.question("Idade (em anos): ");
      const parsedAge = parseInt(ageStr, 10);
      if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 130) {
        console.log("❌ Idade inválida! Informe um número entre 0 e 130.");
      } else {
        age = parsedAge;
      }
    }

    // 3. CPF
    let cpf = "";
    while (!validateCPF(cpf)) {
      const rawCpf = await rl.question("CPF (ex: 000.000.000-00 ou 11 dígitos): ");
      const formatted = formatCPF(rawCpf.trim());
      if (validateCPF(formatted)) {
        if (this.patientService.getPatientByCPF(formatted)) {
          console.log(`❌ Já existe um paciente cadastrado com o CPF ${formatted}!`);
        } else {
          cpf = formatted;
        }
      } else {
        console.log("❌ Formato de CPF inválido! Esperado: 000.000.000-00.");
      }
    }

    // 4. Telefone (aceita dígitos limpos ex: 19992922054 ou já formatado)
    let phone = "";
    while (!validatePhone(phone)) {
      const rawPhone = await rl.question("Telefone (ex: 19992922054 ou (19) 99929-2205): ");
      const formatted = formatPhone(rawPhone.trim());
      if (validatePhone(formatted)) {
        phone = formatted;
        console.log(`ℹ Telefone formatado automaticamente: ${phone}`);
      } else {
        console.log("❌ Telefone inválido! Informe um número com DDD (10 ou 11 dígitos).");
      }
    }

    // 5. E-mail
    let email = "";
    while (!validateEmail(email)) {
      email = (await rl.question("E-mail (ex: paciente@dominio.com): ")).trim();
      if (!validateEmail(email)) {
        console.log("❌ Formato de e-mail inválido! Tente novamente.");
      }
    }

    // 6. Sintomas
    let symptoms: string[] = [];
    while (symptoms.length === 0) {
      const symptomsStr = await rl.question("Sintomas (separados por vírgula): ");
      symptoms = symptomsStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (symptoms.length === 0) {
        console.log("❌ Informe ao menos um sintoma.");
      }
    }

    // 7. Prioridade numerada de 1 a 5 com emojis coloridos (🔴 🟠 🟡 🟢 🔵) em Português
    console.log("\nSelecione a cor de prioridade de Manchester do paciente:");
    console.log("  1 - 🔴 Vermelho (Emergência — Atendimento Imediato)");
    console.log("  2 - 🟠 Laranja  (Muito Urgente — Até 10 min)");
    console.log("  3 - 🟡 Amarelo  (Urgente — Até 60 min)");
    console.log("  4 - 🟢 Verde    (Pouco Urgente — Até 120 min)");
    console.log("  5 - 🔵 Azul     (Não Urgente — Até 240 min)");
    console.log("  (Pressione [ENTER] para inferência automática baseada nos sintomas)");

    const choice = (await rl.question("Opção de Prioridade [1-5]: ")).trim();
    const priorityMap: Record<string, TriagePriority> = {
      "1": TriagePriority.VERMELHO,
      "2": TriagePriority.LARANJA,
      "3": TriagePriority.AMARELO,
      "4": TriagePriority.VERDE,
      "5": TriagePriority.AZUL
    };

    let priority: TriagePriority;
    if (priorityMap[choice]) {
      priority = priorityMap[choice];
    } else {
      priority = inferPriorityFromSymptoms(symptoms);
      console.log(`ℹ Prioridade inferida automaticamente pelos sintomas: ${getPrioritySLA(priority).label}`);
    }

    try {
      const patient = this.patientService.registerPatient({
        name,
        age,
        cpf,
        phone,
        email,
        symptoms,
        priority
      });

      this.queueService.enqueue(patient);
      const sla = getPrioritySLA(patient.priority);

      console.log(`\n✅ PACIENTE CADASTRADO COM SUCESSO!`);
      console.log(`   ID: ${patient.id}`);
      console.log(`   Nome: ${patient.name}`);
      console.log(`   Telefone: ${patient.phone}`);
      console.log(`   Prioridade: ${sla.label}`);
      console.log(`   Tempo Alvo de Espera: ${sla.targetWaitMinutes} minutos`);
    } catch (err: unknown) {
      console.log(`❌ Erro no cadastro: ${err instanceof Error ? err.message : err}`);
    }
  }

  /**
   * Opção 2: Consultar Prontuário Médico Externo (API Assíncrona).
   */
  private async handleFetchMedicalHistory(rl: readline.Interface): Promise<void> {
    console.log("\n--- [2] CONSULTAR PRONTUÁRIO MÉDICO EXTERNO ---");
    const rawCpf = await rl.question("Informe o CPF do paciente: ");
    const cpf = formatCPF(rawCpf.trim());

    if (!validateCPF(cpf)) {
      console.log("❌ Formato de CPF inválido! Esperado: 000.000.000-00.");
      return;
    }

    console.log("⏳ Consultando prontuário na API externa...");
    const res = await this.externalApi.fetchMedicalHistoryByCPF(cpf);

    if (res.success && res.data) {
      console.log(`\n✔ Prontuário externo retornado com sucesso (Status ${res.statusCode}):`);
      console.log(`   CPF: ${res.data.patientCpf}`);
      console.log(`   Tipo Sanguíneo: ${res.data.bloodType}`);
      console.log(`   Alergias Conhecidas: ${res.data.knownAllergies.join(", ")}`);
      console.log(`   Condições Crônicas: ${res.data.chronicConditions.join(", ")}`);
      if (res.data.lastVisitDate) {
        console.log(`   Última Consulta: ${res.data.lastVisitDate}`);
      }
    } else {
      console.log(`\n❌ Falha na consulta (Status ${res.statusCode}): ${res.error}`);
    }
  }

  /**
   * Opção 3: Consultar Fila de Atendimento ordenada por prioridade médica.
   */
  private handleViewQueue(): void {
    console.log("\n--- [3] FILA DE ATENDIMENTO (POR PRIORIDADE) ---");
    const snapshot = this.queueService.getQueueSnapshot();

    if (snapshot.length === 0) {
      console.log("ℹ A fila de atendimento está atualmente vazia.");
      return;
    }

    console.log(`Total de Pacientes Aguardando: ${snapshot.length}\n`);
    snapshot.forEach((p, idx) => {
      const sla = getPrioritySLA(p.priority);
      console.log(
        `  Posição ${idx + 1}: [${p.id}] ${p.name} - ${sla.label} (Chegada: ${p.arrivalTime.toLocaleTimeString()})`
      );
    });
  }

  /**
   * Opção 4: Reavaliação de Risco / Alterar Prioridade de Paciente.
   */
  private async handleReevaluateRisk(rl: readline.Interface): Promise<void> {
    console.log("\n--- [4] REAVALIAÇÃO DE RISCO NA FILA ---");
    const identifier = (await rl.question("Informe o CPF ou ID (PAT-XXXX) do paciente: ")).trim();

    // Localizar paciente na fila
    const snapshot = this.queueService.getQueueSnapshot();
    const patient = snapshot.find(
      (p) => p.id === identifier || p.cpf === formatCPF(identifier)
    );

    if (!patient) {
      console.log(`❌ Paciente com identificador '${identifier}' não foi encontrado na fila de espera.`);
      return;
    }

    console.log(`\nPaciente localizado: ${patient.name} (${patient.id}) | Prioridade Atual: ${getPrioritySLA(patient.priority).label}`);
    console.log("Selecione a nova cor de prioridade:");
    console.log("  1 - 🔴 Vermelho (Emergência)");
    console.log("  2 - 🟠 Laranja  (Muito Urgente)");
    console.log("  3 - 🟡 Amarelo  (Urgente)");
    console.log("  4 - 🟢 Verde    (Pouco Urgente)");
    console.log("  5 - 🔵 Azul     (Não Urgente)");

    const choice = (await rl.question("Opção de Nova Prioridade [1-5]: ")).trim();
    const priorityMap: Record<string, TriagePriority> = {
      "1": TriagePriority.VERMELHO,
      "2": TriagePriority.LARANJA,
      "3": TriagePriority.AMARELO,
      "4": TriagePriority.VERDE,
      "5": TriagePriority.AZUL
    };

    const newPriority = priorityMap[choice];
    if (!newPriority) {
      console.log("❌ Opção de prioridade inválida!");
      return;
    }

    const success = this.queueService.updatePatientPriority(patient.id, newPriority);
    if (success) {
      const sla = getPrioritySLA(newPriority);
      console.log(`\n✅ Prioridade de ${patient.name} reavaliada com sucesso para ${sla.label}! A fila foi reordenada.`);
    }
  }

  /**
   * Opção 5: Simulação de Atendimento Médico (Dequeue).
   */
  private handleAttendNextPatient(): void {
    console.log("\n--- [5] SIMULAÇÃO DE ATENDIMENTO MÉDICO ---");
    const nextPatient = this.queueService.dequeueNextPatient();

    if (!nextPatient) {
      console.log("ℹ Nenhum paciente aguardando na fila para atendimento.");
      return;
    }

    const sla = getPrioritySLA(nextPatient.priority);
    console.log(`👨‍⚕️ CHAMANDO PARA ATENDIMENTO MÉDICO:`);
    console.log(`   ID: ${nextPatient.id}`);
    console.log(`   Nome: ${nextPatient.name} (${nextPatient.age} anos)`);
    console.log(`   Prioridade: ${sla.label}`);
    console.log(`   Sintomas: ${nextPatient.symptoms.join(", ")}`);
    console.log(`   Chegada: ${nextPatient.arrivalTime.toLocaleTimeString()}`);
  }

  /**
   * Opção 6: Relatório Estatístico de Atendimento.
   */
  private handleGenerateReport(): void {
    console.log("\n--- [6] RELATÓRIO ESTATÍSTICO DE ATENDIMENTO ---");
    const allPatients = this.patientService.listAllPatients();
    const report = this.statsService.generateConsolidatedReport(allPatients);

    console.log(`Total de Pacientes Cadastrados: ${report.totalPatients}`);
    console.log(`Idade Média dos Pacientes: ${report.averageAge} anos`);
    console.log(`Pacientes Idosos (>= 60 anos): ${report.elderlyCount}`);
    console.log(`Emergência Crítica Pendente? ${report.hasEmergencyWaiting ? "SIM 🚨" : "NÃO ✅"}`);
    console.log(`Distribuição por Gravidade:`, report.priorityCounts);

    console.log("\n--- SÍNTESE DE SINTOMAS REGISTRADOS ---");
    console.log(report.formattedSymptomList);
  }

  /**
   * Opção 7: Executar Simulação Completa Automatizada executando sequencialmente as 6 etapas do menu (1 a 6).
   */
  private async handleRunFullSimulation(): Promise<void> {
    console.log("\n=================================================");
    console.log("   EXECUTANDO SIMULAÇÃO COMPLETA (ETAPAS 1 A 6)  ");
    console.log("=================================================");

    // ETAPA 1: Cadastro de Pacientes na Recepção
    console.log("\n--- [ETAPA 1] CADASTRANDO PACIENTES NA RECEPÇÃO ---");
    const sampleInputs: CreatePatientInput[] = [
      {
        name: "Maria da Silva",
        age: 68,
        cpf: "123.456.789-00",
        phone: "(41) 98888-1111",
        email: "maria.silva@email.com",
        symptoms: ["Dor no peito", "Falta de ar"],
        priority: TriagePriority.LARANJA
      },
      {
        name: "João Santos",
        age: 45,
        cpf: "987.654.321-11",
        phone: "(41) 97777-2222",
        email: "joao.santos@email.com",
        symptoms: ["Parada cardiorrespiratoria", "Inconsciente"],
        priority: TriagePriority.VERMELHO
      },
      {
        name: "Ana Oliveira",
        age: 29,
        cpf: "456.789.123-33",
        phone: "(41) 96666-3333",
        email: "ana.oliveira@email.com",
        symptoms: ["Febre alta", "Dor de cabeca"],
        priority: TriagePriority.AMARELO
      },
      {
        name: "Carlos Eduardo",
        age: 19,
        cpf: "111.222.333-44",
        phone: "(41) 95555-4444",
        email: "carlos.eduardo@email.com",
        symptoms: ["Dor de garganta leve"],
        priority: TriagePriority.AZUL
      }
    ];

    for (const input of sampleInputs) {
      try {
        if (!this.patientService.getPatientByCPF(input.cpf)) {
          const p = this.patientService.registerPatient(input);
          this.queueService.enqueue(p);
          console.log(`✔ Cadastrado em lote: ${p.name} (${p.id}) - ${getPrioritySLA(p.priority).label}`);
        }
      } catch (err: unknown) {
        console.log(`ℹ Paciente ${input.name} já cadastrado ou erro:`, err instanceof Error ? err.message : err);
      }
    }

    // ETAPA 2: Consultar Prontuário Médico Externo (API Assíncrona)
    console.log("\n--- [ETAPA 2] CONSULTANDO PRONTUÁRIO EXTERNO (API ASSÍNCRONA) ---");
    const ext = await this.externalApi.fetchMedicalHistoryByCPF("123.456.789-00");
    if (ext.success && ext.data) {
      console.log(`✔ Prontuário externo retornado para o CPF 123.456.789-00:`);
      console.log(`   Tipo Sanguíneo: ${ext.data.bloodType}`);
      console.log(`   Alergias Conhecidas: ${ext.data.knownAllergies.join(", ")}`);
      console.log(`   Condições Crônicas: ${ext.data.chronicConditions.join(", ")}`);
    }

    // ETAPA 3: Consultar Fila de Atendimento por Prioridade
    console.log("\n--- [ETAPA 3] FILA DE ATENDIMENTO ORDENADA POR GRAVIDADE (MANCHESTER) ---");
    this.handleViewQueue();

    // ETAPA 4: Reavaliação de Risco na Fila
    console.log("\n--- [ETAPA 4] REAVALIAÇÃO DE RISCO NA FILA ---");
    const ana = this.patientService.getPatientByCPF("456.789.123-33");
    if (ana) {
      this.queueService.updatePatientPriority(ana.id, TriagePriority.VERMELHO);
    }

    // ETAPA 5: Simulação de Atendimento Médico
    console.log("\n--- [ETAPA 5] SIMULAÇÃO DE ATENDIMENTO MÉDICO (CHAMADA DE PACIENTES) ---");
    this.handleAttendNextPatient();
    this.handleAttendNextPatient();

    // ETAPA 6: Relatório Estatístico de Atendimento
    console.log("\n--- [ETAPA 6] RELATÓRIO ESTATÍSTICO DE ATENDIMENTO ---");
    this.handleGenerateReport();

    console.log("\n=================================================");
    console.log("       SIMULAÇÃO COMPLETA CONCLUÍDA!            ");
    console.log("=================================================");
  }
}
