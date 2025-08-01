import { executePythonCode } from "./python-executor";

interface TestCase {
  input: string;
  expected: string;
}

interface TestResult {
  input?: string;
  expected?: string;
  actual?: string;
  passed: boolean;
  error?: string;
  executionTime?: number;
}

export async function executeCode(
  code: string,
  testCases: TestCase[],
  language: string
): Promise<TestResult[]> {
  console.log(
    `🚀 Starting code execution for ${language} with ${testCases.length} test cases`
  );

  try {
    switch (language) {
      case "javascript":
        console.log("📝 Executing JavaScript code");
        return executeJavaScriptCode(code, testCases);
      case "python":
        console.log("🐍 Executing Python code");
        return executePythonCode(code, testCases);
      default:
        console.warn(`⚠️ Unsupported language: ${language}`);
        return testCases.map((testCase) => ({
          input: testCase.input,
          expected: testCase.expected,
          actual: "",
          passed: false,
          error: `${
            language.charAt(0).toUpperCase() + language.slice(1)
          } execution is not supported yet.`,
          executionTime: 0,
        }));
    }
  } catch (error) {
    console.error(`💥 Code execution failed for ${language}:`, error);

    // Return error results for all test cases
    return testCases.map((testCase) => ({
      input: testCase.input,
      expected: testCase.expected,
      actual: "",
      passed: false,
      error: error instanceof Error ? error.message : "Code execution failed",
      executionTime: 0,
    }));
  }
}

async function executeJavaScriptCode(
  code: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  const results: TestResult[] = [];
  console.log("code", code);
  for (const testCase of testCases) {
    const startTime = performance.now();

    try {
      // Extract function name from code - handle both function declarations and expressions
      const functionMatch =
        code.match(/function\s+(\w+)\s*\(/) ||
        code.match(/const\s+(\w+)\s*=/) ||
        code.match(/let\s+(\w+)\s*=/) ||
        code.match(/var\s+(\w+)\s*=/);

      if (!functionMatch) {
        throw new Error(
          "No function found in code. Make sure to define a function."
        );
      }

      const functionName = functionMatch[1];
      console.log("🔍 Found function:", functionName);

      // Parse the input parameters
      const { params, paramValues } = parseTestInput(testCase.input);
      console.log("📝 Parsed parameters:", params, "with values:", paramValues);

      // Create a safe execution environment
      const wrappedCode = `
        // User's code
        ${code}
        
        // Test execution
          try {
            // Call the function with parsed parameters
            const result = ${functionName}(${paramValues.join(", ")});
            
            // Check if result is undefined and provide helpful error
            if (result === undefined) {
              throw new Error("Function returned undefined. Make sure your function has a return statement.");
            }
            
            return result;
          } catch (error) {
            throw new Error("Runtime error: " + error.message);
          }
      `;

      console.log("🚀 Executing wrapped code for test case:", testCase.input);

      // Execute the code in a try-catch
      let result: any;
      try {
        result = new Function(wrappedCode)();
      } catch (error) {
        throw error;
      }

      const endTime = performance.now();
      const executionTime = Math.round(endTime - startTime);

      console.log("✅ JavaScript execution result:", result);

      // Convert result to string for comparison
      const actualStr = formatJavaScriptResult(result);
      const expectedStr = testCase.expected;

      const passed = actualStr === expectedStr;

      console.log("📊 Comparison:", {
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

      console.error("❌ JavaScript execution failed:", error);

      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;

        // Provide more helpful error messages
        if (errorMessage.includes("undefined")) {
          errorMessage =
            "Function returned undefined. Make sure your function has a return statement with the correct value.";
        } else if (errorMessage.includes("is not defined")) {
          errorMessage =
            "Variable or function not defined. Check your variable names and function calls.";
        } else if (errorMessage.includes("Cannot read property")) {
          errorMessage =
            "Trying to access property of null/undefined. Check your object references.";
        }
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

  return results;
}

function parseTestInput(input: string): {
  params: string[];
  paramValues: string[];
} {
  // Handle different input formats
  // Example: "[2,7,11,15], 9" -> params: ["nums", "target"], paramValues: ["[2,7,11,15]", "9"]

  if (input.includes(",")) {
    // Multiple parameters - need to be careful with arrays
    const parts: string[] = [];
    let current = "";
    let bracketCount = 0;
    let inQuotes = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      }

      if (!inQuotes) {
        if (char === "[" || char === "{") {
          bracketCount++;
        } else if (char === "]" || char === "}") {
          bracketCount--;
        }
      }

      if (char === "," && bracketCount === 0 && !inQuotes) {
        parts.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      parts.push(current.trim());
    }

    return {
      params: parts.map((_, index) => `param${index}`),
      paramValues: parts,
    };
  } else {
    // Single parameter
    return {
      params: ["param0"],
      paramValues: [input.trim()],
    };
  }
}

function formatJavaScriptResult(result: any): string {
  if (result === null) return "null";
  if (result === undefined) return "undefined";
  if (typeof result === "boolean") return result.toString();
  if (typeof result === "number") return result.toString();
  if (typeof result === "string") return `"${result}"`;
  if (Array.isArray(result)) return JSON.stringify(result);
  if (typeof result === "object") return JSON.stringify(result);
  return String(result);
}
