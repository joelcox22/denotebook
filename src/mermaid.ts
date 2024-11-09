// deno-lint-ignore-file no-explicit-any

import { Buffer } from "node:buffer";
import { renderMermaid } from 'npm:@mermaid-js/mermaid-cli@11.4.0'
import puppeteer from 'npm:puppeteer@23.7.1';
import { stringify } from 'npm:yaml@2.6.0';

const oldLog = console.log;
console.warn = () => {};
const browser = await puppeteer.launch();
console.warn = oldLog;

let config: any = {};

export async function mermaid(graph: string | TemplateStringsArray): Promise<void> {
  const mmd = `---\n${stringify(config)}---\n${graph.toString()}`;
  const { data } = await renderMermaid(browser, mmd, 'svg', {
    // backgroundColor: 'transparent',
    mermaidConfig: {
      // theme: 'dark',
    },
  });
  Deno.jupyter.display(Deno.jupyter.svg`${Buffer.from(data).toString()}`);
}

mermaid.configure = function(newConfig: any): void {
  config = newConfig;
}
