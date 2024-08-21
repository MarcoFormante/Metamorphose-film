import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import viteReact from "@vitejs/plugin-react";


export default defineConfig({
    mode: "development",
    plugins: [
        viteReact(), // React plugin
        symfonyPlugin(), // Symfony plugin
    ],
    build: {
        manifest: true,
        rollupOptions: {
            input: {
                app: "./assets/main.jsx"
            },
        },
    },
});
