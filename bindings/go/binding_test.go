package tree_sitter_tsqx_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tsqx "github.com/extouchtriangle/tree-sitter-tsqx/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tsqx.Language())
	if language == nil {
		t.Errorf("Error loading Tsqx grammar")
	}
}
