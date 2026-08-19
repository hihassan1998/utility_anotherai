"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DatePickerWithInput } from "@/components/DatePickerWithInput";

export function DateDurationCalculatorClient() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [includeEndDate, setIncludeEndDate] = React.useState(false);

  const [result, setResult] = React.useState<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    totalDays: number;
    totalWeeks: string;
    totalHours: number;
    totalMinutes: number;
  } | null>(null);

  const calculateDuration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    let start = new Date(startDate);
    let end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert("Please enter valid start and end dates!");
      return;
    }

    // Swap if start is after end
    const isSwapped = start > end;
    if (isSwapped) {
      const temp = start;
      start = end;
      end = temp;
    }

    // Set times to midnight to ensure clean day calculation
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let startCalc = new Date(start);
    let endCalc = new Date(end);

    if (includeEndDate) {
      endCalc.setDate(endCalc.getDate() + 1);
    }

    // Difference in milliseconds
    const diffTime = endCalc.getTime() - startCalc.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate exact Years, Months, Weeks, Days breakdown
    let years = endCalc.getFullYear() - startCalc.getFullYear();
    let months = endCalc.getMonth() - startCalc.getMonth();
    let days = endCalc.getDate() - startCalc.getDate();

    if (days < 0) {
      months--;
      // Days in previous month relative to endCalc
      const prevMonth = new Date(endCalc.getFullYear(), endCalc.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Convert remaining days to weeks and days
    const weeks = Math.floor(days / 7);
    const finalDays = days % 7;

    // Direct totals
    const totalWeeks = (totalDays / 7).toFixed(1);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    setResult({
      years,
      months,
      weeks,
      days: finalDays,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={calculateDuration} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-xs font-semibold">
              Start Date
            </Label>
            <DatePickerWithInput
              id="start-date"
              required
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-xs font-semibold">
              End Date
            </Label>
            <DatePickerWithInput
              id="end-date"
              required
              value={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 select-none">
          <input
            id="include-end"
            type="checkbox"
            checked={includeEndDate}
            onChange={(e) => setIncludeEndDate(e.target.checked)}
            className="w-4 h-4 rounded border-muted-foreground/30 accent-emerald-600 cursor-pointer"
          />
          <Label htmlFor="include-end" className="text-xs font-medium cursor-pointer">
            Include end date (adds 1 day to the result)
          </Label>
        </div>

        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
          Calculate Duration
        </Button>
      </form>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Breakdown Display */}
          <div className="grid grid-cols-4 gap-2">
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-3">
                <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.years}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Years
                </span>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-3">
                <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.months}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Months
                </span>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-3">
                <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.weeks}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Weeks
                </span>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-3">
                <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.days}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Days
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Unit breakdown totals */}
          <div className="rounded-xl border border-border/30 bg-muted/10 p-4 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-muted-foreground">Total Days:</span>
              <span className="font-semibold text-foreground">
                {result.totalDays.toLocaleString()} days
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-muted-foreground">Total Weeks:</span>
              <span className="font-semibold text-foreground">{result.totalWeeks} weeks</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-muted-foreground">Total Hours:</span>
              <span className="font-semibold text-foreground">
                {result.totalHours.toLocaleString()} hours
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Total Minutes:</span>
              <span className="font-semibold text-foreground">
                {result.totalMinutes.toLocaleString()} minutes
              </span>
            </div>
          </div>

          {/* Share Button (No-Marketing Growth Loop) */}
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const text = `I calculated the duration between two dates! The difference is ${result.years} years, ${result.months} months, ${result.weeks} weeks, and ${result.days} days (total of ${result.totalDays.toLocaleString()} days!). Calculate date durations here: ${window.location.origin}${window.location.pathname}`;
                navigator.clipboard.writeText(text);
                const btnTextEl = document.getElementById("date-share-btn-text");
                if (btnTextEl) {
                  btnTextEl.innerText = "Copied link to clipboard!";
                  setTimeout(() => {
                    btnTextEl.innerText = "Share results";
                  }, 2000);
                }
              }}
              className="text-xs border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <span id="date-share-btn-text">Share results</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
