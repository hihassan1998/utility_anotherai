# AnoTool

**AnoTool** is a modern, light-speed, and privacy-focused online utility tools platform developed by [anotherAI](https://anotheraiplatform.com) for public use. 

Live Website: [anotool.com](https://anotool.com)

Calculations, conversions, and inputs run 100% locally in the browser, ensuring full user privacy with no backend data collection.

---

## 🚀 Key Features

*   **Word Counter**: Count words, characters, sentences, paragraphs, unique words, keyword density, and estimate reading/speaking times in real time.
*   **Character Counter**: Live character limit meters for Twitter/X, SMS, Meta Titles, Meta Descriptions, and LinkedIn posts with detailed character category breakdowns.
*   **Invoice Creator**: Build professional, print-ready corporate invoices tailored for general business or Swedish markets (supports F-skatt status, Moms tax calculation, Bankgiro, and customer reference codes).
*   **Age Calculator**: Get exact breakdowns of years, months, days, total days lived, day of the week, and live countdowns to birthdays with custom celebration elements.
*   **BMI Calculator**: Compute Body Mass Index for adults using Metric or Imperial systems, featuring an interactive color gauge and target weight ranges.
*   **Date Duration Calculator**: Compute duration between two calendar dates in years, months, weeks, days, hours, and minutes.
*   **Percentage Calculator**: Instantly calculate equations, discount percentages, and value increase/decrease metrics.
*   **Unit Converter**: Multi-category conversion supporting Length, Weight, Temperature, Area, Volume, Speed, and Time units.
*   **Days Until Calculator**: Calculate the remaining days, hours, and minutes to custom events, holidays, or milestones with our free, privacy-first countdown tool.
*   **Convert Photo to PDF**: Convert photos and images (JPG, PNG, WebP, GIF, SVG, BMP, AVIF, TIFF, ICO) to PDF format online for free. Adjust margins, layouts, orientation, and download instantly.
*   **Built-in SEO & FAQ Systems**: Implements JSON-LD breadcrumb and FAQ page schema tags on every route to trigger Google rich snippets automatically.
*   **No-Marketing Growth Loops**: Easy share-to-clipboard buttons on results containers generating custom status text for referral loops.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 15+ (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS & Vanilla CSS
*   **UI Components**: shadcn/ui (Radix Primitives)
*   **Theme Management**: `next-themes` (Dark/Light mode support)

---

## 📦 Getting Started & Installation

Follow these steps to run AnoTool locally:

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd utility_anotherai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## ⚙️ How to Add a New Tool

AnoTool is structured to let you deploy new tools in minutes:

1.  **Add Metadata**: Open [site.ts](file:///d:/AntigravityProjects/utility_anotherai/src/config/site.ts) and append a new tool object to the `tools` array defining the title, description, SEO keywords, target routing path, FAQs, and example cases.
2.  **Create Client Logic**: Create a client page calculator component under `src/components/tools/` (e.g. `MyNewCalculatorClient.tsx`).
3.  **Define Next.js Route**: Create a folder in `src/app/my-new-calculator/` and write a standard `page.tsx` that exports dynamic SEO metadata and renders your client layout wrapped by the core wrapper:
    ```tsx
    import { ToolLayout } from "@/components/tools/ToolLayout";
    import { MyNewCalculatorClient } from "@/components/tools/MyNewCalculatorClient";

    export default function Page() {
      return (
        <ToolLayout toolId="my-new-calculator">
          <MyNewCalculatorClient />
        </ToolLayout>
      );
    }
    ```
4.  **Create Guide Article**: Create a guide configuration file under `src/config/guides/[tool-id].ts` containing high-value use cases, scenarios, and FAQs. Import and register it inside [src/config/guides/index.ts](file:///d:/AntigravityProjects/utility_anotherai/src/config/guides/index.ts). The central `ToolLayout` will automatically link the calculator and guide pages bidirectionally to form a powerful internal linking web for search engines.
