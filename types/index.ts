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
  mrr?: number;
  metrics?: {
    users?: number | string;
    performance?: string;
    impact?: string;
    mrr?: number | string;
  };
  techStack: string[];
  categories: ("ai" | "web" | "meh")[];
  type: "Forking Around" | "Sass-y Solution";
  status: "Later...Maybe" | "Next In Line" | "Compiling..." | "Released";
  isFeatured: boolean;
  isIncoming?: boolean; // currently being worked on / upcoming
  sortOrder: number;
  githubRepo?: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  user: {
    login: string;
  };
  labels: {
    name: string;
  }[];
}
