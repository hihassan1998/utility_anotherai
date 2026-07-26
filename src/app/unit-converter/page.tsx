import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { UnitConverterClient } from "@/components/tools/UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter - Convert Length, Weight, Temperature",
  description: "Free online unit converter tool. Easily convert measurements of length, weight, temperature, area, volume, speed, and time.",
};

export default function UnitConverterPage() {
  return (
    <ToolLayout toolId="unit-converter">
      <UnitConverterClient />
    </ToolLayout>
  );
}
