import { ageCalculatorGuide } from "./age-calculator";
import { bmiCalculatorGuide } from "./bmi-calculator";
import { dateDurationCalculatorGuide } from "./date-duration-calculator";
import { percentageCalculatorGuide } from "./percentage-calculator";
import { unitConverterGuide } from "./unit-converter";
import { wordCounterGuide } from "./word-counter";
import { characterCounterGuide } from "./character-counter";
import { freeInvoiceGeneratorGuide } from "./free-invoice-generator";
import { daysUntilCalculatorGuide } from "./days-until-calculator";

export interface GuideArticle {
  toolId: string;
  title: string;
  metaDescription: string;
  introduction: string;
  useCases: {
    title: string;
    description: string;
  }[];
  examples: {
    scenario: string;
    steps: string;
    outcome: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const guides: Record<string, GuideArticle> = {
  "age-calculator": ageCalculatorGuide,
  "bmi-calculator": bmiCalculatorGuide,
  "date-duration-calculator": dateDurationCalculatorGuide,
  "percentage-calculator": percentageCalculatorGuide,
  "unit-converter": unitConverterGuide,
  "word-counter": wordCounterGuide,
  "character-counter": characterCounterGuide,
  "free-invoice-generator": freeInvoiceGeneratorGuide,
  "days-until-calculator": daysUntilCalculatorGuide,
};
