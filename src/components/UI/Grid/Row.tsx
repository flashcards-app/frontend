import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"


interface RowProps {
	grid?: boolean
	center?: boolean
	justify?: "start" | "end" | "center" | "space-between" | "space-around"
	align?: "start" | "end" | "center"
}

const Row = styled(motion.div)(({ grid, center, justify, align }: RowProps) => [
	center && tw`justify-center`,

	css`
		display: flex;
		flex-direction: row;
	`,

	align && css`
		align-items: ${align};
	`,
	justify && css`
		justify-content: ${justify};
	`,

	!grid && css`
		display: flex;
		flex-direction: row;
	`,

	grid && css`
		display: grid;
	`,
])


export default Row
