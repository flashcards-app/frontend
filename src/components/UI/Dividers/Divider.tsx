import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"


const Divider = styled(motion.hr)`
	border-color: ${theme.colors.blue_200};

	${tw`h-0 mx-4 my-2 border border-solid`}
`

export default Divider
