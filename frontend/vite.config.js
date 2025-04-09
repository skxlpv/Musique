import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
      react(), tailwindcss()
  ],
  rollupOptions: {
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    output: {
      globals: {
        'react-dom': 'ReactDom',
        react: 'React',
        'react/jsx-runtime': 'ReactJsxRuntime',
      },
    },
  }
})
