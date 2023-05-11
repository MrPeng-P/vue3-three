import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router/config'
import App from './App.vue'
import './style.css'
import './style/element/style.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia).use(router)
app.mount('#app')