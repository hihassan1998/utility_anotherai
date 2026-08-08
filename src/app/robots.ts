import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/llms.txt", "/llm.txt"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
