import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { BMICalculatorClient } from "@/components/tools/BMICalculatorClient";

export const metadata: Metadata = {
  title: "BMI Calculator - Calculate Body Mass Index",
  description: "Free Body Mass Index (BMI) calculator. Find your healthy weight range based on height. Supports both metric and imperial systems.",
};

export default function BMICalculatorPage() {
  return (
    <ToolLayout toolId="bmi-calculator">
      <BMICalculatorClient />
    </ToolLayout>
  );
}
