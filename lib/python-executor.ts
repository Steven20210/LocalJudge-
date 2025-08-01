interface TestCase {
  input: string;
  expected: string;
}

interface TestResult {
  input?: string;
  expected: string;
  actual?: string;
  passed: boolean;
  error?: string;
  executionTime?: number;
}

export async function executePythonCode(
  code: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  console.log(
    "🐍 Starting Python code execution for",
    testCases.length,
    "test cases"
  );
  console.log("📝 User code:", code);
  const results: TestResult[] = [];

  try {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      throw new Error("Python execution must run in browser environment");
    }

    // Get the global Pyodide instance
    const pyodide = (window as any).pyodideInstance;
    if (!pyodide) {
      throw new Error(
        "Python runtime not loaded. Please wait for Python to load."
      );
    }

    console.log("✅ Pyodide ready for execution");
    console.log("🔧 Pyodide instance:", pyodide);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(
        `🧪 Executing test case ${i + 1}/${testCases.length}:`,
        testCase.input
      );

      const startTime = performance.now();

      try {
        // Extract function name from Python code
        const functionMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
        if (!functionMatch) {
          throw new Error(
            "No function found in code. Make sure to define a function with 'def'."
          );
        }

        const functionName = functionMatch[1];
        console.log("🔍 Found function:", functionName);

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
`;

        console.log("📝 Generated Python script for test case", i + 1);
        console.log("📄 Python script:", pythonScript);

        // Execute Python script using Pyodide
        let result;
        try {
          console.log("🚀 Executing Python script with Pyodide...");
          result = pyodide.runPython(pythonScript);
          console.log("✅ Pyodide execution completed");
          console.log("🔍 Raw result type:", typeof result);
          console.log("🔍 Raw result:", result);
          console.log("🔍 Raw result constructor:", result?.constructor?.name);
          console.log("🔍 Raw result keys:", Object.keys(result || {}));
          console.log(
            "🔍 Has toJs method:",
            typeof result?.toJs === "function"
          );
        } catch (pyodideError: any) {
          console.error("❌ Pyodide execution failed:", pyodideError);
          console.error("❌ Error type:", typeof pyodideError);
          console.error("❌ Error message:", pyodideError.message);
          console.error("❌ Error stack:", pyodideError.stack);

          // Handle Pyodide-specific errors
          let errorMsg = pyodideError.message || pyodideError.toString();

          // Clean up common Python error messages
          if (errorMsg.includes("NameError")) {
            errorMsg =
              "NameError: Function or variable not defined. Check your function name and variables.";
          } else if (errorMsg.includes("SyntaxError")) {
            errorMsg =
              "SyntaxError: Invalid Python syntax. Check your code for syntax errors.";
          } else if (errorMsg.includes("IndentationError")) {
            errorMsg =
              "IndentationError: Incorrect indentation. Python requires consistent indentation.";
          } else if (errorMsg.includes("TypeError")) {
            errorMsg =
              "TypeError: Invalid operation or function call. Check your function parameters.";
          }

          throw new Error(errorMsg);
        }

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        console.log(
          "✅ Test case",
          i + 1,
          "executed successfully in",
          executionTime,
          "ms"
        );

        // Parse the result
        console.log("🔧 Starting result formatting...");
        console.log("🔧 Input to formatPythonResult:", result);
        const actualStr = formatPythonResult(result);
        const expectedStr = testCase.expected;

        console.log("🔧 Formatted actual result:", actualStr);
        console.log("🔧 Expected result:", expectedStr);

        const passed = actualStr === expectedStr;

        console.log("📊 Test case", i + 1, "result:", {
          actual: actualStr,
          expected: expectedStr,
          passed,
        });

        results.push({
          input: testCase.input,
          expected: expectedStr,
          actual: actualStr,
          passed,
          executionTime,
        });
      } catch (error) {
        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        console.error("❌ Test case", i + 1, "failed:", error);
        console.error("❌ Error type:", typeof error);
        console.error(
          "❌ Error message:",
          error instanceof Error ? error.message : error
        );

        let errorMessage = "Python execution error";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }

        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: "",
          passed: false,
          error: errorMessage,
          executionTime,
        });
      }
    }
  } catch (loadError) {
    console.error("❌ Failed to execute Python code:", loadError);
    console.error("❌ Load error type:", typeof loadError);
    console.error(
      "❌ Load error message:",
      loadError instanceof Error ? loadError.message : loadError
    );

    // Return error results for all test cases
    return testCases.map((testCase) => ({
      input: testCase.input,
      expected: testCase.expected,
      actual: "",
      passed: false,
      error: `Python execution failed: ${loadError.message}`,
      executionTime: 0,
    }));
  }

  console.log(
    "🏁 Python execution completed. Results:",
    results.map((r) => ({ passed: r.passed, error: r.error }))
  );
  return results;
}

function getPythonFunctionCall(functionName: string, input: string): string {
  console.log(
    "🔧 Generating Python function call for:",
    functionName,
    "with input:",
    input
  );

  // Parse different input formats and generate appropriate Python function calls
  if (input.includes(",")) {
    // Multiple parameters
    const params = input.split(",").map((p) => p.trim());
    const functionCall = `${functionName}(${params.join(", ")})`;
    console.log("🔧 Generated function call:", functionCall);
    return functionCall;
  } else {
    // Single parameter
    const functionCall = `${functionName}(${input})`;
    console.log("🔧 Generated function call:", functionCall);
    return functionCall;
  }
}

function formatPythonResult(result: any): string {
  console.log("🔧 formatPythonResult called with:", result);
  console.log("🔧 Result type:", typeof result);
  console.log("🔧 Result constructor:", result?.constructor?.name);
  console.log("🔧 Result keys:", Object.keys(result || {}));
  console.log("🔧 Has toJs method:", typeof result?.toJs === "function");

  if (result === true) {
    console.log("🔧 Returning boolean true");
    return "True";
  }
  if (result === false) {
    console.log("🔧 Returning boolean false");
    return "False";
  }
  if (result === null || result === undefined) {
    console.log("🔧 Returning None for null/undefined");
    return "None";
  }

  // Handle Pyodide proxy objects (Python lists, etc.)
  if (result && typeof result === "object" && result.toJs) {
    console.log("🔧 Detected Pyodide proxy object, calling toJs()");
    // Convert Pyodide proxy to JavaScript array
    const jsArray = result.toJs();
    console.log("🔧 toJs() result:", jsArray);
    console.log("🔧 toJs() result type:", typeof jsArray);
    console.log("🔧 toJs() result is array:", Array.isArray(jsArray));

    if (Array.isArray(jsArray)) {
      const formatted = "[" + jsArray.join(",") + "]";
      console.log("🔧 Formatted array result:", formatted);
      return formatted;
    }
    const jsonResult = JSON.stringify(jsArray);
    console.log("🔧 JSON stringified result:", jsonResult);
    return jsonResult;
  }

  if (Array.isArray(result)) {
    console.log("🔧 Detected JavaScript array");
    // Format arrays without spaces after commas to match expected output
    const formatted = "[" + result.join(",") + "]";
    console.log("🔧 Formatted array result:", formatted);
    return formatted;
  }
  if (typeof result === "string") {
    console.log("🔧 Returning string result:", result);
    return result;
  }

  const stringResult = String(result);
  console.log("🔧 Converting to string:", stringResult);
  return stringResult;
}
