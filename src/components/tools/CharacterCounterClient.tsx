"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/Icon";

interface LimitItem {
  id: string;
  name: string;
  max: number;
  icon: string;
}

const SOCIAL_LIMITS: LimitItem[] = [
  { id: "twitter", name: "Twitter / X Post", max: 280, icon: "Twitter" },
  { id: "sms", name: "SMS Message", max: 160, icon: "MessageSquare" },
  { id: "seo-title", name: "Meta Title (SEO)", max: 60, icon: "Search" },
  { id: "seo-desc", name: "Meta Description", max: 160, icon: "FileText" },
  { id: "linkedin", name: "LinkedIn Post", max: 3000, icon: "Linkedin" },
];

export function CharacterCounterClient() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const stats = React.useMemo(() => {
    const totalChars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;

    // Detailed character categories safely handled
    let lettersCount = 0;
    try {
      const lettersMatch = text.match(/[\p{L}]/gu);
      lettersCount = lettersMatch ? lettersMatch.length : 0;
    } catch {
      const lettersMatch = text.match(/[a-zA-Z]/g);
      lettersCount = lettersMatch ? lettersMatch.length : 0;
    }

    const digitsMatch = text.match(/\d/g);
    const spacesMatch = text.match(/\s/g);
    const linesMatch = text.match(/\n/g);
    
    const digitsCount = digitsMatch ? digitsMatch.length : 0;
    const spacesCount = spacesMatch ? spacesMatch.length : 0;
    const linesCount = linesMatch ? linesMatch.length : 0;
    const specialsCount = Math.max(0, totalChars - lettersCount - digitsCount - spacesCount);

    return {
      totalChars,
      charsNoSpaces,
      letters: lettersCount,
      digits: digitsCount,
      whitespace: spacesCount,
      lines: linesCount,
      specials: specialsCount,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* Primary Hero Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
            {stats.totalChars.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Chars
          </span>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground block">
            {stats.charsNoSpaces.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            No Spaces
          </span>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground block">
            {stats.letters.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Letters
          </span>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground block">
            {stats.digits.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Numbers
          </span>
        </div>
      </div>

      {/* Main Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="character-counter-input" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="Hash" size={14} className="text-emerald-500" />
            Enter or Paste Text:
          </label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!text}
              className="h-8 text-xs font-semibold border-border hover:bg-accent"
              aria-label="Copy text to clipboard"
            >
              <Icon name={copied ? "Check" : "Copy"} size={14} className="mr-1.5" />
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={!text}
              className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Clear all text"
            >
              <Icon name="Trash2" size={14} className="mr-1.5" />
              Clear
            </Button>
          </div>
        </div>

        <Textarea
          id="character-counter-input"
          placeholder="Type or paste text here to see real-time character limit meters for Twitter/X, Meta Titles, Meta Descriptions, SMS, and LinkedIn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full bg-background border-border/80 focus-visible:ring-emerald-500 text-sm leading-relaxed rounded-xl shadow-inner p-4"
        />
      </div>

      {/* Breakdown Details */}
      <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="Sliders" size={14} className="text-emerald-500" />
          Character Composition Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40">
            <span className="text-muted-foreground block">Spaces:</span>
            <span className="font-semibold text-foreground">{stats.whitespace}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40">
            <span className="text-muted-foreground block">Line Breaks:</span>
            <span className="font-semibold text-foreground">{stats.lines}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40">
            <span className="text-muted-foreground block">Special Symbols:</span>
            <span className="font-semibold text-foreground">{stats.specials}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/20 border border-border/40">
            <span className="text-muted-foreground block">Digits:</span>
            <span className="font-semibold text-foreground">{stats.digits}</span>
          </div>
        </div>
      </div>

      {/* Social Media & Platform Limit Meters */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="Share2" size={14} className="text-emerald-500" />
          Social Media & Platform Limits
        </h3>

        <div className="space-y-4">
          {SOCIAL_LIMITS.map((platform) => {
            const current = stats.totalChars;
            const remaining = platform.max - current;
            const percentage = Math.min(100, Math.round((current / platform.max) * 100));
            const isExceeded = remaining < 0;

            return (
              <div key={platform.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    {platform.name}
                  </span>
                  <span className={`font-mono text-[11px] ${isExceeded ? "text-destructive font-bold" : "text-muted-foreground"}`}>
                    {current} / {platform.max} ({isExceeded ? `${Math.abs(remaining)} over` : `${remaining} left`})
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isExceeded
                        ? "bg-destructive"
                        : percentage > 90
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
