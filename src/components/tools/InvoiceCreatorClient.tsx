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

export function InvoiceCreatorClient() {
  // State for tabs on mobile
  const [activeTab, setActiveTab] = React.useState("edit");

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

  const handlePrint = () => {
    window.print();
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
    }
  };

  return (
    <div className="space-y-6">
      {/* Hide page contents outside invoice on system print */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #invoice-printable-container, #invoice-printable-container * {
            visibility: visible !important;
          }
          #invoice-printable-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          main, header, footer, nav, button, .no-print {
            display: none !important;
          }
        }
      ` }} />

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

        {/* Toggles on mobile */}
        <div className="lg:hidden">
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
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Invoice Editor Forms */}
        <div className={`lg:col-span-6 space-y-6 no-print ${activeTab === "edit" ? "block" : "hidden lg:block"}`}>
          
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
                  <option value="SEK">SEK (kr)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
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
                        value={item.vatRate}
                        onChange={(e) => handleUpdateItem(item.id, "vatRate", e.target.value)}
                        className="flex h-9 w-full rounded-lg border border-muted-foreground/15 bg-background px-3 py-1 text-xs"
                      >
                        <option value={25}>25% (Standard)</option>
                        <option value={12}>12% (Food/Services)</option>
                        <option value={6}>6% (Books/Travel)</option>
                        <option value={0}>0% (Exempt)</option>
                      </select>
                    </div>
                  </div>
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
                <Label htmlFor="bank-bg" className="text-xs font-semibold">Bankgiro</Label>
                <Input
                  id="bank-bg"
                  value={bankgiro}
                  onChange={(e) => setBankgiro(e.target.value)}
                  placeholder="e.g. 123-4567"
                  className="text-xs bg-muted/20 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bank-pg" className="text-xs font-semibold">Plusgiro</Label>
                <Input
                  id="bank-pg"
                  value={plusgiro}
                  onChange={(e) => setPlusgiro(e.target.value)}
                  placeholder="e.g. 987654-3"
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
          </div>

        </div>

        {/* Right Side: Professional Invoice Preview (Printable area) */}
        <div className={`lg:col-span-6 ${activeTab === "preview" ? "block" : "hidden lg:block"}`}>
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
                      <p className="text-[10px] text-slate-500 mt-1">Org.nr: {sellerRegNo}</p>
                    )}
                    {sellerVat && (
                      <p className="text-[10px] text-slate-500">VAT-nr: {sellerVat}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                      Invoice
                    </h1>
                    <div className="mt-3 space-y-1 font-medium text-slate-700">
                      <div>
                        <span className="text-slate-400 font-normal">Invoice No:</span> {invoiceNumber}
                      </div>
                      <div>
                        <span className="text-slate-400 font-normal">Issue Date:</span> {issueDate}
                      </div>
                      <div>
                        <span className="text-slate-400 font-normal">Due Date:</span> {dueDate}
                      </div>
                      {deliveryDate && (
                        <div>
                          <span className="text-slate-400 font-normal">Delivery Date:</span> {deliveryDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client / Buyer info Block */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                      Invoice To (Buyer)
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
                          <span className="text-slate-400">Our Reference:</span>{" "}
                          <span className="font-semibold text-slate-800">{buyerRef}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400">Currency:</span>{" "}
                        <span className="font-semibold text-slate-800">{currency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services / Goods Table */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-400 text-[9px] uppercase tracking-wider font-bold">
                      <th className="py-2.5">Description</th>
                      <th className="py-2.5 text-center w-16">Qty</th>
                      <th className="py-2.5 text-right w-24">Unit Price</th>
                      <th className="py-2.5 text-center w-16">VAT (%)</th>
                      <th className="py-2.5 text-right w-24">Total</th>
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
                      <span>Subtotal (excl. VAT)</span>
                      <span className="font-semibold">
                        {calculatedTotals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                      </span>
                    </div>

                    {/* Show VAT rate breakdown */}
                    {Object.entries(calculatedTotals.vatAmounts).map(([rate, amount]) => {
                      if (amount === 0) return null;
                      return (
                        <div key={rate} className="flex justify-between text-slate-500 text-[9px]">
                          <span>VAT / Moms ({rate}%)</span>
                          <span>
                            {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                          </span>
                        </div>
                      );
                    })}

                    <div className="flex justify-between text-slate-600 border-b border-slate-100 pb-2">
                      <span>Total VAT</span>
                      <span>
                        {calculatedTotals.totalVat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-900 text-sm font-extrabold pt-1">
                      <span>Total Due</span>
                      <span className="text-emerald-700">
                        {calculatedTotals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Footer: Payment parameters and F-skatt status */}
              <div className="border-t border-slate-100 pt-6 mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-[9px] text-slate-500">
                  {/* Swedish Bankgiro/Plusgiro details */}
                  <div>
                    <span className="font-bold text-slate-700 block uppercase mb-1">
                      Swedish Payments
                    </span>
                    {bankgiro && <div>Bankgiro: <span className="font-semibold text-slate-700">{bankgiro}</span></div>}
                    {plusgiro && <div>Plusgiro: <span className="font-semibold text-slate-700">{plusgiro}</span></div>}
                  </div>

                  {/* International Bank details */}
                  <div>
                    <span className="font-bold text-slate-700 block uppercase mb-1">
                      International Payments
                    </span>
                    {iban && <div className="truncate">IBAN: <span className="font-semibold text-slate-700">{iban}</span></div>}
                    {bic && <div>BIC / SWIFT: <span className="font-semibold text-slate-700">{bic}</span></div>}
                  </div>

                  {/* Terms and F-skatt note */}
                  <div>
                    <span className="font-bold text-slate-700 block uppercase mb-1">
                      Invoicing Terms
                    </span>
                    {lateInterest && (
                      <div>Overdue Interest: <span className="font-semibold text-slate-700">{lateInterest}%</span></div>
                    )}
                    {hasFskatt && fskattText && (
                      <div className="mt-1 font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                        {fskattText}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center text-[9px] text-slate-400 border-t border-slate-50 pt-3">
                  Thank you for your business! / Tack för förtroendet!
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
