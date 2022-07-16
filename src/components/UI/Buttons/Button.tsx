import type {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

import clsx from 'clsx'


const style = `rounded-lg block px-4 py-2 mt-2 text-sm font-semibold`

const lightStyle = `text-gray-900
										bg-light-400
										bg-transparent
										hover:bg-light-700
										active:bg-light-800`

const darkStyle = `dark:text-gray-200
									dark:bg-dark-300
									dark:hover:text-white
									dark:hover:bg-dark-200
									dark:active:bg-dark-100
									dark:bg-transparent`


const Button = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	const {children, className} = props
	
	return (
		<button{...props}
		       className={`${style} ${lightStyle} ${darkStyle} ${clsx(className)}`}
		       type="button">
			
			{children}
		</button>
	)
}

export default Button
