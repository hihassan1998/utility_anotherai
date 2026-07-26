import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read our terms of service and usage conditions.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gradient">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: July 19, 2026
        </p>
      </div>

      <Card className="glass-card border border-border/50">
        <CardContent className="p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Terms</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws, and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily use the online utility tools on <strong>{siteConfig.name}</strong> for personal, non-commercial transitory viewing or calculation only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. Disclaimer</h2>
            <p>
              The materials on {siteConfig.name}'s website are provided "as is". {siteConfig.name} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. Limitations</h2>
            <p>
              In no event shall {siteConfig.name} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on {siteConfig.name}.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">5. Revisions and Errata</h2>
            <p>
              The materials appearing on {siteConfig.name}'s website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
