import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 关键修复：把这里的名字换成你的 GitHub 仓库名，注意前后都要有斜杠 /
  base: '/lab-2026/', 
  plugins: [react()],
})
