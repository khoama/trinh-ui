import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isLibraryBuild = env.BUILD_MODE === 'library';
    
    if (isLibraryBuild) {
      // Library build configuration
      return {
        plugins: [react()],
        build: {
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'TrinhUI',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', 'lucide-react'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'react/jsx-runtime',
                'framer-motion': 'FramerMotion',
                'lucide-react': 'LucideReact',
              },
            },
          },
          sourcemap: true,
          emptyOutDir: true,
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, '.'),
          }
        }
      };
    }
    
    // Documentation site build configuration
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
