import { ReactElement } from "react"

import { ErrorBoundary } from "react-error-boundary"

import ErrorsFallback from "./ErrorsFallback"


interface ErrorsBoundaryProps {
	children: ReactElement | ReactElement[]
}

const ErrorsBoundary = (props: ErrorsBoundaryProps) => {
	const { children } = props

	const errorHandler = () => {}
	// error: any, errorInfo: any

	return (
		<ErrorBoundary fallback={ErrorsFallback({ children })} onError={errorHandler}>
			{children}
		</ErrorBoundary>
	)
}

export default ErrorsBoundary
