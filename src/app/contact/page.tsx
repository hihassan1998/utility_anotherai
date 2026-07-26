"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icon } from "@/components/Icon";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8acf92f6-a0b8-403e-add0-a988dc36a32b", // User's generated Web3Forms key
          name,
          email,
          message,
          subject: `New Contact Form Submission on AnoTool from ${name}`,
          from_name: "AnoTool Contact Form",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gradient">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Have suggestions, feature requests, or questions? Send us a message and we'll get back to you.
        </p>
      </div>

      <Card className="glass-card border border-border/50">
        <CardContent className="p-8">
          {submitted ? (
            <div className="space-y-4 text-center py-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Icon name="Check" size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Thank you for reaching out. We have received your message and will respond as soon as possible.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs border-border bg-transparent hover:bg-accent rounded-lg"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/30 border-muted-foreground/15 rounded-lg focus-visible:ring-emerald-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-semibold">
                  Message
                </Label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex w-full rounded-lg border border-muted-foreground/15 bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="rounded-lg text-xs py-2 bg-destructive/10 border-destructive/20 text-destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  "Submit Message"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
