import { useEffect, useRef } from "react"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import autoAnimate from "@formkit/auto-animate"
import clsx from "clsx"
import { motion } from "framer-motion"
import tw from "twin.macro"

import HelperText from "../Form/HelperText"
import Button, { ButtonProps } from "./Button"


interface FormButtonProps extends ButtonProps {
	helperText?: string
	error?: boolean
	centered?: boolean
}

const ButtonWrapper = styled(motion.div)(({ centered }: { centered?: boolean }) => [
	tw`flex flex-col w-full`,
	centered && tw`items-center`,
])

const FormButton = (props: FormButtonProps) => {
	const { className, helperText, error, dark, centered, children, ...restProps } = props

	const buttonWrapperRef = useRef(null)

	useEffect(() => {
		buttonWrapperRef.current && autoAnimate(buttonWrapperRef.current)
	}, [buttonWrapperRef])

	return (
		<ButtonWrapper {...{ dark, centered }} ref={buttonWrapperRef}>
			{
				helperText
				&& (
					<HelperText className="text-center" {...{ error }}>
						{helperText}
					</HelperText>
				)
			}
			<Button {...restProps}
			        {...{ dark }}
			        className={`${
				        css`
					        ${helperText ? tw`!mt-0` : tw`!mt-6`}
				        `} ${clsx(className)}`}
			        type="submit">
				{children}
			</Button>
		</ButtonWrapper>
	)
}

FormButton.defaultProps = {
	centered: true,
	error: false,
	helperText: '',
}

export default FormButton
