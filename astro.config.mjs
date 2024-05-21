import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth(), react()],
  output: "server",
  devToolbar: {
    enabled: false
  },
  adapter: node({
    mode: "standalone"
  })
});