import { useContext } from 'react'

import IconButton, { IconButtonProps } from '../Buttons/IconButton'
import { ThemeContext } from './ThemeContext'


const ThemeToggle = (props: IconButtonProps) => {
	const { theme, setTheme } = useContext(ThemeContext)

	const themeToggle = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<IconButton {...props} id="theme-toggle-button" onClick={themeToggle}>
			{theme === 'light' ? <IconCarbonLight/> : <IconCarbonMoon/>}
		</IconButton>
	)
}

export default ThemeToggle
