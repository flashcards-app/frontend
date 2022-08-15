import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"


const Tab = styled(motion.a)(() => [
	tw`tab cursor-pointer z-[11] !bg-transparent`,
])

export default Tab
