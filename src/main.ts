import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router/config'
import App from './App.vue'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia).use(router)
app.mount('#app')