import { Suspense } from "react";
import type { Project } from "../types";
import HeroSection from "../components/HeroSection";
import FeaturedProjects from "../components/FeaturedProjects";
import ProjectGallery from "../components/ProjectGallery";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Link from "next/link";
import { getProjects } from "./actions/projects";

// The static shell is pre-rendered at build time.
// Project data streams in via Suspense and is cached by the "use cache"
// data-fetching layer (ISR-like, revalidates hourly — see cacheLife("static")).
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSection />
      <Suspense>
        <ProjectSections />
      </Suspense>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
      <div className="text-center py-10 text-xs text-gray-500">
        Built with Next.js 16 &amp; Cache Components. Data statically cached –{" "}
        <Link className="underline" href="/">
          refresh
        </Link>{" "}
        to see updates after revalidation.
      </div>
    </main>
  );
}

/** Async server component that fetches and renders project data. */
async function ProjectSections() {
  const projects: Project[] = await getProjects();

  return (
    <>
      <FeaturedProjects projects={projects} />
      <ProjectGallery projects={projects} />
    </>
  );
}
