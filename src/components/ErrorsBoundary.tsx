import ErrorsFallback from "./ErrorsFallback"
import { ErrorBoundary } from "react-error-boundary"
import { ReactElement } from "react"


interface ErrorsBoundaryProps {
	children: ReactElement | ReactElement[]
}

const ErrorsBoundary = (props: ErrorsBoundaryProps) => {
	const { children } = props

	const errorHandler = (error: any, errorInfo: any) => {}

	return (
		<ErrorBoundary fallback={ErrorsFallback({ children })} onError={errorHandler}>
			{children}
		</ErrorBoundary>
	)
}

export default ErrorsBoundary
