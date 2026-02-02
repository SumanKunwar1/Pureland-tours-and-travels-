import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Determine proxy target based on environment
  let proxyTarget = 'http://localhost:5000'; // Default for development
  
  if (mode === 'production' && env.VITE_API_URL) {
    // In production, use the production API URL
    proxyTarget = env.VITE_API_URL;
  } else if (env.VITE_API_URL) {
    // In development, use VITE_API_URL if set
    proxyTarget = env.VITE_API_URL;
  }
  
  // Remove trailing slash if present
  if (proxyTarget.endsWith('/')) {
    proxyTarget = proxyTarget.slice(0, -1);
  }
  
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
      // Proxy configuration
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          // Add these additional options for better compatibility
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxying:', req.method, req.url, '→', proxyTarget);
            });
          }
        }
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Build configuration for production
    build: {
      outDir: 'dist',
      sourcemap: mode === 'production' ? false : true,
      // Add these for production optimization
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['framer-motion', 'lucide-react'],
          }
        }
      }
    }
  }
});