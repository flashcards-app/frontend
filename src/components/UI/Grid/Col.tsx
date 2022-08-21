import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"


interface ColProps {
	grid?: boolean
	center?: boolean
	cols?: number
	justify?: "start" | "end" | "center" | "space-between" | "space-around"
	align?: "start" | "end" | "center"
}

const Col = styled(motion.div)(({ grid, center, cols, justify, align }: ColProps) => [
	center && tw`justify-center`,

	css`
		display: flex;
		flex-direction: column;
	`,

	align && css`justify-content: ${justify};`,
	justify && css`align-items: ${align};`,

	!grid && !!cols && css`
		flex: ${cols};
	`,

	grid && css`
		display: grid;
	`,
])

export default Col
