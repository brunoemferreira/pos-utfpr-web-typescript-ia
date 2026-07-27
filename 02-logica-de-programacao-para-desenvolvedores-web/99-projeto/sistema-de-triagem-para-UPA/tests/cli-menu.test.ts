import { describe, it } from "node:test";
import assert from "node:assert";
import { CLIMenuService } from "../src/cli/cli-menu.service.js";

describe("CLI Menu Service Tests", () => {
  it("deve instanciar o serviço do menu CLI sem erros", () => {
    const cli = new CLIMenuService();
    assert.ok(cli);
    assert.equal(typeof cli.start, "function");
  });
});
