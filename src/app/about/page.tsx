import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about AnoTool, our mission to build fast, accessible, and privacy-respecting online utility tools.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gradient">
          About {siteConfig.name}
        </h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Providing high-performance, accessible, and privacy-friendly online utility tools.
        </p>
      </div>

      <Card className="glass-card border border-border/50">
        <CardContent className="p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Welcome to <strong>{siteConfig.name}</strong>, your go-to destination for fast, reliable, and free online utility tools. <strong>{siteConfig.name}</strong> is developed by <a href="https://anotheraiplatform.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">anotherAI</a> for public use, with the mission to make daily calculation, conversion, and comparison tasks as quick, private, and frictionless as possible.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border/40">
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon name="Zap" size={20} />
              </div>
              <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">High Speed</h3>
              <p className="text-xs">
                Built on Next.js SSG. Pages load instantly with minimal JavaScript overhead and zero server delay.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon name="ShieldCheck" size={20} />
              </div>
              <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">100% Privacy</h3>
              <p className="text-xs">
                All calculations run locally inside your browser. We never collect, transmit, or store your inputs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon name="Accessibility" size={20} />
              </div>
              <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Accessible</h3>
              <p className="text-xs">
                Complies with WCAG 2.2 AA standards, supporting full keyboard navigation and screen readers.
              </p>
            </div>
          </div>

          <p className="pt-4 border-t border-border/40">
            As a product developed by <a href="https://anotheraiplatform.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">anotherAI</a> for public utility, we are constantly expanding our collection of tools across health, finance, time, conversions, and developer utilities. If you have any suggestions or requests, feel free to reach out to us through our contact form.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
