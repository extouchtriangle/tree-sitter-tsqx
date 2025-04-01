/**
 * @file A parser for cjquines/tsqx, a wrapper around asymptote.
 * @author extouchtriangle
 * @license GPL
 */

module.exports = grammar({
  name: "tsqx",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($.line),

    line: ($) => seq(choice($.function, $.set), "\n"),
    draw: ($) => seq($.command, repeat($.variable)),
    command: ($) =>
      /rightanglemark|anglemark|circumcenter|orthocenter|incircle|circumcircle|centroid|incenter|midpoint|extension|foot|CP|CR|dir|conj|intersect|IP|OP|Line|bisectorpoint|arc|abs/,
    set: ($) => seq($.variable, $.equals, $.value),
    variable: ($) => /([A-Za-z\&\'\_0-9]+)([0-9A-Z\.]+)?/,
    equals: ($) => /(=|;=|:=|\.=)/,
    value: ($) => choice($.pair, $.function),
    pair: ($) => /\([0-9]+\s*,[0-9]+\s*\)/,
    pen: ($) =>
      /(pale|light|medium|heavy|dark|deep)?(red|green|blue|cyan|black|white|gray|grey|purple|magenta|pink|yellow|olive|orange|brown)/,
    number: ($) => /[\\.0-9]\+/,
  },
});
