import { createContext } from 'react'

import { LocalStorage } from '../../../modules/LocalStorage'
import { Vars } from '../../../modules/vars'
import type { ThemeContextType, ThemeName } from './types'


export const getInitialTheme = (): ThemeName => {
	const { theme } = Vars

	const storedTheme = LocalStorage.getTheme()
	if (storedTheme) {
		return storedTheme
	}

	const userMedia = window.matchMedia('(prefers-color-scheme:dark)')
	if (userMedia.matches) {
		return 'dark'
	}

	return theme.default
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
