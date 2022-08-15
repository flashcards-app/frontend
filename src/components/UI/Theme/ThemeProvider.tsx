import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import { LocalStorage } from '../../../modules/LocalStorage'
import { ThemeContext, getInitialTheme } from './ThemeContext'
import type { ThemeName, ThemeProviderOptions } from './types'


const rawSetTheme = (theme: ThemeName) => {
	const root   = window.document.documentElement
	const isDark = theme === 'dark'

	root.classList.remove(isDark ? 'light' : 'dark')
	root.classList.add(theme)

	LocalStorage.setTheme(theme)
}

const ThemeProvider = ({ children }: ThemeProviderOptions): ReactElement => {
	const [theme, setTheme] = useState<ThemeName>(getInitialTheme())

	useEffect(() => {
		rawSetTheme(theme)
	}, [theme])

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values -- should be re-rendered every time that values are changed - affects children theme
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<EmotionThemeProvider theme={{ isDark: theme === 'dark' }}>
				{children}
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
