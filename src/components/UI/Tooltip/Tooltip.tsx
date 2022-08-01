import type { ReactElement } from 'react'
import type { TFunctionResult } from 'i18next'
import tw from "twin.macro"
import { isDark } from '..'
import theme from "../Utils/theme"
import Portal from "../Portal"
import { css } from "@emotion/css"
import { useEffect, useRef, useState } from "react"
import { motion, HTMLMotionProps } from "framer-motion"


const defaultProps = {
	dark:      undefined,
	placement: 'center-center',
	offsetX:   15,
	offsetY:   15,
}

const getCoords = (elem: Element) => {
	const box = elem.getBoundingClientRect()

	const { body } = document
	const docEl    = document.documentElement

	const scrollTop  = docEl.scrollTop || body.scrollTop
	const scrollLeft = docEl.scrollLeft || body.scrollLeft

	const clientTop  = docEl.clientTop || body.clientTop
	const clientLeft = docEl.clientLeft || body.clientLeft

	const top  = box.top + scrollTop - clientTop
	const left = box.left + scrollLeft - clientLeft

	return { top: Math.round(top), left: Math.round(left) }
}

type Placement = `${'top' | 'bottom' | 'center'}-${'left' | 'right' | 'center'}`

interface CalcPlacementProps {
	placement: Placement
	elementWidth: number
	elementHeight: number
	tooltipWidth: number
	tooltipHeight: number
	offsetX: number
	offsetY: number
}

const calcPlacement = ({
	placement,
	elementWidth,
	elementHeight,
	tooltipWidth,
	tooltipHeight,
	offsetX,
	offsetY,
}: CalcPlacementProps): { top: number, left: number } => {
	let top
	let left
	const placementArr = placement.split('-')

	switch (placementArr[0]) {
	case 'top':
		top = -(((elementHeight + tooltipHeight) / 2) + (offsetX))
		break
	case 'bottom':
		top = (((elementHeight + tooltipHeight) / 2) + (offsetX))
		break
	default:
		top = 0
		break
	}

	switch (placementArr[1]) {
	case 'left':
		left = -(((elementWidth + tooltipWidth) / 2) + (offsetY))
		break
	case 'right':
		left = (((elementWidth + tooltipWidth) / 2) + (offsetY))
		break
	default:
		left = 0
		break
	}

	return { left, top }
}

interface TooltipProps extends HTMLMotionProps<"div"> {
	dark?: boolean
	children: ReactElement
	tooltip: TFunctionResult | number | string
	placement?: Placement
	offsetX?: number
	offsetY?: number
}

const Tooltip = (props: TooltipProps & typeof defaultProps) => {
	const { children, tooltip, placement, className, offsetY, offsetX, ...restProps } = props

	const dark                  = props.dark || isDark()
	const [visible, setVisible] = useState(false)
	const [top, setTop]         = useState<number>()
	const [left, setLeft]       = useState<number>()
	const elementWrapper        = useRef<HTMLDivElement>(null)
	const tooltipElement        = useRef<HTMLDivElement>(null)


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


			setTop(() => top + (height / 2) - (tooltipHeight / 2) + topOffset)
			setLeft(() => left + (width / 2) - (tooltipWidth / 2) + leftOffset)
		}
	}, [visible])

	return (
		<>
			<Portal>
				{
					visible
					&& (
						<motion.div {...restProps}
						            ref={tooltipElement}
						            className={css([
							            tw`inline-block rounded shadow-2xl p-1`,

							            css`
								            background-color: ${theme.colors.gray_100};
								            color: ${theme.colors.blue_500};
							            `,

							            dark && css`
								            color: ${theme.colors.white};
								            background-color: ${theme.colors.dark_200};
							            `,

							            css`
								            position: absolute;
								            z-index: ${theme.zIndex.tooltip};
								            top: ${top}px;
								            left: ${left}px;
							            `,
						            ])}>
							{tooltip}
						</motion.div>
					)
				}
			</Portal>
			<div ref={elementWrapper}
			     className="w-fit"
			     onMouseEnter={() => setVisible(true)}
			     onMouseLeave={() => setVisible(false)}>
				{children}
			</div>
		</>
	)
}

Tooltip.defaultProps = defaultProps

export default Tooltip
