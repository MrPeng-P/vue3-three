import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'
import path from 'path'
// https://vitejs.dev/config/
export default ((mode)=>{
  return defineConfig({
    base:loadEnv(mode, process.cwd()).VITE_APP_NAME,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 别名配置
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        '@/assets': path.resolve(__dirname, "..", "src/assets"),
        '@': path.resolve(__dirname, './src'),
  
      },
    },
  })
})
