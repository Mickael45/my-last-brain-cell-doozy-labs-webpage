"use client";
import React from "react";
import {
  ArrowRight,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Package,
  XCircle,
} from "lucide-react";
import { Project } from "../types";
import Image from "next/image";
import { useViewTransitionRouter } from "../lib/useViewTransitionRouter";

interface ProjectCardProps {
  project: Project;
  href?: string; // optional link destination
  onClick?: (project: Project) => void; // fallback click handler
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  href,
  onClick,
}) => {
  const router = useViewTransitionRouter();
  const getTypeStyling = (type: string) => {
    return type === "Forking Around"
      ? {
          textColor: "text-purple-300",
          borderColor: "border-purple-500/30",
        }
      : {
          textColor: "text-cyan-300",
          borderColor: "border-cyan-500/30",
        };
  };

  const getStatusInfo = (status: Project["status"]) => {
    switch (status) {
      case "Released":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          label: "Released",
          colorClass: "text-green-400",
        };
      case "Compiling...":
        return {
          icon: <Clock className="w-4 h-4" />,
          label: "Compiling...",
          colorClass: "text-yellow-400",
        };
      case "Next In Line":
        return {
          icon: <Package className="w-4 h-4" />,
          label: "Next In Line",
          colorClass: "text-blue-400",
        };
      case "Later...Maybe":
        return {
          icon: <XCircle className="w-4 h-4" />,
          label: "Later...Maybe",
          colorClass: "text-purple-400",
        };
      default:
        return { icon: null, label: "Unknown", colorClass: "text-gray-400" };
    }
  };

  const formatNumber = (num: number | string) => {
    const numericValue = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(numericValue)) return num;
    if (numericValue >= 1000) return `${(numericValue / 1000).toFixed(1)}k`;
    return numericValue;
  };

  const statusInfo = getStatusInfo(project.status);
  const typeStyling = getTypeStyling(project.type);

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick(project);
    }
  };

  const Card = (
    <div
      onClick={handleClick}
      className="cursor-pointer group relative rounded-xl overflow-hidden h-[450px] transition-all duration-300 hover:scale-[1.02] active:scale-95"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{ viewTransitionName: `project-image-${project.id}` }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6" />
      </div>

      <div className="relative p-6 flex flex-col justify-end h-full">
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          {project.isFeatured && (
            <div className="flex items-center bg-pink-950/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
              <span className="text-xs font-bold text-pink-300">🔥 Hot</span>
            </div>
          )}
          {project.isIncoming && (
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-green-300 uppercase">
                Incoming
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <p className={`text-sm font-bold mb-1 ${typeStyling.textColor}`}>
            {project.type}
          </p>
          <h3
            className="text-2xl font-bold text-white mb-2"
            style={{ viewTransitionName: `project-title-${project.id}` }}
          >
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {project.tagline}
          </p>

          {/* Metrics */}
          <div className="flex items-center gap-6 text-white mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="font-bold">
                {project.metrics?.users
                  ? formatNumber(project.metrics.users)
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="font-bold">
                {project.metrics?.mrr
                  ? `${formatNumber(project.metrics.mrr)}`
                  : "N/A"}
              </span>
            </div>
            <div className={`flex items-center gap-2 ${statusInfo.colorClass}`}>
              {statusInfo.icon}
              <span className="font-bold">{statusInfo.label}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button - Appears on Hover */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/70 backdrop-blur-sm border ${typeStyling.borderColor} text-white`}
          >
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );

  return Card;
};

export default ProjectCard;
