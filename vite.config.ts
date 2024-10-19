import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    build: {
        outDir: './dist/web',
        emptyOutDir: true,
    },
    plugins: [
        react(),
        glsl({ compress: true }), 
        tsconfigPaths(),
        vanillaExtractPlugin({ identifiers: 'debug' }),
    ],
    publicDir: './fix',
    server: {
        hmr: true,
        port: 8080,
    },
});
