"use client";
import React from "react";
import {
  ExternalLink,
  Code,
  Sparkles,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  Package,
  XCircle,
} from "lucide-react";
import { Project } from "../types";
import Image from "next/image";
import Link from "next/link";

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
  const getTypeIcon = (type: string) => {
    return type === "Forking Around" ? (
      <Sparkles className="w-4 h-4" />
    ) : (
      <Code className="w-4 h-4" />
    );
  };

  const getTypeStyling = (type: string) => {
    return type === "Forking Around"
      ? {
          borderColor: "border-purple-500/30",
          gradient: "from-purple-500/20 via-pink-500/20 to-red-500/20",
          textColor: "text-purple-300",
          badgeColor:
            "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 border-transparent text-white",
          buttonColor:
            "bg-purple-600/80 hover:bg-purple-500/80 text-white",
        }
      : {
          borderColor: "border-cyan-500/30",
          gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
          textColor: "text-cyan-300",
          badgeColor:
            "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 border-transparent text-white",
          buttonColor: "bg-cyan-600/80 hover:bg-cyan-500/80 text-white",
        };
  };

  const getStatusInfo = (status: Project["status"]) => {
    switch (status) {
      case "Released":
        return {
          icon: <CheckCircle className="w-3 h-3 text-green-400" />,
          color: "text-green-300",
        };
      case "Compiling...":
        return {
          icon: <Clock className="w-3 h-3 text-yellow-400" />,
          color: "text-yellow-300",
        };
      case "Next In Line":
        return {
          icon: <Package className="w-3 h-3 text-blue-400" />,
          color: "text-blue-300",
        };
      case "Later...Maybe":
        return {
          icon: <XCircle className="w-3 h-3 text-gray-500" />,
          color: "text-gray-400",
        };
      default:
        return {
          icon: null,
          color: "text-white",
        };
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
  };

  const statusInfo = getStatusInfo(project.status);
  const typeStyling = getTypeStyling(project.type);

  const Card = (
    <div
      onClick={() => !href && onClick?.(project)}
      className="cursor-pointer group transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
    >
      <div
        className={`
        relative overflow-hidden rounded-xl border bg-gray-900/50
        ${typeStyling.borderColor}
        hover:border-opacity-60 transition-all duration-300
        flex flex-col
      `}
      >
        {/* Image and Badges Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase shadow-lg ${typeStyling.badgeColor}`}
            >
              {getTypeIcon(project.type)}
              <span>{project.type}</span>
            </div>
            <div className="flex flex-col gap-2">
              {project.isFeatured && (
                <div className="bg-gradient-to-r from-pink-600 to-orange-500 rounded-full px-3 py-1 shadow-lg text-xs font-bold text-white self-end">
                  🔥 Hot
                </div>
              )}
              {project.isIncoming && (
                <div className="relative self-end">
                  <div className="absolute inset-0 rounded-full bg-green-500/40 blur animate-ping" />
                  <div className="relative bg-green-500/30 border border-green-400/50 rounded-full px-3 py-1 flex items-center gap-1 text-xs font-semibold tracking-wide text-green-200 uppercase">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Incoming
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3
            className={`text-lg font-bold text-white mb-1 group-hover:${typeStyling.textColor} transition-colors`}
          >
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
            {project.tagline}
          </p>

          {/* Metrics */}
          <div className="border-y border-white/10 py-3 my-3 flex justify-around text-center">
            <div className="px-2">
              <p className="text-xs text-gray-400 mb-1">Users</p>
              <div className="flex items-center justify-center gap-1.5 text-white font-bold text-sm">
                <Users className="w-4 h-4 text-cyan-400" />
                {project.userCount ? formatNumber(project.userCount) : "N/A"}
              </div>
            </div>
            <div className="px-2">
              <p className="text-xs text-gray-400 mb-1">MRR</p>
              <div className="flex items-center justify-center gap-1.5 text-white font-bold text-sm">
                <DollarSign className="w-4 h-4 text-green-400" />
                {project.mrr ? `${formatNumber(project.mrr)}` : "N/A"}
              </div>
            </div>
            <div className="px-2">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <div
                className={`flex items-center justify-center gap-1.5 font-bold text-sm ${statusInfo.color}`}
              >
                {statusInfo.icon}
                {project.status}
              </div>
            </div>
          </div>

          <div className="flex-grow" />

          {/* Tech stack */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            className={`w-full text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${typeStyling.buttonColor} group-hover:shadow-lg group-hover:shadow-cyan-500/20`}
          >
            <span>Dive Deeper</span>
            <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link
      href={href}
      prefetch
      aria-label={`Open project ${project.title}`}
      className="block"
    >
      {Card}
    </Link>
  ) : (
    Card
  );
};

export default ProjectCard;
