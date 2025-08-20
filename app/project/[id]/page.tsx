import { notFound } from "next/navigation";
import ProjectDetailClient from "../../../components/ProjectDetailClient";
import { getProjectById } from "../../actions/projects";
export { revalidate, generateStaticParams, generateMetadata } from "./helpers";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(params.id);
  if (!project) return notFound();
  return <ProjectDetailClient project={project} />;
}
