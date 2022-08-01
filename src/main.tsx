import { Suspense, StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// @ts-expect-error react types not compatible yet.
import { createRoot } from 'react-dom/client'

import './setup'
import './styles/main.css'


import App from './App'
import ReactQuery from './components/ReactQuery/reactQuery'
import ProgressSpinner from './components/UI/Progress/ProgressSpinner'
import Plugins from "./plugins"


const Main = () => {
	Plugins()

	return (
		<StrictMode>
			<ReactQuery>
				<Suspense fallback={<ProgressSpinner/>}>
					<App/>
				</Suspense>
			</ReactQuery>
		</StrictMode>
	)
}


const root = createRoot(document.querySelector('#root') as Element)

root.render(
	<Router>
		<Main/>
	</Router>,
)
