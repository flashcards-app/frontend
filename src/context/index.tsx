import { FC, ReactElement, useContext } from "react"

import { MainContext } from "../components/UI/Main/MainContext"
import MainProvider from "../components/UI/Main/MainProvider"
import { ThemeContext } from "../components/UI/Theme/ThemeContext"
import ThemeProvider from "../components/UI/Theme/ThemeProvider"
import CombineComponents from "./CombineComponents"


export interface ProvidersProps {
	children: ReactElement;
}

const providers = [
	ThemeProvider,
	MainProvider,
]

export const AppContextProvider = CombineComponents(...providers as FC[])

const Providers = (props: ProvidersProps) => {
	return (
		<AppContextProvider>
			{props.children}
		</AppContextProvider>
	)
}

export const useTheme = () => useContext(ThemeContext)

export const useMain = () => useContext(MainContext)

export const useThemeValue = () => useTheme().theme

export default Providers
