import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { HomeSearch } from "@/components/HomeSearch";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  // Generate Website schema markup
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/all-tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <JsonLd data={websiteSchema} />

      <main className="flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <section className="px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center space-y-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ⚡ Privacy-First Calculation Toolkit
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-gradient">
              Your Complete Online <span className="brand-gradient">Utility Hub</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Fast, responsive, and completely private calculation, date, conversion, and calculation tools. All calculations are executed locally in your browser.
            </p>
          </div>

          {/* Quick Search */}
          <HomeSearch />
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h2 className="text-xl font-bold text-gradient">Featured Utilities</h2>
            <Link
              href="/all-tools"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              View all tools ({siteConfig.tools.length})
              <Icon name="ArrowRight" size={12} />
            </Link>
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
                      <h3 className="font-bold text-base group-hover:text-emerald-500 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                      Open Tool
                      <Icon name="ArrowRight" size={14} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Introduction content section */}
        <section className="bg-muted/20 border-t border-b border-border/40 py-16 mt-8">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <h2 className="text-2xl font-bold text-center text-gradient">
              Why Choose {siteConfig.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">🛡️ Privacy is our core foundation</h3>
                <p>
                  Many calculation sites upload your inputs to their servers. We process everything in your web browser. Your inputs, birthdates, height, and numeric values never leave your computer.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">🏎️ Speed & Light Weight</h3>
                <p>
                  Traditional utility sites are cluttered with slow layout trackers. {siteConfig.name} is pre-compiled, statically hosted, and uses minimalist layout nodes to ensure page load times of under 100ms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
