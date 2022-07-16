import { useContext } from 'react'
import type { ReactElementProps } from '../../../types'
import { defaultMainData, MainContext } from '../Main/MainContext'
import windowVariables from '../../../hooks/WindowVars'


const { sideBarOpts: defaultSideBarOptions } = defaultMainData
const { shrinkPoint: defaultShrinkPoint }    = defaultSideBarOptions

const SideBarLink = (props: ReactElementProps) => {
	const { children, ...restProps } = props

	const { sideBarState, sideBarOpts, setSideBarState } = useContext(MainContext)

	const { windowWidth } = windowVariables()

	const { shrinkPoint } = { shrinkPoint: defaultShrinkPoint, ...sideBarOpts }

	const action = () => {
		if (sideBarState && shrinkPoint && shrinkPoint > windowWidth) {
			setSideBarState(false)
		}
	}

	return (
		<div {...restProps}
		     role="presentation"
		     onClick={action}>
			{children}
		</div>
	)
}

export default SideBarLink
