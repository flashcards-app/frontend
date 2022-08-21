import React, { StrictMode } from 'react'

import {
	useRoutes,
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import ErrorsBoundary from "./components/ErrorsBoundary"
import ReloadPrompt from './components/ReloadPrompt'
import Providers from "./context"
import routes from '~react-pages'


function Pages(): React.ReactElement | null {
	return useRoutes(routes)
}

const App = () => {
	return (
		<ErrorsBoundary>
			<Providers>
				<RecoilRoot>
					<StrictMode>
						<ReloadPrompt/>
						<Pages/>
					</StrictMode>
				</RecoilRoot>
			</Providers>
		</ErrorsBoundary>
	)
}

export default App
