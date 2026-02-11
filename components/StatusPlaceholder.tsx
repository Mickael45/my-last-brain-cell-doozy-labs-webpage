"use client";
import React from "react";
import { Clock, Package, XCircle, ImageIcon } from "lucide-react";
import type { Project } from "../types";

interface StatusPlaceholderProps {
  status: Project["status"];
  /** "card" uses compact sizing, "detail" uses larger sizing */
  variant?: "card" | "detail";
}

const statusConfig: Record<
  Project["status"],
  {
    icon: React.ElementType;
    label: string;
    gradient: string;
    iconColor: string;
    labelColor: string;
    glowColor: string;
  }
> = {
  "Compiling...": {
    icon: Clock,
    label: "Building something cool...",
    gradient:
      "bg-gradient-to-br from-yellow-900/40 via-amber-800/20 to-orange-900/30",
    iconColor: "text-yellow-400/70",
    labelColor: "text-yellow-300/60",
    glowColor: "bg-yellow-500/10",
  },
  "Next In Line": {
    icon: Package,
    label: "Queued up next",
    gradient:
      "bg-gradient-to-br from-blue-900/40 via-indigo-800/20 to-cyan-900/30",
    iconColor: "text-blue-400/70",
    labelColor: "text-blue-300/60",
    glowColor: "bg-blue-500/10",
  },
  "Later...Maybe": {
    icon: XCircle,
    label: "On the backburner",
    gradient:
      "bg-gradient-to-br from-purple-900/40 via-violet-800/20 to-fuchsia-900/30",
    iconColor: "text-purple-400/70",
    labelColor: "text-purple-300/60",
    glowColor: "bg-purple-500/10",
  },
  Released: {
    icon: ImageIcon,
    label: "Screenshot coming soon",
    gradient:
      "bg-gradient-to-br from-green-900/40 via-emerald-800/20 to-teal-900/30",
    iconColor: "text-green-400/70",
    labelColor: "text-green-300/60",
    glowColor: "bg-green-500/10",
  },
};

const StatusPlaceholder: React.FC<StatusPlaceholderProps> = ({
  status,
  variant = "card",
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  const isDetail = variant === "detail";
  const iconSize = isDetail ? "w-16 h-16" : "w-12 h-12";
  const textSize = isDetail ? "text-base" : "text-sm";

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${config.gradient} animate-status-gradient`}
    >
      {/* Decorative blurred glow */}
      <div
        className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 ${config.glowColor} rounded-full blur-3xl animate-blob`}
      />
      <div
        className={`absolute bottom-1/4 right-1/4 w-1/3 h-1/3 ${config.glowColor} rounded-full blur-2xl animate-blob-delay-1`}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <Icon
          className={`${iconSize} ${config.iconColor} animate-status-icon-pulse`}
        />
        <span
          className={`${textSize} font-medium tracking-wide ${config.labelColor}`}
        >
          {config.label}
        </span>
      </div>
    </div>
  );
};

export default StatusPlaceholder;
