import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 注意：前后一定要有斜杠 / ！！！
  base: '/lab-2026/', 
  plugins: [react()],
})
