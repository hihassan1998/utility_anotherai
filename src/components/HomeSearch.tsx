"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/ui/input";

export function HomeSearch() {
  const [query, setQuery] = React.useState("");

  const filtered = query
    ? siteConfig.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase()) ||
          tool.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Icon
          name="Search"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          type="search"
          placeholder="Search for utility tools (e.g. BMI, Age...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 h-12 bg-card border-muted-foreground/15 rounded-full text-sm shadow-md focus-visible:ring-emerald-500 glass-card"
        />
      </div>

      {query && (
        <div className="absolute left-0 right-0 top-full mt-3 z-50 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl glass-card">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Matching Tools ({filtered.length})
              </p>
              {filtered.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent transition-colors"
                >
                  <div className="rounded bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                    <Icon name={tool.iconName} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{tool.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No tools found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
