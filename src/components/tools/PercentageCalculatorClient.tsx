"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PercentageCalculatorClient() {
  // Form 1: What is X% of Y?
  const [f1X, setF1X] = React.useState("");
  const [f1Y, setF1Y] = React.useState("");
  const [f1Result, setF1Result] = React.useState<number | null>(null);

  // Form 2: X is what % of Y?
  const [f2X, setF2X] = React.useState("");
  const [f2Y, setF2Y] = React.useState("");
  const [f2Result, setF2Result] = React.useState<number | null>(null);

  // Form 3: Increase/Decrease from X to Y
  const [f3X, setF3X] = React.useState("");
  const [f3Y, setF3Y] = React.useState("");
  const [f3Result, setF3Result] = React.useState<{
    change: number;
    type: "increase" | "decrease" | "no-change";
  } | null>(null);

  // Form 4: Discount (Original Price & Discount %)
  const [f4Price, setF4Price] = React.useState("");
  const [f4Discount, setF4Discount] = React.useState("");
  const [f4Result, setF4Result] = React.useState<{
    finalPrice: number;
    saved: number;
  } | null>(null);

  const calculateF1 = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseFloat(f1X);
    const y = parseFloat(f1Y);
    if (isNaN(x) || isNaN(y)) return;
    setF1Result((x / 100) * y);
  };

  const calculateF2 = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseFloat(f2X);
    const y = parseFloat(f2Y);
    if (isNaN(x) || isNaN(y) || y === 0) return;
    setF2Result((x / y) * 100);
  };

  const calculateF3 = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseFloat(f3X);
    const y = parseFloat(f3Y);
    if (isNaN(x) || isNaN(y) || x === 0) return;

    const diff = y - x;
    const pct = (diff / x) * 100;
    
    setF3Result({
      change: Math.abs(pct),
      type: pct > 0 ? "increase" : pct < 0 ? "decrease" : "no-change",
    });
  };

  const calculateF4 = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(f4Price);
    const discount = parseFloat(f4Discount);
    if (isNaN(price) || isNaN(discount)) return;

    const saved = price * (discount / 100);
    const finalPrice = price - saved;

    setF4Result({
      finalPrice,
      saved,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="f1" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-lg bg-muted/40 p-1 h-auto gap-1">
          <TabsTrigger value="f1" className="rounded-md text-xs py-2">
            X% of Y
          </TabsTrigger>
          <TabsTrigger value="f2" className="rounded-md text-xs py-2">
            X is what % of Y
          </TabsTrigger>
          <TabsTrigger value="f3" className="rounded-md text-xs py-2">
            % Inc / Dec
          </TabsTrigger>
          <TabsTrigger value="f4" className="rounded-md text-xs py-2">
            Discount
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: What is X% of Y? */}
        <TabsContent value="f1" className="outline-none pt-4">
          <form onSubmit={calculateF1} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="f1-x" className="text-xs font-semibold">
                  Percentage (X%)
                </Label>
                <Input
                  id="f1-x"
                  type="number"
                  placeholder="e.g., 15"
                  required
                  step="any"
                  value={f1X}
                  onChange={(e) => setF1X(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f1-y" className="text-xs font-semibold">
                  Of Number (Y)
                </Label>
                <Input
                  id="f1-y"
                  type="number"
                  placeholder="e.g., 200"
                  required
                  step="any"
                  value={f1Y}
                  onChange={(e) => setF1Y(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              Calculate
            </Button>
          </form>

          {f1Result !== null && (
            <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-xs text-muted-foreground">Result:</p>
              <p className="text-xl font-bold text-foreground">
                {f1X}% of {f1Y} is <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{f1Result.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              </p>
            </div>
          )}
        </TabsContent>

        {/* Tab 2: X is what % of Y? */}
        <TabsContent value="f2" className="outline-none pt-4">
          <form onSubmit={calculateF2} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="f2-x" className="text-xs font-semibold">
                  Number (X)
                </Label>
                <Input
                  id="f2-x"
                  type="number"
                  placeholder="e.g., 30"
                  required
                  step="any"
                  value={f2X}
                  onChange={(e) => setF2X(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f2-y" className="text-xs font-semibold">
                  Of Number (Y)
                </Label>
                <Input
                  id="f2-y"
                  type="number"
                  placeholder="e.g., 150"
                  required
                  step="any"
                  value={f2Y}
                  onChange={(e) => setF2Y(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              Calculate
            </Button>
          </form>

          {f2Result !== null && (
            <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-xs text-muted-foreground">Result:</p>
              <p className="text-xl font-bold text-foreground">
                {f2X} is <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{f2Result.toFixed(2)}%</span> of {f2Y}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Tab 3: Increase/Decrease */}
        <TabsContent value="f3" className="outline-none pt-4">
          <form onSubmit={calculateF3} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="f3-x" className="text-xs font-semibold">
                  Original Value (X)
                </Label>
                <Input
                  id="f3-x"
                  type="number"
                  placeholder="e.g., 80"
                  required
                  step="any"
                  value={f3X}
                  onChange={(e) => setF3X(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f3-y" className="text-xs font-semibold">
                  New Value (Y)
                </Label>
                <Input
                  id="f3-y"
                  type="number"
                  placeholder="e.g., 100"
                  required
                  step="any"
                  value={f3Y}
                  onChange={(e) => setF3Y(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              Calculate
            </Button>
          </form>

          {f3Result !== null && (
            <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-xs text-muted-foreground">Result:</p>
              <p className="text-xl font-bold text-foreground">
                {f3Result.type === "no-change" ? (
                  <span>There is no change (0.00%)</span>
                ) : (
                  <span>
                    Value {f3Result.type === "increase" ? "increased" : "decreased"} by{" "}
                    <span
                      className={`text-2xl font-extrabold ${
                        f3Result.type === "increase"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {f3Result.change.toFixed(2)}%
                    </span>
                  </span>
                )}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Tab 4: Discount */}
        <TabsContent value="f4" className="outline-none pt-4">
          <form onSubmit={calculateF4} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="f4-price" className="text-xs font-semibold">
                  Original Price ($)
                </Label>
                <Input
                  id="f4-price"
                  type="number"
                  placeholder="e.g., 120"
                  required
                  step="any"
                  min="0"
                  value={f4Price}
                  onChange={(e) => setF4Price(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="f4-discount" className="text-xs font-semibold">
                  Discount (%)
                </Label>
                <Input
                  id="f4-discount"
                  type="number"
                  placeholder="e.g., 20"
                  required
                  step="any"
                  min="0"
                  max="100"
                  value={f4Discount}
                  onChange={(e) => setF4Discount(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
              Calculate Discount
            </Button>
          </form>

          {f4Result !== null && (
            <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center text-sm border-b border-emerald-500/10 pb-2">
                <span className="text-muted-foreground">Final Price:</span>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${f4Result.finalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-1">
                <span className="text-muted-foreground">You Save:</span>
                <span className="font-bold text-foreground">
                  ${f4Result.saved.toFixed(2)} ({f4Discount}%)
                </span>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
