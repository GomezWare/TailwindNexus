import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  devToolbar: {
    enabled: false
  },
  adapter: node({
    mode: "standalone"
  })
});