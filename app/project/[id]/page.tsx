import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { getProjectById, getProjects } from "@/app/actions/projects";
import { getGitHubIssues } from "@/app/actions/tasks";
import type { GitHubIssue } from "@/types";

// ISR: revalidate every hour — same cadence as the home page.
export const revalidate = 3600;

// Pre-render all known project pages at build time (SSG).
// Unknown IDs are rendered on-demand at request time (dynamic ISR).
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

// Dynamic metadata — params are async in Next.js 16.
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

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const project = await getProjectById(id);
  if (!project) return notFound();

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
