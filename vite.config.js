import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "vendor-react",
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom)/,
              priority: 20,
            },
            {
              name: "vendor-motion",
              test: /node_modules[\\/]framer-motion/,
              priority: 15,
            },
            {
              name: "vendor-gsap",
              test: /node_modules[\\/]gsap/,
              priority: 15,
            },
          ],
        },
      },
    },
  },
});
