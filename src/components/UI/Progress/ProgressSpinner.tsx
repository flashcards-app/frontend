import { ImpulseSpinner } from 'react-spinners-kit'
import clsx from "clsx"
import { css } from "@emotion/css"
import tw from "twin.macro"
import { HTMLMotionProps, motion } from "framer-motion"


const ProgressSpinner = (props: HTMLMotionProps<"div">) => {
	return (
		<div className={css`${tw`relative h-full`}`}>
			<motion.div {...props} className={`${css`${tw`absolute top-[50%] left-[50%]`}`} ${clsx(props.className)}`}>
				<ImpulseSpinner size={75} backColor="#626262" frontColor="#536473"/>
			</motion.div>
		</div>
	)
}

export default ProgressSpinner
