import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: "Dishcovery",
  optimizeDeps: {
    include: ['@clerk/clerk-react', 'firebase/firestore', 'react-icons/fa'],
  },
  build: {
    rollupOptions: {
      external: ['@clerk/clerk-react', 'firebase/firestore', 'react-icons/fa'],
    },
    assetsInlineLimit: 0,  // Ensures large assets are not inlined and are included as files in the output
  },
});


