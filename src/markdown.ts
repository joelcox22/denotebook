
export function markdown(content: string | TemplateStringsArray): void {
  Deno.jupyter.display(Deno.jupyter.md`${content}`);
}
