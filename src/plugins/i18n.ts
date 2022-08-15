import { useEffect } from 'react'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { LocalStorage } from 'modules/LocalStorage'
import moment from 'moment'

import { Vars } from "../modules/vars"


export type Language = 'en' | 'he';

const language = () => {
	const lang = LocalStorage.getLanguage() as string | undefined

	if (lang && !lang.includes('-')) return lang

	return (navigator.language).toString()
		.includes('-') ? (navigator.language).toString()
			.split('-')[0] as Language : (navigator.language).toString() as Language
}


(async () => await i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng:               language(),
		fallbackLng:       'en',
		returnEmptyString: false,
		keySeparator:      '.',
		interpolation:     {
			escapeValue: false,
			format:      (value, format): string => {
				if (value instanceof Date) {
					return moment(value)
						.format(format)
				}
				return value as string
			},
		},
		react:             {
			useSuspense: true,
		},
		backend:           {
			loadPath:       '/locales/{{lng}}/{{ns}}.yaml',
			requestOptions: {
				mode:        'cors',
				credentials: 'same-origin',
				cache:       'default',
			},
		},
	}))()

const setFallbackLanguage = (lang: Language) => {
	LocalStorage.setLanguage(lang)
	i18n.changeLanguage(lang)
		.then(() => {
			document.dir = i18n.dir(lang)
		})
		.catch((error) => {
			throw error
		})
}

export const i18nInstall = () => {
	const { i18n } = useTranslation()

	useEffect(() => {
		const language = LocalStorage.getLanguage()

		setFallbackLanguage(Vars.language.default)

		if (language.includes('-')) {
			setFallbackLanguage(Vars.language.default)
		}

		window.document.dir = i18n.dir(language)
	}, [])
}

//  when having mixed directions in text
//
//   {
//     "CC_LAST_DIGITS": "מס׳ כרטיס:\u200E **** **** **** 1234"
//   }
//
// left-to-right mark: ‎ or ‎ (U+200E)
//
// right-to-left mark: ‏ or ‏ (U+200F)
