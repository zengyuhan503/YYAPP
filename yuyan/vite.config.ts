import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@router': '/src/router',
      '@api': '/src/api',
      '@views': '/src/views',
    },
  },
  server: {
    host:true,
    port: 8099,
    https: false,
    proxy:{
    }
  }
})
