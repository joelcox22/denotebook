import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { run } from 'npm:@mermaid-js/mermaid-cli@11.4.0'

export async function mermaid(graph: string | TemplateStringsArray): Promise<void> {
  const oldLog = console.log;
  console.warn = () => {};
  const dir = path.join(os.tmpdir(), 'denotebook');
  fs.mkdirSync(dir, { recursive: true });
  const input = path.join(dir, 'input.mmd');
  const output = `${input}.svg` as const;
  fs.writeFileSync(input, graph.toString());
  await run(input, output, {
    quiet: true,
    puppeteerConfig: {

    },
  });
  const svg = fs.readFileSync(output, 'utf-8');
  fs.rmSync(dir, { recursive: true });
  console.warn = oldLog;
  Deno.jupyter.display(Deno.jupyter.svg`${svg}`);
}
