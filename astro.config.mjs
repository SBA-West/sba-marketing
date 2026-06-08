import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Public marketing site for 1West SBA.
// Update `site` to the production domain before launch.
export default defineConfig({
  site: "https://sba.1west.com",
  integrations: [tailwind(), sitemap()],
  output: "static",
});
