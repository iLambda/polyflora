import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        build: {
            outDir: './dist/electron/main',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, './src/electron/main/index.ts'),
                },
            },
        },
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            outDir: './dist/electron/preload',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, './src/electron/preload/index.ts'),
                },
            },
        },
    },
    renderer: {
        root: '.',
        build: {
            outDir: './dist/electron/renderer',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'index.html'),
                },
            },
        },
        publicDir: './fix',
        plugins: [
            react(),
            glsl({ compress: true }), 
            tsconfigPaths(),
            vanillaExtractPlugin({ identifiers: 'debug' }),
        ],
    },
});