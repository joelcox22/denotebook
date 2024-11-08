import * as d3 from 'npm:d3';
import { JSDOM } from "npm:jsdom";
import { SankeyChart } from 'npm:sankey-plus@0.7.0';

type SankeyEntry = [from: string, to: string, value: number];

/**
 * Display a sankey diagram.
 */
export function sankey(data: SankeyEntry[]): void {
  Deno.jupyter.display(Deno.jupyter.md`\`\`\`mermaid\nsankey-beta\n${data
    .map((row) => row.join(","))
    .join("\n")}\n\`\`\``);
}


/**
 * Display a sankey diagram.
 */
export function sankey2(data: SankeyEntry[]): void {
  const dom = new JSDOM();
  globalThis.document = dom.window.document;
  globalThis.d3 = d3;
  d3.gro
  const el = dom.window.document.createElement('div');
  el.id = 'sankey';
  dom.window.document.body.appendChild(el);
  const nodes = data.flatMap(([from, to]) => [from, to]).filter((v, i, a ) => a.indexOf(v) === i).map((name) => ({ name }));
  const links = data.flatMap(([source, target, value]) => ({ source, target, value }));
  console.log({ nodes, links });
  const chart = new SankeyChart({
    nodes: {
      data: nodes,
    },
    links: {
      data: links,
    },
  });
  chart.process();
  chart.draw('sankey');
  Deno.jupyter.display(Deno.jupyter.svg`${globalThis.document.body.innerHTML}`);
}
