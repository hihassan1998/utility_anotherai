import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordCounterClient } from "@/components/tools/WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter - Free Online Text Statistics & Reading Time Calculator",
  description: "Count words, characters, sentences, paragraphs, and estimate reading time online in real time. Private, instant, and accessible client-side tool.",
  alternates: {
    canonical: "/word-counter",
  },
};

export default function WordCounterPage() {
  return (
    <ToolLayout toolId="word-counter">
      <WordCounterClient />
    </ToolLayout>
  );
}
