# Denotebook

Random helper methods for use with Deno + Jupyter notebooks.

Goal is easy-to-use helper methods that render well in Github.

Users beware: I intend to make plenty of semver-major changes over time on a whim.
This is not a community driven project - it's a personal library that I'm making
publicly available to make my own usage easy to share. Feel free to fork it.

## Examples

### Sankey

```typescript
import { sankey } from 'jsr:joelcox22/denotebook';

sankey([
  ['a', 'b', 15],
  ['a', 'c', 75],
  ['b', 'd', 25],
  ['c', 'd', 50],
  ['b', 'e', 40],
  ['x', 'b', 50],
  ['c', 'e', 25],
]);
```
