import { notFound } from "next/navigation";
import ProjectDetailClient from "../../../components/ProjectDetailClient";
import { getProjectById } from "../../actions/projects";
export { revalidate, generateStaticParams, generateMetadata } from "./helpers";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 15: params is a Promise now, must be awaited.
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return notFound();
  return <ProjectDetailClient project={project} />;
}
