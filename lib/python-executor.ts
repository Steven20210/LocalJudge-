interface TestCase {
  input: string
  expected: string
}

interface TestResult {
  input?: string
  expected?: string
  actual?: string
  passed: boolean
  error?: string
  executionTime?: number
}

export async function executePythonCode(code: string, testCases: TestCase[]): Promise<TestResult[]> {
  console.log("🐍 Starting Python code execution for", testCases.length, "test cases")
  const results: TestResult[] = []

  try {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      throw new Error("Python execution must run in browser environment")
    }

    // Get the global Pyodide instance
    const pyodide = (window as any).pyodideInstance
    if (!pyodide) {
      throw new Error("Python runtime not loaded. Please wait for Python to load.")
    }

    console.log("✅ Pyodide ready for execution")

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      console.log(`🧪 Executing test case ${i + 1}/${testCases.length}:`, testCase.input)

      const startTime = performance.now()

      try {
        // Extract function name from Python code
        const functionMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/)
        if (!functionMatch) {
          throw new Error("No function found in code. Make sure to define a function with 'def'.")
        }

        const functionName = functionMatch[1]
        console.log("🔍 Found function:", functionName)

        // Create the complete Python script to execute
        const pythonScript = `
# Clear any previous definitions
import sys
if '${functionName}' in globals():
    del globals()['${functionName}']

${code}

# Test execution
def run_test():
    try:
        result = ${getPythonFunctionCall(functionName, testCase.input)}
        return result
    except Exception as e:
        raise e

# Execute the test
test_result = run_test()
test_result
`

        console.log("📝 Generated Python script for test case", i + 1)

        // Execute Python script using Pyodide
        let result
        try {
          result = pyodide.runPython(pythonScript)
        } catch (pyodideError: any) {
          // Handle Pyodide-specific errors
          let errorMsg = pyodideError.message || pyodideError.toString()

          // Clean up common Python error messages
          if (errorMsg.includes("NameError")) {
            errorMsg = "NameError: Function or variable not defined. Check your function name and variables."
          } else if (errorMsg.includes("SyntaxError")) {
            errorMsg = "SyntaxError: Invalid Python syntax. Check your code for syntax errors."
          } else if (errorMsg.includes("IndentationError")) {
            errorMsg = "IndentationError: Incorrect indentation. Python requires consistent indentation."
          } else if (errorMsg.includes("TypeError")) {
            errorMsg = "TypeError: Invalid operation or function call. Check your function parameters."
          }

          throw new Error(errorMsg)
        }

        const endTime = performance.now()
        const executionTime = Math.round(endTime - startTime)

        console.log("✅ Test case", i + 1, "executed successfully in", executionTime, "ms")

        // Parse the result
        const actualStr = formatPythonResult(result)
        const expectedStr = testCase.expected

        const passed = actualStr === expectedStr

        console.log("📊 Test case", i + 1, "result:", { actual: actualStr, expected: expectedStr, passed })

        results.push({
          input: testCase.input,
          expected: expectedStr,
          actual: actualStr,
          passed,
          executionTime,
        })
      } catch (error) {
        const endTime = performance.now()
        const executionTime = Math.round(endTime - startTime)

        console.error("❌ Test case", i + 1, "failed:", error)

        let errorMessage = "Python execution error"
        if (error instanceof Error) {
          errorMessage = error.message
        } else if (typeof error === "string") {
          errorMessage = error
        }

        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: "",
          passed: false,
          error: errorMessage,
          executionTime,
        })
      }
    }
  } catch (loadError) {
    console.error("❌ Failed to execute Python code:", loadError)

    // Return error results for all test cases
    return testCases.map((testCase) => ({
      input: testCase.input,
      expected: testCase.expected,
      actual: "",
      passed: false,
      error: `Python execution failed: ${loadError.message}`,
      executionTime: 0,
    }))
  }

  console.log(
    "🏁 Python execution completed. Results:",
    results.map((r) => ({ passed: r.passed, error: r.error })),
  )
  return results
}

function getPythonFunctionCall(functionName: string, input: string): string {
  // Parse different input formats and generate appropriate Python function calls
  if (input.includes(",")) {
    // Multiple parameters
    const params = input.split(",").map((p) => p.trim())
    return `${functionName}(${params.join(", ")})`
  } else {
    // Single parameter
    return `${functionName}(${input})`
  }
}

function formatPythonResult(result: any): string {
  if (result === true) return "True"
  if (result === false) return "False"
  if (result === null || result === undefined) return "None"
  if (Array.isArray(result)) return JSON.stringify(result)
  if (typeof result === "string") return result
  return String(result)
}
