// deno-lint-ignore-file no-explicit-any

import { Buffer } from "node:buffer";
import { renderMermaid } from 'npm:@mermaid-js/mermaid-cli@11.4.0'
import puppeteer from 'npm:puppeteer@23.7.1';
import { stringify } from 'npm:yaml@2.6.0';

const oldLog = console.log;
console.warn = () => {};
const browser = await puppeteer.launch();
console.warn = oldLog;

const defaultConfig: any = {
  config: {
    theme: 'dark',
  },
};

let config: any = {...defaultConfig};

export async function mermaid(graph: string | TemplateStringsArray): Promise<void> {
  const mmd = `---\n${stringify(config)}---\n${graph.toString()}`;
  const { data } = await renderMermaid(browser, mmd, 'png', {
    mermaidConfig: {
      htmlLabels: false,
    },
    backgroundColor: '#333333',
  });
  const dataUri = `data:image/png;base64,${Buffer.from(data).toString('base64')}`;
  Deno.jupyter.display(Deno.jupyter.html`<img src="${dataUri}" />`);
}

mermaid.configure = function(newConfig: any): void {
  Object.assign(config, newConfig);
}

mermaid.resetConfig = () => config = { ...defaultConfig };
