import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Row, Col } from "../Grid";

interface SelectProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	label: string,
	options: string[],
	onSelect: (arg0: string) => void,
	error?: string
}

const style = "block w-52 py-2 px-3 border border-gray-300 bg-whiterounded-md shadow-sm focus:outline-none focus:ring-transparent focus:border-gray-400"

function SelectWithLabel(props: SelectProps) {
	const { label, options, onSelect, error } = props
	return (
		<>
			<label className="text-gray-700" htmlFor="select-menu">
				{label}
				<select defaultValue="default"
					onChange={(ev) => onSelect(ev.target.value)}
					id="select-menu"
					className={style}>
					<option value="default" disabled hidden>Select one</option>
					{options.length > 0 && options.map((option) => {
						return <option key={option} value={option}>{option}</option>
					})}
				</select>
			</label>
			
			<Row className="w-full min-h-[20px]">
				<Col className="w-full">
					<p className="px-2 pt-1 text-sm text-[#ff6767] dark:text-[#ff5050]">{error}</p>
				</Col>
			</Row>
		</>
	)
}

export default SelectWithLabel
