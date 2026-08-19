export const unitConverterGuide = {
  toolId: "unit-converter",
  title: "Multi-Category Unit Conversion & Science Guide",
  metaDescription: "Master unit conversions for Length, Weight, Temperature, Area, Volume, Speed, and Time. Understand the math formulas and factors behind conversions.",
  introduction: "Unit conversion is standard in international commerce, academic research, cooking, and engineering. Navigating between Metric and Imperial measures (e.g., kilograms to pounds, or Celsius to Fahrenheit) requires applying specific multiplier offsets. Our Unit Converter automates this math dynamically in 7 distinct categories.",
  useCases: [
    {
      title: "Cooking and Culinary Recipes",
      description: "Convert liquid and solid measures (such as ounces to grams, or milliliters to cups) when working with international recipe books."
    },
    {
      title: "Travel and Navigation",
      description: "Convert speed metrics (miles per hour to kilometers per hour) or temperature units (Fahrenheit to Celsius) while driving or vacationing abroad."
    },
    {
      title: "Engineering & Science Studies",
      description: "Perform fast translations of area (square meters to square feet) or length metrics (inches to millimeters) during draft layouts or homework checks."
    }
  ],
  examples: [
    {
      scenario: "Converting a Baking Temperature",
      steps: "Select 'Temperature' category, choose Fahrenheit as source and Celsius as target, and input '350'.",
      outcome: "The calculator outputs 176.7°C, which is the correct temperature to set on a European oven."
    },
    {
      scenario: "Checking Travel Distance Measurements",
      steps: "Select 'Length' category, choose Miles as source and Kilometers as target, and input '60'.",
      outcome: "You get 96.56 kilometers, allowing you to estimate travel times accurately."
    }
  ],
  faq: [
    {
      question: "Why is the Celsius to Fahrenheit conversion formula different?",
      answer: "Unlike linear length conversions, temperature scales have different starting offset points (freezing is 0°C but 32°F). The formula requires multiplying Celsius by 9/5 and then adding 32."
    },
    {
      question: "What is an average month length in time conversions?",
      answer: "Our converter utilizes standard astronomical averages (30.4368 days per average month) to ensure long-term conversion consistency."
    }
  ]
};
