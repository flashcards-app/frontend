import type { ReactElementProps } from '../../../types'
import clsx from "clsx"
import { DetailedHTMLProps, HTMLAttributes } from "react"

interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {

}


const Divider = (props: DividerProps) => {
	return (
		<hr {...props} className={`h-0 mx-4 my-2 border border-solid border-blueGray-100 ${clsx(props.className)}`}/>
	)
}

export default Divider
