import {
	useRoutes,
} from 'react-router-dom'
import routes from '~react-pages'

import ReloadPrompt from './components/ReloadPrompt'
import { RecoilRoot } from 'recoil'
import * as React from 'react'
import Providers from "./context"
import ErrorsBoundary from "./components/ErrorsBoundary"


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
