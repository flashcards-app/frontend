import { useEffect } from "react"

import type { Language } from 'plugins/i18n'

import { useMain } from "../context"
import { LocalStorage } from "../modules/LocalStorage"
import { IconButton } from './UI'
import { IconButtonProps } from "./UI/Buttons/IconButton"


const LanguageSelector = (props: IconButtonProps) => {
	const { i18n }                 = useTranslation()
	const { setDisableAnimations } = useMain()

	const changeLanguage = async (language: Language): Promise<void> => {
		setDisableAnimations(true)
		await i18n.changeLanguage(language)
		LocalStorage.setLanguage(language)
		document.dir = i18n.dir()
	}

	useEffect(() => {
		setDisableAnimations(false)
	})

	const languageToggle = async (): Promise<void> => {
		await changeLanguage(i18n.language === 'en' ? 'he' : 'en')
	}

	return (
		<IconButton {...props} className="block" id="language-toggle-button" onClick={languageToggle}>
			<IconCarbonLanguage/>
		</IconButton>
	)
}

export default LanguageSelector
