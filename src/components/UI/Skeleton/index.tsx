import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"


export interface SkeletonProps {
	width?: number
	height?: number
}

const Skeleton = styled(motion.div)(({ height, width }: SkeletonProps) => [
	css`
		background-color: ${theme.colors.gray_300};
	`,

	height && css`
		height: ${height}px;
	`,
	width && css`
		width: ${width}px;
	`,

	tw`animate-pulse`,
])

export default Skeleton
