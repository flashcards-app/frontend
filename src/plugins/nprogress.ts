import { useEffect } from 'react'

import NProgress from 'nprogress'
import { useLocation } from 'react-router'


export default (): void => {
	const location = useLocation()

	useEffect(() => {
		NProgress.done()

		return () => {
			NProgress.start()
		}
	}, [location])
};
