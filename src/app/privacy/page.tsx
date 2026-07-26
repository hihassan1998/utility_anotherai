import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we protect your data and cookies usage.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gradient">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: July 19, 2026
        </p>
      </div>

      <Card className="glass-card border border-border/50">
        <CardContent className="p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Introduction</h2>
            <p>
              At <strong>{siteConfig.name}</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {siteConfig.name} and how we use it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Information Collection</h2>
            <p>
              All calculations performed by our tools occur locally on your machine via JavaScript. We do not transmit, collect, or store any data you input into our calculation or conversion fields.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. Log Files</h2>
            <p>
              {siteConfig.name} follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">5. Advertising Partners</h2>
            <p>
              Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google AdSense</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">6. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
