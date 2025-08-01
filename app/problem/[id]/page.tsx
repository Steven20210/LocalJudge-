"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Send, Terminal, AlertCircle, RefreshCw } from "lucide-react"
import { problems } from "@/lib/problems"
import { CodeEditor } from "@/components/code-editor"
import { TestResults } from "@/components/test-results"
import { PythonLoader } from "@/components/python-loader"
import { executeCode } from "@/lib/code-executor"
import { saveProgress, getProgress } from "@/lib/progress"

export default function ProblemDetail() {
  const params = useParams()
  const router = useRouter()
  const problemId = params.id as string

  const problem = problems.find((p) => p.id === problemId)
  const [code, setCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [allPassed, setAllPassed] = useState(false)
  const [language, setLanguage] = useState("javascript")
  const [pythonReady, setPythonReady] = useState(false)
  const [pythonError, setPythonError] = useState<string | null>(null)
  const [retryPython, setRetryPython] = useState(0)

  useEffect(() => {
    if (problem) {
      const progress = getProgress()
      const savedSolution = progress[problemId]?.lastSolution
      const savedLanguage = progress[problemId]?.language || "javascript"
      setLanguage(savedLanguage)
      setCode(savedSolution || problem.starterCode[savedLanguage as keyof typeof problem.starterCode])
    }
  }, [problem, problemId])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    if (problem) {
      setCode(problem.starterCode[newLanguage as keyof typeof problem.starterCode])
    }
  }

  const handleRetryPython = () => {
    setPythonError(null)
    setPythonReady(false)
    setRetryPython((prev) => prev + 1)
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Problem not found</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problems
          </Button>
        </div>
      </div>
    )
  }

  const handleRun = async () => {
    if (language === "python" && !pythonReady) {
      setTestResults([
        {
          error: "Python runtime is not ready yet. Please wait for Python to load or switch to JavaScript.",
          passed: false,
        },
      ])
      setShowResults(true)
      return
    }

    setIsRunning(true)
    setShowResults(false)

    try {
      const results = await executeCode(code, problem.testCases.slice(0, 2), language)
      setTestResults(results)
      setShowResults(true)

      const currentProgress = getProgress()
      const newStatus = results.every((r) => r.passed) ? "solved" : "attempted"
      saveProgress(problemId, newStatus, code, language)
    } catch (error) {
      console.error("Execution error:", error)
      setTestResults([{ error: "Code execution failed", passed: false }])
      setShowResults(true)
    }

    setIsRunning(false)
  }

  const handleSubmit = async () => {
    if (language === "python" && !pythonReady) {
      setTestResults([
        {
          error: "Python runtime is not ready yet. Please wait for Python to load or switch to JavaScript.",
          passed: false,
        },
      ])
      setShowResults(true)
      return
    }

    setIsRunning(true)
    setShowResults(false)

    try {
      const results = await executeCode(code, problem.testCases, language)
      setTestResults(results)
      setShowResults(true)

      const passed = results.every((r) => r.passed)
      setAllPassed(passed)

      const newStatus = passed ? "solved" : "attempted"
      saveProgress(problemId, newStatus, code, language)
    } catch (error) {
      console.error("Execution error:", error)
      setTestResults([{ error: "Code execution failed", passed: false }])
      setShowResults(true)
    }

    setIsRunning(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLanguageIcon = (lang: string) => {
    if (lang === "python") {
      return <Terminal className="w-4 h-4" />
    }
    return <Play className="w-4 h-4" />
  }

  const canExecute = language !== "python" || pythonReady

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">{problem.title}</h1>
                <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRun} disabled={isRunning || !canExecute} variant="outline">
                {getLanguageIcon(language)}
                <span className="ml-2">{isRunning ? "Running..." : "Run"}</span>
              </Button>
              <Button onClick={handleSubmit} disabled={isRunning || !canExecute}>
                <Send className="w-4 h-4 mr-2" />
                {isRunning ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Problem Description */}
          <div className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-4">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700">{problem.description}</div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Constraints:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {problem.constraints.map((constraint, index) => (
                            <li key={index}>• {constraint}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-4">
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                          <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Input:</span>
                              <code className="ml-2 bg-white px-2 py-1 rounded">{example.input}</code>
                            </div>
                            <div>
                              <span className="font-medium">Output:</span>
                              <code className="ml-2 bg-white px-2 py-1 rounded">{example.output}</code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="font-medium">Explanation:</span>
                                <span className="ml-2 text-gray-600">{example.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Results */}
          <div className="space-y-4">
            {language === "python" && (
              <>
                <PythonLoader
                  key={retryPython} // Force re-render on retry
                  onLoaded={() => setPythonReady(true)}
                  onError={(error) => setPythonError(error)}
                />
                {pythonError && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-sm font-medium text-red-700">Python Loading Failed</p>
                          <p className="text-xs text-red-600">Switch to JavaScript or try reloading Python</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRetryPython}
                        className="text-red-600 border-red-300 hover:bg-red-100 bg-transparent"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {!pythonReady && !pythonError && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="flex items-center gap-3 p-4">
                      <Terminal className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-blue-700">Browser-Based Python</p>
                        <p className="text-xs text-blue-600">
                          Loading Python runtime in your browser - no server needed!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={language}
                  onLanguageChange={handleLanguageChange}
                />
              </CardContent>
            </Card>

            {showResults && (
              <TestResults results={testResults} allPassed={allPassed} isSubmission={testResults.length > 2} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
