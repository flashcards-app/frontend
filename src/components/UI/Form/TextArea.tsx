import {Col, Row} from "../Grid";
import {DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes} from "react";
import clsx from "clsx";

interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	placeholder?: string
	value?: string | ReadonlyArray<string> | number | undefined
	error?: string
}


const style = `w-full min-h-12 h-12 py-2 border border-2 rounded-md px-2 shadow-sm focus:outline-none focus:ring-transparent place-self-center`

const styleLight = `bg-gray-50 border-gray-200 focus:border-gray-300`

const styleDark = `dark:bg-dark-800 dark:border-dark-400 dark:focus:border-dark-200`

const TextArea = (props: TextAreaProps) => {
	const {className, placeholder, value, error, ...restProps} = props;

	return (
		<Row className={`w-full ${clsx(className)}`}>
			<Col className="w-full">
				<Row>
					<Col className="w-full">
						<textarea {...restProps}
						          placeholder={placeholder}
						          value={value}
						          className={`${style} ${styleLight} ${styleDark}`}/>
					</Col>
				</Row>
				<Row className="w-full min-h-[20px]">
					<Col className="w-full">
						<span className="px-2 pt-1 text-sm text-[#ff6767] dark:text-[#ff5050]">{error}</span>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default TextArea
