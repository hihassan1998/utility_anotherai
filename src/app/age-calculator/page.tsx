import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { AgeCalculatorClient } from "@/components/tools/AgeCalculatorClient";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age",
  description: "Calculate your exact age in years, months, days, total days lived, and countdown to your next birthday with our free online Birthday Calculator.",
};

export default function AgeCalculatorPage() {
  return (
    <ToolLayout toolId="age-calculator">
      <AgeCalculatorClient />
    </ToolLayout>
  );
}
