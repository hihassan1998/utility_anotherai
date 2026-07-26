"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function BMICalculatorClient() {
  const [unit, setUnit] = React.useState<"metric" | "imperial">("metric");

  // Metric fields
  const [cm, setCm] = React.useState("");
  const [kg, setKg] = React.useState("");

  // Imperial fields
  const [feet, setFeet] = React.useState("");
  const [inches, setInches] = React.useState("");
  const [lbs, setLbs] = React.useState("");

  const [result, setResult] = React.useState<{
    bmi: number;
    category: string;
    healthyRangeMin: string;
    healthyRangeMax: string;
    colorClass: string;
    bgClass: string;
    percent: number; // For the gauge positioning
  } | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();

    let heightMeters = 0;
    let weightKg = 0;
    let minWeightRange = 0;
    let maxWeightRange = 0;

    if (unit === "metric") {
      const heightCm = parseFloat(cm);
      const wKg = parseFloat(kg);
      if (!heightCm || !wKg) return;

      heightMeters = heightCm / 100;
      weightKg = wKg;
    } else {
      const ft = parseFloat(feet) || 0;
      const inch = parseFloat(inches) || 0;
      const wLbs = parseFloat(lbs);
      if ((ft === 0 && inch === 0) || !wLbs) return;

      heightMeters = (ft * 12 + inch) * 0.0254;
      weightKg = wLbs * 0.45359237;
    }

    if (heightMeters === 0) return;

    const bmi = weightKg / (heightMeters * heightMeters);

    // Calculate Healthy weight range
    minWeightRange = 18.5 * (heightMeters * heightMeters);
    maxWeightRange = 24.9 * (heightMeters * heightMeters);

    let category = "";
    let colorClass = "";
    let bgClass = "";
    let percent = 0;

    // Categories and bounds for visual meter (range 15 to 35+)
    if (bmi < 18.5) {
      category = "Underweight";
      colorClass = "text-sky-500 dark:text-sky-400";
      bgClass = "bg-sky-500/10 border-sky-500/20";
      percent = Math.max(0, Math.min(100, ((bmi - 12) / 28) * 100));
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Healthy Weight";
      colorClass = "text-emerald-500 dark:text-emerald-400";
      bgClass = "bg-emerald-500/10 border-emerald-500/20";
      percent = Math.max(0, Math.min(100, ((bmi - 12) / 28) * 100));
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Overweight";
      colorClass = "text-amber-500 dark:text-amber-400";
      bgClass = "bg-amber-500/10 border-amber-500/20";
      percent = Math.max(0, Math.min(100, ((bmi - 12) / 28) * 100));
    } else {
      category = "Obesity";
      colorClass = "text-rose-500 dark:text-rose-400";
      bgClass = "bg-rose-500/10 border-rose-500/20";
      percent = Math.max(0, Math.min(100, ((bmi - 12) / 28) * 100));
    }

    // Format ranges
    let rangeMinStr = "";
    let rangeMaxStr = "";
    if (unit === "metric") {
      rangeMinStr = `${minWeightRange.toFixed(1)} kg`;
      rangeMaxStr = `${maxWeightRange.toFixed(1)} kg`;
    } else {
      rangeMinStr = `${(minWeightRange / 0.45359237).toFixed(1)} lbs`;
      rangeMaxStr = `${(maxWeightRange / 0.45359237).toFixed(1)} lbs`;
    }

    setResult({
      bmi,
      category,
      healthyRangeMin: rangeMinStr,
      healthyRangeMax: rangeMaxStr,
      colorClass,
      bgClass,
      percent,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="metric"
        onValueChange={(val) => {
          setUnit(val as "metric" | "imperial");
          setResult(null);
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted/40 p-1">
          <TabsTrigger value="metric" className="rounded-md text-xs py-2">
            Metric (cm/kg)
          </TabsTrigger>
          <TabsTrigger value="imperial" className="rounded-md text-xs py-2">
            Imperial (ft/in/lbs)
          </TabsTrigger>
        </TabsList>

        <form onSubmit={calculateBMI} className="space-y-4 mt-6">
          <TabsContent value="metric" className="space-y-4 outline-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cm" className="text-xs font-semibold">
                  Height (cm)
                </Label>
                <Input
                  id="cm"
                  type="number"
                  placeholder="e.g., 175"
                  required
                  min="100"
                  max="250"
                  value={cm}
                  onChange={(e) => setCm(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kg" className="text-xs font-semibold">
                  Weight (kg)
                </Label>
                <Input
                  id="kg"
                  type="number"
                  placeholder="e.g., 70"
                  required
                  min="30"
                  max="300"
                  value={kg}
                  onChange={(e) => setKg(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="imperial" className="space-y-4 outline-none">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feet" className="text-xs font-semibold">
                  Height (Feet)
                </Label>
                <Input
                  id="feet"
                  type="number"
                  placeholder="e.g., 5"
                  required
                  min="3"
                  max="8"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inches" className="text-xs font-semibold">
                  Height (Inches)
                </Label>
                <Input
                  id="inches"
                  type="number"
                  placeholder="e.g., 9"
                  required
                  min="0"
                  max="11"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lbs" className="text-xs font-semibold">
                  Weight (lbs)
                </Label>
                <Input
                  id="lbs"
                  type="number"
                  placeholder="e.g., 150"
                  required
                  min="50"
                  max="600"
                  value={lbs}
                  onChange={(e) => setLbs(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </TabsContent>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
            Calculate BMI
          </Button>
        </form>
      </Tabs>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Banner category */}
          <Alert className={`rounded-xl border ${result.bgClass}`}>
            <AlertDescription className="text-center font-medium py-1">
              Your BMI is <span className="font-extrabold text-lg">{result.bmi.toFixed(1)}</span>, indicating you are in the{" "}
              <span className={`font-extrabold text-lg ${result.colorClass}`}>{result.category}</span> category.
            </AlertDescription>
          </Alert>

          {/* Visual Scale Meter */}
          <div className="space-y-2">
            <div className="relative h-4 rounded-full bg-muted overflow-hidden flex">
              <div className="h-full bg-sky-400 w-[23%]" title="Underweight (< 18.5)" />
              <div className="h-full bg-emerald-500 w-[23%]" title="Healthy Weight (18.5 - 24.9)" />
              <div className="h-full bg-amber-400 w-[18%]" title="Overweight (25.0 - 29.9)" />
              <div className="h-full bg-rose-500 w-[36%]" title="Obesity (>= 30.0)" />

              {/* Pin Indicator */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white border border-black shadow transition-all duration-500"
                style={{ left: `${result.percent}%` }}
              />
            </div>
            {/* Scale Markers */}
            <div className="flex justify-between text-[10px] text-muted-foreground px-1">
              <span>15.0</span>
              <span>18.5</span>
              <span>25.0</span>
              <span>30.0</span>
              <span>35.0+</span>
            </div>
          </div>

          {/* Healthy weight details */}
          <Card className="border-border/30 bg-muted/20">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2">
              <span className="text-muted-foreground">Healthy weight range for your height:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {result.healthyRangeMin} - {result.healthyRangeMax}
              </span>
            </CardContent>
          </Card>

          {/* Share Button (No-Marketing Growth Loop) */}
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const text = `I calculated my Body Mass Index (BMI)! My BMI is ${result.bmi.toFixed(1)} (${result.category}). Calculate yours here: ${window.location.origin}${window.location.pathname}`;
                navigator.clipboard.writeText(text);
                const btnTextEl = document.getElementById("bmi-share-btn-text");
                if (btnTextEl) {
                  btnTextEl.innerText = "Copied link to clipboard!";
                  setTimeout(() => {
                    btnTextEl.innerText = "Share results";
                  }, 2000);
                }
              }}
              className="text-xs border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg flex items-center gap-1.5"
            >
              {/* Use custom SVG since we don't import Icon in BMI calculator natively or we can just render inline SVG or import lucide components if needed */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <span id="bmi-share-btn-text">Share results</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
