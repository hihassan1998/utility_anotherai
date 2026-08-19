"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { DatePickerWithInput } from "@/components/DatePickerWithInput";

export function AgeCalculatorClient() {
  const [birthDate, setBirthDate] = React.useState("");
  const [result, setResult] = React.useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    nextBirthdayDays: number;
    dayOfWeek: string;
    isBirthday: boolean;
  } | null>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const dob = new Date(birthDate);
    if (isNaN(dob.getTime())) {
      alert("Please enter a valid birth date!");
      return;
    }
    const today = new Date();

    if (dob > today) {
      alert("Birth date cannot be in the future!");
      return;
    }

    // Years, Months, Days calculation
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days lived
    const diffTime = Math.abs(today.getTime() - dob.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Next Birthday Countdown
    const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diffToNextBirthday = nextBirthday.getTime() - today.getTime();
    const nextBirthdayDays = Math.ceil(diffToNextBirthday / (1000 * 60 * 60 * 24)) % 365;

    // Born on day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[dob.getDay()];

    // Check if it's their birthday today!
    const isBirthday = today.getMonth() === dob.getMonth() && today.getDate() === dob.getDate();

    if (isBirthday) {
      // Fire confetti for celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    setResult({
      years,
      months,
      days,
      totalDays,
      nextBirthdayDays,
      dayOfWeek,
      isBirthday,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={calculateAge} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dob" className="text-sm font-semibold">
            Select Your Date of Birth
          </Label>
          <div className="flex gap-4 items-end flex-wrap sm:flex-nowrap w-full">
            <DatePickerWithInput
              id="dob"
              required
              value={birthDate}
              onChange={setBirthDate}
              className="flex-1"
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 h-10">
              Calculate Age
            </Button>
          </div>
        </div>
      </form>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {result.isBirthday && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <Icon name="Gift" size={24} className="animate-bounce" />
              <div>
                <p className="font-bold text-sm">Happy Birthday! 🎉</p>
                <p className="text-xs opacity-90">Wishing you a fantastic day ahead!</p>
              </div>
            </div>
          )}

          {/* Primary Results */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-4">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.years}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Years
                </span>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-4">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.months}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Months
                </span>
              </CardContent>
            </Card>
            <Card className="border-border/30 bg-muted/20 text-center">
              <CardContent className="p-4">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {result.days}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Days
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Additional details */}
          <div className="rounded-xl border border-border/30 bg-muted/10 p-4 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-muted-foreground">Total Days Lived:</span>
              <span className="font-semibold text-foreground">
                {result.totalDays.toLocaleString()} days
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/20">
              <span className="text-muted-foreground">Born on:</span>
              <span className="font-semibold text-foreground">{result.dayOfWeek}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Next Birthday:</span>
              <span className="font-semibold text-foreground">
                {result.nextBirthdayDays === 0
                  ? "Today! 🎂"
                  : `in ${result.nextBirthdayDays} days`}
              </span>
            </div>
          </div>

          {/* Share Button (No-Marketing Growth Loop) */}
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const text = `I calculated my age! I am ${result.years} years, ${result.months} months, and ${result.days} days old (lived ${result.totalDays.toLocaleString()} days so far!). Try it here: ${window.location.origin}${window.location.pathname}`;
                navigator.clipboard.writeText(text);
                const originalText = document.getElementById("share-btn-text");
                if (originalText) {
                  originalText.innerText = "Copied link to clipboard!";
                  setTimeout(() => {
                    originalText.innerText = "Share results";
                  }, 2000);
                }
              }}
              className="text-xs border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg flex items-center gap-1.5"
            >
              <Icon name="Share2" size={14} />
              <span id="share-btn-text">Share results</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
