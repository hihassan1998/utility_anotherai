"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Filter tools based on search query
  const filteredTools = searchQuery
    ? siteConfig.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/10 p-1.5 shadow-md shadow-emerald-500/5">
              <img
                src="/favicon.png"
                alt="AnoTool Brand Logo"
                className="h-full w-full object-contain dark:invert-0"
              />
            </div>
            <span className="hidden sm:inline-block font-bold text-xl tracking-tight brand-gradient">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground ${
                  pathname === item.href ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side: Search, Theme Toggle, Mobile Menu */}
        <div className="flex items-center gap-4 flex-1 md:flex-initial justify-end">
          {/* Search Bar Container */}
          <div className="relative w-full max-w-[240px] hidden sm:block">
            <div className="relative">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-9 bg-muted/40 border-muted-foreground/15 focus-visible:ring-emerald-500 rounded-full text-sm"
              />
            </div>

            {/* Search Results Dropdown */}
            {searchQuery && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg shadow-black/10 glass-card">
                {filteredTools.length > 0 ? (
                  <div className="space-y-1">
                    <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Found Tools ({filteredTools.length})
                    </p>
                    {filteredTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        onClick={() => setSearchQuery("")}
                        className="flex items-start gap-3 rounded-md p-2 hover:bg-accent transition-colors"
                      >
                        <div className="rounded bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                          <Icon name={tool.iconName} size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{tool.name}</p>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No tools found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-lg border border-border bg-muted/20"
              aria-label="Toggle theme"
            >
              <Icon
                name={theme === "dark" ? "Sun" : "Moon"}
                className="text-foreground transition-all duration-300"
                size={18}
              />
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden h-9 w-9 rounded-lg border border-border bg-muted/20"
            aria-label="Toggle Menu"
          >
            <Icon name={isOpen ? "X" : "Menu"} size={18} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              type="search"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-9 bg-muted/40 border-muted-foreground/15 focus-visible:ring-emerald-500 rounded-full text-sm"
            />

            {searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg glass-card">
                {filteredTools.length > 0 ? (
                  <div className="space-y-1">
                    {filteredTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        onClick={() => {
                          setSearchQuery("");
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
                      >
                        <div className="rounded bg-emerald-500/10 p-1 text-emerald-600">
                          <Icon name={tool.iconName} size={14} />
                        </div>
                        <span className="text-xs font-semibold">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-muted-foreground">
                    No tools found.
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="flex flex-col space-y-3">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium p-2 rounded-md transition-colors hover:bg-accent ${
                  pathname === item.href ? "text-foreground font-semibold bg-accent" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
