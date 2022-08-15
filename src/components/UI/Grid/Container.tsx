import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"


const Container = styled(motion.div)(() => [
	tw`flex mx-auto`,
])

export default Container
