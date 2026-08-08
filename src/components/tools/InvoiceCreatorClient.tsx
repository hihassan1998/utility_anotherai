"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/Icon";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // 25, 12, 6, 0
}

const CURRENCIES = [
  { code: "SEK", name: "SEK - Swedish Krona" },
  { code: "USD", name: "USD - US Dollar" },
  { code: "EUR", name: "EUR - Euro" },
  { code: "GBP", name: "GBP - British Pound" },
  { code: "CAD", name: "CAD - Canadian Dollar" },
  { code: "AUD", name: "AUD - Australian Dollar" },
  { code: "JPY", name: "JPY - Japanese Yen" },
  { code: "CHF", name: "CHF - Swiss Franc" },
  { code: "DKK", name: "DKK - Danish Krone" },
  { code: "NOK", name: "NOK - Norwegian Krone" },
  { code: "PLN", name: "PLN - Polish Zloty" },
  { code: "INR", name: "INR - Indian Rupee" },
  { code: "CNY", name: "CNY - Chinese Yuan" },
  { code: "NZD", name: "NZD - New Zealand Dollar" },
  { code: "MXN", name: "MXN - Mexican Peso" },
  { code: "SGD", name: "SGD - Singapore Dollar" },
  { code: "HKD", name: "HKD - Hong Kong Dollar" },
  { code: "BRL", name: "BRL - Brazilian Real" },
  { code: "ZAR", name: "ZAR - South African Rand" },
  { code: "TRY", name: "TRY - Turkish Lira" },
  { code: "AED", name: "AED - UAE Dirham" },
  { code: "ILS", name: "ILS - Israeli Shekel" },
  { code: "KRW", name: "KRW - South Korean Won" },
  { code: "SAR", name: "SAR - Saudi Riyal" },
  { code: "QAR", name: "QAR - Qatari Riyal" },
  { code: "RUB", name: "RUB - Russian Ruble" },
  { code: "THB", name: "THB - Thai Baht" },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    invoice: "Invoice",
    invoiceNo: "Invoice No",
    issueDate: "Issue Date",
    deliveryDate: "Delivery Date",
    dueDate: "Due Date",
    description: "Description",
    qty: "Qty",
    unitPrice: "Unit Price",
    vatPercent: "VAT (%)",
    total: "Total",
    subtotal: "Subtotal (excl. VAT)",
    vatAmount: "VAT",
    totalVat: "Total VAT",
    totalDue: "Total Due",
    localPayments: "Local Payments",
    internationalPayments: "International Payments",
    invoicingTerms: "Invoicing Terms",
    overdueInterest: "Overdue Interest",
    bankgiro: "BG / Routing",
    plusgiro: "PG / Account",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "Currency",
    regNo: "Reg/Tax No",
    vatNo: "VAT/Moms No",
    invoiceTo: "Bill To",
    ourReference: "Our Reference"
  },
  sv: {
    invoice: "Faktura",
    invoiceNo: "Fakturanr",
    issueDate: "Fakturadatum",
    deliveryDate: "Leveransdatum",
    dueDate: "Förfallodatum",
    description: "Beskrivning",
    qty: "Antal",
    unitPrice: "A-pris",
    vatPercent: "Moms (%)",
    total: "Belopp",
    subtotal: "Delsumma (exkl. moms)",
    vatAmount: "Moms",
    totalVat: "Total moms",
    totalDue: "Att betala",
    localPayments: "Betalningsuppgifter",
    internationalPayments: "Utlandsbetalningar",
    invoicingTerms: "Betalningsvillkor",
    overdueInterest: "Dröjsmålsränta",
    bankgiro: "Bankgiro",
    plusgiro: "Plusgiro",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "Valuta",
    regNo: "Org.nr",
    vatNo: "Momsnr",
    invoiceTo: "Faktureras till",
    ourReference: "Vår referens"
  },
  de: {
    invoice: "Rechnung",
    invoiceNo: "Rechnungsnr",
    issueDate: "Rechnungsdatum",
    deliveryDate: "Lieferdatum",
    dueDate: "Fälligkeitsdatum",
    description: "Beschreibung",
    qty: "Menge",
    unitPrice: "Einzelpreis",
    vatPercent: "MwSt (%)",
    total: "Gesamt",
    subtotal: "Zwischensumme (exkl. MwSt)",
    vatAmount: "MwSt",
    totalVat: "MwSt. Gesamt",
    totalDue: "Gesamtbetrag",
    localPayments: "Inlandszahlungen",
    internationalPayments: "Auslandsüberweisung",
    invoicingTerms: "Zahlungsbedingungen",
    overdueInterest: "Verzugszinsen",
    bankgiro: "BLZ / Bankverbindung",
    plusgiro: "Konto-Nr.",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "Währung",
    regNo: "Steuernummer / Reg-Nr",
    vatNo: "USt-IdNr.",
    invoiceTo: "Rechnungsempfänger",
    ourReference: "Referenz"
  },
  fr: {
    invoice: "Facture",
    invoiceNo: "Facture N°",
    issueDate: "Date de facturation",
    deliveryDate: "Date de livraison",
    dueDate: "Date d'échéance",
    description: "Description",
    qty: "Qté",
    unitPrice: "Prix unitaire",
    vatPercent: "TVA (%)",
    total: "Total",
    subtotal: "Sous-total (HT)",
    vatAmount: "TVA",
    totalVat: "TVA totale",
    totalDue: "Net à payer",
    localPayments: "Paiements locaux",
    internationalPayments: "Paiements internationaux",
    invoicingTerms: "Conditions de paiement",
    overdueInterest: "Intérêts de retard",
    bankgiro: "Code de tri / Agence",
    plusgiro: "N° de compte",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "Devise",
    regNo: "N° Siren/Siret",
    vatNo: "N° TVA Intracommunautaire",
    invoiceTo: "Facturé à",
    ourReference: "Notre référence"
  },
  es: {
    invoice: "Factura",
    invoiceNo: "Factura N°",
    issueDate: "Fecha de emisión",
    deliveryDate: "Fecha de entrega",
    dueDate: "Fecha de vencimiento",
    description: "Descripción",
    qty: "Cant.",
    unitPrice: "Precio unitario",
    vatPercent: "IVA (%)",
    total: "Total",
    subtotal: "Subtotal (excl. IVA)",
    vatAmount: "IVA",
    totalVat: "Total IVA",
    totalDue: "Total a pagar",
    localPayments: "Pagos locales",
    internationalPayments: "Pagos internacionales",
    invoicingTerms: "Condiciones de pago",
    overdueInterest: "Interés de demora",
    bankgiro: "Cód. Sucursal / Banco",
    plusgiro: "Nº de cuenta",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "Moneda",
    regNo: "NIF / CIF / Registro",
    vatNo: "Nº IVA",
    invoiceTo: "Facturar a",
    ourReference: "Referencia"
  },
  zh: {
    invoice: "发票",
    invoiceNo: "发票编号",
    issueDate: "开票日期",
    deliveryDate: "交付日期",
    dueDate: "截止日期",
    description: "描述",
    qty: "数量",
    unitPrice: "单价",
    vatPercent: "增值税 (%)",
    total: "总计",
    subtotal: "小计 (不含税)",
    vatAmount: "增值税",
    totalVat: "税额总计",
    totalDue: "应付总额",
    localPayments: "本地付款",
    internationalPayments: "国际汇款",
    invoicingTerms: "付款条件",
    overdueInterest: "逾期利息",
    bankgiro: "银行代码 / 联行号",
    plusgiro: "银行账号",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "货币",
    regNo: "注册号 / 税号",
    vatNo: "增值税号",
    invoiceTo: "客户 (买方)",
    ourReference: "参考号"
  },
  hi: {
    invoice: "बीजक (इन्वॉयस)",
    invoiceNo: "बीजक संख्या",
    issueDate: "जारी करने की तिथि",
    deliveryDate: "वितरण की तिथि",
    dueDate: "देय तिथि",
    description: "विवरण",
    qty: "मात्रा",
    unitPrice: "इकाई मूल्य",
    vatPercent: "जीएसटी / वैट (%)",
    total: "कुल",
    subtotal: "उप-योग (कर रहित)",
    vatAmount: "जीएसटी / वैट",
    totalVat: "कुल कर",
    totalDue: "कुल देय राशि",
    localPayments: "स्थानीय भुगतान",
    internationalPayments: "अंतर्राष्ट्रीय भुगतान",
    invoicingTerms: "भुगतान की शर्तें",
    overdueInterest: "विलंब शुल्क ब्याज",
    bankgiro: "आईएफएससी कोड",
    plusgiro: "खाता संख्या",
    iban: "आईबीएएन (IBAN)",
    bicSwift: "स्विफ्ट कोड (BIC)",
    currency: "मुद्रा",
    regNo: "पंजीकरण संख्या",
    vatNo: "जीएसटी संख्या",
    invoiceTo: "सेवा में (खरीदार)",
    ourReference: "हमारा संदर्भ"
  },
  pt: {
    invoice: "Fatura",
    invoiceNo: "Fatura Nº",
    issueDate: "Data de Emissão",
    deliveryDate: "Data de Entrega",
    dueDate: "Data de Vencimento",
    description: "Descrição",
    qty: "Qtd",
    unitPrice: "Preço Unitário",
    vatPercent: "IVA (%)",
    total: "Total",
    subtotal: "Subtotal (excl. IVA)",
    vatAmount: "IVA",
    totalVat: "Total IVA",
    totalDue: "Total a Pagar",
    localPayments: "Pagamentos Locais",
    internationalPayments: "Transferência Internacional",
    invoicingTerms: "Condições de Pagamento",
    overdueInterest: "Juros de Mora",
    bankgiro: "Agência / Código",
    plusgiro: "Nº da Conta",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "Moeda",
    regNo: "CNPJ / NIF",
    vatNo: "Inscrição Estadual",
    invoiceTo: "Faturar a",
    ourReference: "Nossa Referência"
  },
  ar: {
    invoice: "فاتورة",
    invoiceNo: "رقم الفاتورة",
    issueDate: "تاريخ الإصدار",
    deliveryDate: "تاريخ التوصيل",
    dueDate: "تاريخ الاستحقاق",
    description: "الوصف",
    qty: "الكمية",
    unitPrice: "سعر الوحدة",
    vatPercent: "الضريبة (%)",
    total: "الإجمالي",
    subtotal: "المجموع الفرعي",
    vatAmount: "الضريبة",
    totalVat: "مجموع الضريبة",
    totalDue: "المبلغ المستحق",
    localPayments: "المدفوعات المحلية",
    internationalPayments: "التحويلات الدولية",
    invoicingTerms: "شروط الدفع",
    overdueInterest: "فائدة التأخير",
    bankgiro: "رمز الفرع / المصرف",
    plusgiro: "رقم الحساب",
    iban: "IBAN",
    bicSwift: "BIC / SWIFT",
    currency: "العملة",
    regNo: "رقم السجل التجاري",
    vatNo: "الرقم الضريبي",
    invoiceTo: "فاتورة إلى",
    ourReference: "مرجعنا"
  }
};


