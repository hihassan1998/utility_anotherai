import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { InvoiceCreatorClient } from "@/components/tools/InvoiceCreatorClient";

export const metadata: Metadata = {
  title: "Free Invoice Generator - Create PDF Invoices Online",
  description: "Free online invoice generator. Create, preview, and download professional PDF invoices instantly. Fully supports General and Swedish markets (F-skatt, VAT/Moms, Bankgiro).",
  alternates: {
    canonical: "/invoice",
  },
};

export default function InvoiceCreatorPage() {
  return (
    <ToolLayout toolId="invoice">
      <InvoiceCreatorClient />
    </ToolLayout>
  );
}
