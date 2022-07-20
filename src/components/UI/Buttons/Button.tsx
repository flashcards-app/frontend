import type {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

import clsx from 'clsx'


const style = `rounded-lg block px-4 py-2 mt-2 text-sm font-semibold`

const lightStyle = `text-gray-900
										bg-gray-200
										bg-transparent
										hover:bg-light-700
										active:bg-light-800`

const lightDisabledStyle = `disabled:opacity-50 disabled:cursor-default disabled:active:bg-gray-900 disabled:active:text-gray-200`

const darkDisabledStyle = `disabled:opacity-50 dark:disabled:cursor-default disabled:hover:dark:bg-dark-400 disabled:hover:dark:text-gray-200`

const darkStyle = `dark:text-gray-200
									 dark:bg-dark-400
									dark:hover:text-white
									dark:hover:bg-dark-200
									dark:active:bg-dark-100
									dark:bg-transparent
									dark:disabled:opacity-50`

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}


const Button = (props: ButtonProps) => {
	const {children, className} = props

	return (
		<button type="button"
		        {...props}
		       className={`${style} ${lightDisabledStyle} ${darkDisabledStyle} ${lightStyle} ${darkStyle} ${clsx(className)}`}>
			{children}
		</button>
	)
}

export default Button
