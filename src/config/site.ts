export interface Tool {
  id: string;
  name: string;
  href: string;
  description: string;
  longDescription: string;
  iconName: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  examples: string[];
}

export const siteConfig = {
  name: "AnoTool",
  url: "https://anotool.com",
  description: "Free online utility tools for calculation, conversion, health, and productivity. SEO-optimized, fast, and accessible.",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "All Tools", href: "/all-tools" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
  tools: [
    {
      id: "age-calculator",
      name: "Age Calculator",
      href: "/age-calculator",
      iconName: "Calendar",
      description: "Calculate your exact age in years, months, days, and countdown to your next birthday.",
      longDescription: "Our free Age Calculator makes it easy to find your exact age. Enter your date of birth, and we'll calculate your age down to the years, months, and days. We also show your total days lived, days until your next birthday, and what day of the week you were born.",
      keywords: ["Age Calculator", "How old am I", "Birthday Calculator", "Calculate my age"],
      examples: [
        "Find your age in exact years, months, and days.",
        "Calculate total days lived since birth.",
        "See a live countdown in days, hours, and minutes to your next birthday."
      ],
      faqs: [
        {
          question: "How does the Age Calculator work?",
          answer: "It takes your date of birth and compares it with the current date, accounting for leap years and the varying number of days in different months, to give an exact breakdown of your age."
        },
        {
          question: "Is my personal birthdate data stored or saved?",
          answer: "No. All calculations are performed directly on your device inside the web browser. We do not store or transmit any personal data."
        },
        {
          question: "Does the calculator account for leap years?",
          answer: "Yes, leap years (which have 366 days instead of 365) are fully accounted for in all calculations of total days lived and time difference."
        }
      ]
    },
    {
      id: "bmi-calculator",
      name: "BMI Calculator",
      href: "/bmi-calculator",
      iconName: "Activity",
      description: "Calculate Body Mass Index (BMI) for adults using metric or imperial units.",
      longDescription: "Use this free BMI Calculator to compute your Body Mass Index (BMI) and determine if you are in a healthy weight category. It supports both metric (kilograms and centimeters) and imperial (pounds, feet, and inches) systems for adults.",
      keywords: ["BMI Calculator", "Body Mass Index Calculator", "Healthy BMI"],
      examples: [
        "Calculate BMI using imperial units (feet, inches, pounds).",
        "Calculate BMI using metric units (centimeters, kilograms).",
        "Find your healthy weight range based on height."
      ],
      faqs: [
        {
          question: "What is BMI?",
          answer: "Body Mass Index (BMI) is a simple measurement of a person's weight relative to their height. It is used to classify adults as underweight, normal weight, overweight, or obese."
        },
        {
          question: "What is a healthy BMI range?",
          answer: "According to the World Health Organization (WHO), a healthy BMI range for adults is between 18.5 and 24.9."
        },
        {
          question: "Does BMI apply to everyone?",
          answer: "BMI is a general guide. It might not be accurate for athletes, pregnant women, or bodybuilders, as it does not distinguish between muscle mass and fat mass."
        }
      ]
    },
    {
      id: "date-duration-calculator",
      name: "Date Duration Calculator",
      href: "/date-duration-calculator",
      iconName: "Clock",
      description: "Calculate the exact difference (duration) between two dates in years, months, weeks, and days.",
      longDescription: "Calculate the duration, number of days, weeks, months, or years between any two dates. This tool is perfect for project planning, tracking milestones, or figuring out how long ago an event occurred.",
      keywords: ["Date Duration Calculator", "Days Between Dates", "Date Difference"],
      examples: [
        "Calculate total days between today and a future deadline.",
        "Compute exact difference in years, months, and days between two historic dates.",
        "Include or exclude the start/end date in the total duration."
      ],
      faqs: [
        {
          question: "Can I include the end date in the calculation?",
          answer: "Yes, our tool provides an option to include the end date (add 1 day) in the duration result if you are calculating work days or inclusive schedules."
        },
        {
          question: "How many weeks are in the calculated duration?",
          answer: "The duration difference is broken down into years, months, weeks, and days, so you can see exactly how many complete weeks are between the dates."
        }
      ]
    },
    {
      id: "percentage-calculator",
      name: "Percentage Calculator",
      href: "/percentage-calculator",
      iconName: "Percent",
      description: "Quickly solve percentage equations, percentage increase/decrease, and discounts.",
      longDescription: "A multi-purpose percentage calculator that answers standard percentage questions, computes percentage increases or decreases, and helps you find final prices using the built-in discount calculator.",
      keywords: ["Percentage Calculator", "Percentage Increase", "Discount Calculator"],
      examples: [
        "Calculate a percentage of a number (e.g., what is 15% of 80?).",
        "Calculate percentage change (e.g., increase from 50 to 75).",
        "Find the final price after a 20% discount on a $120 item."
      ],
      faqs: [
        {
          question: "How do you calculate percentage increase?",
          answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100."
        },
        {
          question: "What is a discount calculator?",
          answer: "It calculates the final price of an item after applying a percentage discount. It also shows the exact amount of money saved."
        }
      ]
    },
    {
      id: "unit-converter",
      name: "Unit Converter",
      href: "/unit-converter",
      iconName: "RefreshCw",
      description: "Convert units of length, weight, temperature, area, volume, speed, and time.",
      longDescription: "Our comprehensive Unit Converter tool allows you to convert between metric and imperial units across multiple categories, including length, weight, temperature, area, volume, speed, and time.",
      keywords: ["Unit Converter", "Metric Converter", "Convert Units"],
      examples: [
        "Convert lengths (e.g., meters to feet, miles to kilometers).",
        "Convert temperatures (Celsius to Fahrenheit and vice versa).",
        "Convert weights (e.g., kilograms to pounds, ounces to grams)."
      ],
      faqs: [
        {
          question: "Is this converter up-to-date?",
          answer: "Yes, all conversion factors follow international standard conversion constants (e.g., 1 inch = 2.54 cm)."
        },
        {
          question: "Can I convert temperature directly?",
          answer: "Yes, our tool converts between Celsius, Fahrenheit, and Kelvin, accounting for the offset formulas (e.g., F = C * 1.8 + 32)."
        }
      ]
    },
    {
      id: "word-counter",
      name: "Word Counter",
      href: "/word-counter",
      iconName: "FileText",
      description: "Free online word counter to count words, characters, sentences, paragraphs, and estimate reading time in real-time.",
      longDescription: "Count words, characters (with and without spaces), sentences, paragraphs, and unique words instantly with our free Word Counter tool. Perfect for essays, blog posts, social media posts, and professional copy. Features real-time calculation, keyword density analysis, reading and speaking time estimates, and text case transformation tools.",
      keywords: ["Word Counter", "Count Words Online", "Word Count Tool", "Reading Time Calculator", "Text Statistics"],
      examples: [
        "Check word count for essays, blog posts, and articles.",
        "Calculate estimated reading time (200 wpm) and speaking time (130 wpm).",
        "Analyze top keyword density and unique word count in your text."
      ],
      faqs: [
        {
          question: "How does the Word Counter handle hyphenated words or extra spaces?",
          answer: "Hyphenated words like 'well-known' are counted according to standard grammar rules, and multiple spaces or line breaks are normalized so your word count remains accurate."
        },
        {
          question: "Is my pasted text stored or saved anywhere?",
          answer: "No. All word counting and text analysis happen locally in your web browser. Your text is private and never uploaded to any server."
        },
        {
          question: "How are reading and speaking times calculated?",
          answer: "Reading time is calculated using an average reading speed of 200 words per minute (wpm), while speaking time uses an average speaking speed of 130 words per minute."
        }
      ]
    },
    {
      id: "character-counter",
      name: "Character Counter",
      href: "/character-counter",
      iconName: "Hash",
      description: "Count characters, letters, numbers, spaces, and track social media character limits live.",
      longDescription: "Track your character counts in real-time with character limit meters for Twitter/X, SMS, Meta SEO titles, Meta descriptions, and LinkedIn posts. View detailed breakdowns for letters, digits, whitespace, line breaks, and special symbols.",
      keywords: ["Character Counter", "Letter Counter", "Twitter Character Counter", "SEO Title Character Count", "SMS Length Counter"],
      examples: [
        "Check character count for Twitter / X posts (280 character limit).",
        "Verify SEO Meta Title (60 characters) and Meta Description (160 characters) limits.",
        "Count exact characters with and without spaces for legal or academic documents."
      ],
      faqs: [
        {
          question: "Does the Character Counter count spaces and line breaks?",
          answer: "Yes, our tool shows both total characters (including spaces and line breaks) and character count excluding spaces."
        },
        {
          question: "What social media character limits are supported?",
          answer: "We provide live progress bars for Twitter / X (280 characters), SMS text messages (160 characters), Google SEO Titles (60 characters), Meta Descriptions (160 characters), and LinkedIn posts (3,000 characters)."
        },
        {
          question: "Are emojis counted properly?",
          answer: "Yes, Unicode emojis and special symbols are correctly processed and included in character counts."
        }
      ]
    },
    {
      id: "free-invoice-generator",
      name: "Free Invoice Generator",
      href: "/free-invoice-generator",
      iconName: "FileSpreadsheet",
      description: "Free online invoice generator to create and download professional PDF invoices instantly. Swedish & General market compatible.",
      longDescription: "Our Free Invoice Generator helps you build, preview, and download professional corporate invoices entirely in your browser. Fully compliant with both general standards and Swedish invoicing requirements (F-skatt, VAT/Moms rates, Bankgiro, and customer reference number). Upload a company logo, enter line items with custom VAT/Moms percentages, and generate a print-friendly A4 PDF document in seconds.",
      keywords: ["Free Invoice Generator", "Invoice Generator", "Invoice Maker", "Create Invoice Online", "Swedish Invoice Maker", "F-skatt Invoice", "Moms Calculator", "Bankgiro Invoice Template"],
      examples: [
        "Generate a general business invoice with custom logo, subtotal, and tax breakdowns.",
        "Create a Swedish market invoice specifying 'Godkänd för F-skatt' and Bankgiro details.",
        "Add multiple products or services with automatic VAT calculation (25%, 12%, 6%)."
      ],
      faqs: [
        {
          question: "Can I use this invoice generator for the Swedish market?",
          answer: "Yes. Our tool is optimized for Sweden, providing designated fields for F-skattsedel registration status ('Godkänd för F-skatt'), Moms (VAT) rates (25%, 12%, and 6%), Moms amounts in SEK, customer references (referensnummer), and Bankgiro/Plusgiro payment methods."
        },
        {
          question: "How do I download or save my created invoice as a PDF?",
          answer: "Click the 'Print / Download PDF' button. This will trigger your browser's native print interface where you can choose 'Save as PDF' as the destination. The print layout is specifically styled to hide the app layout, editor inputs, and margins for a perfectly formatted A4 document."
        },
        {
          question: "Is my billing and client data stored on your servers?",
          answer: "No. Privacy is our top priority. All invoice creation, logo image processing, and calculations happen 100% locally in your browser. None of your business, client, or financial information is uploaded or stored."
        }
      ]
    }
  ] as Tool[]
};
