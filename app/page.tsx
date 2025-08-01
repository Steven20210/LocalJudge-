"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, AlertCircle } from "lucide-react"
import { problems } from "@/lib/problems"
import { getProgress } from "@/lib/progress"

type ProblemStatus = "unsolved" | "attempted" | "solved"

export default function ProblemList() {
  const [progress, setProgress] = useState<Record<string, { status: ProblemStatus; lastSolution?: string }>>({})

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  const getStatusIcon = (status: ProblemStatus) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "attempted":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const solvedCount = Object.values(progress).filter((p) => p.status === "solved").length
  const attemptedCount = Object.values(progress).filter((p) => p.status === "attempted").length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coding Practice</h1>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Total: {problems.length}</span>
            <span className="text-green-600">Solved: {solvedCount}</span>
            <span className="text-yellow-600">Attempted: {attemptedCount}</span>
            <span>Unsolved: {problems.length - solvedCount - attemptedCount}</span>
          </div>
        </div>

        <div className="space-y-4">
          {problems.map((problem) => {
            const status = progress[problem.id]?.status || "unsolved"

            return (
              <Link key={problem.id} href={`/problem/${problem.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <CardTitle className="text-lg">{problem.title}</CardTitle>
                      </div>
                      <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm line-clamp-2">{problem.description.split("\n")[0]}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
