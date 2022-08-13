import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"


const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState<boolean>()

	useEffect(() => {
		const userAgent = new UAParser(window.navigator.userAgent).getResult()

		setIsMobile(userAgent.device.type === "mobile")
	}, [window.navigator.userAgent])

	return isMobile
}

export default useIsMobile
