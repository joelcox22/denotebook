import { Buffer } from "node:buffer";
import { renderMermaid } from 'npm:@mermaid-js/mermaid-cli@11.4.0'
import puppeteer from 'npm:puppeteer@23.7.1';
import { stringify } from 'jsr:@std/yaml@^1';
import { deepMerge } from 'jsr:@std/collections@^1';

type MermaidConfig = {
  /**
   * @default html
   */
  outputFormat: 'svg' | 'html' | 'png' | 'pdf';
  config: {
    theme: 'dark' | 'default';
  };
  /**
   * Some chart types support a title
   */
  title?: string;
}

const defaultConfig: MermaidConfig = {
  outputFormat: 'html',
  config: {
    theme: 'dark',
  },
};

let config: MermaidConfig = {...defaultConfig};

let _browser: puppeteer.Browser | undefined; 

async function getBrowser(): Promise<puppeteer.Browser> {
  if (!_browser) {
    const oldWarn = console.warn;
    console.warn = () => {};
    _browser = await puppeteer.launch();
    console.warn = oldWarn;
  }
  return _browser;
}

export async function mermaid(graph: string | TemplateStringsArray): Promise<void> {
  const mmd = `---\n${stringify(config)}---\n${graph.toString()}`;
  const mermaidOutput = config.outputFormat === 'html' ? 'svg' : config.outputFormat;
  const { data } = await renderMermaid(await getBrowser(), mmd, mermaidOutput, {
    mermaidConfig: {
      htmlLabels: false,
      darkMode: true,
    },
    backgroundColor: '#333333',
  });
  if (config.outputFormat === 'png') {
      const dataUri = `data:image/png;base64,${Buffer.from(data).toString('base64')}`;
      Deno.jupyter.display(Deno.jupyter.html`<img src="${dataUri}" />`);
  } else if (config.outputFormat === 'pdf') {
    const dataUri = `data:application/pdf;base64,${Buffer.from(data).toString('base64')}`;
    Deno.jupyter.display(Deno.jupyter.html`<iframe src="${dataUri}" style="width: 100%; height: 100%;"></iframe>`);
  } else if (config.outputFormat === 'html') {
    Deno.jupyter.display(Deno.jupyter.html`${Buffer.from(data).toString()}`);
  } else {
    Deno.jupyter.display(Deno.jupyter.svg`${Buffer.from(data).toString()}`);
  }
}

mermaid.configure = function(newConfig: Partial<MermaidConfig>): void {
  config = deepMerge(config, newConfig);
}

mermaid.resetConfig = () => config = { ...defaultConfig };
