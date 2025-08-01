"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, Wifi, WifiOff } from "lucide-react"

interface PythonLoaderProps {
  onLoaded?: () => void
  onError?: (error: string) => void
}

export function PythonLoader({ onLoaded, onError }: PythonLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState("Initializing Python runtime...")
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    let progressInterval: NodeJS.Timeout | null = null

    const loadPython = async () => {
      try {
        // Check if we're in the browser
        if (typeof window === "undefined") {
          throw new Error("Python loader must run in browser environment")
        }

        console.log("🐍 Starting Python loader...")

        setLoadingStatus("Checking Python runtime...")
        setProgress(10)

        // Check if Pyodide is already loaded globally
        if ((window as any).pyodideInstance) {
          console.log("✅ Pyodide already loaded")
          if (mounted) {
            setProgress(100)
            setLoadingStatus("Python runtime ready!")
            setTimeout(() => {
              setIsLoading(false)
              onLoaded?.()
            }, 500)
          }
          return
        }

        // Start progress animation
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev < 80) return prev + 3
            return prev
          })
        }, 300)

        setLoadingStatus("Loading Pyodide from CDN...")
        setProgress(20)

        // Load Pyodide script dynamically
        const loadPyodideScript = (): Promise<any> => {
          return new Promise((resolve, reject) => {
            // Check if loadPyodide is already available
            if ((window as any).loadPyodide) {
              console.log("✅ loadPyodide already available")
              resolve((window as any).loadPyodide)
              return
            }

            console.log("📦 Loading Pyodide script...")
            const script = document.createElement("script")
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
            script.crossOrigin = "anonymous"
            script.async = true

            script.onload = () => {
              console.log("📦 Pyodide script loaded successfully")
              // Wait for loadPyodide to become available
              let attempts = 0
              const maxAttempts = 100

              const checkLoadPyodide = () => {
                if ((window as any).loadPyodide) {
                  console.log("✅ loadPyodide function available")
                  resolve((window as any).loadPyodide)
                } else if (attempts < maxAttempts) {
                  attempts++
                  setTimeout(checkLoadPyodide, 50)
                } else {
                  reject(new Error("loadPyodide function not available after loading script"))
                }
              }
              checkLoadPyodide()
            }

            script.onerror = (event) => {
              console.error("❌ Failed to load Pyodide script:", event)
              reject(new Error("Failed to load Pyodide from CDN. Please check your internet connection."))
            }

            document.head.appendChild(script)
          })
        }

        if (mounted) {
          setLoadingStatus("Downloading Python runtime...")
          setProgress(40)
        }

        const loadPyodideFunc = await loadPyodideScript()

        if (mounted) {
          setLoadingStatus("Initializing Python environment...")
          setProgress(70)
        }

        console.log("🚀 Initializing Pyodide...")

        // Initialize Pyodide with proper configuration
        const pyodide = await loadPyodideFunc({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
          fullStdLib: false, // Don't load the full standard library to speed up loading
        })

        console.log("✅ Pyodide initialized successfully")

        // Store globally for reuse
        ;(window as any).pyodideInstance = pyodide

        if (mounted) {
          if (progressInterval) {
            clearInterval(progressInterval)
            progressInterval = null
          }
          setProgress(100)
          setLoadingStatus("Python runtime ready!")
          setTimeout(() => {
            setIsLoading(false)
            onLoaded?.()
          }, 500)
        }
      } catch (error) {
        console.error("❌ Python loading error:", error)

        if (mounted) {
          if (progressInterval) {
            clearInterval(progressInterval)
            progressInterval = null
          }

          let errorMessage = "Failed to load Python runtime"

          if (error instanceof Error) {
            if (error.message.includes("CDN") || error.message.includes("Failed to fetch")) {
              errorMessage = "Network error: Unable to connect to Pyodide CDN. Please check your internet connection."
            } else if (error.message.includes("CORS")) {
              errorMessage = "CORS error: Please try refreshing the page"
            } else if (error.message.includes("loadPyodide")) {
              errorMessage = "Failed to initialize Python runtime. Please try refreshing the page."
            } else if (error.message.includes("module specifier")) {
              errorMessage = "Module loading error. Please refresh the page and try again."
            } else {
              errorMessage = error.message
            }
          }

          setError(errorMessage)
          setIsLoading(false)
          onError?.(errorMessage)
        }
      }
    }

    // Start loading Python
    loadPython()

    return () => {
      mounted = false
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [onLoaded, onError])

  if (!isLoading && !error) return null

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {error ? (
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-700">Failed to Load Python</p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                {typeof navigator !== "undefined" && navigator.onLine ? (
                  <>
                    <Wifi className="w-3 h-3" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3" />
                    <span>Offline</span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Try refreshing the page or switching to JavaScript.</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Loading Python Runtime</p>
                <span className="text-xs text-gray-500">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{loadingStatus}</p>
              <p className="text-xs text-gray-400 mt-1">Loading Python in your browser - no server needed!</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-700">Python Ready!</p>
              <p className="text-xs text-green-600">You can now run Python code.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
