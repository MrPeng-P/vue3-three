import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router/config'
import App from './App.vue'
import './style.css'
// import './style/element/index.scss'
import store from './store/config'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'amfe-flexible'
const app = createApp(App)
console.log('%c ..........store.........','color:#31ef0e',store.state)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(store).use(router)
store.use(piniaPluginPersistedstate);

app.mount('#app')       