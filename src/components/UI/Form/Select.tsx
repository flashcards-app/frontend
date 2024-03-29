import { useEffect, useRef, useState } from "react"

import { css } from "@emotion/css"
import clsx from "clsx"
import { FormikErrors } from "formik"
import { HTMLMotionProps, motion } from "framer-motion"
import produce from "immer"
import Select, {
	defaultTheme, ControlProps, components, DropdownIndicatorProps, SingleValueProps, ContainerProps, MenuProps, Props, OptionProps,
	LoadingIndicatorProps,
} from "react-select"
import CreatableSelect from 'react-select/creatable'
import tw from "twin.macro"

import { isDark } from '..'
import theme from "../Utils/theme"
import { transformTransition } from "../Utils/transitions"
import { conditionalRotate } from "../Utils/utils"
import HelperText from "./HelperText"
import Label from "./Label"
import { CreatableAdditionalProps } from "react-select/dist/declarations/src/useCreatable"


const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
	const { isFocused } = props

	return (
		<components.DropdownIndicator {...props}>
			<div className={css`
				${[
					theme.transitions([transformTransition('300ms')]),
					theme.transforms([
						conditionalRotate(isFocused, 180),
					]),
				]}
			`}>
				<IconIonChevronDown/>
			</div>
		</components.DropdownIndicator>
	)
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
	return (
		<components.LoadingIndicator
			{...props}
			theme={produce(props.theme, (draft) => {
				draft.colors.neutral20 = theme.colors.gray_400
			})}/>
	)
}

const SingleValue = (props: SingleValueProps<any>) => {
	const { children, ...restProps } = props

	return (
		<components.SingleValue {...restProps}
		                        className={css`
			                        ${isDark() && css`
				                        color: ${theme.colors.gray_300} !important;
			                        `
			                        }
		                        `}>
			{children}
		</components.SingleValue>
	)
}

const Control = (props: ControlProps<any>) => {
	const { children, isFocused, ...restProps } = props

	return (
		<components.Control {...{ ...restProps, isFocused }}
		                    className={css`
			                    ${tw`!cursor-pointer`}
			                    background-color: ${theme.colors.gray_50} !important;
			                    transition-property: none !important;

			                    ${isDark() && css`
				                    background-color: ${theme.colors.dark_800} !important;
			                    `}
		                    `}
		                    theme={produce(props.theme, (draft) => {
			                    draft.borderRadius     = 5
			                    draft.colors.primary   = theme.colors.gray_300
			                    draft.colors.neutral20 = theme.colors.gray_200
			                    draft.colors.neutral30 = theme.colors.gray_200

			                    if (isDark()) {
				                    draft.colors.primary   = theme.colors.dark_200
				                    draft.colors.neutral20 = theme.colors.dark_400
				                    draft.colors.neutral30 = theme.colors.dark_400
			                    }
		                    })}>
			{children}
		</components.Control>
	)
}

const SelectContainer = (props: ContainerProps) => {
	const { children, ...restProps } = props

	return (
		<components.SelectContainer {...restProps}
		                            theme={produce(props.theme, (draft) => {
			                            draft.colors.primary = theme.colors.gray_300
		                            })}
		                            className={css`
			                            background-color: ${theme.colors.white} !important;

			                            ${isDark() && css`
				                            background-color: ${theme.colors.dark_800} !important;
			                            `}
		                            `}>
			{children}
		</components.SelectContainer>
	)
}

const Option = (props: OptionProps) => {
	return (
		<components.Option
			className={css`${tw`!cursor-pointer`}`}
			{...props}>
			{props.children}
		</components.Option>
	)
}

const Menu = (props: MenuProps) => {
	const { children, ...restProps } = props

	return (
		<components.Menu {...restProps}
		                 theme={produce(props.theme, (draft) => {
			                 draft.colors.primary25 = theme.colors.gray_200
		                 })}
		                 className={css`
			                 background-color: ${theme.colors.white} !important;

			                 ${isDark() && css`
				                 background-color: ${theme.colors.dark_800} !important;
			                 `}
		                 `}>
			{children}
		</components.Menu>
	)
}

interface SelectProps extends Omit<Props, 'isRtl' | 'onChange'> {
	label?: string
	createable?: boolean
	persistentLabel?: boolean
	dir?: "rtl" | "ltr"
	disableLabel?: boolean
	dark?: boolean
	disableHelperText?: boolean
	options: { label: string, value: string }[]
	error?: boolean
	onBlur?: () => void
	onChange?: (value: { label: string, value: string }) => void
	helperText?: string | FormikErrors<any>
	wrapperProps?: HTMLMotionProps<"div">
	onCreateOption?: (inputValue: string) => void;
}

