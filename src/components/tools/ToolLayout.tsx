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

  // Helper to render directory links with current page indicator
  const renderDirectoryLink = (href: string, title: string, desc: string) => {
    const isCurrent = tool.href === href;
    if (isCurrent) {
      return (
        <div className="block border-l-2 border-emerald-500 pl-3 py-1 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-r-lg">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            {title}
            <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded uppercase tracking-wider">
              Current
            </span>
          </span>
          <span className="text-[10px] text-muted-foreground block mt-0.5 leading-normal">
            {desc}
          </span>
        </div>
      );
    }
    return (
      <Link
        href={href}
        className="group block border-l-2 border-transparent pl-3 py-1 hover:border-emerald-500/40 hover:bg-muted/30 transition-all rounded-r-lg"
      >
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
          {title}
        </span>
        <span className="text-[10px] text-muted-foreground block mt-0.5 leading-normal">
          {desc}
        </span>
      </Link>
    );
  };

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

  const faqSchema = tool.faqs && tool.faqs.length > 0 ? {
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
  } : null;

  return (
    <>
      {/* Inject schemas */}
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

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
              <div className="pt-1">
                <Link
                  href={`/guides/${tool.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-500/5 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/10 transition-colors duration-200"
                >
                  <Icon name="BookOpen" size={12} />
                  Read the complete {tool.name} Guide & Use Cases
                </Link>
              </div>
            </div>

            {/* Interactive Calculator Section */}
            <Card className="glass-card shadow-lg border border-border/50">
              <CardContent className="p-6">{children}</CardContent>
            </Card>

            {/* Inline Ad */}
            <AdPlaceholder slot="inline" />

            {/* In-depth guide / explanation */}
            {tool.longDescription && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-gradient flex items-center gap-2">
                  <Icon name="BookOpen" size={18} className="text-emerald-500" />
                  How to Use the {tool.name}
                </h2>
                <div className="rounded-xl border border-border/50 bg-card p-6 text-sm text-muted-foreground leading-relaxed space-y-3 shadow-sm">
                  <p>{tool.longDescription}</p>
                  {tool.examples && tool.examples.length > 0 && (
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
            )}

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

            {/* Quick Navigation Directory */}
            <section className="space-y-6 pt-6 border-t border-border/40">
              <div>
                <h2 className="text-xl font-bold text-gradient flex items-center gap-2">
                  <Icon name="Compass" size={20} className="text-emerald-500" />
                  AnoTool Utilities Directory
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Explore other related free calculators and converters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category 1: Date & Calendar Calculators */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-1.5 border-b border-border/20">
                    <Icon name="Calendar" size={16} className="text-emerald-500" />
                    Date & Calendar Calculators
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      {renderDirectoryLink(
                        "/date-duration-calculator",
                        "Date Duration Calculator",
                        "Calculate duration, with days, hours, and minutes included."
                      )}
                    </li>
                    <li>
                      {renderDirectoryLink(
                        "/days-until-calculator",
                        "Days Until / Countdown Calculator",
                        "Create countdown timers for custom events, holidays, or seasons."
                      )}
                    </li>
                    <li>
                      {renderDirectoryLink(
                        "/age-calculator",
                        "Age Calculator & Birthday Tracker",
                        "Find your exact age and the countdown to your next birthday."
                      )}
                    </li>
                  </ul>
                </div>

                {/* Category 2: Math & Finance Utilities */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-1.5 border-b border-border/20">
                    <Icon name="DollarSign" size={16} className="text-emerald-500" />
                    Math & Finance Utilities
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      {renderDirectoryLink(
                        "/percentage-calculator",
                        "Percentage Calculator",
                        "Instantly compute percentages, margins, markups, or discounts."
                      )}
                    </li>
                    <li>
                      {renderDirectoryLink(
                        "/free-invoice-generator",
                        "Free Invoice Generator",
                        "Build and export professional PDF business invoices instantly."
                      )}
                    </li>
                  </ul>
                </div>

                {/* Category 3: Text & Writing Tools */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-1.5 border-b border-border/20">
                    <Icon name="PenTool" size={16} className="text-emerald-500" />
                    Text & Writing Utilities
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      {renderDirectoryLink(
                        "/word-counter",
                        "Word Counter & Analysis",
                        "Count words, sentences, estimate reading speeds, and density."
                      )}
                    </li>
                    <li>
                      {renderDirectoryLink(
                        "/character-counter",
                        "Character Counter",
                        "Track social media character limits and category breakdowns."
                      )}
                    </li>
                  </ul>
                </div>

                {/* Category 4: Converters & PDF Utilities */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-1.5 border-b border-border/20">
                    <Icon name="Activity" size={16} className="text-emerald-500" />
                    Converters & PDF Utilities
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      {renderDirectoryLink(
                        "/convert-photo-to-pdf",
                        "Convert Photo to PDF",
                        "Convert and merge multiple images into a single PDF document."
                      )}
                    </li>
                    <li>
                      {renderDirectoryLink(
                        "/unit-converter",
                        "Multi-Category Unit Converter",
                        "Convert Length, Weight, Area, Time, Speed, and Temperature."
                      )}
                    </li>
                    <li>
                      {renderDirectoryLink(
                        "/bmi-calculator",
                        "BMI Calculator",
                        "Compute Body Mass Index and check healthy weight targets."
                      )}
                    </li>
                  </ul>
                </div>
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
                  AnoTool is a growing library of calculation and converter tools. Bookmark this site to stay updated as we deploy new tools every week.
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
