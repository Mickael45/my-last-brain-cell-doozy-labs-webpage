import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import FeaturedProjects from "./components/FeaturedProjects";
import ProjectGallery from "./components/ProjectGallery";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import { Project } from "./types";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const HomePage: React.FC<{ onProjectClick: (project: Project) => void }> = ({
  onProjectClick,
}) => {
  const docs = useQuery(api.projects.list) as
    | Array<{
        legacyId: string;
        title: string;
        tagline: string;
        description: string;
        projectUrl: string;
        imageUrl: string;
        screenshots: string[];
        challenges: string[];
        solutions: string[];
        metrics?: { users?: string; performance?: string; impact?: string };
        techStack: string[];
        category: Project["category"];
        isFeatured: boolean;
        isIncoming?: boolean;
        sortOrder: number;
      }>
    | undefined;
  const projects: Project[] = (docs || []).map((d) => ({
    id: d.legacyId,
    title: d.title,
    tagline: d.tagline,
    description: d.description,
    projectUrl: d.projectUrl,
    imageUrl: d.imageUrl,
    screenshots: d.screenshots,
    challenges: d.challenges,
    solutions: d.solutions,
    metrics: d.metrics,
    techStack: d.techStack,
    category: d.category,
    isFeatured: d.isFeatured,
    isIncoming: d.isIncoming,
    sortOrder: d.sortOrder,
  }));

  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={projects} onProjectClick={onProjectClick} />
      <ProjectGallery projects={projects} onProjectClick={onProjectClick} />
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

function App() {
  const handleProjectClick = (project: Project) => {
    window.location.href = `/project/${project.id}`;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route
            path="/"
            element={<HomePage onProjectClick={handleProjectClick} />}
          />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
