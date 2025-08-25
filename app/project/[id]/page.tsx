import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { getProjectById, getProjects } from "@/app/actions/projects";
import { getGitHubIssues } from "@/app/actions/tasks";
import type { GitHubIssue } from "@/types";

// Export route segment config directly (re-exporting from another file triggers a Next warning & may confuse Turbopack)
export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

// In Next.js 15, dynamic route params are async and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>; // params is now a Promise
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} – Doozy Labs` };
}

export default async function ProjectPage(props: {
  params: Promise<{ id:string }>;
}) {
  const { id } = await props.params;
  const project = await getProjectById(id);
  if (!project) return notFound();

  let tasks: GitHubIssue[] = [];
  if (project.githubRepo) {
    try {
      // NOTE: This assumes a consistent GitHub username.
      // This should be moved to an env variable if it differs between projects.
      const repoName = `mickael45/${project.githubRepo}`;
      tasks = await getGitHubIssues(repoName);
    } catch (error) {
      console.error(`Failed to fetch GitHub issues for ${project.githubRepo}:`, error);
      // Decide if you want to show an error to the user or just log it.
      // For now, we'll proceed with an empty tasks array.
    }
  }

  return <ProjectDetailClient project={project} tasks={tasks} />;
}
