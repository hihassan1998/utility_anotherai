import * as React from "react";

interface AdPlaceholderProps {
  slot: "top-banner" | "sidebar" | "inline" | "bottom";
  className?: string;
}

export function AdPlaceholder({ slot, className = "" }: AdPlaceholderProps) {
  const sizeClasses = {
    "top-banner": "w-full min-h-[90px] md:min-h-[120px] max-w-[970px] mx-auto",
    sidebar: "hidden lg:flex w-[300px] min-h-[600px] sticky top-24",
    inline: "w-full min-h-[250px] max-w-[728px] mx-auto my-6",
    bottom: "w-full min-h-[100px] md:min-h-[150px] max-w-[970px] mx-auto my-8",
  };

  const label = {
    "top-banner": "Advertisement - Top Leaderboard",
    sidebar: "Advertisement - Sidebar Skyscraper",
    inline: "Advertisement - Inline",
    bottom: "Advertisement - Bottom Leaderboard",
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/10 bg-muted/30 p-4 transition-all duration-300 hover:bg-muted/40 hover:border-muted-foreground/20 select-none ${sizeClasses[slot]} ${className}`}
    >
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-semibold mb-2">
        {label[slot]}
      </span>
      <div className="flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full border border-muted-foreground/20 flex items-center justify-center text-muted-foreground/40 mb-1 text-xs">
          Ad
        </div>
        <p className="text-xs text-muted-foreground/40 max-w-[200px]">
          Placeholder for Google AdSense slot
        </p>
      </div>
    </div>
  );
}
