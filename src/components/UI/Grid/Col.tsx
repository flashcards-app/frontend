import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { css } from "@emotion/react"
import tw from "twin.macro";

interface ColProps {
	grid?: boolean
	center?: boolean
}

const Col = styled(motion.div)(({ grid, center }: ColProps) => [
	center && tw`justify-center`,
	
	css`
    display: flex;
    flex-direction: column;
	`,
	
	grid && css`
    display: grid;
	`,
])

export default Col
