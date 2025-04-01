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

- The image on the left is with Treesitter, and the image on the right is
  without treesitter (using vEnhance's regex-based highlighter).
  ![comparison](https://github.com/extouchtriangle/tree-sitter-tsqx/blob/main/demo.png?raw=true)

- An example of a parsed syntax tree.
  ![tree](https://github.com/extouchtriangle/tree-sitter-tsqx/blob/main/tree.png?raw=true)

## Integrations

NOTE: if your editor doesn't support Treesitter (like Vim),
vEnhance has a regex-based syntax highlighter in his dotfiles.

- Neovim:
  - Install `nvim-treesitter/nvim-treesitter` using
    your preferred package manager.
  - Install a tree-sitter supported colorscheme.
    (I use `catppuccin/nvim`)
  - In your `init.lua` file (or similar),
    paste the following:
    ```lua
    local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
    parser_config.tsqx = {
      install_info = {
        url = "https://github.com/extouchtriangle/tree-sitter-tsqx", -- local path or git repo
        files = { "src/parser.c" }, -- note that some parsers also require src/scanner.c or src/scanner.cc
        -- optional entries:
        branch = "main", -- default branch in case of git repo if different from master
        generate_requires_npm = false, -- if stand-alone parser without npm dependencies
        requires_generate_from_grammar = false, -- if folder contains pre-generated src/parser.c
      },
      filetype = "tsqx", -- if filetype does not match the parser name
    }
    ```
  - Copy `integrations/nvim/highlights.scm` to
    `$XDG_CONFIG_HOME/nvim/after/queries/tsqx/`
  - Bonus: if you use `rainbow-delimiters.nvim`,
    copy `integrations/nvim/rainbow-delimiters.scm`
    into the same directory that you put `highlights.scm` in.
