import tw from 'twin.macro'
import styled from "@emotion/styled"
import theme from "../Utils/theme"
import { css } from "@emotion/react"
import { HTMLMotionProps, motion } from "framer-motion"


export interface ButtonProps extends HTMLMotionProps<"button"> {
	dark?: boolean
	centered?: boolean
	fab?: boolean
	icon?: boolean
	height?: number
	width?: number
	size?: number
}

const Button = styled(motion.button)(({ icon, height, size, width, fab, centered, dark }: ButtonProps) => [
	tw`rounded-lg block text-sm font-semibold cursor-pointer border-none bg-transparent`,
	icon && tw`p-2 w-fit h-fit`,
	!icon && tw`px-4 py-2`,

	centered && tw`text-center`,
	fab && tw`rounded-full`,

	height && css`
		height: ${icon ? 'fit-content' : `${height}px`};
	`,
	width && css`
		width: ${icon ? 'fit-content' : `${width}px`};
	`,
	size && css`
		font-size: ${size}px;
	`,

	css`
		color: ${theme.colors.gray_900};
		background-color: ${theme.colors.gray_200};

		&:hover {
			background-color: ${theme.colors.light_700};
		}

		&:active {
			background-color: ${theme.colors.light_600};
		}

		&:disabled {
			${tw`opacity-50 cursor-default`}
			&:hover {
				background-color: ${theme.colors.gray_200};
			}
		}
	`,
	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colors.dark_400};
		color: ${theme.colors.gray_200};

		&:hover {
			color: ${theme.colors.white};
			background-color: ${theme.colors.dark_200};
		}

		&:active {
			background-color: ${theme.colors.dark_100}
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


