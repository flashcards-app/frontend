import type { ReactDivProps } from 'types'
import { useEffect } from 'react'
import WindowVars from '../../../hooks/useWindowVars'
import MainProvider from './MainProvider'
import { useMain } from "../../../context"
import { css } from "@emotion/css"
import tw from "twin.macro"
import clsx from "clsx"
import theme from "../Utils/theme"
import { marginTransition } from "../Utils/transitions"
import Backdrop from "../Backdrop"


interface MainProps extends ReactDivProps {
	dark?: boolean
}


const Main = (props: MainProps) => {
	const { sideBarState: sideBar, sideBarOpts, overlayState, setSideBarState, setOverlayState } = useMain()

	const overlaysRoot    = document.querySelector('#portals-root')
	const { windowWidth } = WindowVars()

	const { children, className, dark } = props
	const { shrinkPoint }               = sideBarOpts

	useEffect(() => {
		if (overlaysRoot?.childNodes && overlaysRoot.childNodes.length > 0) {
			setOverlayState(true)
		} else if (overlaysRoot?.childNodes.length === 0) {
			setOverlayState(false)
		}
	}, [])


	const overlayAction = () => {
		if (sideBar) {
			setSideBarState(false)
			setOverlayState(false)
		}
	}

	const shouldApplyMargins = () => !!(shrinkPoint && sideBar && windowWidth > shrinkPoint)


	return (
		<MainProvider>
			<div {...props}
			     id="main"
			     className={css`
				     ${tw`h-full`}
				     ${[
					     theme.transitions([marginTransition()]),
					     theme.utils.conditionalMargins(shouldApplyMargins(), `${sideBarOpts.width as number}px`),
				     ]}
				     ${clsx(className)}
			     `}>


				<Backdrop {...{ dark }}
				          active={overlayState}
				          id="overlay-background"
				          role="presentation"
				          onClick={overlayAction}/>

				{children}

			</div>
		</MainProvider>
	)
}

Main.defaultProps = {
	dark:              undefined,
}

export default Main
