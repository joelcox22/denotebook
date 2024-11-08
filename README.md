# Denotebook

The goal of this project is to consolidate a bunch of easy-to-use helper methods that render well in Github when used from Deno Jupyter notebooks.

## Recommended usage pattern

Add an import for `denotebook` to your `deno.json` mapping to this project. 

```json deno.json
{
  "imports": {
    "denotebook": "jsr:joelcox22/denotebook"
  }
}
```

Doing this will allow you to easily fork the denotebook repo and easily update your projects to use your fork if desired, while also keeping all examples / tests clear and copy+pasteable.

## Examples

See the [tests](./tests/) directory for notebooks full of examples.
