"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export function CodeEditor({
  value,
  onChange,
  language,
  onLanguageChange,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Configure editor settings
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      fontFamily:
        "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
      lineNumbers: "on",
      roundedSelection: false,
      automaticLayout: true,
      wordWrap: "on",
      folding: true,
      foldingStrategy: "indentation",
      showFoldingControls: "always",
      renderLineHighlight: "all",
      selectOnLineNumbers: true,
      glyphMargin: true,
      useTabStops: false,
      tabSize: language === "python" ? 4 : 2,
      insertSpaces: true,
      detectIndentation: false,
      trimAutoWhitespace: true,
      largeFileOptimizations: true,
    });

    // Set up auto-indentation for Python
    if (language === "python") {
      editor.getModel()?.updateOptions({
        insertSpaces: true,
        tabSize: 4,
      });
    }
  };

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case "python":
        return "Python 3";
      case "javascript":
        return "JavaScript";
      case "java":
        return "Java";
      case "cpp":
        return "C++";
      default:
        return "JavaScript";
    }
  };

  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case "python":
        return "python";
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      default:
        return "javascript";
    }
  };

  const getPlaceholder = (lang: string) => {
    switch (lang) {
      case "python":
        return "# Write your Python solution here...";
      case "javascript":
        return "// Write your JavaScript solution here...";
      case "java":
        return "// Write your Java solution here...";
      case "cpp":
        return "// Write your C++ solution here...";
      default:
        return "// Write your solution here...";
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);

    // Update editor settings when language changes
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        model.updateOptions({
          tabSize: newLanguage === "python" ? 4 : 2,
        });
      }
    }
  };

  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <span className="text-sm text-gray-300">
          {getLanguageDisplay(language)}
        </span>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32 h-7 bg-gray-700 border-gray-600 text-gray-300 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem
              value="javascript"
              className="text-gray-300 focus:bg-gray-700"
            >
              JavaScript
            </SelectItem>
            <SelectItem
              value="python"
              className="text-gray-300 focus:bg-gray-700"
            >
              Python 3
            </SelectItem>
            <SelectItem
              value="java"
              className="text-gray-300 focus:bg-gray-700"
            >
              Java
            </SelectItem>
            <SelectItem value="cpp" className="text-gray-300 focus:bg-gray-700">
              C++
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Editor
        height="calc(100% - 48px)"
        defaultLanguage={getMonacoLanguage(language)}
        language={getMonacoLanguage(language)}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
          lineNumbers: "on",
          roundedSelection: false,
          automaticLayout: true,
          wordWrap: "on",
          folding: true,
          foldingStrategy: "indentation",
          showFoldingControls: "always",
          renderLineHighlight: "all",
          selectOnLineNumbers: true,
          glyphMargin: true,
          useTabStops: false,
          tabSize: language === "python" ? 4 : 2,
          insertSpaces: true,
          detectIndentation: false,
          trimAutoWhitespace: true,
          largeFileOptimizations: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          parameterHints: {
            enabled: true,
          },
          hover: {
            enabled: true,
          },
          contextmenu: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: "on",
          bracketPairColorization: {
            enabled: true,
          },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,
        }}
        beforeMount={(monaco) => {
          // Configure language-specific settings
          monaco.languages.setLanguageConfiguration("python", {
            indentationRules: {
              increaseIndentPattern:
                /^(?!.*[#\\])(.*\b(if|elif|else|for|while|try|except|finally|with|def|class|async def|async with|async for)\b.*):$/,
              decreaseIndentPattern:
                /^(?!.*[#\\])(.*\b(elif|else|except|finally)\b.*):$/,
            },
            wordPattern:
              /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
            comments: {
              lineComment: "#",
            },
            brackets: [
              ["{", "}"],
              ["[", "]"],
              ["(", ")"],
            ],
            autoClosingPairs: [
              { open: "{", close: "}" },
              { open: "[", close: "]" },
              { open: "(", close: ")" },
              { open: '"', close: '"' },
              { open: "'", close: "'" },
            ],
            surroundingPairs: [
              { open: "{", close: "}" },
              { open: "[", close: "]" },
              { open: "(", close: ")" },
              { open: '"', close: '"' },
              { open: "'", close: "'" },
            ],
          });

          // Add Python snippets
          monaco.languages.registerCompletionItemProvider("python", {
            provideCompletionItems: (model, position) => {
              const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column,
                endColumn: position.column,
              };

              return {
                suggestions: [
                  {
                    label: "def",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText:
                      "def ${1:function_name}(${2:parameters}):\n\t${3:pass}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Define a function",
                    range: range,
                  },
                  {
                    label: "if",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "if ${1:condition}:\n\t${2:pass}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "If statement",
                    range: range,
                  },
                  {
                    label: "for",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "for ${1:item} in ${2:iterable}:\n\t${3:pass}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "For loop",
                    range: range,
                  },
                  {
                    label: "while",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "while ${1:condition}:\n\t${2:pass}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "While loop",
                    range: range,
                  },
                  {
                    label: "try",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText:
                      "try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:pass}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Try-except block",
                    range: range,
                  },
                  {
                    label: "class",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "class ${1:ClassName}:\n\t${2:pass}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Define a class",
                    range: range,
                  },
                  {
                    label: "print",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "print(${1:value})",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Print statement",
                    range: range,
                  },
                  {
                    label: "return",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "return ${1:value}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Return statement",
                    range: range,
                  },
                ],
              };
            },
          });

          monaco.languages.setLanguageConfiguration("javascript", {
            indentationRules: {
              increaseIndentPattern: /^((?!.*[\/\/]).)*(\{[^}]*|\([^)]*)$/,
              decreaseIndentPattern: /^(.*\*\/)?\s*[})\]]?.*$/,
            },
            wordPattern:
              /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
            comments: {
              lineComment: "//",
              blockComment: ["/*", "*/"],
            },
            brackets: [
              ["{", "}"],
              ["[", "]"],
              ["(", ")"],
            ],
            autoClosingPairs: [
              { open: "{", close: "}" },
              { open: "[", close: "]" },
              { open: "(", close: ")" },
              { open: '"', close: '"' },
              { open: "'", close: "'" },
              { open: "`", close: "`" },
            ],
            surroundingPairs: [
              { open: "{", close: "}" },
              { open: "[", close: "]" },
              { open: "(", close: ")" },
              { open: '"', close: '"' },
              { open: "'", close: "'" },
              { open: "`", close: "`" },
            ],
          });

          // Add JavaScript snippets
          monaco.languages.registerCompletionItemProvider("javascript", {
            provideCompletionItems: (model, position) => {
              const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column,
                endColumn: position.column,
              };

              return {
                suggestions: [
                  {
                    label: "function",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText:
                      "function ${1:functionName}(${2:parameters}) {\n\t${3:// code}\n}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Function declaration",
                    range: range,
                  },
                  {
                    label: "arrow",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText:
                      "const ${1:functionName} = (${2:parameters}) => {\n\t${3:// code}\n}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Arrow function",
                    range: range,
                  },
                  {
                    label: "if",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "if (${1:condition}) {\n\t${2:// code}\n}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "If statement",
                    range: range,
                  },
                  {
                    label: "for",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText:
                      "for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// code}\n}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "For loop",
                    range: range,
                  },
                  {
                    label: "foreach",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText:
                      "${1:array}.forEach(${2:item} => {\n\t${3:// code}\n})",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "ForEach loop",
                    range: range,
                  },
                  {
                    label: "console.log",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "console.log(${1:value})",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Console log",
                    range: range,
                  },
                  {
                    label: "return",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "return ${1:value}",
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                    documentation: "Return statement",
                    range: range,
                  },
                ],
              };
            },
          });
        }}
      />
    </div>
  );
}
