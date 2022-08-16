import { Suspense } from 'react'

// @ts-expect-error react types not compatible yet.
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './setup'
import './styles/main.css'


import App from './App'
import ReactQuery from './components/ReactQuery/reactQuery'
import { ProgressSpinner } from './components/UI'
import Plugins from "./plugins"


const Main = () => {
	Plugins()

	return (
		<ReactQuery>
			<Suspense fallback={<ProgressSpinner/>}>
				<App/>
			</Suspense>
		</ReactQuery>
	)
}


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const root = createRoot(document.querySelector('#root') as Element)

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
root.render(
	<Router>
		<Main/>
	</Router>,
)
