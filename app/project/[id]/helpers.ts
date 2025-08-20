import { getProjects, getProjectById } from "../../actions/projects";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

interface Params {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} – Doozy Labs` };
}
