const oop = ace.require("ace/lib/oop");
const TextMode = ace.require("ace/mode/text").Mode;
const BashHighlightRules = ace.require("src/syntax/bash-rules.js");

class BashMode extends TextMode {
  constructor() {
    super();
    this.HighlightRules = BashHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
    this.lineCommentStart = "#";
  }
}

oop.inherits(BashMode, TextMode);

exports.Mode = BashMode;