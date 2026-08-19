"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/Icon";
import { DatePickerWithInput } from "@/components/DatePickerWithInput";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

interface CurrencyItem {
  code: string;
  name: string;
}

interface InvoiceEditorProps {
  logo: string | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearLogo: () => void;
  sellerName: string;
  setSellerName: (val: string) => void;
  sellerAddress: string;
  setSellerAddress: (val: string) => void;
  sellerRegNo: string;
  setSellerRegNo: (val: string) => void;
  sellerVat: string;
  setSellerVat: (val: string) => void;
  hasFskatt: boolean;
  setHasFskatt: (val: boolean) => void;
  fskattText: string;
  setFskattText: (val: string) => void;
  buyerName: string;
  setBuyerName: (val: string) => void;
  buyerAddress: string;
  setBuyerAddress: (val: string) => void;
  buyerRef: string;
  setBuyerRef: (val: string) => void;
  invoiceNumber: string;
  setInvoiceNumber: (val: string) => void;
  currency: string;
  setCurrency: (val: string) => void;
  currencies: CurrencyItem[];
  docLang: string;
  handleLangChange: (lang: any) => void;
  issueDate: string;
  setIssueDate: (val: string) => void;
  deliveryDate: string;
  setDeliveryDate: (val: string) => void;
  dueDate: string;
  setDueDate: (val: string) => void;
  lineItems: LineItem[];
  handleAddItem: () => void;
  handleRemoveItem: (id: string) => void;
  handleUpdateItem: (id: string, field: keyof LineItem, value: any) => void;
  bankgiro: string;
  setBankgiro: (val: string) => void;
  plusgiro: string;
  setPlusgiro: (val: string) => void;
  iban: string;
  setIban: (val: string) => void;
  bic: string;
  setBic: (val: string) => void;
  lateInterest: string;
  setLateInterest: (val: string) => void;
  qrType: "none" | "swish" | "paypal" | "url";
  setQrType: (val: any) => void;
  qrValue: string;
  setQrValue: (val: string) => void;
  footerNote: string;
  setFooterNote: (val: string) => void;
  activeTab: string;
  layoutMode: "split" | "tabs";
}

