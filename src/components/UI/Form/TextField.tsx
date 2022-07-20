import { Col } from "../Grid"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import clsx from "clsx"


interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	placeholder: string
	height?: number | `${number}px`
	value?: string | ReadonlyArray<string> | number | undefined
	error?: string
}

const style = "w-full py-2 border border-2 rounded-md shadow-sm focus:outline-none " +
	"focus:ring-transparent resize-none text-center place-self-center"

const styleLight = "border-gray-200 bg-gray-50 focus:border-gray-300"

const styleDark = "dark:bg-dark-800 dark:border-dark-400 dark:focus:border-dark-200"

const TextField = (props: TextFieldProps) => {
	const { height, className, placeholder, onChange, value, error, ...restProps } = props

	return (
		<Col className={`"w-full ${clsx(className)}`}>
			<input {...restProps}
			       placeholder={placeholder}
			       onChange={onChange}
			       value={value}
			       style={{
							 height: height || "45px",
			       }}
			       className={`${style} ${styleLight} ${styleDark}`}/>
			<span className={`mx-1 mt-1 text-sm text-[#ff6767] dark:text-[#ff5050] min-h-[20px]`}>{error}</span>
		</Col>
	)
}

export default TextField
