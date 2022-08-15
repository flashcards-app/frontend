import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro";


interface RowProps {
	grid?: boolean
	center?: boolean
}

const Row = styled(motion.div)(({ grid, center }: RowProps) => [
	center && tw`justify-center`,
	
	!grid && css`
		display: flex;
		flex-direction: row;
	`,

	grid && css`
		display: grid;
	`,
])


export default Row
