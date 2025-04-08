/**
 * @file A parser for cjquines/tsqx, a wrapper around asymptote.
 * @author extouchtriangle
 * @license GPLv3 (see LICENSE)
 */

module.exports = grammar({
  name: "tsqx",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($.line),

    line: ($) =>
      choice(
        seq(choice($.draw, $.set), optional($.comment), "\n"),
        seq($.comment, "\n"),
      ),
    comment: ($) => /\#.*/,
    delim: ($) => choice(" / ", " /"),
    draw_nopath: ($) =>
      prec(
        100,
        choice(
          choice(
            prec.dynamic(
              1000,
              seq(
                seq(
                  $.command,
                  repeat1("("),
                  seq(repeat(seq($.expression, ",")), $.expression),
                  repeat1(")"),
                ),
                optional(
                  seq(
                    optional($.delim),
                    optional($.fill),
                    $.delim,
                    optional($.edge),
                  ),
                ),
              ),
            ),
            seq(
              seq($.command, repeat1($.expression)),
              optional(
                seq(
                  optional($.delim),
                  optional($.fill),
                  $.delim,
                  optional($.edge),
                ),
              ),
            ),
          ),
          seq(
            repeat1("("),
            choice(
              choice(
                seq(
                  seq($.command, repeat($.expression)),
                  optional(
                    seq(
                      optional($.delim),
                      optional($.fill),
                      $.delim,
                      optional($.edge),
                    ),
                  ),
                ),
                seq(
                  seq(
                    $.command,
                    repeat1("("),
                    seq(repeat(seq($.expression, ",")), $.expression),
                    repeat1(")"),
                  ),
                  optional(
                    seq(
                      optional($.delim),
                      optional($.fill),
                      $.delim,
                      optional($.edge),
                    ),
                  ),
                ),
              ),
            ),
          ),
          repeat1(")"),
        ),
      ),
    draw_path: ($) =>
      choice(
        choice(
          seq(
            $.path,
            optional(
              seq(
                optional($.delim),
                optional($.fill),
                $.delim,
                optional($.edge),
              ),
            ),
          ),
          seq(
            seq(
              $.command,
              repeat1("("),
              seq(repeat(seq($.expression, ",")), $.expression),
              repeat1(")"),
            ),
            optional(
              seq(
                optional($.delim),
                optional($.fill),
                $.delim,
                optional($.edge),
              ),
            ),
          ),
        ),
        seq(
          repeat1("("),
          choice(
            choice(
              seq(
                $.path,
                optional(
                  seq(
                    optional($.delim),
                    optional($.fill),
                    $.delim,
                    optional($.edge),
                  ),
                ),
              ),
              seq(
                seq(
                  $.command,
                  repeat1("("),
                  seq(repeat(seq($.expression, ",")), $.expression),
                  repeat1(")"),
                ),
                optional(
                  seq(
                    optional($.delim),
                    optional($.fill),
                    $.delim,
                    optional($.edge),
                  ),
                ),
              ),
            ),
          ),
        ),
        repeat1(")"),
      ),
    draw_cmd: ($) =>
      choice(
        choice(
          seq(
            $.command,
            optional(
              seq(
                optional($.delim),
                optional($.fill),
                $.delim,
                optional($.edge),
              ),
            ),
          ),
        ),
        seq(
          repeat1("("),
          choice(
            choice(
              seq(
                $.command,
                optional(
                  seq(
                    optional($.delim),
                    optional($.fill),
                    $.delim,
                    optional($.edge),
                  ),
                ),
              ),
            ),
          ),
        ),
        repeat1(")"),
      ),
    draw: ($) => choice($.draw_path, $.draw_nopath, $.draw_cmd),
    command: () =>
      /rotate|shift|rightanglemark|\~triangle|anglemark|unitcircle|circumcenter|orthocenter|incircle|circumcircle|centroid|incenter|midpoint|extension|foot|CP|CR|dir|conj|intersect|IP|OP|Line|bisectorpoint|arc|abs|reflect/,
    path: ($) =>
      prec(
        1000,
        seq(
          repeat1(seq(choice($.pair, $.draw_nopath, $.variable), $.segment)),
          choice(choice($.pair, $.draw_nopath, $.variable), $.cycle),
        ),
      ),
    segment: ($) => "--",
    cycle: ($) => "cycle",
    stroke: ($) => choice("dotted", "dashed"),
    edge: ($) =>
      prec.left(
        100,
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
      ),
    fill: ($) =>
      choice(
        seq(optional($.number), $.color),
        seq($.color, optional($.number)),
      ),
    set: ($) => seq($.variable, optional($.direction), $.equals, $.value),
    variable: ($) =>
      prec.dynamic(-3, /([\-]{0,1}[A-Za-z\&\'\_0-9]+)([0-9A-Z\.]+)?/),
    operator: ($) => choice("+", "-", "*", "/"),
    //operand: ($) => choice($.variable, $.number, $.pair, $.draw),
    expression: ($) =>
      choice(
        prec.right(
          seq(
            choice($.variable, $.number, $.pair, $.draw),
            repeat(
              seq($.operator, choice($.number, $.variable, $.pair, $.draw)),
            ),
          ),
        ),
        seq(
          repeat1("("),
          prec.right(
            seq(
              choice($.variable, $.number, $.pair, $.draw),
              repeat(
                seq($.operator, choice($.number, $.variable, $.pair, $.draw)),
              ),
            ),
          ),
          repeat1(")"),
        ),
      ),
    equals: ($) => /(d=|dl=|l=|=|;=|:=|\.=)/,
    value: ($) => repeat1($.expression),
    pair: ($) =>
      seq(
        repeat1("("),
        /\s*\-*[0-9]+\.{0,1}[0-9]*\s*,\s*\-*[0-9]+\.{0,1}[0-9]*\s*/,
        repeat1(")"),
      ),

    color: ($) =>
      /(pale|light|medium|heavy|dark|deep)*(red|green|blue|cyan|black|white|gray|grey|purple|magenta|pink|yellow|olive|orange|brown)/,
    number: ($) => /\-*[0-9]+\.{0,1}[0-9]*/,
    direction: ($) => $.variable,
  },
  conflicts: ($) => [
    [$.draw_nopath, $.draw_path],
    [$.draw_nopath],
    [$.draw_path],
    [$.draw, $.path],
    [$.path, $.expression],
    [$.draw_cmd],
    [$.draw_nopath, $.draw_cmd],
    [$.pair],
    [$.draw_nopath, $.draw_path, $.draw_cmd, $.expression, $.pair],
    [$.draw_nopath, $.draw_path, $.draw_cmd, $.pair],
    [$.expression],
    [$.draw_nopath, $.draw_path, $.pair],
    [$.draw_nopath, $.pair],
  ],
});
