"use client";

import * as React from "react";
import { Icon } from "@/components/Icon";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

interface InvoicePreviewProps {
  logo: string | null;
  sellerName: string;
  sellerAddress: string;
  sellerRegNo: string;
  sellerVat: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  deliveryDate: string;
  buyerName: string;
  buyerAddress: string;
  buyerRef: string;
  currency: string;
  lineItems: LineItem[];
  calculatedTotals: {
    subtotal: number;
    vatAmounts: Record<number, number>;
    totalVat: number;
    grandTotal: number;
  };
  bankgiro: string;
  plusgiro: string;
  iban: string;
  bic: string;
  lateInterest: string;
  hasFskatt: boolean;
  fskattText: string;
  footerNote: string;
  qrCodeUrl: string | null;
  qrType: string;
  paymentColumnsCount: number;
  t: Record<string, string>;
  layoutMode: "split" | "tabs";
  activeTab: string;
}

export function InvoicePreview({
  logo,
  sellerName,
  sellerAddress,
  sellerRegNo,
  sellerVat,
  invoiceNumber,
  issueDate,
  dueDate,
  deliveryDate,
  buyerName,
  buyerAddress,
  buyerRef,
  currency,
  lineItems,
  calculatedTotals,
  bankgiro,
  plusgiro,
  iban,
  bic,
  lateInterest,
  hasFskatt,
  fskattText,
  footerNote,
  qrCodeUrl,
  qrType,
  paymentColumnsCount,
  t,
  layoutMode,
  activeTab,
}: InvoicePreviewProps) {
  return (
    <div
      className={`${
        layoutMode === "tabs" ? "lg:col-span-12" : "lg:col-span-6"
      } ${
        activeTab === "preview" ? "block" : (layoutMode === "tabs" ? "hidden" : "hidden lg:block")
      }`}
    >
      <div className="sticky top-20">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5 no-print">
          <Icon name="Eye" size={14} className="text-emerald-500" />
          Live Invoice Layout Preview (A4 Formatted)
        </h2>

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
  );
}
