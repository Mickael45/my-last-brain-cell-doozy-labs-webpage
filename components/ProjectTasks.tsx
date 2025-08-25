"use client";

import type { GitHubIssue } from "../types";
import { CheckCircle, GitMerge, ArchiveX } from "lucide-react";

const getContrastColor = (hexColor: string) => {
  if (!hexColor) return "#FFFFFF";
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export default function ProjectTasks({ tasks }: { tasks: GitHubIssue[] }) {
  return (
    <section className="py-20 bg-gray-800/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GitMerge className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl font-bold text-white">
              Live Tasks & Issues
            </h2>
          </div>
          <p className="text-xl text-gray-400">
            Track progress directly from the GitHub repository.
          </p>
        </div>

        <div className="space-y-4">
          {tasks.map((issue, index) => (
            <a
              key={issue.id}
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-gradient-to-br from-gray-700/40 to-gray-800/60 border border-gray-600/50 shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-up-scale"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-mono text-gray-400 mb-2">
                    #{issue.number}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {issue.title}
                  </h3>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    issue.state === "open"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }`}
                >
                  {issue.state === "open" ? (
                    <ArchiveX className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span>{issue.state === "open" ? "Open" : "Closed"}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {issue.labels.map((label: GitHubIssue["labels"][number]) => (
                  <span
                    key={label.name}
                    className="px-2 py-1 text-xs font-mono rounded"
                    style={{
                      backgroundColor: `#${label.color}`,
                      color: getContrastColor(label.color),
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
