import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"
import { css } from "@emotion/react"


const HelperText = styled(motion.p)(({ error, dark }: { error?: boolean, dark?: boolean }) => [
	tw`mx-1 mt-1 text-sm min-h-[20px] !w-fit`,

	error && css`
		color: #ff6767;
	`,

	(props) => (dark || props.theme.isDark) && error && css`
		color: #ff5050;
	`,
])

export default HelperText
