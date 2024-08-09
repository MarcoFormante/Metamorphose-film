import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import viteReact from "@vitejs/plugin-react";

/* if you're using React */
// import react from '@vitejs/plugin-react';

export default defineConfig({mode: "production",
    
    plugins: [
        viteReact(), // if you're using React */
        symfonyPlugin(),
    ],
    

    build: {
        rollupOptions: {
            input: {
                app: "./assets/main.jsx"
            },
        }
    },
   
    
});
