export const bmiCalculatorGuide = {
  toolId: "bmi-calculator",
  title: "A Health Guide to BMI Calculations & Weight Classification",
  metaDescription: "Learn how the Body Mass Index (BMI) is calculated and categorized. Explore the healthy weight ranges for adults using Metric or Imperial metrics.",
  introduction: "The Body Mass Index (BMI) is a standard weight-for-height ratio used by healthcare practitioners to classify weight ranges (underweight, normal weight, overweight, and obesity) in adults. Understanding how your BMI is calculated is a helpful starting point for monitoring wellness and determining healthy weight targets.",
  useCases: [
    {
      title: "Health & Fitness Screening",
      description: "Quickly screen weight categories to identify potential health indicators. BMI is a standard starting point for fitness plans."
    },
    {
      title: "Tracking Weight Goals",
      description: "Monitor changes in weight categories over time as you progress through dietary, running, or exercise programs."
    },
    {
      title: "Medical Record Bookkeeping",
      description: "Keep records of BMI calculations for insurance, physical checkups, or wellness program checks."
    }
  ],
  examples: [
    {
      scenario: "Checking Weight Category (Metric)",
      steps: "Input weight (e.g., 70 kg) and height (e.g., 175 cm) in the metric tabs.",
      outcome: "The calculator outputs a BMI of 22.9, which lies securely in the 'Normal' weight category."
    },
    {
      scenario: "Auditing Target Fitness Goals",
      steps: "Enter your height and test different target weights to find which weights yield a normal BMI range (18.5 - 24.9).",
      outcome: "You identify a healthy target weight range (e.g., 57 kg to 76 kg for a height of 175 cm) to guide your nutrition goals."
    }
  ],
  faq: [
    {
      question: "What are the standard BMI classifications?",
      answer: "Underweight: BMI less than 18.5. Normal weight: 18.5 to 24.9. Overweight: 25.0 to 29.9. Obesity: 30.0 or higher."
    },
    {
      question: "Does BMI apply to athletes and bodybuilders?",
      answer: "BMI does not distinguish between muscle mass and fat. Highly muscular individuals or athletes may receive an 'overweight' score even if they have low body fat."
    }
  ]
};
