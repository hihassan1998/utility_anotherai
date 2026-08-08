import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { InvoiceCreatorClient } from "@/components/tools/InvoiceCreatorClient";

export const metadata: Metadata = {
  title: "Free Invoice Generator - Create PDF Invoices Online",
  description: "Free online invoice generator. Create, preview, and download professional PDF invoices instantly. Fully supports General and Swedish markets (F-skatt, VAT/Moms, Bankgiro).",
  alternates: {
    canonical: "/free-invoice-generator",
  },
};

export default function InvoiceCreatorPage() {
  return (
    <ToolLayout toolId="free-invoice-generator">
      <div className="space-y-12">
        <InvoiceCreatorClient />
        
        {/* Rich SEO / AEO / GEO Educational Guide */}
        <article className="border-t border-border pt-12 mt-12 space-y-8 text-foreground/80 max-w-4xl mx-auto">
          <header className="space-y-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              Comprehensive Guide to Creating Professional Invoices Online
            </h2>
            <p className="text-sm text-muted-foreground">
              Learn how to design, format, and generate compliant invoices for local and international business clients.
            </p>
          </header>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">What is a Free Invoice Generator?</h3>
            <p className="text-sm leading-relaxed">
              A <strong>free invoice generator</strong> is an online tool that allows freelancers, consultants, small businesses, and contractors to build professional billing documents in seconds without expensive software. By automating calculations for tax rates, subtotals, and total amounts, it ensures accuracy and compliance with tax authorities globally.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">What Information Must be Included on a Compliant Invoice?</h3>
            <p className="text-sm leading-relaxed">
              To remain legally compliant with international business guidelines and financial regulations, every professional invoice should contain the following core fields:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Unique Invoice Number:</strong> A sequential, non-repeating identifier used to track invoices for bookkeeping.
              </li>
              <li>
                <strong>Issue Date & Due Date:</strong> Explicitly state when the invoice was generated and the final date by which payment is expected.
              </li>
              <li>
                <strong>Seller Details:</strong> Your full legal company name, address, tax registration number, and contact info.
              </li>
              <li>
                <strong>Buyer Details:</strong> The client's legal name, corporate billing address, and reference identifier.
              </li>
              <li>
                <strong>Itemized Line Items:</strong> Clear descriptions of the products or services provided, quantities, unit rates, and applicable tax rates.
              </li>
              <li>
                <strong>Tax Breakdown:</strong> Separate lines showing the subtotal excluding tax, the specific tax rate percentage (e.g. VAT/Moms), the exact tax amount, and the grand total due.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Swedish Market Compliance: F-skatt and Moms Requirements</h3>
            <p className="text-sm leading-relaxed">
              For businesses operating in Sweden, invoicing must strictly comply with Skatteverket guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>F-skattsedel Status:</strong> If you are registered for Swedish F-skatt, the invoice must clearly state <em>"Godkänd för F-skatt"</em>.
              </li>
              <li>
                <strong>Moms Rates:</strong> Swedish VAT (Moms) rates typically range from <strong>25%</strong> (standard services/goods), <strong>12%</strong> (food, restaurant services), to <strong>6%</strong> (books, cultural transport).
              </li>
              <li>
                <strong>Swedish Payments:</strong> Details like Bankgiro and Plusgiro numbers must be visible so local clients can pay via BankID and Bankgirotransfer easily.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Lighthouse, AEO, and GEO Optimization Standards</h3>
            <p className="text-sm leading-relaxed">
              This free tool is built to follow the highest standards of accessibility (WCAG 2.1 AA compliant) and search engine indexing. Because all calculations and image uploads occur 100% locally inside your browser, none of your sensitive financial or client data is ever transmitted to external servers. This makes it a secure, privacy-first option for modern professionals worldwide.
            </p>
          </section>
        </article>
      </div>
    </ToolLayout>
  );
}
