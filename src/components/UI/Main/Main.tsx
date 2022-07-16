import type { ReactElementProps } from 'types'
import i18n from 'i18next'
import {
	CSSProperties, useContext, useEffect, useRef, useState,
} from 'react'
import { MainContext } from './MainContext'
import WindowVars from '../../../hooks/WindowVars'
import MainProvider from './MainProvider'
import clsx from 'clsx'


const Main = (props: ReactElementProps) => {
	const {
		      sideBarState: sideBar,
		      setSideBarState,
		      sideBarOpts,
		      overlayState,
		      setOverlayState,
	      }                         = useContext(MainContext)
	const overlaysRoot              = document.getElementById('portals-root')
	const [mainStyle, setMainStyle] = useState<CSSProperties>({})
	const { windowWidth }           = WindowVars()

	const { children, className } = props
	const { shrinkPoint }         = sideBarOpts

	const dir = i18n.dir()

	useEffect(() => {
		if (overlaysRoot?.childNodes && overlaysRoot?.childNodes.length > 0) {
			setOverlayState(true)
		} else if (overlaysRoot?.childNodes.length === 0) {
			setOverlayState(false)
		}
	}, [])


	useEffect(() => {
		if (shrinkPoint && sideBar && windowWidth > shrinkPoint) {
			if (dir === 'ltr') {
				setMainStyle({
					marginLeft: `${sideBarOpts.width}px`,
				})
			} else {
				setMainStyle({
					marginRight: `${sideBarOpts.width}px`,
				})
			}
		} else {
			setMainStyle({})
		}
	}, [sideBar, dir])

	const overlayAction = () => {
		if (sideBar) {
			setSideBarState(false)
			if (overlaysRoot?.childNodes.length === 0) setOverlayState(false)
		}
	}

	return (
		<MainProvider>
			<div {...props} id="main" className={`h-full transition-all ease-out-in duration- ${clsx(className)}`} style={mainStyle}>

				<div id="overlay-background"
				     role="presentation"
				     onClick={overlayAction}
				     className={`opacity transition-opacity ease-out-in duration-400 dark:bg-dark-800
		                    ${overlayState ? 'fixed h-full w-full bg-dark-200 opacity-40 z-20' : 'opacity-0'}`}/>
				{children}
			</div>
		</MainProvider>
	)
}

export default Main
