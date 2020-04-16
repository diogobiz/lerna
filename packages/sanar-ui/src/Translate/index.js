import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import pt from './locales/pt'
import en from './locales/en'

const I18n = i18next.createInstance()

I18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'pt',
        fallbackLng: 'pt',
        debug: true,
        resources: {
            pt: { sanarui: pt },
            en: { sanarui: en }
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    })

export default I18n
