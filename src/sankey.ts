import { mermaid } from 'denotebook';

type SankeyEntry = [from: string, to: string, value: number];

export async function sankey(data: SankeyEntry[]): Promise<void> {
  await mermaid(`
sankey-beta
${data.map((line) => line.join(',')).join('\n')}
`);
}
