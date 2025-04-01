# tree-sitter-tsqx

This is a tree-sitter parser for
[cjquines/tsqx](https://github.com/cjquines/tsqx).
`tsqx` is a wrapper around the Asymptote
vector graphics language,
`tsqx` was developed with olympiad geometry as a focus,
so the syntax in the parser reflects that.

> [!WARNING]
> Even though the syntax is close to complete in terms
> of implementation, this is still in the alpha stage.
> Expect breaking changes to be pushed at any moment.

## Screenshots

![comparison](https://github.com/extouchtriangle/tree-sitter-tsqx/blob/main/demo.png?raw=true)

- The image on the left is with treesitter, and the image on the right is
  without treesitter.

![tree](https://github.com/extouchtriangle/tree-sitter-tsqx/blob/main/tree.png?raw=true)

- An example of a parsed syntax tree.

## Integrations

- `nvim-treesitter`:
  - Run `tree-sitter build`
  - Copy `tsqx.so` to `$XDG_CONFIG_HOME/nvim/after/parser/`
  - Copy `highlights.scm` to
    `$XDG_CONFIG_HOME/nvim/after/queries/tsqx/`
  - (If a directory doesn't exist, just create it)
