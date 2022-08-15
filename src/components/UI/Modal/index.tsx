import { css } from "@emotion/css"
import styled from "@emotion/styled"
import clsx from "clsx"
import { HTMLMotionProps } from "framer-motion"
import tw from "twin.macro"

import Backdrop from "../Backdrop"
import Card from "../Cards/Card"
import Portal from "../Portal"
import theme from "../Utils/theme"


interface ModalWrapperProps {
	centered?: boolean
}


const ModalWrapper = styled.div(({ centered }: ModalWrapperProps) => [
	css`
		z-index: ${theme.zIndex.modal};
	`,
	centered && tw`flex justify-center items-center`,
	tw`fixed h-full w-full`,
])

interface ModalProps extends HTMLMotionProps<"div"> {
	height?: `${number}px` | `${number}%`
	width?: `${number}px` | `${number}%`
	onBackdropClick?: () => void
	centered?: boolean
}

const Modal = (props: ModalProps) => {
	const { children, className, centered, height, width, onBackdropClick, ...restProps } = props

	return (
		<Portal>
			<ModalWrapper {...{ centered }}>
				<Backdrop onClick={onBackdropClick}
				          active/>
				<Card {...restProps}
				      className={`${css`${tw`relative`}`} ${clsx(className)}`}
				      initial={{
					      opacity: 0,
				      }}
				      transition={{
					      duration: 0.4,
				      }}
				      animate={{
					      opacity: 1,
				      }}
				      {...{ height, width }}>
					{children}
				</Card>
			</ModalWrapper>
		</Portal>
	)
}

Modal.defaultProps = {
	height:          "200px",
	width:           "200px",
	onBackdropClick: () => {},
	centered:        false,
}

export default Modal
