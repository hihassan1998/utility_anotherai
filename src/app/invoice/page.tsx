import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { InvoiceCreatorClient } from "@/components/tools/InvoiceCreatorClient";

export const metadata: Metadata = {
  title: "Free Invoice Creator - Professional PDF Invoice Template Generator",
  description: "Create, preview, and download professional PDF invoices online. Fully supports General and Swedish business markets (Moms rates, F-skatt status, Bankgiro, customer reference).",
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
