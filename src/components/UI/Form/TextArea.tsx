import { useEffect, useRef } from "react"

import { css as classCss } from "@emotion/css"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import autoAnimate from '@formkit/auto-animate'
import clsx from "clsx"
import { HTMLMotionProps, motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"
import ConditionalLabel from "./ConditionalLabel"
import HelperText from "./HelperText"


interface TextAreaProps {
	dark?: boolean,
	minHeight?: `${number}px` | `${number}rem`,
	centered?: boolean
}

export const TextAreaInput = styled(motion.textarea)(({ dark, minHeight, centered }: TextAreaProps) => [
	tw`w-full p-2 border border-2 rounded-md shadow-sm  place-self-center h-[45px] min-h-[45px]`,
	minHeight && css`
		min-height: ${minHeight};
	`,
	centered && tw`text-center`,


	css`
		background-color: ${theme.colors.gray_50};
		border-color: ${theme.colors.gray_200};

		&:focus {
			border-color: ${theme.colors.gray_300};

			${tw`outline-none ring-transparent`}
		}
	`,

	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colors.dark_800};
		border-color: ${theme.colors.dark_400};

		&:focus {
			border-color: ${theme.colors.dark_200};
		}
	`,
])

interface TextAreaProps extends HTMLMotionProps<"textarea"> {
	placeholder?: string
	centered?: boolean
	persistentLabel?: boolean
	minHeight?: `${number}px` | `${number}rem`
	value?: string | readonly string[] | number | undefined
	error?: boolean
	helperText?: string
	label?: string
}

const TextArea = (props: TextAreaProps) => {
	const { className, label, placeholder, minHeight, persistentLabel, onChange, centered, value, error, helperText, ...restProps } = props

	const sectionRef  = useRef(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleAutoGrow = () => {
		if (textareaRef?.current) {
			textareaRef.current.style.height = "0px"
			const scrollHeight               = textareaRef.current.scrollHeight + 5
			textareaRef.current.style.height = `${scrollHeight}px`
		}
	}

	useEffect(() => {
		sectionRef.current && autoAnimate(sectionRef.current)
	}, [sectionRef])

	useEffect(() => {
		handleAutoGrow()
	}, [value])


	return (
		<section ref={sectionRef}>
			<ConditionalLabel {...{ label, persistentLabel, value }}/>

			<TextAreaInput {...restProps}
			               ref={textareaRef}
			               minHeight={minHeight}
			               className={`${classCss`
				                ${(value && label) || (label && persistentLabel) ? tw`mt-0` : tw`mt-6`}
				                ${helperText ? tw`mb-0` : tw`mb-6`}
			                `} ${clsx(className)}`}
			               placeholder={placeholder || !persistentLabel ? label : ''}
			               {...{ centered, onChange, value }}/>

			{!!helperText && <HelperText {...{ error }}>{helperText}</HelperText>}
		</section>
	)
}

TextArea.defaultProps = {
	placeholder:     undefined,
	centered:        false,
	persistentLabel: false,
	value:           undefined,
	error:           false,
	dark:            undefined,
	minHeight:       undefined,
	helperText:      undefined,
	label:           undefined,
}

export default TextArea
