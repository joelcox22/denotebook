import { markdown } from './markdown.ts';

export function table(data: Record<string, unknown>[]): void {
    const headers = Object.keys(data[0]);
    markdown(`    
| | ${headers.join(' | ')} |
| --- | ${headers.map(() => '---').join(' | ')} |
${data.map((row, index) => `| ${index} | ${Object.values(row).join(' | ')} |`).join('\n')}
`);
  }
