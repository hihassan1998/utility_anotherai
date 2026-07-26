import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PercentageCalculatorClient } from "@/components/tools/PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Online",
  description: "Free online percentage calculator. Solve standard percentage math, percentage increase and decrease, and find discounts easily.",
};

export default function PercentageCalculatorPage() {
  return (
    <ToolLayout toolId="percentage-calculator">
      <PercentageCalculatorClient />
    </ToolLayout>
  );
}
