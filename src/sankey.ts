
type SankeyEntry = [from: string, to: string, value: number];

export function sankey(data: SankeyEntry[]): Deno.jupyter.Displayable {
  return Deno.jupyter.md`\`\`\`mermaid\nsankey-beta\n${data
    .map((row) => row.join(","))
    .join("\n")}\`\`\``;
}
