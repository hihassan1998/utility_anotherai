# AnoTool: Domain, Indexing & Monetization Playbook

Follow these exact steps next week to buy your domain, link it to Vercel, submit sitemaps, and enable ad earnings.

---

## Phase 1: Buy Domain & Connect to Vercel

### Step 1. Buy the Domain on Cloudflare
Cloudflare offers domains at wholesale registry cost (no markups) and provides free WHOIS privacy protection.
1. Go to [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) and sign up.
2. Search for **`anotool.com`** (or your preferred variation) and purchase it.

### Step 2. Add Domain on Vercel
1. Go to your Vercel Dashboard, select your deployed **`utility_anotherai`** project.
2. Navigate to **Settings > Domains**.
3. Type `anotool.com` and click **Add**.
4. Vercel will ask you to add standard DNS records. It will display:
   - An **A Record** pointing to Vercel's IP address (e.g., `76.76.21.21`).
   - A **CNAME Record** for `www.anotool.com` pointing to `cname.vercel-dns.com`.

### Step 3. Configure DNS on Cloudflare
1. Go to your Cloudflare dashboard and select your domain.
2. Click **DNS > Records**.
3. Add the **A Record** and **CNAME Record** copied from Vercel.
4. **Important**: Set the Proxy status to **DNS Only** (Grey Cloud icon) for Vercel's SSL verification to succeed instantly. You can change it to Proxied (Orange Cloud) later if you want.

---

## Phase 2: Indexing on Search Engines (Passive Traffic)

### Step 1. Google Search Console (GSC)
1. Visit [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain verification** and type `anotool.com`.
3. Copy the TXT verification record.
4. Go to **Cloudflare DNS**, add a new **TXT Record** with Name `@` and the value you copied.
5. Go back to GSC and click **Verify**.
6. Navigate to **Sitemaps** on the left menu, enter `https://anotool.com/sitemap.xml`, and click **Submit**.

### Step 2. Bing Webmaster Tools
1. Visit [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Log in and select **Import from Google Search Console**.
3. Give Bing permission to read your GSC properties. This instantly verifies your site on Bing without adding any more DNS records, and automatically imports your sitemap.

### Step 3. Yandex Webmaster
1. Visit [Yandex Webmaster](https://webmaster.yandex.com/).
2. Add `https://anotool.com`.
3. Choose the **Meta tag** verification method, copy the tag, and paste it into the `<head>` of your `src/app/layout.tsx` file temporarily (or verify via DNS TXT record on Cloudflare).
4. Go to **Indexing > Sitemap files** in Yandex and submit `https://anotool.com/sitemap.xml`.

---

## Phase 3: Monetization (Google AdSense & Parallel Networks)

### Step 1. Google AdSense Setup
1. Go to [Google AdSense](https://adsense.google.com/) and register.
2. Add your site `anotool.com`.
3. AdSense will generate a code snippet. Place it in the `<head>` of your root `src/app/layout.tsx`.
4. Create an `ads.txt` file inside your project's `/public` folder with the publisher ID provided by AdSense (e.g. `google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0`).
5. Submit your site for review (reviews typically take 2–14 days).

### Step 2. Parallel Ad Networks (Can run at the same time as AdSense)
You can run these networks next to Google AdSense to maximize your CPM rates. They are entirely **free to join** as a publisher (they only take a rev-share cut of the ad earnings they generate for you):

#### A. Media.net (Contextual Ads - Free Publisher Account)
Ideal for utility sites because it serves search-intent keywords.
1. Sign up for a free publisher account at [pub.media.net](https://pub.media.net/).
2. Submit `anotool.com` for approval.
3. Once approved, use their Ad Builder to generate native search layout cards.
4. Copy the generated JavaScript scripts.
5. Place them directly inside the `<AdPlaceholder />` slots in your code (or paste into `<head>` / page components).
6. Merge their lines into your `/public/ads.txt` file (they will provide their exact seller rows).

#### B. Ezoic (Free Publisher Integration via Access Program)
Ezoic uses AI to test layout variants. They have a **"Lasso" / "Access" Program** with **no minimum traffic threshold** that is completely free (no setup fees).
1. Sign up at [ezoic.com/access/](https://www.ezoic.com/access/).
2. Connect `anotool.com` by pointing your Cloudflare DNS nameservers to Ezoic (their dashboard will guide you through this; they route traffic to speed up site caching).
3. Complete their free Ad Setup course (takes 10 minutes to verify your identity).
4. Turn on **Auto-Ad Placements**. Ezoic will automatically crawl your site, detect where the shadcn layout containers are, and place optimized ad units.
5. Setup their **ads.txt manager** tool to combine Google AdSense and Ezoic sellers seamlessly.

#### C. Carbon Ads / EthicalAds (Free, targeted developer banners)
Specifically targeted for developer/tech tools. They display a single, highly clean, privacy-focused ad. They pay on a cost-per-click (CPC) or cost-per-impression (CPM) model and are rarely blocked by AdBlockers. You can apply for free at [carbonads.net](https://www.carbonads.net/).
