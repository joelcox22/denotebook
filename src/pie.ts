import { mermaid } from 'denotebook';

type ArrayPie = [label: string, value: number][];
type ObjectPie = Record<string, number>;

export async function pie(data: ArrayPie | ObjectPie): Promise<void> {
  const arrayData = Array.isArray(data) ? data : Object.entries(data);
  await mermaid(`pie\n${arrayData.map(([name, value]) => `"${name}" : ${value}`).join('\n')}`);
}
