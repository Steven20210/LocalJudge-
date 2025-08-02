"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Circle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { problems } from "@/lib/problems";
import { getProgress } from "@/lib/progress";

type ProblemStatus = "unsolved" | "attempted" | "solved";

const PROBLEMS_PER_PAGE = 10;

export default function ProblemList() {
  const [progress, setProgress] = useState<
    Record<string, { status: ProblemStatus; lastSolution?: string }>
  >({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const getStatusIcon = (status: ProblemStatus) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "attempted":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const solvedCount = Object.values(progress).filter(
    (p) => p.status === "solved"
  ).length;
  const attemptedCount = Object.values(progress).filter(
    (p) => p.status === "attempted"
  ).length;

  // Calculate pagination
  const totalPages = Math.ceil(problems.length / PROBLEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
  const endIndex = startIndex + PROBLEMS_PER_PAGE;
  const currentProblems = problems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Coding Practice
          </h1>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Total: {problems.length}</span>
            <span className="text-green-600">Solved: {solvedCount}</span>
            <span className="text-yellow-600">Attempted: {attemptedCount}</span>
            <span>
              Unsolved: {problems.length - solvedCount - attemptedCount}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {currentProblems.map((problem) => {
            const status = progress[problem.id]?.status || "unsolved";

            return (
              <Link key={problem.id} href={`/problem/${problem.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <CardTitle className="text-lg">
                          {problem.title}
                        </CardTitle>
                      </div>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {problem.description.split("\n")[0]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
              {/* Previous button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Next button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(endIndex, problems.length)} of{" "}
            {problems.length} problems
          </div>
        )}
      </div>
    </div>
  );
}
