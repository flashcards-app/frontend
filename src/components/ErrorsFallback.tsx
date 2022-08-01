import { ReactElement } from "react"


interface ErrorsFallbackProps {
	children: ReactElement | ReactElement[]
}

const ErrorsFallback = (props: ErrorsFallbackProps) => {
	const { children } = props

	return (
		<>
			{children}
		</>
	)
}

export default ErrorsFallback
