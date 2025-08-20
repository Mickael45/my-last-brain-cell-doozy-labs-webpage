import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectGallery from './components/ProjectGallery';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import { mockProjects } from './data/projects';
import { Project } from './types';

const HomePage: React.FC<{ onProjectClick: (project: Project) => void }> = ({ onProjectClick }) => (
  <>
    <HeroSection />
    <FeaturedProjects 
      projects={mockProjects}
      onProjectClick={onProjectClick}
    />
    <ProjectGallery 
      projects={mockProjects}
      onProjectClick={onProjectClick}
    />
    <div id="about">
      <AboutSection />
    </div>
    <div id="contact">
      <ContactSection />
    </div>
    <Footer />
  </>
);

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
          <Route 
            path="/project/:id" 
            element={<ProjectDetail />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;