import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CharacterCounterClient } from "@/components/tools/CharacterCounterClient";

export const metadata: Metadata = {
  title: "Character Counter - Live Social Media & SEO Text Length Checker",
  description: "Count characters with or without spaces, letters, numbers, and line breaks. Track character limits live for Twitter/X, Meta Titles, Meta Descriptions, and LinkedIn.",
  alternates: {
    canonical: "/character-counter",
  },
};

export default function CharacterCounterPage() {
  return (
    <ToolLayout toolId="character-counter">
      <CharacterCounterClient />
    </ToolLayout>
  );
}
