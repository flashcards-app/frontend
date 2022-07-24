import clsx from "clsx";
import { DetailedHTMLProps, SelectHTMLAttributes, HTMLSelectElement } from "react";
import { Row, Col } from "../Grid";

interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	label: string,
	options: string[],
	error?: string
}

const style = "block w-52 py-2 px-3 border border-gray-300 bg-whiterounded-md shadow-sm focus:outline-none focus:ring-transparent focus:border-gray-400"
const styleLight = `bg-gray-50 border-gray-200 focus:border-gray-300`

const styleDark = `dark:bg-dark-800 dark:border-dark-400 dark:focus:border-dark-200`

function SelectWithLabel(props: SelectProps) {
	const { className, label, options, error, defaultValue, placeholder, ...restProps } = props
	return (
		<section>
			<label className={`w-full ${clsx(className)}`} htmlFor="select-menu">
				{label}
			</label>
			<select {...restProps}
				defaultValue={defaultValue || "default"}
				id="select-menu"
				className={`${style} ${styleLight} ${styleDark}`}>
				<option value="default" disabled hidden>{placeholder}</option>
				{options.length > 0 && options.map((option) => {
					return <option key={option} value={option}>{option}</option>
				})}
			</select>

			<Row className="w-full min-h-[20px]">
				<Col className="w-full">
					<p className="px-2 pt-1 text-sm text-[#ff6767] dark:text-[#ff5050]">{error}</p>
				</Col>
			</Row>
		</section>
	)
}

export default SelectWithLabel
