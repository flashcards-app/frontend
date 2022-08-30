import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { HTMLMotionProps, motion } from "framer-motion"
import tw from 'twin.macro'

import theme from "../Utils/theme"
import { CSSProperties } from "react"


export interface ColorsForState {
	default: `#${string}`
	hover?: `#${string}`
	active?: `#${string}`
	disabled?: `#${string}`
}

export interface ButtonProps extends HTMLMotionProps<"button"> {
	dark?: boolean
	centered?: boolean
	fab?: boolean
	icon?: boolean
	height?: number | `${string}${'px' | '%'}`
	width?: number | `${string}${'px' | '%'}`
	size?: number
	bgColor?: CSSProperties["backgroundColor"]
	colorsForStates?: ColorsForState
}

const Button = styled(motion.button)(({ colorsForStates, icon, bgColor, height, size, width, fab, centered, dark }: ButtonProps) => [
	tw`rounded-lg block text-sm font-semibold cursor-pointer border-none bg-transparent`,
	icon && tw`p-2 w-fit h-fit`,
	!icon && tw`px-4 py-2`,

	centered && tw`text-center`,
	fab && tw`rounded-full`,

	height && css`
		height: ${icon ? 'fit-content' : typeof height === 'number' ? `${height}px` : height};
	`,
	width && css`
		width: ${icon ? 'fit-content' : typeof width === 'number' ? `${width}px` : width};
	`,
	size && css`
		font-size: ${size}px;
	`,

	css`
		color: ${theme.colors.gray_900};
		background-color: ${colorsForStates?.default || bgColor || theme.colors.gray_200};
		transition: color 300ms ease-in-out;

		&:hover {
			background-color: ${colorsForStates?.hover || theme.colors.light_700};
		}

		&:active {
			background-color: ${colorsForStates?.active || theme.colors.light_600};
		}

		&:disabled {
			${tw`opacity-50 cursor-default`}
			&:hover {
				background-color: ${colorsForStates?.disabled || theme.colors.gray_200};
			}
		}
	`,
	(props) => (dark || props.theme.isDark) && css`
		background-color: ${colorsForStates?.default || bgColor || theme.colors.dark_400};
		color: ${theme.colors.gray_200};

		&:hover {
			color: ${theme.colors.white};
			background-color: ${colorsForStates?.hover || theme.colors.dark_200};
		}

		&:active {
			background-color: ${colorsForStates?.active || theme.colors.dark_100}
		}

		&:disabled {
			color: ${theme.colors.gray_200};

			&:hover {
				background-color: ${theme.colors.dark_400};
			}
		}
	`,
])


export default Button


