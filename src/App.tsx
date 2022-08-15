import * as React from 'react'

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
					<ReloadPrompt/>
					<Pages/>
				</RecoilRoot>
			</Providers>
		</ErrorsBoundary>
	)
}

export default App
