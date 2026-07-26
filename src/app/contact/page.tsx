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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Simulate submission locally
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
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

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">
                Submit Message
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
