"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/Icon";

export function WordCounterClient() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Analysis calculations
  const stats = React.useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: text.length,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        uniqueWords: 0,
        topKeywords: [] as { word: string; count: number; percentage: number }[],
        longestWord: "-",
      };
    }

    // Word extraction (split on whitespace sequences)
    const rawWords = trimmed.split(/\s+/).filter(Boolean);
    const wordsCount = rawWords.length;

    // Chars without spaces
    const charsNoSpaces = text.replace(/\s/g, "").length;

    // Sentences count (split on . ! ?)
    const sentencesMatches = trimmed.match(/[^.!?]+[.!?]+(\s|$)/g);
    const sentencesCount = sentencesMatches ? sentencesMatches.length : (trimmed.length > 0 ? 1 : 0);

    // Paragraphs count (split on double newlines or lines with content)
    const paragraphsCount = text.split(/\n+/).filter((line) => line.trim().length > 0).length;

    // Reading time: 200 WPM; Speaking time: 130 WPM
    const readingTimeMinutes = Math.ceil(wordsCount / 200);
    const speakingTimeMinutes = Math.ceil(wordsCount / 130);

    // Longest word & unique words / frequency
    let longest = "";
    const freqMap: Record<string, number> = {};

    rawWords.forEach((word) => {
      const cleanWord = word.replace(/^[^\w\u00C0-\u024F]+|[^\w\u00C0-\u024F]+$/g, "").toLowerCase();
      if (cleanWord.length > longest.length) {
        longest = cleanWord;
      }
      if (cleanWord) {
        freqMap[cleanWord] = (freqMap[cleanWord] || 0) + 1;
      }
    });

    const uniqueWordsCount = Object.keys(freqMap).length;
    const topKeywords = Object.entries(freqMap)
      .map(([word, count]) => ({
        word,
        count,
        percentage: Math.round((count / wordsCount) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      words: wordsCount,
      charsWithSpaces: text.length,
      charsNoSpaces,
      sentences: sentencesCount,
      paragraphs: paragraphsCount,
      readingTimeMinutes,
      speakingTimeMinutes,
      uniqueWords: uniqueWordsCount,
      topKeywords,
      longestWord: longest || "-",
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

  const handleCaseChange = (caseType: "upper" | "lower" | "title" | "sentence") => {
    if (!text) return;
    if (caseType === "upper") {
      setText(text.toUpperCase());
    } else if (caseType === "lower") {
      setText(text.toLowerCase());
    } else if (caseType === "title") {
      setText(
        text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
      );
    } else if (caseType === "sentence") {
      setText(
        text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, val1, val2) => val1 + val2.toUpperCase())
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
            {stats.words.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Words
          </span>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground block">
            {stats.charsWithSpaces.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Characters
          </span>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground block">
            {stats.sentences.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Sentences
          </span>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground block">
            {stats.paragraphs.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Paragraphs
          </span>
        </div>
      </div>

      {/* Main Textarea Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="word-counter-input" className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="Edit3" size={14} className="text-emerald-500" />
            Type or Paste Text Below:
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
          id="word-counter-input"
          placeholder="Paste or type your content here to inspect words, characters, sentences, reading time, and keyword density..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full bg-background border-border/80 focus-visible:ring-emerald-500 text-sm leading-relaxed rounded-xl shadow-inner p-4"
        />
      </div>

      {/* Quick Case Converter Helpers */}
      <div className="rounded-xl border border-border/50 bg-muted/10 p-4 space-y-3">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
          Quick Case Converters
        </span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCaseChange("upper")}
            disabled={!text}
            className="text-xs border-border/70"
          >
            UPPERCASE
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCaseChange("lower")}
            disabled={!text}
            className="text-xs border-border/70"
          >
            lowercase
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCaseChange("title")}
            disabled={!text}
            className="text-xs border-border/70"
          >
            Title Case
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCaseChange("sentence")}
            disabled={!text}
            className="text-xs border-border/70"
          >
            Sentence case
          </Button>
        </div>
      </div>

      {/* In-depth Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timing and Text Properties */}
        <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="Clock" size={14} className="text-emerald-500" />
            Estimates & Properties
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground">Reading Time:</span>
              <span className="font-semibold text-foreground">
                {stats.readingTimeMinutes === 0 ? "< 1 min" : `~ ${stats.readingTimeMinutes} min`}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground">Speaking Time:</span>
              <span className="font-semibold text-foreground">
                {stats.speakingTimeMinutes === 0 ? "< 1 min" : `~ ${stats.speakingTimeMinutes} min`}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground">Chars (no spaces):</span>
              <span className="font-semibold text-foreground">{stats.charsNoSpaces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground">Unique Words:</span>
              <span className="font-semibold text-foreground">{stats.uniqueWords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Longest Word:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[150px]">
                {stats.longestWord}
              </span>
            </div>
          </div>
        </div>

        {/* Top Keyword Density */}
        <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="BarChart2" size={14} className="text-emerald-500" />
            Top Keyword Density
          </h3>
          {stats.topKeywords.length > 0 ? (
            <div className="space-y-2">
              {stats.topKeywords.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{item.word}</span>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(item.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic py-4 text-center">
              Type or paste text to analyze keyword frequency.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
