# Denotebook

Random helper methods for use with Deno + Jupyter notebooks.

Goal is easy-to-use helper methods that render well in Github.

Users beware: I intend to make plenty of semver-major changes over time on a whim.
This is not a community driven project - it's a personal library that I'm making
publicly available to make my own usage easy to share. Feel free to fork it.

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
