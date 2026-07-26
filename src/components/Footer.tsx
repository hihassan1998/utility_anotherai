import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-muted/30 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-base shadow-sm">
                T
              </span>
              <span className="font-bold text-lg brand-gradient">{siteConfig.name}</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
              High-performance, free utility tools optimized for speed, accessibility, and SEO. Calculate, convert, and track.
            </p>
          </div>

          {/* Links Quick Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-tools" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-foreground">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-xs">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground gap-4">
          <p>© {currentYear} <a href="https://anotheraiplatform.com" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">anotherAI</a>. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>A product of</span>
            <a href="https://anotheraiplatform.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
              anotherAI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
