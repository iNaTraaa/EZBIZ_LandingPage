import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import { i18n } from './locales'
import './assets/styles/tailwind.css'
import './assets/styles/main.scss'

const app = createApp(App)
app.use(Antd)
app.use(i18n)
app.mount('#app')
