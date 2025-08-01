"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  onLanguageChange: (language: string) => void
}

export function CodeEditor({ value, onChange, language, onLanguageChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.value = value
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const spaces = language === "python" ? "    " : "  " // 4 spaces for Python, 2 for others
      const newValue = value.substring(0, start) + spaces + value.substring(end)
      onChange(newValue)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length
      }, 0)
    }
  }

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case "python":
        return "Python 3"
      case "javascript":
        return "JavaScript"
      case "java":
        return "Java"
      case "cpp":
        return "C++"
      default:
        return "JavaScript"
    }
  }

  const getPlaceholder = (lang: string) => {
    switch (lang) {
      case "python":
        return "# Write your Python solution here..."
      case "javascript":
        return "// Write your JavaScript solution here..."
      case "java":
        return "// Write your Java solution here..."
      case "cpp":
        return "// Write your C++ solution here..."
      default:
        return "// Write your solution here..."
    }
  }

  return (
    <div className="h-96 border rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <span className="text-sm text-gray-300">{getLanguageDisplay(language)}</span>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32 h-7 bg-gray-700 border-gray-600 text-gray-300 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="javascript" className="text-gray-300 focus:bg-gray-700">
              JavaScript
            </SelectItem>
            <SelectItem value="python" className="text-gray-300 focus:bg-gray-700">
              Python 3
            </SelectItem>
            <SelectItem value="java" className="text-gray-300 focus:bg-gray-700">
              Java
            </SelectItem>
            <SelectItem value="cpp" className="text-gray-300 focus:bg-gray-700">
              C++
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <textarea
        ref={editorRef}
        className="w-full h-full p-4 font-mono text-sm resize-none border-none outline-none bg-gray-900 text-gray-100"
        placeholder={getPlaceholder(language)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{
          lineHeight: "1.5",
          tabSize: language === "python" ? 4 : 2,
        }}
      />
    </div>
  )
}
