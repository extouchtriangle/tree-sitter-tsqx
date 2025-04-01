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

    line: ($) => seq(choice($.draw, $.set), "\n"),
    delim: ($) => " / ",
    draw: ($) =>
      choice(
        seq(
          choice(seq($.command, repeat($.variable)), $.path),
          optional(seq(optional($.delim), optional($.fill), $.delim, $.edge)),
        ),
        seq(
          seq($.command, "(", repeat(seq($.variable, ",")), ")"),
          optional(seq(optional($.delim), optional($.fill), $.delim, $.edge)),
        ),
      ),
    command: ($) =>
      /rightanglemark|\~triangle|anglemark|circumcenter|orthocenter|incircle|circumcircle|centroid|incenter|midpoint|extension|foot|CP|CR|dir|conj|intersect|IP|OP|Line|bisectorpoint|arc|abs|reflect/,
    path: ($) =>
      seq(repeat1(seq($.variable, $.segment)), choice($.variable, $.cycle)),
    segment: ($) => "--",
    cycle: ($) => "cycle",
    stroke: ($) => choice("dotted", "dashed"),
    edge: ($) =>
      choice(
        seq(optional($.stroke), $.number, optional($.color)),
        seq(optional($.stroke), optional($.number), $.color),
        seq(optional($.stroke), $.color, optional($.number)),
        seq(optional($.stroke), optional($.color), $.number),
        seq(optional($.color), $.stroke, optional($.number)),
        seq(optional($.color), optional($.stroke), $.number),
        seq(optional($.color), $.number, optional($.stroke)),
        seq(optional($.color), optional($.number), $.stroke),
        seq(optional($.number), optional($.color), $.stroke),
        seq(optional($.number), $.color, optional($.stroke)),
        seq(optional($.number), $.stroke, optional($.color)),
        seq(optional($.number), optional($.stroke), $.color),
      ),
    fill: ($) =>
      choice(
        seq(optional($.number), $.color),
        seq($.color, optional($.number)),
      ),
    set: ($) => seq($.variable, $.equals, $.value),
    variable: ($) => /([A-Za-z\&\'\_0-9]+)([0-9A-Z\.]+)?/,
    operator: ($) => choice("+", "-", "*", "/"),
    operand: ($) => choice($.variable, $.number, $.pair, $.draw),
    expression: ($) => seq($.operand, repeat(seq($.operator, $.operand))),
    equals: ($) => /(=|;=|:=|\.=)/,
    value: ($) => choice($.expression),
    pair: ($) => /\([0-9]+\s*,[0-9]+\s*\)/,
    color: ($) =>
      /(pale|light|medium|heavy|dark|deep)*(red|green|blue|cyan|black|white|gray|grey|purple|magenta|pink|yellow|olive|orange|brown)/,
    number: ($) => /[0-9]*\.[0-9]*/,
  },
});
