import { useRegisterSW } from 'virtual:pwa-register/react'

import { Card, Button, Portal } from "./UI"


const ReloadPrompt = () => {
	const {
		      offlineReady: [offlineReady, setOfflineReady],
		      needRefresh:  [needRefresh, setNeedRefresh],
		      updateServiceWorker,
	      } = useRegisterSW({
		// onRegistered(r) {
		// },
		// onRegisterError(error) {
		// },
	})

	const close = () => {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return (
		<Portal>
			{(offlineReady || needRefresh)
				&& (
					<Card
						width="500px"
						height="auto"
						className="alert flex-row shadow-lg opacity-90 absolute right-0 bottom-0 mb-5 mr-7">
						<div>
							{
								offlineReady ? <span>App ready to work offline</span>
									: <span>New content available, click on reload button to update.</span>
							}
						</div>

						{needRefresh && (
							<Button onClick={async () => updateServiceWorker(true)}>
								Reload
							</Button>
						)}
						<Button onClick={() => close()}>
							Close
						</Button>
					</Card>
				)}
		</Portal>
	)
}

export default ReloadPrompt
