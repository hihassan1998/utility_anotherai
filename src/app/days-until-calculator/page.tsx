import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DaysUntilCalculatorClient } from "@/components/tools/DaysUntilCalculatorClient";

export const metadata: Metadata = {
  title: "Days Until Calculator - Live Event & Holiday Countdown",
  description: "Calculate how many days, hours, and minutes are left until any target date, holiday, or custom event with our free, privacy-first countdown calculator.",
  alternates: {
    canonical: "/days-until-calculator",
  },
};

export default function DaysUntilCalculatorPage() {
  return (
    <ToolLayout toolId="days-until-calculator">
      <DaysUntilCalculatorClient />
    </ToolLayout>
  );
}
