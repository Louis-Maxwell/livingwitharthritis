import { memo } from "react";

const GridBg = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
      <defs>
        <pattern id="tg" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tg)" />
    </svg>
    <div
      className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"
      style={{ animationDuration: "8s" }}
    />
    <div
      className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet/10 rounded-full blur-[100px] animate-pulse"
      style={{ animationDuration: "10s", animationDelay: "2s" }}
    />
  </div>
));

GridBg.displayName = "GridBg";
export default GridBg;
