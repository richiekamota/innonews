import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        // Remove or set `open: false` to prevent Vite from trying to open the browser
        host: true,
        open: false,
        watch: {
            usePolling: true,
         },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
        ],
    },
    build: {
        rollupOptions: {
            input: './index.html', // Specify the path to your entry HTML file
        },
    },
});
