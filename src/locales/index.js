import { createI18n } from 'vue-i18n'
import messages from './locale'

export const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'vi',
  fallbackLocale: 'vi',
  messages,
  legacy: false
})

export function initI18n(app) {
  app.use(i18n)
}

export default i18n
