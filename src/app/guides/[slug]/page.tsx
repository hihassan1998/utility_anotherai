import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/config/guides";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return {};

  return {
    title: `${guide.title} | AnoTool Guides`,
    description: guide.metaDescription,
    alternates: {
      canonical: `/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    notFound();
  }

  // Find tool details from siteConfig to get the link and details
  const tool = siteConfig.tools.find((t) => t.id === guide.toolId);
  const toolLink = tool ? tool.href : `/${guide.toolId}`;
  const toolName = tool ? tool.name : "Interactive Tool";

  return (
    <main className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-muted-foreground">Guides</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              {guide.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="space-y-8">
        {/* Header Block */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gradient">
            {guide.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {guide.metaDescription}
          </p>
        </div>

        {/* Try the Interactive Tool Quick Access Card */}
        <Card className="border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-sm rounded-xl">
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Icon name="Activity" size={16} />
                Need to calculate right now?
              </h2>
              <p className="text-xs text-muted-foreground">
                Launch the free, privacy-first, and fully responsive <strong>{toolName}</strong>.
              </p>
            </div>
            <Link href={toolLink} className="shrink-0">
              <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold px-4 py-2 shadow-sm flex items-center gap-2">
                Go to Interactive {toolName}
                <Icon name="ArrowRight" size={12} />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Introduction Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/20 pb-1.5">
            <Icon name="BookOpen" size={18} className="text-emerald-500" />
            Introduction
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {guide.introduction}
          </p>
        </section>

        {/* Typical Use Cases */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/20 pb-1.5">
            <Icon name="Compass" size={18} className="text-emerald-500" />
            Typical Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guide.useCases.map((uc, index) => (
              <Card key={index} className="border border-border/30 bg-muted/10">
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {index + 1}
                    </span>
                    {uc.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {uc.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practical Step-by-Step Examples */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/20 pb-1.5">
            <Icon name="CheckSquare" size={18} className="text-emerald-500" />
            Practical Examples & Scenarios
          </h2>
          <div className="space-y-4">
            {guide.examples.map((ex, index) => (
              <div key={index} className="rounded-xl border border-border/40 bg-card p-5 space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Icon name="Flame" size={14} className="text-emerald-500" />
                  Scenario {index + 1}: {ex.scenario}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 bg-muted/20 p-3 rounded-lg">
                    <span className="font-semibold text-muted-foreground block uppercase tracking-wider text-[9px]">
                      Action Steps:
                    </span>
                    <p className="text-muted-foreground leading-normal">{ex.steps}</p>
                  </div>
                  <div className="space-y-1 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider text-[9px]">
                      Calculated Outcome:
                    </span>
                    <p className="text-muted-foreground leading-normal">{ex.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {guide.faq.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/20 pb-1.5">
              <Icon name="HelpCircle" size={18} className="text-emerald-500" />
              Frequently Asked Questions (FAQ)
            </h2>
            <Accordion className="w-full space-y-2">
              {guide.faq.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border/50 rounded-lg px-4 bg-card shadow-sm"
                >
                  <AccordionTrigger className="text-xs font-semibold hover:no-underline py-3 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[11px] text-muted-foreground leading-relaxed pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Back Link Backings Directory */}
        <section className="pt-6 border-t border-border/40 text-center space-y-3">
          <p className="text-xs text-muted-foreground">
            Looking for other resources? You can view all our guides or try the calculators.
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-xs">
            <Link href={toolLink} className="text-emerald-500 hover:underline font-semibold flex items-center gap-1">
              <Icon name="Activity" size={12} />
              Try the {toolName}
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/" className="text-emerald-500 hover:underline font-semibold flex items-center gap-1">
              <Icon name="Home" size={12} />
              Home Page
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/all-tools" className="text-emerald-500 hover:underline font-semibold flex items-center gap-1">
              <Icon name="Compass" size={12} />
              All Tools Directory
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
