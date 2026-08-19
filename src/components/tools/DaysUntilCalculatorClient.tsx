"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithInput } from "@/components/DatePickerWithInput";

interface PresetItem {
  name: string;
  month: number;
  day: number;
  icon: string;
}

const PRESETS: PresetItem[] = [
  { name: "New Year's Day", month: 1, day: 1, icon: "Sparkles" },
  { name: "Valentine's Day", month: 2, day: 14, icon: "Heart" },
  { name: "Summer Solstice", month: 6, day: 21, icon: "Sun" },
  { name: "Halloween", month: 10, day: 31, icon: "Skull" },
  { name: "Christmas", month: 12, day: 25, icon: "Gift" },
];

function getNextOccurrenceStr(month: number, day: number): string {
  const today = new Date();
  const year = today.getFullYear();
  let target = new Date(year, month - 1, day);
  target.setHours(0, 0, 0, 0);

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  if (todayMidnight > target) {
    target.setFullYear(year + 1);
  }

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function DaysUntilCalculatorClient() {
  const [eventName, setEventName] = React.useState("New Year's Day");
  const [targetDate, setTargetDate] = React.useState(() => getNextOccurrenceStr(1, 1));
  const [now, setNow] = React.useState<Date | null>(null);
  const [copied, setCopied] = React.useState(false);

  // Setup interval tick for real-time countdown updates on client side
  React.useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePresetSelect = (preset: PresetItem) => {
    setEventName(preset.name);
    setTargetDate(getNextOccurrenceStr(preset.month, preset.day));
  };

  const countdown = React.useMemo(() => {
    if (!now || !targetDate) return null;

    const [year, month, day] = targetDate.split("-").map(Number);
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      return null;
    }
    // Parse target date relative to local timezone midnight
    const target = new Date(year, month - 1, day, 0, 0, 0, 0);
    if (isNaN(target.getTime())) {
      return null;
    }
    const diffTime = target.getTime() - now.getTime();
    const isPast = diffTime <= 0;

    // Calculate exact calendar Months, Weeks, Days, Hours, Minutes, Seconds breakdown
    let yearsDiff = target.getFullYear() - now.getFullYear();
    let monthsDiff = target.getMonth() - now.getMonth();
    let totalMonths = yearsDiff * 12 + monthsDiff;

    // Project now forward by totalMonths to see if it exceeds target
    let testDate = new Date(now.getTime());
    testDate.setMonth(testDate.getMonth() + totalMonths);

    if (testDate > target) {
      totalMonths--;
    }

    const finalMonths = Math.max(0, totalMonths);
    const monthsProjected = new Date(now.getTime());
    monthsProjected.setMonth(monthsProjected.getMonth() + finalMonths);

    const remainingTime = target.getTime() - monthsProjected.getTime();
    const totalRemainingDays = Math.max(0, Math.floor(remainingTime / (1000 * 60 * 60 * 24)));

    const weeks = Math.floor(totalRemainingDays / 7);
    const days = totalRemainingDays % 7;
    const hours = Math.max(0, Math.floor((remainingTime / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((remainingTime / (1000 * 60)) % 60));
    const seconds = Math.max(0, Math.floor((remainingTime / 1000) % 60));

    // Also keep total days for simple displays or sharing if wanted
    const totalDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[target.getDay()];

    return {
      months: finalMonths,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      totalDays,
      isPast,
      dayOfWeek,
      targetFormatted: target.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }, [targetDate, now]);

  const handleShare = () => {
    if (!countdown) return;
    const nameStr = eventName.trim() ? eventName : "Target Date";
    let shareText = "";
    if (countdown.isPast) {
      shareText = `AnoTool: The event "${nameStr}" has already occurred! Calculate your own countdowns at: ${window.location.origin}/days-until-calculator`;
    } else {
      const parts = [];
      if (countdown.months > 0) parts.push(`${countdown.months} month${countdown.months > 1 ? "s" : ""}`);
      if (countdown.weeks > 0) parts.push(`${countdown.weeks} week${countdown.weeks > 1 ? "s" : ""}`);
      if (countdown.days > 0 || parts.length === 0) parts.push(`${countdown.days} day${countdown.days > 1 ? "s" : ""}`);
      parts.push(`${countdown.hours} hour${countdown.hours > 1 ? "s" : ""}`);
      parts.push(`${countdown.minutes} minute${countdown.minutes > 1 ? "s" : ""}`);

      const timeStr = parts.join(", ");
      shareText = `AnoTool: Only ${timeStr} remaining until "${nameStr}"! Calculate your countdown at: ${window.location.origin}/days-until-calculator`;
    }
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Milestone Directories */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
          Quick Preset Countdowns:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESETS.map((p) => {
            const isActive = eventName === p.name;
            return (
              <Button
                key={p.name}
                type="button"
                variant={isActive ? "default" : "outline"}
                onClick={() => handlePresetSelect(p)}
                className={`h-auto py-3 px-2 flex flex-col gap-1.5 justify-center items-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-md"
                    : "border-border/60 hover:bg-accent/40 text-muted-foreground hover:text-foreground"
                }`}
                aria-label={`Set countdown to ${p.name}`}
              >
                <Icon name={p.icon} size={18} className={isActive ? "text-white" : "text-emerald-500"} />
                <span className="text-[10px] font-bold tracking-tight">{p.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Input Config Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pt-2 border-t border-border/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="event-name" className="text-xs font-semibold">
              Event Name / Title
            </Label>
            <Input
              id="event-name"
              type="text"
              placeholder="e.g. Wedding, Exam, Graduation"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500 text-sm"
              maxLength={40}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-date" className="text-xs font-semibold">
              Target Date (Midnight Local Time)
            </Label>
            <DatePickerWithInput
              id="target-date"
              required
              value={targetDate}
              onChange={setTargetDate}
            />
          </div>
        </div>
      </form>

      {/* Countdown Visual Display Card */}
      {countdown ? (
        <div className="space-y-6 pt-4 border-t border-border/40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground">Time Remaining Until</h3>
            <h4 className="text-xl font-bold text-foreground truncate max-w-md mx-auto">
              {eventName.trim() ? eventName : "Target Date"}
            </h4>
          </div>

          {countdown.isPast ? (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 text-center text-rose-600 dark:text-rose-400">
              <Icon name="CalendarOff" size={32} className="mx-auto mb-2" />
              <p className="font-bold text-sm">The event has occurred!</p>
              <p className="text-xs opacity-90 mt-0.5">
                Target date was {countdown.targetFormatted}.
              </p>
            </div>
          ) : (
            <Tabs defaultValue="days" className="w-full">
              <div className="flex justify-center mb-4">
                <TabsList className="grid grid-cols-2 w-full max-w-md rounded-lg bg-muted/40 p-1">
                  <TabsTrigger value="days" className="rounded-md text-xs py-1.5 font-bold">
                    Total Days Countdown
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="rounded-md text-xs py-1.5 font-bold">
                    Months & Weeks Breakdown
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="days" className="mt-0 focus-visible:outline-none">
                <div className="grid grid-cols-4 gap-2.5">
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.totalDays.toLocaleString()}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Days
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.hours}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Hours
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.minutes}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Mins
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.seconds}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Secs
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-0 focus-visible:outline-none">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.months}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Months
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.weeks}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Weeks
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.days}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Days
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.hours}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Hours
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.minutes}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Mins
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-3 sm:p-4">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {countdown.seconds}
                      </span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Secs
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Detailed summary details card */}
          <div className="rounded-xl border border-border/30 bg-muted/10 p-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-border/20">
              <span className="text-muted-foreground">Target Date:</span>
              <span className="font-semibold text-foreground">{countdown.targetFormatted}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border/20">
              <span className="text-muted-foreground">Day of the Week:</span>
              <span className="font-semibold text-foreground">{countdown.dayOfWeek}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border/20">
              <span className="text-muted-foreground">Total Days:</span>
              <span className="font-semibold text-foreground">
                {countdown.isPast ? "0 days" : `${countdown.totalDays.toLocaleString()} days`}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-muted-foreground">Remaining Breakdown:</span>
              <span className="font-semibold text-foreground">
                {countdown.isPast
                  ? "Completed"
                  : `${countdown.months}m ${countdown.weeks}w ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m remaining`}
              </span>
            </div>
          </div>

          {/* Share Loop CTA Button */}
          <Button
            type="button"
            onClick={handleShare}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold py-2.5 shadow-sm"
            aria-label="Copy countdown status link to clipboard"
          >
            <Icon name={copied ? "Check" : "Share2"} size={14} />
            {copied ? "Countdown Copied!" : "Copy Countdown Summary"}
          </Button>
        </div>
      ) : (
        <div className="h-64 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
        </div>
      )}
    </div>
  );
}