export function InvoiceCreatorClient() {
  // State for tabs on mobile
  const [activeTab, setActiveTab] = React.useState("edit");
  const [layoutMode, setLayoutMode] = React.useState<"split" | "tabs">("split");
  const [docLang, setDocLang] = React.useState<"en" | "sv" | "de" | "fr" | "es" | "zh" | "hi" | "pt" | "ar">("en");

  // Logo Upload
  const [logo, setLogo] = React.useState<string | null>(null);

  // Seller Details
  const [sellerName, setSellerName] = React.useState("My Business AB");
  const [sellerAddress, setSellerAddress] = React.useState("Storgatan 12\n123 45 Stockholm\nSweden");
  const [sellerVat, setSellerVat] = React.useState("SE123456789001");
  const [sellerRegNo, setSellerRegNo] = React.useState("556123-4567");
  const [hasFskatt, setHasFskatt] = React.useState(true);
  const [fskattText, setFskattText] = React.useState("Godkänd för F-skatt");

  // Buyer Details
  const [buyerName, setBuyerName] = React.useState("Acme Client AB");
  const [buyerAddress, setBuyerAddress] = React.useState("Avenyn 5\n411 36 Göteborg\nSweden");
  const [buyerRef, setBuyerRef] = React.useState("REF-98765");

  // Invoice Details
  const [invoiceNumber, setInvoiceNumber] = React.useState("INV-2026-001");
  const [issueDate, setIssueDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [deliveryDate, setDeliveryDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = React.useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30); // 30 days default
    return d.toISOString().split("T")[0];
  });
  const [currency, setCurrency] = React.useState("SEK");

  // Line Items
  const [lineItems, setLineItems] = React.useState<LineItem[]>([
    { id: "1", description: "Consulting Services - Software Architecture", quantity: 40, unitPrice: 950, vatRate: 25 },
    { id: "2", description: "Developer Training Materials & License", quantity: 1, unitPrice: 2400, vatRate: 12 },
  ]);

  // Payment Details
  const [bankgiro, setBankgiro] = React.useState("123-4567");
  const [plusgiro, setPlusgiro] = React.useState("987654-3");
  const [iban, setIban] = React.useState("SE12 5000 0000 0123 4567 8901");
  const [bic, setBic] = React.useState("ANDEESSX");
  const [lateInterest, setLateInterest] = React.useState("8");
  const [footerNote, setFooterNote] = React.useState("Thank you for your business! / Tack för förtroendet!");
  const [qrType, setQrType] = React.useState<"none" | "swish" | "paypal" | "url">("none");
  const [qrValue, setQrValue] = React.useState("");

  // Handle Logo Upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    setLogo(null);
  };

  // Add Item
  const handleAddItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "New service or product",
      quantity: 1,
      unitPrice: 0,
      vatRate: 25,
    };
    setLineItems([...lineItems, newItem]);
  };

  // Update Item
  const handleUpdateItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          let updatedValue = value;
          if (field === "quantity" || field === "unitPrice" || field === "vatRate") {
            updatedValue = Number(value);
          }
          return { ...item, [field]: updatedValue };
        }
        return item;
      })
    );
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  // Dynamic Math Calculations
  const calculatedTotals = React.useMemo(() => {
    let subtotal = 0;
    const vatAmounts: Record<number, number> = { 25: 0, 12: 0, 6: 0, 0: 0 };

    lineItems.forEach((item) => {
      const itemCost = item.quantity * item.unitPrice;
      subtotal += itemCost;
      const itemVat = itemCost * (item.vatRate / 100);
      if (item.vatRate in vatAmounts) {
        vatAmounts[item.vatRate] += itemVat;
      } else {
        vatAmounts[item.vatRate] = itemVat;
      }
    });

    const totalVat = Object.values(vatAmounts).reduce((acc, val) => acc + val, 0);
    const grandTotal = subtotal + totalVat;

    return {
      subtotal,
      vatAmounts,
      totalVat,
      grandTotal,
    };
  }, [lineItems]);

  const qrCodeUrl = React.useMemo(() => {
    if (qrType === "none" || !qrValue) return null;

    let data = "";
    if (qrType === "swish") {
      // Swish JSON payment payload format
      data = JSON.stringify({
        version: 1,
        payee: qrValue.replace(/\s+/g, ""),
        amount: calculatedTotals.grandTotal,
        message: invoiceNumber,
      });
    } else if (qrType === "paypal") {
      data = `https://www.paypal.me/${qrValue}/${calculatedTotals.grandTotal}`;
    } else {
      data = qrValue;
    }

    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
  }, [qrType, qrValue, calculatedTotals.grandTotal, invoiceNumber]);

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-printable-container");
    if (!printContent) return;

    // Create a temporary hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return;

    // Write pristine HTML content with targeted invoice styling
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${invoiceNumber}</title>
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 11px;
              line-height: 1.5;
              color: #1e293b;
              margin: 0;
              padding: 0;
              background: #fff;
            }
            
            /* Text & Colors */
            .text-slate-800 { color: #1e293b; }
            .text-slate-900 { color: #0f172a; }
            .text-slate-700 { color: #334155; }
            .text-slate-600 { color: #475569; }
            .text-slate-500 { color: #64748b; }
            .text-slate-400 { color: #94a3b8; }
            .text-emerald-600 { color: #059669; }
            .text-emerald-700 { color: #047857; }
            .bg-slate-50 { background-color: #f8fafc; }
            .bg-emerald-50 { background-color: #ecfdf5; }
            .border-slate-50 { border-color: #f8fafc; }
            .border-slate-100 { border-color: #f1f5f9; }
            .border-slate-200 { border-color: #e2e8f0; }
            .border-b { border-bottom-width: 1px; border-bottom-style: solid; }
            .border-b-2 { border-bottom-width: 2px; border-bottom-style: solid; }
            .border-t { border-top-width: 1px; border-top-style: solid; }
            .border { border-width: 1px; border-style: solid; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded { border-radius: 0.25rem; }
            
            /* Layout Structure */
            .space-y-8 > * + * { margin-top: 1.8rem; }
            .space-y-4 > * + * { margin-top: 0.8rem; }
            .space-y-2 > * + * { margin-top: 0.4rem; }
            .space-y-1 > * + * { margin-top: 0.2rem; }
            .mt-8 { margin-top: 1.8rem; }
            .mt-3 { margin-top: 0.6rem; }
            .mt-1 { margin-top: 0.2rem; }
            .mb-3 { margin-bottom: 0.6rem; }
            .mb-1 { margin-bottom: 0.2rem; }
            .pb-6 { padding-bottom: 1.2rem; }
            .pb-2 { padding-bottom: 0.4rem; }
            .pt-6 { padding-top: 1.2rem; }
            .pt-4 { padding-top: 0.8rem; }
            .pt-3 { padding-top: 0.6rem; }
            .pt-1 { padding-top: 0.2rem; }
            .p-4 { padding: 1rem; }
            .px-1.5 { padding-left: 0.375rem; padding-right: 0.375rem; }
            .py-0.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
            
            /* Print Display Types */
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .justify-end { justify-content: flex-end; }
            .items-start { align-items: flex-start; }
            .items-center { align-items: center; }
            .flex-col { flex-direction: column; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .gap-4 { gap: 1rem; }
            
            /* Typography Sizing */
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-extrabold { font-weight: 800; }
            .font-medium { font-weight: 500; }
            .font-normal { font-weight: 400; }
            .text-base { font-size: 11px; }
            .text-sm { font-size: 11px; }
            .text-xs { font-size: 10px; }
            .text-lg { font-size: 13px; }
            .text-2xl { font-size: 16px; }
            .text-\\[9px\\] { font-size: 9px; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[11px\\] { font-size: 11px; }
            .uppercase { text-transform: uppercase; }
            .tracking-tight { letter-spacing: -0.025em; }
            .tracking-wider { letter-spacing: 0.05em; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .whitespace-pre-line { white-space: pre-line; }
            .inline-block { display: inline-block; }
            
            /* Table formatting */
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
            th { border-bottom: 2px solid #cbd5e1; color: #64748b; font-size: 9px; text-transform: uppercase; font-weight: 700; padding: 8px 0; }
            td { border-bottom: 1px solid #f1f5f9; padding: 8px 0; }
            img { max-height: 48px; max-width: 180px; object-fit: contain; }
            .w-full { width: 100%; }
            .w-16 { width: 4rem; }
            .w-24 { width: 6rem; }
            .w-64 { width: 16rem; }
            
            /* Print adjustments */
            #invoice-printable-container {
              width: 100%;
              min-height: 255mm;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          <div id="invoice-printable-container" class="space-y-8">
            ${printContent.innerHTML}
          </div>
          <script>
            window.addEventListener('load', () => {
              setTimeout(() => {
                window.print();
              }, 300);
            });
          </script>
        </body>
      </html>
    `);
    doc.close();

    // Clean up temporary iframe after dialog completes
    const handleAfterPrint = () => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
    
    iframe.contentWindow?.addEventListener("afterprint", handleAfterPrint);
    
    // Safety fallback cleanup
    setTimeout(handleAfterPrint, 60000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the invoice details to defaults?")) {
      setLogo(null);
      setSellerName("My Business AB");
      setSellerAddress("Storgatan 12\n123 45 Stockholm\nSweden");
      setSellerVat("SE123456789001");
      setSellerRegNo("556123-4567");
      setHasFskatt(true);
      setFskattText("Godkänd för F-skatt");
      setBuyerName("Acme Client AB");
      setBuyerAddress("Avenyn 5\n411 36 Göteborg\nSweden");
      setBuyerRef("REF-98765");
      setInvoiceNumber("INV-2026-001");
      setIssueDate(new Date().toISOString().split("T")[0]);
      setDeliveryDate(new Date().toISOString().split("T")[0]);
      const d = new Date();
      d.setDate(d.getDate() + 30);
      setDueDate(d.toISOString().split("T")[0]);
      setCurrency("SEK");
      setLineItems([
        { id: "1", description: "Consulting Services - Software Architecture", quantity: 40, unitPrice: 950, vatRate: 25 },
        { id: "2", description: "Developer Training Materials & License", quantity: 1, unitPrice: 2400, vatRate: 12 },
      ]);
      setBankgiro("123-4567");
      setPlusgiro("987654-3");
      setIban("SE12 5000 0000 0123 4567 8901");
      setBic("ANDEESSX");
      setLateInterest("8");
      setFooterNote("Thank you for your business! / Tack för förtroendet!");
      setLayoutMode("split");
      setQrType("none");
      setQrValue("");
      setDocLang("en");
    }
  };

  const handleLangChange = (lang: "en" | "sv" | "de" | "fr" | "es" | "zh" | "hi" | "pt" | "ar") => {
    setDocLang(lang);
    
    // Auto-update placeholders if still default
    const defaults = [
      "Thank you for your business! / Tack för förtroendet!",
      "Thank you for your business!",
      "Tack för ditt förtroende!",
      "Vielen Dank für Ihren Auftrag!",
      "Merci pour votre confiance!",
      "¡Gracias por su compra!",
      "感谢您的光临与支持！",
      "आपके व्यवसाय के लिए धन्यवाद!",
      "Obrigado pela preferência!",
      "شكراً لتعاملكم معنا!"
    ];
    if (defaults.includes(footerNote)) {
      if (lang === "sv") {
        setFooterNote("Tack för ditt förtroende!");
        setFskattText("Godkänd för F-skatt");
      } else if (lang === "de") {
        setFooterNote("Vielen Dank für Ihren Auftrag!");
        setFskattText("Zugelassen für F-Steuer");
      } else if (lang === "fr") {
        setFooterNote("Merci pour votre confiance!");
        setFskattText("Enregistré pour F-tax");
      } else if (lang === "es") {
        setFooterNote("¡Gracias por su compra!");
        setFskattText("Registrado para F-tax");
      } else if (lang === "zh") {
        setFooterNote("感谢您的光临与支持！");
        setFskattText("已批准F-tax");
      } else if (lang === "hi") {
        setFooterNote("आपके व्यवसाय के लिए धन्यवाद!");
        setFskattText("एफ-टैक्स अनुमोदित");
      } else if (lang === "pt") {
        setFooterNote("Obrigado pela preferência!");
        setFskattText("Aprovado para F-tax");
      } else if (lang === "ar") {
        setFooterNote("شكراً لتعاملكم معنا!");
        setFskattText("معتمد للضريبة");
      } else {
        setFooterNote("Thank you for your business!");
        setFskattText("Approved for F-tax");
      }
    }
  };

  const paymentColumnsCount = [
    Boolean(bankgiro || plusgiro),
    Boolean(iban || bic),
    Boolean(lateInterest || (hasFskatt && fskattText))
  ].filter(Boolean).length;

  const t = TRANSLATIONS[docLang];

  return (
    <div className="space-y-6">

      {/* Control Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/20 border border-border/40 rounded-xl p-4 no-print">
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-9 rounded-lg"
          >
            <Icon name="Printer" size={14} className="mr-1.5" />
            Print / Save as PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-border text-xs h-9 rounded-lg"
          >
            <Icon name="RotateCcw" size={14} className="mr-1.5" />
            Reset Form
          </Button>
        </div>

          {/* Desktop Layout Switcher */}
          <div className="hidden lg:flex items-center gap-2 border-l border-border pl-3">
            <span className="text-xs text-muted-foreground font-semibold">Workspace View:</span>
            <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground border border-border">
              <Button
                variant={layoutMode === "split" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayoutMode("split")}
                className="text-xs h-7 px-3 rounded-md"
              >
                <Icon name="Columns" size={13} className="mr-1" />
                Side-by-Side
              </Button>
              <Button
                variant={layoutMode === "tabs" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => {
                  setLayoutMode("tabs");
                  setActiveTab("edit");
                }}
                className="text-xs h-7 px-3 rounded-md"
              >
                <Icon name="Layers" size={13} className="mr-1" />
                Single Column Switcher
              </Button>
            </div>
          </div>
        </div>

        {/* Switcher Toggles: visible on mobile, and on desktop if layoutMode is tabs */}
        <div className={layoutMode === "tabs" ? "block" : "lg:hidden"}>
          <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground border border-border">
            <Button
              variant={activeTab === "edit" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("edit")}
              className="text-xs h-7 px-3 rounded-md"
            >
              Edit Details
            </Button>
            <Button
              variant={activeTab === "preview" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("preview")}
              className="text-xs h-7 px-3 rounded-md"
            >
              Live Preview
            </Button>
          </div>
        </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Invoice Editor Forms */}
        <div
          className={`${
            layoutMode === "tabs" ? "lg:col-span-12" : "lg:col-span-6"
          } space-y-6 no-print ${
            activeTab === "edit" ? "block" : (layoutMode === "tabs" ? "hidden" : "hidden lg:block")
          }`}
        >
          
          {/* Logo & Seller Info */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="Home" size={14} className="text-emerald-500" />
              Seller Details (Your Business)
            </h3>

            {/* Logo Upload Input */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Company Logo</Label>
              <div className="flex items-center gap-3">
                {logo ? (
                  <div className="relative border border-border/80 rounded-lg p-2 h-16 w-28 bg-muted/10 flex items-center justify-center">
                    <img src={logo} alt="Company Logo Preview" className="h-full object-contain" />
                    <button
                      onClick={handleClearLogo}
                      className="absolute -top-1.5 -right-1.5 bg-destructive text-white rounded-full p-0.5 shadow-md hover:bg-destructive/90"
                      title="Remove logo"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="seller-name" className="text-xs font-semibold">Company/Your Name</Label>
                <Input
                  id="seller-name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="seller-reg" className="text-xs font-semibold">Org Number (Swedish format optional)</Label>
                <Input
                  id="seller-reg"
                  value={sellerRegNo}
                  onChange={(e) => setSellerRegNo(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="seller-address" className="text-xs font-semibold">Seller Address</Label>
              <Textarea
                id="seller-address"
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
                rows={3}
                className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-1.5">
                <Label htmlFor="seller-vat" className="text-xs font-semibold">VAT / Moms Number</Label>
                <Input
                  id="seller-vat"
                  value={sellerVat}
                  onChange={(e) => setSellerVat(e.target.value)}
                  placeholder="e.g. SE556123456701"
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="seller-fskatt"
                  checked={hasFskatt}
                  onChange={(e) => setHasFskatt(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="seller-fskatt" className="text-xs font-semibold cursor-pointer select-none">
                  F-skattsedel Status Statement
                </Label>
              </div>
            </div>

            {hasFskatt && (
              <div className="space-y-1.5">
                <Label htmlFor="fskatt-text" className="text-xs font-semibold">F-skatt Note Text</Label>
                <Input
                  id="fskatt-text"
                  value={fskattText}
                  onChange={(e) => setFskattText(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Client Details */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="Users" size={14} className="text-emerald-500" />
              Client Details (Buyer)
            </h3>
            <div className="space-y-1.5">
              <Label htmlFor="buyer-name" className="text-xs font-semibold">Client Name/Company</Label>
              <Input
                id="buyer-name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="buyer-address" className="text-xs font-semibold">Client Address</Label>
              <Textarea
                id="buyer-address"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                rows={3}
                className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="buyer-ref" className="text-xs font-semibold">Customer Reference / PO Number</Label>
              <Input
                id="buyer-ref"
                value={buyerRef}
                onChange={(e) => setBuyerRef(e.target.value)}
                placeholder="e.g. referensnummer / PO"
                className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="Calendar" size={14} className="text-emerald-500" />
              Invoice Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="invoice-no" className="text-xs font-semibold">Invoice Number</Label>
                <Input
                  id="invoice-no"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invoice-currency" className="text-xs font-semibold">Currency</Label>
                <select
                  id="invoice-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-muted-foreground/15 bg-muted/20 px-3 py-1.5 text-xs focus-visible:ring-emerald-500"
                >
                  {CURRENCIES.map((cur) => (
                    <option key={cur.code} value={cur.code}>
                      {cur.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="invoice-lang" className="text-xs font-semibold text-emerald-600">Document Language / Invoice Translation</Label>
              <select
                id="invoice-lang"
                value={docLang}
                onChange={(e) => handleLangChange(e.target.value as any)}
                className="flex h-9 w-full rounded-lg border border-muted-foreground/15 bg-muted/20 px-3 py-1.5 text-xs focus-visible:ring-emerald-500"
              >
                <option value="en">English (Default)</option>
                <option value="sv">Svenska (Swedish)</option>
                <option value="de">Deutsch (German)</option>
                <option value="fr">Français (French)</option>
                <option value="es">Español (Spanish)</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="pt">Português (Portuguese)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="invoice-issue" className="text-xs font-semibold">Issue Date</Label>
                <Input
                  id="invoice-issue"
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invoice-delivery" className="text-xs font-semibold">Delivery Date</Label>
                <Input
                  id="invoice-delivery"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invoice-due" className="text-xs font-semibold">Due Date</Label>
                <Input
                  id="invoice-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="List" size={14} className="text-emerald-500" />
                Line Items
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddItem}
                className="h-8 text-xs border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
              >
                <Icon name="Plus" size={12} className="mr-1" /> Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {lineItems.map((item, index) => (
                <div key={item.id} className="p-3 border border-border/50 rounded-lg space-y-3 bg-muted/10 relative">
                  <div className="absolute top-2.5 right-2.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="Delete item"
                    >
                      <Icon name="Trash2" size={13} />
                    </Button>
                  </div>
                  <div className="pr-8 text-xs font-bold text-muted-foreground">Item #{index + 1}</div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                      className="text-xs bg-background border-muted-foreground/15 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Quantity</Label>
                      <Input
                        type="number"
                        min="0"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, "quantity", e.target.value)}
                        className="text-xs bg-background border-muted-foreground/15 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Unit Price</Label>
                      <Input
                        type="number"
                        min="0"
                        step="any"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(item.id, "unitPrice", e.target.value)}
                        className="text-xs bg-background border-muted-foreground/15 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">VAT / Moms (%)</Label>
                      <select
                        value={[25, 12, 6, 0].includes(item.vatRate) ? item.vatRate : "custom"}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            handleUpdateItem(item.id, "vatRate", 15); // default custom VAT is 15%
                          } else {
                            handleUpdateItem(item.id, "vatRate", Number(val));
                          }
                        }}
                        className="flex h-9 w-full rounded-lg border border-muted-foreground/15 bg-background px-3 py-1 text-xs"
                      >
                        <option value={25}>25% (Standard)</option>
                        <option value={12}>12% (Food/Services)</option>
                        <option value={6}>6% (Books/Travel)</option>
                        <option value={0}>0% (Exempt)</option>
                        <option value="custom">Custom...</option>
                      </select>
                    </div>
                  </div>

                  {![25, 12, 6, 0].includes(item.vatRate) && (
                    <div className="space-y-1.5 pt-1.5 border-t border-border/40 mt-1">
                      <Label className="text-xs font-semibold text-emerald-600">Specify Custom VAT (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="any"
                        value={item.vatRate}
                        onChange={(e) => handleUpdateItem(item.id, "vatRate", e.target.value)}
                        className="text-xs bg-background border-muted-foreground/15 rounded-lg w-full max-w-[120px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Terms & Bank details */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="CreditCard" size={14} className="text-emerald-500" />
              Banking & Payment Terms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="bank-bg" className="text-xs font-semibold">Bankgiro / Routing No</Label>
                <Input
                  id="bank-bg"
                  value={bankgiro}
                  onChange={(e) => setBankgiro(e.target.value)}
                  placeholder="e.g. 123-4567 or Routing Code"
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bank-pg" className="text-xs font-semibold">Plusgiro / Account No</Label>
                <Input
                  id="bank-pg"
                  value={plusgiro}
                  onChange={(e) => setPlusgiro(e.target.value)}
                  placeholder="e.g. 987654-3 or Account Code"
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="bank-iban" className="text-xs font-semibold">IBAN</Label>
                <Input
                  id="bank-iban"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bank-bic" className="text-xs font-semibold">BIC / SWIFT</Label>
                <Input
                  id="bank-bic"
                  value={bic}
                  onChange={(e) => setBic(e.target.value)}
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="payment-interest" className="text-xs font-semibold">Late Payment Interest Rate (%)</Label>
              <Input
                id="payment-interest"
                value={lateInterest}
                onChange={(e) => setLateInterest(e.target.value)}
                placeholder="e.g. 8"
                className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>
            {/* Scan-to-Pay QR Code Configurations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="qr-type" className="text-xs font-semibold text-emerald-600">Scan-to-Pay QR Code (Optional)</Label>
                <select
                  id="qr-type"
                  value={qrType}
                  onChange={(e) => setQrType(e.target.value as any)}
                  className="flex h-9 w-full rounded-lg border border-muted-foreground/15 bg-muted/20 px-3 py-1.5 text-xs focus-visible:ring-emerald-500"
                >
                  <option value="none">No QR Code</option>
                  <option value="swish">Swish QR (Sweden)</option>
                  <option value="paypal">PayPal QR</option>
                  <option value="url">Custom Payment Link QR</option>
                </select>
              </div>

              {qrType !== "none" && (
                <div className="space-y-1.5">
                  <Label htmlFor="qr-value" className="text-xs font-semibold text-emerald-600">
                    {qrType === "swish"
                      ? "Swish Number (phone/company)"
                      : qrType === "paypal"
                      ? "PayPal Username"
                      : "Payment Link / URL"}
                  </Label>
                  <Input
                    id="qr-value"
                    value={qrValue}
                    onChange={(e) => setQrValue(e.target.value)}
                    placeholder={
                      qrType === "swish"
                        ? "e.g. 1234567890"
                        : qrType === "paypal"
                        ? "e.g. myusername"
                        : "https://example.com/pay"
                    }
                    className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="invoice-footer-note" className="text-xs font-semibold">Invoice Footer Text (Thank You note)</Label>
              <Input
                id="invoice-footer-note"
                value={footerNote}
                onChange={(e) => setFooterNote(e.target.value)}
                placeholder="e.g. Thank you for your business!"
                className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>
          </div>

        </div>

        {/* Right Side: Professional Invoice Preview (Printable area) */}
        <div
          className={`${
            layoutMode === "tabs" ? "lg:col-span-12" : "lg:col-span-6"
          } ${
            activeTab === "preview" ? "block" : (layoutMode === "tabs" ? "hidden" : "hidden lg:block")
          }`}
        >
          <div className="sticky top-20">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5 no-print">
              <Icon name="Eye" size={14} className="text-emerald-500" />
              Live Invoice Layout Preview (A4 Formatted)
            </h3>

            {/* Simulated Paper A4 Document */}
            <div
              id="invoice-printable-container"
              className="bg-white text-slate-800 border border-slate-200 shadow-xl rounded-xl p-8 sm:p-12 font-sans w-full min-h-[842px] text-xs leading-relaxed space-y-8 flex flex-col justify-between"
              style={{ colorScheme: "light" }}
            >
              <div className="space-y-8">
                {/* Header Row: Company Logo & Title */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                  <div>
                    {logo ? (
                      <img src={logo} alt={sellerName} className="h-12 max-w-[200px] object-contain mb-3" />
                    ) : (
                      <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-extrabold text-lg mb-2">
                        {sellerName.charAt(0)}
                      </div>
                    )}
                    <h2 className="text-base font-bold text-slate-900">{sellerName}</h2>
                    <p className="text-[10px] text-slate-500 whitespace-pre-line mt-1">{sellerAddress}</p>
                    {sellerRegNo && (
                      <p className="text-[10px] text-slate-500 mt-1">{t.regNo}: {sellerRegNo}</p>
                    )}
                    {sellerVat && (
                      <p className="text-[10px] text-slate-500">{t.vatNo}: {sellerVat}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                      {t.invoice}
                    </h1>
                    <div className="mt-3 space-y-1 font-medium text-slate-700">
                      <div>
                        <span className="text-slate-400 font-normal">{t.invoiceNo}:</span> {invoiceNumber}
                      </div>
                      <div>
                        <span className="text-slate-400 font-normal">{t.issueDate}:</span> {issueDate}
                      </div>
                      <div>
                        <span className="text-slate-400 font-normal">{t.dueDate}:</span> {dueDate}
                      </div>
                      {deliveryDate && (
                        <div>
                          <span className="text-slate-400 font-normal">{t.deliveryDate}:</span> {deliveryDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client / Buyer info Block */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      {t.invoiceTo}
                    </span>
                    <div className="font-bold text-slate-900 text-[11px]">{buyerName}</div>
                    <div className="text-[10px] text-slate-600 whitespace-pre-line mt-1">
                      {buyerAddress}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      {buyerRef && (
                        <div>
                          <span className="text-slate-400">{t.ourReference}:</span>{" "}
                          <span className="font-semibold text-slate-800">{buyerRef}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400">{t.currency}:</span>{" "}
                        <span className="font-semibold text-slate-800">{currency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services / Goods Table */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-400 text-[9px] uppercase tracking-wider font-bold">
                      <th className="py-2.5">{t.description}</th>
                      <th className="py-2.5 text-center w-16">{t.qty}</th>
                      <th className="py-2.5 text-right w-24">{t.unitPrice}</th>
                      <th className="py-2.5 text-center w-16">{t.vatPercent}</th>
                      <th className="py-2.5 text-right w-24">{t.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => {
                      const totalCost = item.quantity * item.unitPrice;
                      return (
                        <tr key={item.id} className="border-b border-slate-100 text-slate-700 text-[10px]">
                          <td className="py-3 font-semibold text-slate-900">{item.description}</td>
                          <td className="py-3 text-center">{item.quantity}</td>
                          <td className="py-3 text-right">
                            {item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 text-center">{item.vatRate}%</td>
                          <td className="py-3 text-right font-semibold text-slate-900">
                            {totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Subtotals & Taxes breakdown */}
                <div className="flex justify-end pt-4">
                  <div className="w-64 space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex justify-between text-slate-600">
                      <span>{t.subtotal}</span>
                      <span className="font-semibold">
                        {calculatedTotals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                      </span>
                    </div>

                    {/* Show VAT rate breakdown */}
                    {Object.entries(calculatedTotals.vatAmounts).map(([rate, amount]) => {
                      if (amount === 0) return null;
                      return (
                        <div key={rate} className="flex justify-between text-slate-500 text-[9px]">
                          <span>{t.vatAmount} ({rate}%)</span>
                          <span>
                            {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                          </span>
                        </div>
                      );
                    })}

                    <div className="flex justify-between text-slate-600 border-b border-slate-100 pb-2">
                      <span>{t.totalVat}</span>
                      <span>
                        {calculatedTotals.totalVat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-900 text-sm font-extrabold pt-1">
                      <span>{t.totalDue}</span>
                      <span className="text-emerald-700">
                        {calculatedTotals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Footer: Payment parameters and F-skatt status */}
              <div className="border-t border-slate-100 pt-6 mt-8 space-y-4">
                <div className="flex justify-between items-end gap-4">
                  {/* Payments Grid */}
                  <div className={`grid gap-4 flex-1 text-[9px] text-slate-500 ${
                    paymentColumnsCount === 3 ? "grid-cols-3" :
                    paymentColumnsCount === 2 ? "grid-cols-2" : "grid-cols-1"
                  }`}>
                    {/* Swedish Bankgiro/Plusgiro details */}
                    {(bankgiro || plusgiro) && (
                      <div>
                        <span className="font-bold text-slate-700 block uppercase mb-1">
                          {t.localPayments}
                        </span>
                        {bankgiro && <div>{t.bankgiro}: <span className="font-semibold text-slate-700">{bankgiro}</span></div>}
                        {plusgiro && <div>{t.plusgiro}: <span className="font-semibold text-slate-700">{plusgiro}</span></div>}
                      </div>
                    )}

                    {/* International Bank details */}
                    {(iban || bic) && (
                      <div>
                        <span className="font-bold text-slate-700 block uppercase mb-1">
                          {t.internationalPayments}
                        </span>
                        {iban && <div className="truncate">{t.iban}: <span className="font-semibold text-slate-700">{iban}</span></div>}
                        {bic && <div>{t.bicSwift}: <span className="font-semibold text-slate-700">{bic}</span></div>}
                      </div>
                    )}

                    {/* Terms and F-skatt note */}
                    {(lateInterest || (hasFskatt && fskattText)) && (
                      <div>
                        <span className="font-bold text-slate-700 block uppercase mb-1">
                          {t.invoicingTerms}
                        </span>
                        {lateInterest && (
                          <div>{t.overdueInterest}: <span className="font-semibold text-slate-700">{lateInterest}%</span></div>
                        )}
                        {hasFskatt && fskattText && (
                          <div className="mt-1 font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                            {fskattText}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* QR Code Container */}
                  {qrCodeUrl && (
                    <div className="flex flex-col items-center justify-center p-1.5 border border-slate-100 rounded-lg bg-slate-50 text-center w-20 flex-shrink-0">
                      <img
                        src={qrCodeUrl}
                        alt="Scan to Pay"
                        className="h-14 w-14 object-contain"
                      />
                      <span className="text-[6px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">
                        {qrType === "swish" ? "Scan to Swish" : "Scan to Pay"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center text-[9px] text-slate-400 border-t border-slate-50 pt-3">
                  {footerNote}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
