import { useRegisterSW } from 'virtual:pwa-register/react'
import { Card, Button } from "./UI"


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
		<div className="ReloadPrompt-container">
			{(offlineReady || needRefresh)
				&& (
					<div className="fixed w-full h-full">
						<div className="absolute w-full h-full">
							<Card
								width="500px"
								height="60px"
								className="alert shadow-lg opacity-90 absolute right-0 bottom-0 mb-5 mr-7">
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
						</div>
					</div>
				)}
		</div>
	)
}

export default ReloadPrompt
