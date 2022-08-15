import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"


const LongDivider = styled(motion.hr)`
	${tw`flex-row border-t border-gray-700`}
`

export default LongDivider
