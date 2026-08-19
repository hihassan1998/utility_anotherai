export const dateDurationCalculatorGuide = {
  toolId: "date-duration-calculator",
  title: "Date Duration & Time Interval Calculation Guide",
  metaDescription: "Learn how to compute the exact duration between two dates. Ideal for legal periods, project timelines, and business milestone tracking.",
  introduction: "A Date Duration Calculator measures the exact duration between a start date and an end date. The output is provided in years, months, weeks, and days. This utility is essential for business contract calculations, legal notice periods, and project management timelines where dates must be calculated with high precision.",
  useCases: [
    {
      title: "Project Management & Gantt Scheduling",
      description: "Define project durations and phase lengths. Calculate how many days separate different project milestones to construct accurate schedules."
    },
    {
      title: "Legal and Contract Term Audits",
      description: "Ensure that lease agreements, employment contracts, and legal notice periods comply with specific duration requirements (e.g., 30-day or 90-day notices)."
    },
    {
      title: "Academic & Exam Planning",
      description: "Students can determine the exact calendar duration remaining before final exams or dissertation submission dates to organize study schedules."
    }
  ],
  examples: [
    {
      scenario: "Determining Lease Contract Durations",
      steps: "Enter the start date of the lease and the end date. Select 'Include end date' if the final day is inclusive.",
      outcome: "The calculator outputs the exact lease term (e.g., 1 year, 2 months, 15 days), simplifying monthly invoicing allocations."
    },
    {
      scenario: "Setting a Product Campaign Window",
      steps: "Enter the start and end dates of the marketing campaign.",
      outcome: "You get the exact duration (e.g., 6 weeks and 3 days), allowing the media buyer to budget ads accurately."
    }
  ],
  faq: [
    {
      question: "What does 'Include end date' mean?",
      answer: "By default, duration calculations count the nights between dates (exclusive of the last day). Selecting 'Include end date' adds 1 day to the total, making the duration inclusive of both the start and end dates."
    },
    {
      question: "Does this tool work for dates in the past?",
      answer: "Yes, you can calculate the duration between any two dates, whether they occur in the past, present, or future."
    }
  ]
};