const SelectWithLabel = (props: SelectProps) => {
	const {
		      label,
		      createable,
		      dir,
		      className,
		      placeholder,
		      wrapperProps,
		      persistentLabel,
		      disableHelperText,
		      disableLabel,
		      onFocus,
		      dark,
		      onBlur,
		      onChange,
		      error,
		      value,
		      helperText,
		      ...restProps
	      } = props

	const [isFocused, setIsFocused] = useState(false)
	const wasFocused                = useRef(false)
	const firstUpdate               = useRef(true)
	const sectionRef                = useRef(null)

	const blurController = () => {
		if (!firstUpdate.current && wasFocused.current && !isFocused && onBlur) {
			onBlur()
		}

		if (!firstUpdate.current) {
			wasFocused.current = true
		}
		firstUpdate.current = false
	}

	useEffect(() => {
		blurController()
	}, [isFocused])


	return (
		<section ref={sectionRef}>
			{!disableLabel && (label && ((isFocused || !!value) || persistentLabel))
				&& (
					<Label
						{...{ dir, dark }}
						initial={{
							opacity: 0,
						}}
						transition={{
							duration: 0.2,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}>
						{label}
					</Label>
				)}
			<motion.div
				{...wrapperProps}
				className={`${css`
					${(!disableLabel && !!label && ((isFocused || !!value) || persistentLabel)) ? tw`mt-0` : tw`mt-6`}
					${!disableHelperText && !!helperText ? tw`mb-0` : tw`mb-6`}
				`} ${clsx(className)}`}>
				{createable ? (
					<CreatableSelect
						blurInputOnSelect
						{...restProps}
						placeholder={(placeholder || !isFocused) && (label)}
						onFocus={(event) => {
							setIsFocused(true)
							if (onFocus) {
								onFocus(event)
							}
						}}
						styles={{
							input: (provided) => ({
								...provided,
								color: isDark() ? theme.colors.gray_200 : theme.colors.dark_800,
							})
						}}
						onBlur={() => {
							setIsFocused(false)
						}}
						onChange={(value) => !!onChange && onChange(value as { label: string, value: string })}
						isRtl={dir && dir === "rtl"}
						theme={produce(defaultTheme, (draft) => {
							if (isDark()) {
								draft.colors.primary   = theme.colors.dark_400
								draft.colors.primary50 = theme.colors.dark_300
								draft.colors.primary25 = theme.colors.dark_100
							}
						})}
						components={{
							DropdownIndicator,
							Option,
							Control,
							SingleValue,
							SelectContainer,
							LoadingIndicator,
							Menu,
						}}/>
				) : (
					<Select
						blurInputOnSelect
						{...restProps}
						placeholder={(placeholder || !isFocused) && (label)}
						onFocus={(event) => {
							setIsFocused(true)
							if (onFocus) {
								onFocus(event)
							}
						}}
						styles={{
							input: (provided) => ({
								...provided,
								color: isDark() ? theme.colors.gray_200 : theme.colors.dark_800,
							})
						}}
						onBlur={() => {
							setIsFocused(false)
						}}
						onChange={(value) => !!onChange && onChange(value as { label: string, value: string })}
						isRtl={dir && dir === "rtl"}
						theme={produce(defaultTheme, (draft) => {
							if (isDark()) {
								draft.colors.primary   = theme.colors.dark_400
								draft.colors.primary50 = theme.colors.dark_300
								draft.colors.primary25 = theme.colors.dark_100
							}
						})}
						components={{
							DropdownIndicator,
							Option,
							Control,
							SingleValue,
							SelectContainer,
							LoadingIndicator,
							Menu,
						}}/>
				)}
			</motion.div>
			{!disableHelperText && helperText && (
				<HelperText
					initial={{
						opacity: 0,
					}}
					transition={{
						duration: 0.2,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					{...{ error }}>
					{helperText}
				</HelperText>
			)}
		</section>
	)
}

SelectWithLabel.defaultProps = {
	label:             undefined,
	persistentLabel:   false,
	dir:               undefined,
	disableLabel:      false,
	dark:              undefined,
	disableHelperText: false,
	error:             false,
	onBlur:            () => null,
	onChange:          () => null,
	helperText:        undefined,
	wrapperProps:      {},
}

export default SelectWithLabel
