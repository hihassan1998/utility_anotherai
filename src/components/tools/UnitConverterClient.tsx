"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Units definition with conversion factor relative to base unit
const categories = {
  length: {
    name: "Length",
    base: "meter",
    units: {
      meter: { label: "Meters (m)", factor: 1 },
      kilometer: { label: "Kilometers (km)", factor: 1000 },
      centimeter: { label: "Centimeters (cm)", factor: 0.01 },
      millimeter: { label: "Millimeters (mm)", factor: 0.001 },
      mile: { label: "Miles (mi)", factor: 1609.344 },
      yard: { label: "Yards (yd)", factor: 0.9144 },
      foot: { label: "Feet (ft)", factor: 0.3048 },
      inch: { label: "Inches (in)", factor: 0.0254 },
    },
  },
  weight: {
    name: "Weight / Mass",
    base: "kilogram",
    units: {
      kilogram: { label: "Kilograms (kg)", factor: 1 },
      gram: { label: "Grams (g)", factor: 0.001 },
      milligram: { label: "Milligrams (mg)", factor: 0.000001 },
      pound: { label: "Pounds (lb)", factor: 0.45359237 },
      ounce: { label: "Ounces (oz)", factor: 0.028349523 },
    },
  },
  temperature: {
    name: "Temperature",
    base: "celsius",
    // Handled separately because it is not purely factor-based
    units: {
      celsius: { label: "Celsius (°C)" },
      fahrenheit: { label: "Fahrenheit (°F)" },
      kelvin: { label: "Kelvin (K)" },
    },
  },
  area: {
    name: "Area",
    base: "square_meter",
    units: {
      square_meter: { label: "Square Meters (m²)", factor: 1 },
      square_kilometer: { label: "Square Kilometers (km²)", factor: 1000000 },
      square_mile: { label: "Square Miles (mi²)", factor: 2589988.11 },
      square_foot: { label: "Square Feet (ft²)", factor: 0.092903 },
      acre: { label: "Acres (ac)", factor: 4046.856 },
      hectare: { label: "Hectares (ha)", factor: 10000 },
    },
  },
  volume: {
    name: "Volume",
    base: "liter",
    units: {
      liter: { label: "Liters (L)", factor: 1 },
      milliliter: { label: "Milliliters (mL)", factor: 0.001 },
      gallon: { label: "Gallons (US gal)", factor: 3.78541 },
      quart: { label: "Quarts (US qt)", factor: 0.946353 },
      pint: { label: "Pints (US pt)", factor: 0.473176 },
      cup: { label: "Cups (US cup)", factor: 0.24 },
      cubic_meter: { label: "Cubic Meters (m³)", factor: 1000 },
    },
  },
  speed: {
    name: "Speed",
    base: "mps",
    units: {
      mps: { label: "Meters/Second (m/s)", factor: 1 },
      kmh: { label: "Kilometers/Hour (km/h)", factor: 1 / 3.6 },
      mph: { label: "Miles/Hour (mph)", factor: 0.44704 },
      knot: { label: "Knots (kt)", factor: 0.514444 },
    },
  },
  time: {
    name: "Time",
    base: "second",
    units: {
      second: { label: "Seconds (s)", factor: 1 },
      minute: { label: "Minutes (min)", factor: 60 },
      hour: { label: "Hours (h)", factor: 3600 },
      day: { label: "Days (d)", factor: 86400 },
      week: { label: "Weeks (wk)", factor: 604800 },
      month: { label: "Months (mo - avg)", factor: 2629746 },
      year: { label: "Years (yr - avg)", factor: 31556952 },
    },
  },
};

type CategoryKey = keyof typeof categories;

export function UnitConverterClient() {
  const [currentTab, setCurrentTab] = React.useState<CategoryKey>("length");
  const [inputValue, setInputValue] = React.useState("1");
  const [fromUnit, setFromUnit] = React.useState("");
  const [toUnit, setToUnit] = React.useState("");
  const [convertedValue, setConvertedValue] = React.useState<number | null>(null);

  // Initialize from/to units when changing category tab
  React.useEffect(() => {
    const keys = Object.keys(categories[currentTab].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
    setConvertedValue(null);
  }, [currentTab]);

  const performConversion = React.useCallback(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setConvertedValue(null);
      return;
    }

    if (currentTab === "temperature") {
      // Temperature conversion formula logic
      if (fromUnit === toUnit) {
        setConvertedValue(val);
        return;
      }
      let tempInC = val;
      if (fromUnit === "fahrenheit") {
        tempInC = ((val - 32) * 5) / 9;
      } else if (fromUnit === "kelvin") {
        tempInC = val - 273.15;
      }

      let finalTemp = tempInC;
      if (toUnit === "fahrenheit") {
        finalTemp = (tempInC * 9) / 5 + 32;
      } else if (toUnit === "kelvin") {
        finalTemp = tempInC + 273.15;
      }
      setConvertedValue(finalTemp);
    } else {
      // Factor-based conversion logic
      const cat = categories[currentTab];
      const fromFactor = (cat.units as any)[fromUnit]?.factor || 1;
      const toFactor = (cat.units as any)[toUnit]?.factor || 1;

      // Convert to base, then to target unit
      const valueInBase = val * fromFactor;
      const valueInTarget = valueInBase / toFactor;
      setConvertedValue(valueInTarget);
    }
  }, [inputValue, fromUnit, toUnit, currentTab]);

  React.useEffect(() => {
    performConversion();
  }, [inputValue, fromUnit, toUnit, performConversion]);

  const currentCategoryData = categories[currentTab];

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="length"
        onValueChange={(val) => setCurrentTab(val as CategoryKey)}
        className="w-full"
      >
        {/* Horizontal scrollbar of categories on mobile */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <TabsList className="flex w-max space-x-1 rounded-lg bg-muted/40 p-1">
            {Object.entries(categories).map(([key, cat]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-md text-xs py-2 px-3 whitespace-nowrap"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            {/* Input Value */}
            <div className="space-y-2">
              <Label htmlFor="input-val" className="text-xs font-semibold">
                Value to Convert
              </Label>
              <Input
                id="input-val"
                type="number"
                step="any"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500"
              />
            </div>

            {/* From unit select */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">From Unit</Label>
              {fromUnit && (
                <Select value={fromUnit} onValueChange={(val) => { if (val) setFromUnit(val); }}>
                  <SelectTrigger className="bg-muted/30 border-muted-foreground/15 rounded-lg focus:ring-emerald-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {Object.entries(currentCategoryData.units).map(([key, unitData]) => (
                      <SelectItem key={key} value={key} className="text-xs">
                        {unitData.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* To unit select */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">To Unit</Label>
              {toUnit && (
                <Select value={toUnit} onValueChange={(val) => { if (val) setToUnit(val); }}>
                  <SelectTrigger className="bg-muted/30 border-muted-foreground/15 rounded-lg focus:ring-emerald-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {Object.entries(currentCategoryData.units).map(([key, unitData]) => (
                      <SelectItem key={key} value={key} className="text-xs">
                        {unitData.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {convertedValue !== null && !isNaN(convertedValue) && (
            <div className="mt-6 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                Converted Result
              </p>
              <p className="text-2xl font-black text-foreground leading-tight">
                {parseFloat(inputValue).toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
                <span className="text-sm font-semibold text-muted-foreground">
                  {(currentCategoryData.units as any)[fromUnit]?.label.split(" (")[0]}
                </span>
                <span className="mx-2 text-emerald-500 text-lg"> = </span>
                {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-extrabold">
                  {(currentCategoryData.units as any)[toUnit]?.label.split(" (")[0]}
                </span>
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
