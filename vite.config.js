import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";


export default defineConfig({
    mode: "dev",
    plugins: [
        symfonyPlugin(), // Symfony plugin
    ],
    build: {
        rollupOptions: {
            input: {
              app: "./assets/main.jsx"
            },
        },
    }
});
