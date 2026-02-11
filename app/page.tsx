import type { Project } from "../types";
import HeroSection from "../components/HeroSection";
import FeaturedProjects from "../components/FeaturedProjects";
import ProjectGallery from "../components/ProjectGallery";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Link from "next/link";
import { getProjects } from "./actions/projects";

// ISR: page is statically generated at build-time and revalidated every hour.
export const revalidate = 3600;

export default async function HomePage() {
  const projects: Project[] = await getProjects();

  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSection />
      <FeaturedProjects projects={projects} />
      <ProjectGallery projects={projects} />
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
      <div className="text-center py-10 text-xs text-gray-500">
        Built with Next.js 16 (ISR). Data statically cached –{" "}
        <Link className="underline" href="/">
          refresh
        </Link>{" "}
        to see updates after revalidation.
      </div>
    </main>
  );
}
