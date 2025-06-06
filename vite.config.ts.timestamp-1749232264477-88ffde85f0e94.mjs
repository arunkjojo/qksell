// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
import eslintPlugin from "file:///home/project/node_modules/vite-plugin-eslint/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // ESLint options (optional)
      fix: false,
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
      // Adjust to your file types
      emitError: true,
      // Emit errors if any ESLint issue is found (this is key to aborting the build)
      emitWarning: true
      // Emit warnings
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "qksell",
        name: "QkSell Advts",
        short_name: "QkSell",
        description: "QkSell.in is free marketplace advertisement website. You can buy and sell anything you want.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: [
          "window-controls-overlay",
          "standalone",
          "minimal-ui",
          "fullscreen",
          "browser"
        ],
        background_color: "#ffffff",
        theme_color: "#128756",
        orientation: "portrait",
        dir: "ltr",
        lang: "en",
        categories: [
          "business",
          "finance",
          "news",
          "productivity",
          "social",
          "utilities",
          "shopping",
          "auto-vehicles"
        ],
        icons: [
          {
            src: "/images/maskable_icon_x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/images/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        shortcuts: [
          {
            name: "Main",
            url: "https://dev.qksell.in",
            description: "Main page"
          },
          {
            name: "Login",
            url: "https://dev.qksell.in/signin",
            description: "Login page"
          },
          {
            name: "New Post",
            url: "https://dev.qksell.in/newpost",
            description: "New post page"
          },
          {
            name: "Cart",
            url: "https://dev.qksell.in/cart",
            description: "Cart page"
          },
          {
            name: "Search",
            url: "https://dev.qksell.in/search",
            description: "Search page"
          }
        ],
        // Removed 'url_handlers' as it is not a valid property in 'Partial<ManifestOptions>'
        launch_handler: {
          client_mode: "navigate-new"
        },
        prefer_related_applications: true,
        scope_extensions: [
          {
            origin: "*.qksell.in"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/dev\.qksell\.in\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "qksell-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 60
                // 30 minutes
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@common": path.resolve(__vite_injected_original_dirname, "src"),
      "@api": path.resolve(__vite_injected_original_dirname, "src/api"),
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@context": path.resolve(__vite_injected_original_dirname, "src/context"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "src/hooks"),
      "@lib": path.resolve(__vite_injected_original_dirname, "src/lib"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@services": path.resolve(__vite_injected_original_dirname, "src/services"),
      "@store": path.resolve(__vite_injected_original_dirname, "src/store"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@ui": path.resolve(__vite_injected_original_dirname, "src/components/ui")
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZXNsaW50UGx1Z2luKHtcbiAgICAgIC8vIEVTTGludCBvcHRpb25zIChvcHRpb25hbClcbiAgICAgIGZpeDogZmFsc2UsXG4gICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnRzJywgJ3NyYy8qKi8qLnRzeCcsICdzcmMvKiovKi5qcycsICdzcmMvKiovKi5qc3gnXSwgLy8gQWRqdXN0IHRvIHlvdXIgZmlsZSB0eXBlc1xuICAgICAgZW1pdEVycm9yOiB0cnVlLCAvLyBFbWl0IGVycm9ycyBpZiBhbnkgRVNMaW50IGlzc3VlIGlzIGZvdW5kICh0aGlzIGlzIGtleSB0byBhYm9ydGluZyB0aGUgYnVpbGQpXG4gICAgICBlbWl0V2FybmluZzogdHJ1ZSwgLy8gRW1pdCB3YXJuaW5nc1xuICAgIH0pLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBpZDogJ3Frc2VsbCcsXG4gICAgICAgIG5hbWU6ICdRa1NlbGwgQWR2dHMnLFxuICAgICAgICBzaG9ydF9uYW1lOiAnUWtTZWxsJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdRa1NlbGwuaW4gaXMgZnJlZSBtYXJrZXRwbGFjZSBhZHZlcnRpc2VtZW50IHdlYnNpdGUuIFlvdSBjYW4gYnV5IGFuZCBzZWxsIGFueXRoaW5nIHlvdSB3YW50LicsXG4gICAgICAgIHN0YXJ0X3VybDogJy8nLFxuICAgICAgICBzY29wZTogJy8nLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIGRpc3BsYXlfb3ZlcnJpZGU6IFtcbiAgICAgICAgICBcIndpbmRvdy1jb250cm9scy1vdmVybGF5XCIsXG4gICAgICAgICAgXCJzdGFuZGFsb25lXCIsXG4gICAgICAgICAgXCJtaW5pbWFsLXVpXCIsXG4gICAgICAgICAgXCJmdWxsc2NyZWVuXCIsXG4gICAgICAgICAgXCJicm93c2VyXCJcbiAgICAgICAgXSxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMxMjg3NTYnLFxuICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0JyxcbiAgICAgICAgZGlyOiAnbHRyJyxcbiAgICAgICAgbGFuZzogJ2VuJyxcbiAgICAgICAgY2F0ZWdvcmllczogW1xuICAgICAgICAgICdidXNpbmVzcycsXG4gICAgICAgICAgJ2ZpbmFuY2UnLFxuICAgICAgICAgICduZXdzJyxcbiAgICAgICAgICAncHJvZHVjdGl2aXR5JyxcbiAgICAgICAgICAnc29jaWFsJyxcbiAgICAgICAgICAndXRpbGl0aWVzJyxcbiAgICAgICAgICAnc2hvcHBpbmcnLFxuICAgICAgICAgICdhdXRvLXZlaGljbGVzJyxcbiAgICAgICAgXSxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvaW1hZ2VzL21hc2thYmxlX2ljb25feDcyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzcyeDcyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9pbWFnZXMvbWFza2FibGVfaWNvbl94MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9pbWFnZXMvbWFza2FibGVfaWNvbl94NTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9pbWFnZXMvbWFza2FibGVfaWNvbl94NTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHNob3J0Y3V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdNYWluJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGV2LnFrc2VsbC5pbicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ01haW4gcGFnZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTG9naW4nLFxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9kZXYucWtzZWxsLmluL3NpZ25pbicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xvZ2luIHBhZ2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ05ldyBQb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGV2LnFrc2VsbC5pbi9uZXdwb3N0JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IHBvc3QgcGFnZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ2FydCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwczovL2Rldi5xa3NlbGwuaW4vY2FydCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NhcnQgcGFnZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnU2VhcmNoJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZGV2LnFrc2VsbC5pbi9zZWFyY2gnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZWFyY2ggcGFnZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gUmVtb3ZlZCAndXJsX2hhbmRsZXJzJyBhcyBpdCBpcyBub3QgYSB2YWxpZCBwcm9wZXJ0eSBpbiAnUGFydGlhbDxNYW5pZmVzdE9wdGlvbnM+J1xuICAgICAgICBsYXVuY2hfaGFuZGxlcjoge1xuICAgICAgICAgIGNsaWVudF9tb2RlOiAnbmF2aWdhdGUtbmV3JyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zOiB0cnVlLFxuICAgICAgICBzY29wZV9leHRlbnNpb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgb3JpZ2luOiAnKi5xa3NlbGwuaW4nLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZGV2XFwucWtzZWxsXFwuaW5cXC8uKi8sXG4gICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ3Frc2VsbC1jYWNoZScsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiAxMDAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogMzAgKiA2MCwgLy8gMzAgbWludXRlc1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQGNvbW1vbic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICdAYXBpJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcGknKSxcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgJ0Bjb250ZXh0JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZXh0JyksXG4gICAgICAnQGhvb2tzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpLFxuICAgICAgJ0BsaWInOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xpYicpLFxuICAgICAgJ0BwYWdlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZXMnKSxcbiAgICAgICdAc2VydmljZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3NlcnZpY2VzJyksXG4gICAgICAnQHN0b3JlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdG9yZScpLFxuICAgICAgJ0B1dGlscyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcbiAgICAgICdAdWknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMvdWknKSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQTtBQUFBLE1BRVgsS0FBSztBQUFBLE1BQ0wsU0FBUyxDQUFDLGVBQWUsZ0JBQWdCLGVBQWUsY0FBYztBQUFBO0FBQUEsTUFDdEUsV0FBVztBQUFBO0FBQUEsTUFDWCxhQUFhO0FBQUE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxRQUNSLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULGtCQUFrQjtBQUFBLFVBQ2hCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLEtBQUs7QUFBQSxRQUNM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
