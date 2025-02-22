class BashLinter {
    lint(code) {
      const errors = [];
      
      // Check for common syntax errors
      const lines = code.split("\n");
      lines.forEach((line, index) => {
        if (line.match(/^\s*if\s*\[/)) {
          if (!line.includes("];")) {
            errors.push({
              row: index,
              column: line.indexOf("if"),
              text: "Missing closing ] in test expression",
              type: "error"
            });
          }
        }
      });
      
      return errors;
    }
  
    attach(editor) {
      editor.session.on("change", () => {
        const errors = this.lint(editor.getValue());
        editor.session.setAnnotations(errors);
      });
    }
  }
  
  exports.BashLinter = BashLinter;