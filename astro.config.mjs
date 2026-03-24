import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://aikodes-astro.netlify.app",
  integrations: [preact()]
});