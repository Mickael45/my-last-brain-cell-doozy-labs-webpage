import React from "react";

// Static hue background only: cyan / purple / aqua blobs + vignette, no dots, no animation.
const DetailBackground: React.FC = () => {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Hue blobs */}
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_22%_28%,rgba(56,189,248,0.38),transparent_60%),radial-gradient(circle_at_78%_72%,rgba(168,85,247,0.34),transparent_62%),radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.18),transparent_70%)]" />
      {/* Soft overlay gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.05),rgba(0,0,0,0)_45%,rgba(0,0,0,0)_55%,rgba(255,255,255,0.04))] mix-blend-soft-light" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_45%,rgba(6,10,18,0.85))]" />
      {/* Optional subtle grain */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAAAAACRXR/mAAAAG0lEQVR4AWP4//8/AzWAiSTVYIokGsSgYgBoCwAkgY+pcJtv7QAAAABJRU5ErkJggg==')] bg-repeat [background-size:220px_220px]" />
    </div>
  );
};

export default DetailBackground;
