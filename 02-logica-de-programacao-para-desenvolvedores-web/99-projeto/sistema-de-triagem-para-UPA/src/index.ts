import { CLIMenuService } from "./cli/cli-menu.service.js";

/**
 * Ponto de entrada principal para o Sistema de Triagem da UPA com Menu Interativo.
 */
async function main() {
  const menu = new CLIMenuService();
  await menu.start();
}

main().catch((err) => {
  console.error("Erro fatal na execução do sistema:", err);
  process.exit(1);
});
