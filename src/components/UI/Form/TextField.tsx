import {Col, Row} from "../Grid";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react"
import clsx from "clsx";

interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	placeholder: string
	value?: string | ReadonlyArray<string> | number | undefined
	error?: string
}

const style = "w-full h-13 py-2 border border-2 rounded-md shadow-sm focus:outline-none " +
							"focus:ring-transparent resize-none text-center place-self-center"

const styleLight = "border-gray-200 bg-gray-50 focus:border-gray-300"

const styleDark = "dark:bg-dark-800 dark:border-dark-400 dark:focus:border-dark-200"

const TextField = (props: TextFieldProps) => {
	const {className, placeholder, onChange, value, error, ...restProps} = props;



	return (
		<Row className={`w-full ${clsx(className)}`}>
			<Col className="w-full">
				<Row>
					<Col className="w-full">
						<input {...restProps}
						       placeholder={placeholder}
						       onChange={onChange}
						       value={value}
						       className={`${style} ${styleLight} ${styleDark}`}/>
					</Col>
				</Row>
				<Row className="w-full min-h-[20px]">
					<Col className="w-full">
						<span className="mx-1 mt-1 text-sm text-[#ff6767] dark:text-[#ff5050]">{error}</span>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default TextField
