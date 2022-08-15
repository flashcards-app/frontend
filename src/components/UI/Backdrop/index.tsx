import { css } from "@emotion/css"
import styled from "@emotion/styled"
import clsx from "clsx"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"


export interface BackdropProps extends HTMLMotionProps<"div"> {
	dark?: boolean,
	active: boolean
	animationTime?: number
}

const BackdropDiv = styled(motion.div)(({ dark }: { dark?: boolean }) => [
	css`
		background-color: ${theme.colors.dark_200};
		z-index: ${theme.zIndex.backdrop};
	`,

	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colors.dark_800};
	`,

	tw`fixed h-full w-full opacity-0 !cursor-default`,
])

const Backdrop = ({ dark, active, className, animationTime, ...restProps }: BackdropProps) => {
	return (
		<AnimatePresence>
			{active && (
				<BackdropDiv {...restProps}
				             initial={{
					             opacity: 0,
				             }}
				             transition={{
					             duration: animationTime,
				             }}
				             animate={{
					             opacity: 0.3,
				             }}
				             exit={{
					             opacity: 0,
				             }}
				             className={`${clsx(className)}`}/>
			)}
		</AnimatePresence>
	)
}

Backdrop.defaultProps = {
	dark:          undefined,
	animationTime: 0.4,
}

export default Backdrop
