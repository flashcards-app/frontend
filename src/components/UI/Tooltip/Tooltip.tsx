import type { ReactElement } from 'react'
import { useCallback, useEffect, useRef, useState } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion, HTMLMotionProps } from "framer-motion"
import type { TFunctionResult } from 'i18next'
import tw from "twin.macro"
import { LongPressDetectEvents, useLongPress } from "use-long-press"

import { isDark } from '..'
import useIsMobile from "../../../hooks/useIsMobile"
import Portal from "../Portal"
import theme from "../Utils/theme"


type Placement = `${'top' | 'bottom' | 'center'}-${'left' | 'right' | 'center'}`

interface TooltipDivProps {
	dark?: boolean,
	top: number | undefined,
	left: number | undefined
}

const TooltipDiv = styled(motion.div)(({ dark, top, left }: TooltipDivProps) => [
	tw`inline-block rounded shadow-2xl p-1`,

	css`
		background-color: ${theme.colors.gray_100};
		color: ${theme.colors.blue_500};
	`,

	(props) => (dark || props.theme.isDark) && css`
		color: ${theme.colors.white};
		background-color: ${theme.colors.dark_200};
	`,

	css`
		position: absolute;
		white-space: nowrap;
		z-index: ${theme.zIndex.tooltip};
		top: ${top}px;
		left: ${left}px;
	`,
])


const defaultProps = {
	dark:            undefined,
	offsetX:         15,
	offsetY:         15,
	mobileTimeout:   1200,
	mobileThreshold: 700,
}

const getCoords = (elem: Element) => {
	const box                       = elem.getBoundingClientRect()
	const { body, documentElement } = document

	const scrollTop  = documentElement.scrollTop || body.scrollTop
	const scrollLeft = documentElement.scrollLeft || body.scrollLeft

	const clientTop  = documentElement.clientTop || body.clientTop
	const clientLeft = documentElement.clientLeft || body.clientLeft

	const top  = Math.round(box.top + scrollTop - clientTop)
	const left = Math.round(box.left + scrollLeft - clientLeft)

	return { top, left }
}

interface CalcPlacementProps {
	placement: Placement
	elementWidth: number
	elementHeight: number
	tooltipWidth: number
	tooltipHeight: number
	offsetX: number
	offsetY: number
}

type CalcPlacement = (props: CalcPlacementProps) => { top: number, left: number }

const calcPlacement: CalcPlacement = ({ placement, elementWidth, elementHeight, tooltipWidth, tooltipHeight, offsetX, offsetY }) => {
	let top            = 0
	let left           = 0
	const placementArr = placement.split('-')

	if (placementArr[0] === 'top') top = -(((elementHeight + tooltipHeight) / 2) + (offsetX))
	if (placementArr[0] === 'bottom') top = ((elementHeight + tooltipHeight) / 2) + (offsetX)

	if (placementArr[1] === 'left') left = -(((elementWidth + tooltipWidth) / 2) + (offsetY))
	if (placementArr[1] === 'right') left = ((elementWidth + tooltipWidth) / 2) + (offsetY)

	return { left, top }
}

interface TooltipProps extends HTMLMotionProps<"div"> {
	dark?: boolean
	children: ReactElement
	tooltip: TFunctionResult | number | string
	placement: Placement
	offsetX?: number
	offsetY?: number
	mobileTimeout?: number
	mobileThreshold?: number
}

const Tooltip = (props: TooltipProps & typeof defaultProps) => {
	const isMobile = useIsMobile()

	const { children, tooltip, placement, className, offsetY, offsetX, dark, ...restProps } = props


	const darkMode              = dark || isDark()
	const [visible, setVisible] = useState(false)
	const [top, setTop]         = useState<number>()
	const [left, setLeft]       = useState<number>()
	const elementWrapper        = useRef<HTMLDivElement>(null)
	const tooltipElement        = useRef<HTMLDivElement>(null)

	const callback = useCallback(() => {
		setVisible(true)
	}, [])

	const longPress = useLongPress(callback, {
		onFinish:         () => {
			if (isMobile) {
				setTimeout(() => {
					setVisible(false)
				}, 1000)
			}
		},
		threshold:        500,
		captureEvent:     true,
		cancelOnMovement: false,
		detect:           LongPressDetectEvents.BOTH,
	})

	useEffect(() => {
		if (elementWrapper.current && tooltipElement.current) {
			const { height, width }                              = elementWrapper.current.getBoundingClientRect()
			const { width: tooltipWidth, height: tooltipHeight } = tooltipElement.current.getBoundingClientRect()
			const { top, left }                                  = getCoords(elementWrapper.current)
			const { top: topOffset, left: leftOffset }           = calcPlacement({
				placement,
				elementWidth:  width,
				elementHeight: height,
				tooltipWidth,
				tooltipHeight,
				offsetX,
				offsetY,
			})

			const tooltipTop  = top + (height / 2) - (tooltipHeight / 2) + topOffset
			const tooltipLeft = left + (width / 2) - (tooltipWidth / 2) + leftOffset

			const tooltipTopPreventOverflow  = Math.min(Math.max(tooltipTop, 0), window.innerHeight - tooltipHeight)
			const tooltipLeftPreventOverflow = Math.min(Math.max(tooltipLeft, 0), window.innerWidth - tooltipWidth)

			setTop(() => tooltipTopPreventOverflow)
			setLeft(() => tooltipLeftPreventOverflow)
		}
	}, [visible])

	return (
		<>
			<Portal>
				{
					visible
					&& (
						<TooltipDiv
							top={top}
							left={left}
							dark={darkMode}
							{...restProps}
							ref={tooltipElement}>
							{tooltip}
						</TooltipDiv>
					)
				}
			</Portal>
			<div ref={elementWrapper}
			     className="w-fit"
			     onMouseEnter={() => !isMobile && setVisible(true)}
			     {...longPress()}
			     onMouseLeave={() => !isMobile && setVisible(false)}>
				{children}
			</div>
		</>
	)
}

Tooltip.defaultProps = defaultProps

export default Tooltip
