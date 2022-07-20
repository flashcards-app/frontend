import { DetailedHTMLProps, HTMLAttributes } from "react"


interface LongDividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {

}

const LongDivider = (props: LongDividerProps) => {
	return (
		<hr {...props} className={`flex-row border-t border-gray-700 ${props.className}`}/>
	)
}

export default LongDivider
