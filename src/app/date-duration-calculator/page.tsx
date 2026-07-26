import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DateDurationCalculatorClient } from "@/components/tools/DateDurationCalculatorClient";

export const metadata: Metadata = {
  title: "Date Duration Calculator - Days Between Dates",
  description: "Calculate the exact duration or number of days, weeks, months, or years between two dates. Optional inclusive date toggle.",
};

export default function DateDurationCalculatorPage() {
  return (
    <ToolLayout toolId="date-duration-calculator">
      <DateDurationCalculatorClient />
    </ToolLayout>
  );
}
