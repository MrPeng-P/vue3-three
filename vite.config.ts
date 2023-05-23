import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import analyze from "rollup-plugin-analyzer"
const pathSrc = path.resolve(__dirname, 'src')
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default ((mode) => {
  return defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_APP_NAME,
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['Operation'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver({importStyle: "sass"}),
        ],

        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),

      Icons({
        autoInstall: true,
      }),
    
    
    ],
    build: {
      rollupOptions: {
        plugins: [analyze()]
      },
    },
    // 别名配置
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        '@/assets': path.resolve(__dirname, "..", "src/assets"),
        '@': path.resolve(__dirname, './src'),
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/style/element/index.scss" as *;`
        }
      }
    },

  })
})