export function InvoiceEditor({
  logo,
  handleLogoChange,
  handleClearLogo,
  sellerName,
  setSellerName,
  sellerAddress,
  setSellerAddress,
  sellerRegNo,
  setSellerRegNo,
  sellerVat,
  setSellerVat,
  hasFskatt,
  setHasFskatt,
  fskattText,
  setFskattText,
  buyerName,
  setBuyerName,
  buyerAddress,
  setBuyerAddress,
  buyerRef,
  setBuyerRef,
  invoiceNumber,
  setInvoiceNumber,
  currency,
  setCurrency,
  currencies,
  docLang,
  handleLangChange,
  issueDate,
  setIssueDate,
  deliveryDate,
  setDeliveryDate,
  dueDate,
  setDueDate,
  lineItems,
  handleAddItem,
  handleRemoveItem,
  handleUpdateItem,
  bankgiro,
  setBankgiro,
  plusgiro,
  setPlusgiro,
  iban,
  setIban,
  bic,
  setBic,
  lateInterest,
  setLateInterest,
  qrType,
  setQrType,
  qrValue,
  setQrValue,
  footerNote,
  setFooterNote,
  activeTab,
  layoutMode,
}: InvoiceEditorProps) {
  const inputBaseStyle = "flex h-8 w-full min-w-0 border px-2.5 py-1 outline-none text-xs rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50";
  const inputMutedStyle = `${inputBaseStyle} bg-muted/20 border-muted-foreground/15`;
  const inputWhiteStyle = `${inputBaseStyle} bg-background border-muted-foreground/15`;

  return (
    <div
      className={`${
        layoutMode === "tabs" ? "lg:col-span-12" : "lg:col-span-6"
      } space-y-6 no-print ${
        activeTab === "edit" ? "block" : (layoutMode === "tabs" ? "hidden" : "hidden lg:block")
      }`}
    >
      {/* Logo & Seller Info */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="Home" size={14} className="text-emerald-500" />
          Seller Details (Your Business)
        </h2>

        {/* Logo Upload Input */}
        <div className="space-y-2">
          <Label htmlFor="logo-upload" className="text-xs font-semibold">Company Logo</Label>
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
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="flex h-8 w-full min-w-0 border px-2.5 py-1 outline-none text-xs rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 bg-muted/20 border-muted-foreground/15 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="seller-name" className="text-xs font-semibold">Company/Your Name</Label>
            <input
              id="seller-name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className={inputMutedStyle}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="seller-reg" className="text-xs font-semibold">Org Number (Swedish format optional)</Label>
            <input
              id="seller-reg"
              value={sellerRegNo}
              onChange={(e) => setSellerRegNo(e.target.value)}
              className={inputMutedStyle}
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
            <input
              id="seller-vat"
              value={sellerVat}
              onChange={(e) => setSellerVat(e.target.value)}
              placeholder="e.g. SE556123456701"
              className={inputMutedStyle}
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
            <input
              id="fskatt-text"
              value={fskattText}
              onChange={(e) => setFskattText(e.target.value)}
              className={inputMutedStyle}
            />
          </div>
        )}
      </div>

      {/* Client Details */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="Users" size={14} className="text-emerald-500" />
          Client Details (Buyer)
        </h2>
        <div className="space-y-1.5">
          <Label htmlFor="buyer-name" className="text-xs font-semibold">Client Name/Company</Label>
          <input
            id="buyer-name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className={inputMutedStyle}
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
          <input
            id="buyer-ref"
            value={buyerRef}
            onChange={(e) => setBuyerRef(e.target.value)}
            placeholder="e.g. referensnummer / PO"
            className={inputMutedStyle}
          />
        </div>
      </div>

      {/* Invoice Meta */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="Calendar" size={14} className="text-emerald-500" />
          Invoice Parameters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="invoice-no" className="text-xs font-semibold">Invoice Number</Label>
            <input
              id="invoice-no"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className={inputMutedStyle}
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
              {currencies.map((cur) => (
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
            <DatePickerWithInput
              id="invoice-issue"
              value={issueDate}
              onChange={setIssueDate}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="invoice-delivery" className="text-xs font-semibold">Delivery Date</Label>
            <DatePickerWithInput
              id="invoice-delivery"
              value={deliveryDate}
              onChange={setDeliveryDate}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="invoice-due" className="text-xs font-semibold">Due Date</Label>
            <DatePickerWithInput
              id="invoice-due"
              value={dueDate}
              onChange={setDueDate}
            />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="List" size={14} className="text-emerald-500" />
            Line Items
          </h2>
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
                <Label htmlFor={`desc-item-${index}`} className="text-xs font-semibold">Description</Label>
                <input
                  id={`desc-item-${index}`}
                  value={item.description}
                  onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                  className={inputWhiteStyle}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`qty-item-${index}`} className="text-xs font-semibold">Quantity</Label>
                  <input
                    id={`qty-item-${index}`}
                    type="number"
                    min="0"
                    step="any"
                    value={item.quantity}
                    onChange={(e) => handleUpdateItem(item.id, "quantity", e.target.value)}
                    className={inputWhiteStyle}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`price-item-${index}`} className="text-xs font-semibold">Unit Price</Label>
                  <input
                    id={`price-item-${index}`}
                    type="number"
                    min="0"
                    step="any"
                    value={item.unitPrice}
                    onChange={(e) => handleUpdateItem(item.id, "unitPrice", e.target.value)}
                    className={inputWhiteStyle}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`vat-item-${index}`} className="text-xs font-semibold">VAT / Moms (%)</Label>
                  <select
                    id={`vat-item-${index}`}
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
                  <Label htmlFor={`custom-vat-item-${index}`} className="text-xs font-semibold text-emerald-600">Specify Custom VAT (%)</Label>
                  <input
                    id={`custom-vat-item-${index}`}
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={item.vatRate}
                    onChange={(e) => handleUpdateItem(item.id, "vatRate", e.target.value)}
                    className="flex h-8 w-full min-w-0 border px-2.5 py-1 outline-none text-xs rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 bg-background border-muted-foreground/15 w-full max-w-[120px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Terms & Bank details */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4 shadow-sm">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="CreditCard" size={14} className="text-emerald-500" />
          Banking & Payment Terms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="bank-bg" className="text-xs font-semibold">Bankgiro / Routing No</Label>
            <input
              id="bank-bg"
              value={bankgiro}
              onChange={(e) => setBankgiro(e.target.value)}
              placeholder="e.g. 123-4567 or Routing Code"
              className={inputMutedStyle}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bank-pg" className="text-xs font-semibold">Plusgiro / Account No</Label>
            <input
              id="bank-pg"
              value={plusgiro}
              onChange={(e) => setPlusgiro(e.target.value)}
              placeholder="e.g. 987654-3 or Account Code"
              className={inputMutedStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="bank-iban" className="text-xs font-semibold">IBAN</Label>
            <input
              id="bank-iban"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className={inputMutedStyle}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bank-bic" className="text-xs font-semibold">BIC / SWIFT</Label>
            <input
              id="bank-bic"
              value={bic}
              onChange={(e) => setBic(e.target.value)}
              className={inputMutedStyle}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="payment-interest" className="text-xs font-semibold">Late Payment Interest Rate (%)</Label>
          <input
            id="payment-interest"
            value={lateInterest}
            onChange={(e) => setLateInterest(e.target.value)}
            placeholder="e.g. 8"
            className={inputMutedStyle}
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
              <input
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
                className={inputMutedStyle}
              />
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="invoice-footer-note" className="text-xs font-semibold">Invoice Footer Text (Thank You note)</Label>
          <input
            id="invoice-footer-note"
            value={footerNote}
            onChange={(e) => setFooterNote(e.target.value)}
            placeholder="e.g. Thank you for your business!"
            className={inputMutedStyle}
          />
        </div>
      </div>
    </div>
  );
}
