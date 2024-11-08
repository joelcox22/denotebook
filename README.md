# Denotebook

The goal of this project is to consolidate a bunch of easy-to-use helper methods that render well in Github when used from Deno Jupyter notebooks.

Some things might be dumb / easy to replicate with deno built-in methods, and that's OK - my goal is to have a single go-to package for easy rendering methods that I have clear simple examples for, which all work in roughly the same way.

All methods should actually display the results without needing to be the last thing returned by a code block in a notebook cell.

Long term I'll aim for style consistency across all components, but that's not an important short-term goal.

This is generally the place where I want all the hacky things that make everything look easy and clear elsewhere to be abstracted away.

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
