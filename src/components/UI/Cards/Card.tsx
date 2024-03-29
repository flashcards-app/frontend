import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { HTMLMotionProps, motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"


export interface CardProps extends HTMLMotionProps<"div"> {
	dark?: boolean,
	height?: `${number}px` | `${number}%` | 'auto',
	width?: `${number}px` | `${number}%` | 'auto'
}

const Card = styled(motion.div)(({ dark, height, width }: CardProps) => [
	tw`right-0 origin-top-right rounded-md shadow-lg p-2 overflow-hidden bg-white rounded-md shadow`,
	css`
		background-color: ${theme.colors.white};
		height: ${height};
		width: ${width};
	`,

	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colors.dark_400};
	`,
	({ className }) => className,
])

Card.defaultProps = {
	dark: false,
	height: "300px",
	width: "200px",
}

export default Card
