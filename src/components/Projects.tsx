import type { ProjectEntry } from "@/lib/cv";
import ProjectsStage from "./ProjectsStage";

export default function Projects({ projects }: { projects: ProjectEntry[] }) {
  return <ProjectsStage projects={projects} />;
}
