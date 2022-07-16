import { useEffect } from 'react'
import { ReactElementProps } from "../../../types"
import { createPortal } from "react-dom"




const Portal = ({children}: ReactElementProps) => {
	const mount = document.querySelector("#portals-root")
	const el = document.createElement("div")

	useEffect(() => {
		mount?.appendChild(el)
		return () => {
			mount?.removeChild(el)
		}
	}, [el, mount]);

	return createPortal(children, el)
};

export default Portal
