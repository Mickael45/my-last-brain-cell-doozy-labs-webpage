import { cacheLife, cacheTag } from "next/cache";
import type { GitHubIssue } from "@/types";

/** Fetch open GitHub issues for a repo — cached via "use cache" (ISR). */
export async function getGitHubIssues(
  repoName: string,
): Promise<GitHubIssue[]> {
  "use cache";
  cacheLife("issues");
  cacheTag("github-issues", `issues-${repoName}`);

  if (!process.env.GITHUB_PAT) {
    console.error("GITHUB_PAT is not set in the environment variables.");
    throw new Error("Server configuration error: Missing GitHub PAT.");
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoName}/issues`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_PAT}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `GitHub API request failed with status ${response.status}: ${errorBody}`,
      );
      throw new Error(
        `Failed to fetch issues from GitHub. Status: ${response.status}`,
      );
    }

    const issues = (await response.json()) as GitHubIssue[];
    return issues;
  } catch (error) {
    console.error(
      "An unexpected error occurred fetching GitHub issues:",
      error,
    );
    throw new Error("An unexpected error occurred while fetching tasks.");
  }
}
