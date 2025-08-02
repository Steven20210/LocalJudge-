"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, Zap, AlertTriangle } from "lucide-react"

interface TestResult {
  input?: string
  expected?: string
  actual?: string
  passed: boolean
  error?: string
  executionTime?: number
  consoleOutput?: string
}

interface TestResultsProps {
  results: TestResult[]
  allPassed: boolean
  isSubmission?: boolean
}

export function TestResults({ results, allPassed, isSubmission = false }: TestResultsProps) {
  const [animationIndex, setAnimationIndex] = useState(-1)

  useEffect(() => {
    // Animate results one by one
    results.forEach((_, index) => {
      setTimeout(() => {
        setAnimationIndex(index)
      }, index * 300)
    })
  }, [results])

  const passedCount = results.filter((r) => r.passed).length
  const totalCount = results.length

  return (
    <Card className="animate-in slide-in-from-bottom-4 duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {allPassed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            Test Results
          </CardTitle>
          <div className="text-sm text-gray-600">
            {passedCount}/{totalCount} passed
          </div>
        </div>

        {isSubmission && allPassed && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Accepted! All test cases passed.
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className={`border rounded-lg p-3 transition-all duration-300 ${
              animationIndex >= index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } ${result.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {result.passed ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="font-medium text-sm">Test Case {index + 1}</span>
              </div>

              {result.executionTime && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {result.executionTime}ms
                </div>
              )}
            </div>

            {result.error ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Error</span>
                </div>
                <div className="text-sm text-red-600 font-mono bg-red-100 p-2 rounded whitespace-pre-wrap">
                  {result.error}
                </div>
                {result.input && (
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Input:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded">{result.input}</code>
                  </div>
                )}
                {result.consoleOutput && (
                  <div className="text-xs">
                    <span className="font-medium text-gray-700">Console Output:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded whitespace-pre-wrap">{result.consoleOutput}</code>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {result.input && (
                  <div>
                    <span className="font-medium text-gray-700">Input:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded">{result.input}</code>
                  </div>
                )}

                <div>
                  <span className="font-medium text-gray-700">Expected:</span>
                  <code className="ml-2 bg-white px-2 py-1 rounded">{result.expected}</code>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Actual:</span>
                  <code className={`ml-2 px-2 py-1 rounded ${result.passed ? "bg-white" : "bg-red-100 text-red-700"}`}>
                    {result.actual}
                  </code>
                </div>
                {result.consoleOutput && (
                  <div>
                    <span className="font-medium text-gray-700">Console Output:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded whitespace-pre-wrap">{result.consoleOutput}</code>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
