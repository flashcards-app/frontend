import { ImpulseSpinner } from 'react-spinners-kit'
import type { ReactDivProps } from '../../../types'
import clsx from "clsx"
import { css } from "@emotion/css"
import tw from "twin.macro"
import { HTMLMotionProps, motion } from "framer-motion"
import theme from "../Utils/theme"


const ProgressSpinner = (props: ReactDivProps) => {
	return (
		<motion.div {...props}
		            className={`
		            ${css`
			            transform: translate(-50%, -50%);
			            ${tw`absolute top-[50%] left-[50%]`}
		            `}
		            ${clsx(props.className)}`}>
			<ImpulseSpinner size={75}
			                backColor="#626262"
			                frontColor="#536473"/>
		</motion.div>
	)
}

export default ProgressSpinner
