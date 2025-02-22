class BashPlugin {
      constructor() {
          this.terminal = null;
              this.linter = null;
                  this.completer = null;
                    }

                      async init() {
                          // Load components
                              const { Terminal } = await acode.require("src/terminal.js");
                                  const { BashCompleter } = await acode.require("src/autocomplete/bash-completer.js");
                                      const { BashLinter } = await acode.require("src/lint/bash-linter.js");
                                          
                                              // Initialize terminal
                                                  this.terminal = new Terminal();
                                                      await this.terminal.init();
                                                          
                                                              // Setup syntax highlighting
                                                                  this.setupSyntax();
                                                                      
                                                                          // Register snippets
                                                                              this.registerSnippets();
                                                                                  
                                                                                      // Initialize linter
                                                                                          this.linter = new BashLinter();
                                                                                              
                                                                                                  // Register autocompletion
                                                                                                      this.completer = new BashCompleter();
                                                                                                          ace.config.loadModule("ace/ext/language_tools", (langTools) => {
                                                                                                                langTools.addCompleter(this.completer);
                                                                                                                    });
                                                                                                                        
                                                                                                                            // Add UI elements
                                                                                                                                this.addToolbarButtons();
                                                                                                                                    this.addStatusBar();
                                                                                                                                      }

                                                                                                                                        setupSyntax() {
                                                                                                                                            ace.define("ace/mode/bash", ["require", "exports", "module"], (require, exports, module) => {
                                                                                                                                                  const { BashMode } = require("src/syntax/bash-mode.js");
                                                                                                                                                        exports.Mode = BashMode;
                                                                                                                                                            });
                                                                                                                                                                
                                                                                                                                                                    ace.define("ace/theme/bash_theme", ["require", "exports", "module"], (require, exports, module) => {
                                                                                                                                                                          const { BashTheme } = require("src/syntax/bash-theme.js");
                                                                                                                                                                                exports.Theme = BashTheme;
                                                                                                                                                                                    });
                                                                                                                                                                                      }

                                                                                                                                                                                        registerSnippets() {
                                                                                                                                                                                            ace.config.loadModule("ace/snippets/bash", (m) => {
                                                                                                                                                                                                  m.snippetText = require("src/snippets/bash-snippets.js");
                                                                                                                                                                                                      });
                                                                                                                                                                                                        }

                                                                                                                                                                                                          addToolbarButtons() {
                                                                                                                                                                                                              acode.addButton("🚀", "Run Script", async () => {
                                                                                                                                                                                                                    const editor = acode.getActiveEditor();
                                                                                                                                                                                                                          const code = editor.getValue();
                                                                                                                                                                                                                                const result = await this.terminal.execute(`bash -c '${code}'`);
                                                                                                                                                                                                                                      acode.alert("Execution Result", result);
                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                  acode.addButton("🐚", "New Terminal", () => this.terminal.show());
                                                                                                                                                                                                                                                      acode.addButton("🔍", "Lint Script", () => this.linter.lint());
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                          addStatusBar() {
                                                                                                                                                                                                                                                              this.statusBar = acode.createStatusBarItem("right");
                                                                                                                                                                                                                                                                  this.statusBar.text = "Bash Ready";
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                      onEditorChange(editor) {
                                                                                                                                                                                                                                                                          if (editor.file.name.match(/\.(sh|bash)$/i)) {
                                                                                                                                                                                                                                                                                editor.session.setMode("ace/mode/bash");
                                                                                                                                                                                                                                                                                      editor.session.setUseWrapMode(true);
                                                                                                                                                                                                                                                                                            editor.setTheme("ace/theme/bash_theme");
                                                                                                                                                                                                                                                                                                  this.completer.attach(editor);
                                                                                                                                                                                                                                                                                                        this.linter.attach(editor);
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                              return new BashPlugin();
