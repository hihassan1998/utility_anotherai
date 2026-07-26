"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ToolLayoutProps {
  toolId: string;
  children: React.ReactNode;
}

export function ToolLayout({ toolId, children }: ToolLayoutProps) {
  const tool = siteConfig.tools.find((t) => t.id === toolId);

  if (!tool) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <p className="text-muted-foreground mt-2">The requested tool does not exist.</p>
        <Link href="/" className="text-emerald-500 hover:underline mt-4 inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  // Related tools (excluding the current one)
  const relatedTools = siteConfig.tools.filter((t) => t.id !== toolId).slice(0, 3);

  // Generate structured JSON-LD schemas
  const siteUrl = siteConfig.url;
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tool.name,
        "item": `${siteUrl}${tool.href}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* Inject schemas */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Top Ad Banner */}
        <AdPlaceholder slot="top-banner" className="mb-6" />

        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1 hover:text-foreground">
                <Icon name="Home" size={14} />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-foreground">{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tool Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Icon name={tool.iconName} size={24} />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gradient">
                  {tool.name}
                </h1>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Interactive Calculator Section */}
            <Card className="glass-card shadow-lg border border-border/50">
              <CardContent className="p-6">{children}</CardContent>
            </Card>

            {/* Inline Ad */}
            <AdPlaceholder slot="inline" />

            {/* In-depth guide / explanation */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gradient flex items-center gap-2">
                <Icon name="BookOpen" size={18} className="text-emerald-500" />
                How to Use the {tool.name}
              </h2>
              <div className="rounded-xl border border-border/50 bg-card p-6 text-sm text-muted-foreground leading-relaxed space-y-3 shadow-sm">
                <p>{tool.longDescription}</p>
                {tool.examples.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <h3 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">
                      Practical Examples:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs">
                      {tool.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Frequently Asked Questions */}
            {tool.faqs.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-gradient flex items-center gap-2">
                  <Icon name="HelpCircle" size={18} className="text-emerald-500" />
                  Frequently Asked Questions (FAQ)
                </h2>
                <Accordion className="w-full space-y-2">
                  {tool.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="border border-border/50 rounded-lg px-4 bg-card shadow-sm"
                    >
                      <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* Related Tools Navigation */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gradient">Related Utilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((rt) => (
                  <Link href={rt.href} key={rt.id} className="group">
                    <Card className="h-full border border-border/50 bg-card hover:bg-accent/40 hover:border-emerald-500/20 transition-all duration-300 shadow-sm flex flex-col justify-between">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                          <Icon name={rt.iconName} size={16} />
                        </div>
                        <h3 className="font-bold text-xs group-hover:text-emerald-500 transition-colors">
                          {rt.name}
                        </h3>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">
                          {rt.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area (Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Call to Action card */}
            <Card className="border border-border/50 bg-emerald-950/5 dark:bg-emerald-950/20 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Explore More Free Tools
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  ToolNest is a growing library of calculation and converter tools. Bookmark this site to stay updated as we deploy new tools every week.
                </p>
                <Link href="/all-tools">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm text-xs mt-2">
                    Browse All Tools
                    <Icon name="ArrowRight" size={14} className="ml-1.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sidebar Ad Placement */}
            <AdPlaceholder slot="sidebar" />
          </div>
        </div>

        {/* Bottom Ad Leaderboard */}
        <AdPlaceholder slot="bottom" />
      </main>
    </>
  );
}
