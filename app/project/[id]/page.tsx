import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { getProjectById } from "@/app/actions/projects";
import { getGitHubIssues } from "@/app/actions/tasks";
import type { GitHubIssue } from "@/types";

// On-demand static generation: pages are rendered on first request and then
// cached by the "use cache" data-fetching layer (ISR-like). No build-time
// pre-rendering since the Convex DB is remote and may not be reachable during CI.

// Dynamic metadata — params are async in Next.js 15+ / 16.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} – Doozy Labs` };
}

export default function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <ProjectContent params={props.params} />
    </Suspense>
  );
}

/** Async server component — all dynamic/data access happens inside Suspense. */
async function ProjectContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  let tasks: GitHubIssue[] = [];
  if (project.githubRepo) {
    try {
      const repoName = `mickael45/${project.githubRepo}`;
      tasks = await getGitHubIssues(repoName);
    } catch (error) {
      console.error(
        `Failed to fetch GitHub issues for ${project.githubRepo}:`,
        error,
      );
    }
  }

  return <ProjectDetailClient project={project} tasks={tasks} />;
}
