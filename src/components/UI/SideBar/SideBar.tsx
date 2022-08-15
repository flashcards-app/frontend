import { useEffect } from 'react'

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import clsx from 'clsx'
import { HTMLMotionProps, motion } from "framer-motion"
import tw from "twin.macro"

import { useMain } from "../../../context"
import windowVariables from '../../../hooks/useWindowVars'
import { defaultMainData } from '../Main/MainContext'
import theme from "../Utils/theme"
import { transformTransition } from "../Utils/transitions"
import { conditionalTranslate } from "../Utils/utils"


interface SideBarProps extends HTMLMotionProps<"nav"> {
	dark?: boolean
	width?: number
	permanent?: boolean
	shrinkPoint?: number
	showButton?: boolean
}

interface StyledSideBarProps {
	dark?: boolean
	permanent?: boolean
	width?: number
	state?: boolean
}

const { sideBarOpts: defaultSideBarOptions }                   = defaultMainData
const { width: defaultWidth, shrinkPoint: defaultShrinkPoint } = defaultSideBarOptions

const StyledSideBar = styled(motion.nav)(({ dark, permanent, width, state }: StyledSideBarProps) => [
	css`
		z-index: ${permanent ? theme.zIndex.permanentSideBar : theme.zIndex.sideBar};
		color: ${theme.colors.gray_700};
		background-color: ${theme.colors.white};
		width: ${width}px;
	`,
	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colors.dark_500};
	`,

	tw`fixed h-full shadow-lg`,
	theme.transitions([transformTransition()]),
	theme.transforms([conditionalTranslate(!state, `-100%`)]),

])


const SideBar = (props: SideBarProps) => {
	const { sideBarState: state, setSideBarState: setState, setSideBarOpts, setOverlayState } = useMain()

	const { dark, children, permanent, width, className, shrinkPoint, showButton, ...restProps } = props

	const { windowWidth } = windowVariables()


	const setOpenState = (state: boolean) => {
		setState(state)

		if (shrinkPoint && windowWidth < shrinkPoint && state) {
			setOverlayState(true)
			return
		}

		setOverlayState(false)
	}

	useEffect(() => {
		setSideBarOpts({
			shrinkPoint,
			width,
		})
	}, [shrinkPoint, width])


	useEffect(() => {
		if (shrinkPoint && windowWidth > shrinkPoint) {
			setOpenState(true)
		} else if (shrinkPoint && windowWidth < shrinkPoint) {
			setOpenState(false)
		}
	}, [windowWidth])

	return (
		<StyledSideBar id="sideBar"
		               dark={dark}
		               permanent={permanent}
		               width={width}
		               state={state}
		               className={clsx(className)}
		               {...restProps}>
			{children}
		</StyledSideBar>
	)
}


SideBar.defaultProps = {
	dark:        undefined,
	width:       defaultWidth,
	shrinkPoint: defaultShrinkPoint,
	permanent:   false,
	showButton:  true,
}

export default SideBar
