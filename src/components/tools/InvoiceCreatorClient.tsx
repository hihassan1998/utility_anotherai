"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/Icon";
import { InvoiceEditor } from "./InvoiceEditor";
import { InvoicePreview } from "./InvoicePreview";

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
    invoiceTo: "सेवा में (खरीدار)",
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
      const swishPayee = qrValue.replace(/[^0-9]/g, "");
      const swishAmount = calculatedTotals.grandTotal.toFixed(2).replace(".", ",");
      const swishMsg = encodeURIComponent(invoiceNumber);
      // lock_mask = 0 locks both payee/amount editability for billing accuracy
      data = `C${swishPayee};${swishAmount};${swishMsg};0`;
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
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Inject base A4 layout structure and matching styling variables
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${invoiceNumber} - Print</title>
          <style>
            /* A4 Print Layout Reset */
            @page {
              size: A4;
              margin: 15mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 10px;
              line-height: 1.5;
              color: #1e293b;
              background-color: #ffffff;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            /* Helper Utilities */
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .font-bold { font-weight: 700; }
            .font-extrabold { font-weight: 800; }
            .font-semibold { font-weight: 600; }
            .font-normal { font-weight: 400; }
            .uppercase { text-transform: uppercase; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-tight { letter-spacing: -0.025em; }
            .whitespace-pre-line { white-space: pre-line; }
            .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .block { display: block; }
            .inline-block { display: inline-block; }
            .flex-shrink-0 { flex-shrink: 0; }
            
            /* Color Tokens */
            .text-slate-900 { color: #0f172a; }
            .text-slate-800 { color: #1e293b; }
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
            .items-end { align-items: flex-end; }
            .items-center { align-items: center; }
            .flex-col { flex-direction: column; }
            .flex-1 { flex: 1 1 0%; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .gap-4 { gap: 1rem; }
            
            /* Sizing & Borders */
            .w-full { width: 100%; }
            .h-12 { height: 3rem; }
            .h-14 { height: 3.5rem; }
            .w-14 { width: 3.5rem; }
            .h-10 { height: 2.5rem; }
            .w-10 { width: 2.5rem; }
            .max-w-[200px] { max-width: 200px; }
            .w-64 { width: 16rem; }
            .py-2.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            table { border-spacing: 0; width: 100%; }
            th { font-weight: bold; }
            
            /* Hide print headers/adsense */
            .no-print { display: none !important; }
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-9 rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Icon name="Printer" size={14} className="mr-1.5" />
            Print / Save as PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-border text-xs h-9 rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
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
              className="text-xs h-7 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
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
              className="text-xs h-7 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
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
            className="text-xs h-7 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            Edit Details
          </Button>
          <Button
            variant={activeTab === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("preview")}
            className="text-xs h-7 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            Live Preview
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Invoice Editor Forms */}
        <InvoiceEditor
          logo={logo}
          handleLogoChange={handleLogoChange}
          handleClearLogo={handleClearLogo}
          sellerName={sellerName}
          setSellerName={setSellerName}
          sellerAddress={sellerAddress}
          setSellerAddress={setSellerAddress}
          sellerRegNo={sellerRegNo}
          setSellerRegNo={setSellerRegNo}
          sellerVat={sellerVat}
          setSellerVat={setSellerVat}
          hasFskatt={hasFskatt}
          setHasFskatt={setHasFskatt}
          fskattText={fskattText}
          setFskattText={setFskattText}
          buyerName={buyerName}
          setBuyerName={setBuyerName}
          buyerAddress={buyerAddress}
          setBuyerAddress={setBuyerAddress}
          buyerRef={buyerRef}
          setBuyerRef={setBuyerRef}
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          currency={currency}
          setCurrency={setCurrency}
          currencies={CURRENCIES}
          docLang={docLang}
          handleLangChange={handleLangChange}
          issueDate={issueDate}
          setIssueDate={setIssueDate}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          lineItems={lineItems}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleUpdateItem={handleUpdateItem}
          bankgiro={bankgiro}
          setBankgiro={setBankgiro}
          plusgiro={plusgiro}
          setPlusgiro={setPlusgiro}
          iban={iban}
          setIban={setIban}
          bic={bic}
          setBic={setBic}
          lateInterest={lateInterest}
          setLateInterest={setLateInterest}
          qrType={qrType}
          setQrType={setQrType}
          qrValue={qrValue}
          setQrValue={setQrValue}
          footerNote={footerNote}
          setFooterNote={setFooterNote}
          activeTab={activeTab}
          layoutMode={layoutMode}
        />

        {/* Right Side: Professional Invoice Preview (Printable area) */}
        <InvoicePreview
          logo={logo}
          sellerName={sellerName}
          sellerAddress={sellerAddress}
          sellerRegNo={sellerRegNo}
          sellerVat={sellerVat}
          invoiceNumber={invoiceNumber}
          issueDate={issueDate}
          dueDate={dueDate}
          deliveryDate={deliveryDate}
          buyerName={buyerName}
          buyerAddress={buyerAddress}
          buyerRef={buyerRef}
          currency={currency}
          lineItems={lineItems}
          calculatedTotals={calculatedTotals}
          bankgiro={bankgiro}
          plusgiro={plusgiro}
          iban={iban}
          bic={bic}
          lateInterest={lateInterest}
          hasFskatt={hasFskatt}
          fskattText={fskattText}
          footerNote={footerNote}
          qrCodeUrl={qrCodeUrl}
          qrType={qrType}
          paymentColumnsCount={paymentColumnsCount}
          t={t}
          layoutMode={layoutMode}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
