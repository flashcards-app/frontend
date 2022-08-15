import { createPortal } from "react-dom"

import { ReactDivProps } from "../../../types"


const Portal = ({ children }: ReactDivProps) => {
	const mount = document.querySelector("#portals-root") as Element

	return createPortal(children, mount)
}

export default Portal
