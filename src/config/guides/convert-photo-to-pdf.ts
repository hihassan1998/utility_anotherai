export const convertPhotoToPdfGuide = {
  toolId: "convert-photo-to-pdf",
  title: "A Complete Guide to Converting Photos & Images to PDF Documents",
  metaDescription: "Learn how to convert JPG, PNG, WebP, GIF, and other image formats into a single PDF document. Optimize orientations, margins, and page layouts locally.",
  introduction: "Converting multiple images or photos into a single PDF document makes compiling reports, sharing receipts, sending scanned documents, and archiving memories easy. Our tool converts images of any browser-supported format entirely in your browser. All calculations are executed locally, meaning your files never leave your device, ensuring maximum privacy.",
  useCases: [
    {
      title: "Document & Receipt Archiving",
      description: "Convert photos of physical receipts, invoices, or signed contracts into clean, paginated PDF documents for digital bookkeeping."
    },
    {
      title: "Portfolio & Design Delivery",
      description: "Compile sketch pages, illustrations, mockups, or photographs into a single PDF portfolio for clients or team presentations."
    },
    {
      title: "Personal Photo Merging",
      description: "Combine family photos or trip highlights into a single downloadable PDF file for simple sharing and printing."
    }
  ],
  examples: [
    {
      scenario: "Converting scanned receipts into a single PDF",
      steps: "Upload your JPG or PNG receipt photos, reorder them chronologically using the move controls, set margins to 'Small' for a polished layout, and click Convert.",
      outcome: "A single multipage PDF document containing all your receipts formatted properly, ready for reimbursement submission."
    },
    {
      scenario: "Generating an image portfolio",
      steps: "Drag and drop high-resolution PNG mockups. Select 'Fit Image' for page size to preserve original dimensions without stretching. Name the output file 'portfolio.pdf' and download.",
      outcome: "A high-quality PDF document where each page perfectly matches the aspect ratio and resolution of your source designs."
    }
  ],
  faq: [
    {
      question: "Are my photos sent to any server for PDF conversion?",
      answer: "No. The conversion is processed entirely client-side using JavaScript in your browser. Your images are loaded into local memory and compiled directly into a PDF document, guaranteeing complete privacy."
    },
    {
      question: "Which image formats can I upload?",
      answer: "The tool supports any image format that your browser can parse. This includes JPG/JPEG, PNG, WebP, GIF (including animated ones, which render as static pages in PDF), SVG, BMP, AVIF, TIFF, and ICO."
    },
    {
      question: "How do I change the order of the images?",
      answer: "Once you upload your images, each image card displays a preview along with 'Move Up' and 'Move Down' buttons. Simply click these buttons to adjust their order in the final PDF document."
    },
    {
      question: "What if I need to perform advanced PDF editing?",
      answer: "For advanced operations such as password-protecting PDFs, compressing file sizes, OCR text recognition, or merging PDFs with existing PDF files, we recommend using a specialized service like [iLovePDF](https://www.ilovepdf.com/)."
    }
  ]
};
