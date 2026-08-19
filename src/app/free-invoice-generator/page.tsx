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
            <h3 className="text-lg font-bold text-foreground">How to Create and Export Your Invoice</h3>
            <p className="text-sm leading-relaxed">
              Generating your invoice is quick and entirely browser-based:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                <strong>Fill in Details:</strong> Enter your billing details (sender) and your client's information (recipient).
              </li>
              <li>
                <strong>Add Line Items:</strong> Input the products or services rendered, quantities, unit prices, and select the appropriate VAT/Moms percentage. Totals are calculated dynamically.
              </li>
              <li>
                <strong>PDF Generation:</strong> Click the <em>"Print / Download PDF"</em> button. This opens your browser's native print preview panel. Set the print destination to <strong>"Save as PDF"</strong>. The print stylesheet automatically hides the edit forms, application menus, and sidebar, outputting a clean A4 PDF document.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Accuracy Verification & Legal Compliance Disclaimers</h3>
            <p className="text-sm leading-relaxed">
              To avoid payment delays and ensure bookkeeping accuracy, always review the generated PDF preview for typos, missing references, or mathematical discrepancies before sending it to clients.
            </p>
            <p className="text-sm leading-relaxed">
              <strong>Limitation of Liability:</strong> While this free invoice generator provides structures commonly required for corporate invoicing and Swedish tax registries (such as F-skattsedel registration and Moms percentages), tax requirements vary widely depending on your local jurisdiction, corporate structure, and client location. This tool is provided as-is and does not guarantee legal or tax compliance for every international market. We recommend verifying specific invoicing rules with a certified public accountant or legal professional.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Privacy-First Architecture & Accessibility</h3>
            <p className="text-sm leading-relaxed">
              Our tool is built to follow the highest standards of accessibility (WCAG 2.2 AA compliant) and speed. Because all calculations, line-item tabulations, and image uploads occur 100% locally inside your web browser, none of your sensitive financial, business, or client data is ever transmitted to external servers. This makes it a highly secure, private option for freelancers and businesses.
            </p>
          </section>
        </article>
      </div>
    </ToolLayout>
  );
}
