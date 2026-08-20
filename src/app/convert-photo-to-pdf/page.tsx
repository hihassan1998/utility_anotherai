import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ConvertPhotoToPdfClient } from "@/components/tools/ConvertPhotoToPdfClient";

export const metadata: Metadata = {
  title: "Convert Photo to PDF - Free Image to PDF Online",
  description: "Convert photos and images (JPG, PNG, WebP, GIF, SVG, BMP, AVIF, TIFF, ICO) to PDF format online for free. Adjust margins, layouts, orientation, and download instantly.",
  alternates: {
    canonical: "/convert-photo-to-pdf",
  },
};

export default function ConvertPhotoToPdfPage() {
  return (
    <ToolLayout toolId="convert-photo-to-pdf">
      <ConvertPhotoToPdfClient />
    </ToolLayout>
  );
}
