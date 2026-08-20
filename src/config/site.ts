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
  googleAdSenseClientId: "ca-pub-7189074176587143",
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
      longDescription: "Our Age Calculator provides an exact calendar-based age calculation. Enter your date of birth, and the tool computes your age down to the years, months, and days, compensating for different month lengths and leap years. It also calculates the total days you have lived, the day of the week you were born on, and a live countdown to your next birthday.",
      keywords: ["Age Calculator", "How old am I", "Birthday Calculator", "Calculate my age"],
      examples: [
        "Calculate your exact age in years, months, and days relative to today's date.",
        "Determine the day of the week you were born (e.g., Monday, Wednesday).",
        "Count the total days you have been alive since birth, accounting for leap years."
      ],
      faqs: [
        {
          question: "How does the Age Calculator compute the days and months?",
          answer: "The calculator compares your birthdate to the current date. If the current day of the month is less than your birthday, it rolls back the month count by one and adds the total number of days in the previous month. Similarly, if the current month is less than your birth month, it rolls back the year."
        },
        {
          question: "Does the total days calculation account for leap years?",
          answer: "Yes. The total days lived is calculated by taking the absolute millisecond difference between your birthdate and the current date, then dividing by 86,400,000 milliseconds (one full day), which automatically captures the extra 366th day of every leap year."
        },
        {
          question: "Is my birthdate data private?",
          answer: "Yes. All calculations are executed client-side in your browser via local JavaScript. We do not store, track, or upload your birthdate to any external servers."
        }
      ]
    },
    {
      id: "bmi-calculator",
      name: "BMI Calculator",
      href: "/bmi-calculator",
      iconName: "Activity",
      description: "Calculate Body Mass Index (BMI) for adults using metric or imperial units.",
      longDescription: "Use this Body Mass Index (BMI) Calculator to compute weight-to-height ratios for adults. It supports both metric (kilograms and centimeters) and imperial (pounds, feet, and inches) systems. The tool maps your BMI to standard weight ranges (Underweight, Healthy, Overweight, Obese) and calculates your target healthy weight bounds. Note: BMI is a general statistical screening tool and is not a medical diagnosis.",
      keywords: ["BMI Calculator", "Body Mass Index Calculator", "Healthy BMI"],
      examples: [
        "Compute metric BMI using kilograms and height in centimeters.",
        "Compute imperial BMI using pounds and height in feet and inches.",
        "Determine the healthy weight range for your specific height."
      ],
      faqs: [
        {
          question: "What formulas are used to calculate BMI?",
          answer: "For metric units, the formula is: BMI = weight (kg) / (height (m) * height (m)). For imperial units, it converts height to meters (1 inch = 0.0254 m) and weight to kilograms (1 lb = 0.45359237 kg), then applies the same metric formula."
        },
        {
          question: "What are the standard BMI weight categories?",
          answer: "Underweight: BMI less than 18.5. Healthy Weight: BMI between 18.5 and 24.9. Overweight: BMI between 25 and 29.9. Obesity: BMI of 30 or greater."
        },
        {
          question: "What are the limitations of BMI?",
          answer: "BMI does not distinguish between muscle mass and body fat. Consequently, bodybuilders or athletes with high muscle mass may have an 'overweight' or 'obese' BMI score despite being healthy. It is also not a diagnostic tool and does not apply to pregnant women, growing children, or the elderly."
        }
      ]
    },
    {
      id: "date-duration-calculator",
      name: "Date Duration Calculator",
      href: "/date-duration-calculator",
      iconName: "Clock",
      description: "Calculate the exact difference (duration) between two dates in years, months, weeks, and days.",
      longDescription: "Calculate the duration, number of days, weeks, months, or years between two calendar dates. This tool handles historical dates, project milestones, and project planning. It features an option to include the end date in the final count, representing a full inclusive range.",
      keywords: ["Date Duration Calculator", "Days Between Dates", "Date Difference"],
      examples: [
        "Find the total days between two project milestones.",
        "Get a complete breakdown of years, months, weeks, and days between historical dates.",
        "Calculate work durations by choosing to include the end date."
      ],
      faqs: [
        {
          question: "What does the 'Include End Date' option do?",
          answer: "By default, duration calculations are exclusive of the end date (the difference between dates). Checking 'Include End Date' adds 1 day to the calculation, representing a fully inclusive time period (such as working schedules or event durations)."
        },
        {
          question: "How are months and years calculated when lengths vary?",
          answer: "The tool performs calendar-based comparisons. If the end day of the month is smaller than the start day, the day difference is offset using the length of the previous month. This ensures an exact calendar representation rather than a static average."
        }
      ]
    },
    {
      id: "percentage-calculator",
      name: "Percentage Calculator",
      href: "/percentage-calculator",
      iconName: "Percent",
      description: "Quickly solve percentage equations, percentage increase/decrease, and discounts.",
      longDescription: "A multi-purpose percentage tool that calculates common percentage-based calculations: finding a percentage of a value, calculating what percentage a number is of another, computing percentage increase or decrease between two values, and solving discount final prices.",
      keywords: ["Percentage Calculator", "Percentage Increase", "Discount Calculator"],
      examples: [
        "Determine a specific percentage of a total (e.g., 15% of $80 is $12).",
        "Calculate the percentage ratio of two numbers (e.g., 20 is 25% of 80).",
        "Find the percentage change between starting and ending values, such as growth rates.",
        "Apply a discount percentage to find the final price and total savings."
      ],
      faqs: [
        {
          question: "What is the formula for percentage increase or decrease?",
          answer: "To calculate percentage change: subtract the original value (X) from the new value (Y) to get the difference. Then divide the difference by the original value (X) and multiply by 100: Percentage Change = ((Y - X) / X) * 100. A positive result is an increase, and a negative result is a decrease."
        },
        {
          question: "How does the discount calculator work?",
          answer: "It takes the original price and applies the formula: Saved Amount = Price * (Discount / 100). The final price is then calculated as: Final Price = Original Price - Saved Amount."
        }
      ]
    },
    {
      id: "unit-converter",
      name: "Unit Converter",
      href: "/unit-converter",
      iconName: "RefreshCw",
      description: "Convert units of length, weight, temperature, area, volume, speed, and time.",
      longDescription: "Convert values between metric and imperial systems across length, weight/mass, temperature, area, volume, speed, and time. The tool converts the input to a standardized base unit using standard international factors, and then converts it to the target unit for maximum precision.",
      keywords: ["Unit Converter", "Metric Converter", "Convert Units"],
      examples: [
        "Convert length units: meters, kilometers, centimeters, miles, yards, feet, and inches.",
        "Convert temperature units between Celsius, Fahrenheit, and Kelvin.",
        "Convert volume units: liters, milliliters, gallons, quarts, pints, and cups."
      ],
      faqs: [
        {
          question: "How does the temperature converter calculate Celsius, Fahrenheit, and Kelvin?",
          answer: "Conversions use exact offset formulas. For example, Fahrenheit to Celsius uses: C = (F - 32) * 5 / 9. Kelvin to Celsius uses: C = K - 273.15. Celsius to Fahrenheit uses: F = (C * 9 / 5) + 32. Kelvin conversions first convert to Celsius, then add 273.15."
        },
        {
          question: "What average values are used for month and year conversions in the Time tab?",
          answer: "Because month and year lengths vary, the converter uses standardized astronomical averages: an average month is defined as 30.4368 days (2,629,746 seconds) and an average year is defined as 365.2425 days (31,556,952 seconds), which accounts for leap years."
        }
      ]
    },
    {
      id: "word-counter",
      name: "Word Counter",
      href: "/word-counter",
      iconName: "FileText",
      description: "Free online word counter to count words, characters, sentences, paragraphs, and estimate reading time in real-time.",
      longDescription: "An online text analysis tool that counts words, characters (with and without spaces), sentences, and paragraphs in real-time. It estimates reading and speaking times based on word averages and analyzes keyword density to show your most frequent terms.",
      keywords: ["Word Counter", "Count Words Online", "Word Count Tool", "Reading Time Calculator", "Text Statistics"],
      examples: [
        "Analyze word, character, sentence, and paragraph counts for essays or articles.",
        "Get estimates for how long it takes to read or speak a piece of copy.",
        "Identify the top 5 most frequently used words to optimize keyword density."
      ],
      faqs: [
        {
          question: "How are words, sentences, and paragraphs defined by the counter?",
          answer: "Words are counted by splitting text on whitespace sequences. Characters are measured with and without spaces. Sentences are counted using regular expressions that look for punctuation marks (. ! ?) followed by spaces or the end of the text. Paragraphs are counted by splitting the text at line breaks."
        },
        {
          question: "How are reading and speaking times calculated?",
          answer: "The tool uses standard speech and reading statistics: reading time is calculated using an average reading speed of 200 words per minute (WPM), and speaking time is calculated at an average speed of 130 words per minute."
        }
      ]
    },
    {
      id: "character-counter",
      name: "Character Counter",
      href: "/character-counter",
      iconName: "Hash",
      description: "Count characters, letters, numbers, spaces, and track social media character limits live.",
      longDescription: "Track character limits and counts in real-time. The tool monitors spaces, line breaks, digits, and special symbols, and provides live progress bars for common social media and SEO character limits (Twitter/X, SMS, Meta Titles, Meta Descriptions, and LinkedIn posts).",
      keywords: ["Character Counter", "Letter Counter", "Twitter Character Counter", "SEO Title Character Count", "SMS Length Counter"],
      examples: [
        "Monitor character limits for Twitter/X posts (280 characters max).",
        "Check SEO Meta Title (60 characters) and Meta Description (160 characters) lengths.",
        "Count exact letter, number, space, and symbol breakdowns in legal or academic drafts."
      ],
      faqs: [
        {
          question: "What is the difference between total characters and characters without spaces?",
          answer: "Total characters includes every letter, number, special symbol, space, tab, and line break. Characters without spaces strips all whitespace characters from the text before measuring the length."
        },
        {
          question: "Are emojis counted as characters?",
          answer: "Yes. In standard JavaScript, emojis are measured by their code unit length (usually 2 or more code units per emoji), which matches how modern platforms like Twitter/X and SMS analyze lengths."
        }
      ]
    },
    {
      id: "free-invoice-generator",
      name: "Free Invoice Generator",
      href: "/free-invoice-generator",
      iconName: "FileSpreadsheet",
      description: "Free online invoice generator to create and download professional PDF invoices instantly. Swedish & General market compatible.",
      longDescription: "",
      keywords: ["Free Invoice Generator", "Invoice Generator", "Invoice Maker", "Create Invoice Online", "Swedish Invoice Maker", "F-skatt Invoice", "Moms Calculator", "Bankgiro Invoice Template"],
      examples: [],
      faqs: []
    },
    {
      id: "days-until-calculator",
      name: "Days Until Calculator",
      href: "/days-until-calculator",
      iconName: "Hourglass",
      description: "Calculate the remaining days, hours, and minutes to custom events, holidays, or milestones with our free countdown tool.",
      longDescription: "Calculate the exact time remaining until any upcoming date, holiday, or personal milestone. Choose from our list of popular presets like Christmas, New Year, or Halloween, or input your own custom event to see a live countdown breakdown in days, hours, minutes, and seconds.",
      keywords: ["Days Until Calculator", "How many days until Christmas", "Custom Countdown Timer online", "Weeks until New Year", "Countdown Calculator"],
      examples: [
        "Find how many days are left until next Christmas or New Year's Day.",
        "Set up a custom countdown for an upcoming wedding, exam, or retirement.",
        "View a live time breakdown down to the exact second."
      ],
      faqs: [
        {
          question: "How does the Days Until Calculator compute the time remaining?",
          answer: "The calculator takes your specified target date and time (adjusted for midnight in your local timezone) and subtracts the current system date and time. It converts this difference in milliseconds into days, hours, minutes, and seconds."
        },
        {
          question: "Does the countdown account for timezone differences?",
          answer: "All calculations are done locally using your browser's current timezone settings. The countdown matches when the event reaches midnight or your specified hour in your local timezone."
        },
        {
          question: "Can I share my custom countdown with others?",
          answer: "Yes. Once you configure a custom event title and target date, you can click the copy share button to copy the countdown summary text to your clipboard."
        }
      ]
    },
    {
      id: "convert-photo-to-pdf",
      name: "Convert Photo to PDF",
      href: "/convert-photo-to-pdf",
      iconName: "FileImage",
      description: "Convert photos and images to PDF format online for free. Adjust margins, page orientation, layout sizes, and download instantly.",
      longDescription: "Our free online Convert Photo to PDF tool allows you to convert multiple images (JPG, PNG, WebP, GIF, SVG, BMP, AVIF, TIFF, ICO) into a single PDF document in seconds. Reorder images, customize page size (A4, Letter, Fit), layout orientation (Portrait, Landscape, Auto), and margins to generate clean PDF files. All processing happens locally in your browser, ensuring 100% data privacy with no backend uploads.",
      keywords: ["Convert Photo to PDF", "Image to PDF Converter", "JPG to PDF Online", "PNG to PDF Free", "Photos to PDF Converter"],
      examples: [
        "Convert multiple JPG/PNG images into a single formatted PDF document.",
        "Combine family photos or receipts into a clean, paginated PDF file.",
        "Adjust output page sizes (like A4 or US Letter) and margins for print layouts."
      ],
      faqs: [
        {
          question: "How does the Image to PDF converter work?",
          answer: "The tool loads your images directly in your browser. Using JavaScript, it measures the image dimensions, places them onto PDF pages according to your selected margins, orientation, and layout sizes, and generates a downloadable PDF file. No images are sent to any external server."
        },
        {
          question: "Which image formats are supported?",
          answer: "We support all standard browser-compatible image formats including JPEG (.jpg, .jpeg), PNG, WebP, GIF, SVG, BMP, AVIF, TIFF, and ICO."
        },
        {
          question: "Is there a file limit or upload count constraint?",
          answer: "Since the tool runs entirely client-side using your browser's memory, there are no artificial upload limits. However, processing exceptionally large batches of high-resolution images may depend on your device's available memory. If you require advanced batch processing, page compression, or complex PDF merges, we recommend using dedicated services like [iLovePDF](https://www.ilovepdf.com/)."
        }
      ]
    }
  ] as Tool[]
};
