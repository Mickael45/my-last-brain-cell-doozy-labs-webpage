export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  screenshots: string[];
  challenges: string[];
  solutions: string[];
  metrics?: {
    users?: string;
    performance?: string;
    impact?: string;
  };
  techStack: string[];
  category: "Public Utility" | "Chaos Experiment";
  isFeatured: boolean;
  isIncoming?: boolean; // currently being worked on / upcoming
  sortOrder: number;
}
