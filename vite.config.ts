import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // ESLint options (optional)
      fix: false,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'], // Adjust to your file types
      emitError: true, // Emit errors if any ESLint issue is found (this is key to aborting the build)
      emitWarning: true, // Emit warnings
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: 'qksell',
        name: 'QkSell Advts',
        short_name: 'QkSell',
        description: 'QkSell.in is free marketplace advertisement website. You can buy and sell anything you want.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: [
          "window-controls-overlay",
          "standalone",
          "minimal-ui",
          "fullscreen",
          "browser"
        ],
        background_color: '#ffffff',
        theme_color: '#128756',
        orientation: 'portrait',
        dir: 'ltr',
        lang: 'en',
        categories: [
          'business',
          'finance',
          'news',
          'productivity',
          'social',
          'utilities',
          'shopping',
          'auto-vehicles',
        ],
        icons: [
          {
            src: '/images/maskable_icon_x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Main',
            url: 'https://dev.qksell.in',
            description: 'Main page',
          },
          {
            name: 'Login',
            url: 'https://dev.qksell.in/signin',
            description: 'Login page',
          },
          {
            name: 'New Post',
            url: 'https://dev.qksell.in/newpost',
            description: 'New post page',
          },
          {
            name: 'Cart',
            url: 'https://dev.qksell.in/cart',
            description: 'Cart page',
          },
          {
            name: 'Search',
            url: 'https://dev.qksell.in/search',
            description: 'Search page',
          },
        ],
        // Removed 'url_handlers' as it is not a valid property in 'Partial<ManifestOptions>'
        launch_handler: {
          client_mode: 'navigate-new',
        },
        prefer_related_applications: true,
        scope_extensions: [
          {
            origin: '*.qksell.in',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/dev\.qksell\.in\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'qksell-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 60, // 30 minutes
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
