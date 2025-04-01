# tree-sitter-tsqx

This is a tree-sitter parser for
[cjquines/tsqx](https://github.com/cjquines/tsqx).
`tsqx` is a wrapper around the Asymptote
vector graphics language.
`tsqx` was developed with olympiad geometry as a focus,
so the syntax in the parser reflects that.

> [!WARNING]
> Even though I have parsed the "test file" in the tsqx repo without errors
> (which means that I have included rules for the whole language),
> this is still very much in the alpha stage, and bugs are very likely.
> If you see anything, raise an issue.

## Screenshots

![comparison](https://github.com/extouchtriangle/tree-sitter-tsqx/blob/main/demo.png?raw=true)

- The image on the left is with treesitter, and the image on the right is
  without treesitter.

![tree](https://github.com/extouchtriangle/tree-sitter-tsqx/blob/main/tree.png?raw=true)

- An example of a parsed syntax tree.

## Integrations

- `nvim-treesitter`:
  - Run `tree-sitter build`. A file called
    `tsqx.so` should appear in the root directory.
  - Copy `tsqx.so` to `$XDG_CONFIG_HOME/nvim/after/parser/`
  - Copy `integrations/nvim/highlights.scm` to
    `$XDG_CONFIG_HOME/nvim/after/queries/tsqx/`
  - (If a directory doesn't exist, just create it)
