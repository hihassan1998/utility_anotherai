import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "All Tools - Full Utilities Directory",
  description: "Browse our complete directory of free online calculation, conversion, time, and health tools.",
};

export default function AllToolsPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gradient">
          All Online Utilities
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Explore our complete, growing library of high-performance tools designed to simplify your daily workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.tools.map((tool) => (
          <Link href={tool.href} key={tool.id} className="group">
            <Card className="h-full border border-border/50 bg-card hover:bg-accent/40 hover:border-emerald-500/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Icon name={tool.iconName} size={22} />
                </div>
                <div className="space-y-1.5">
                  <h2 className="font-bold text-base group-hover:text-emerald-500 transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-2 group-hover:translate-x-1 transition-transform duration-300">
                  Open Tool
                  <Icon name="ArrowRight" size={14} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
