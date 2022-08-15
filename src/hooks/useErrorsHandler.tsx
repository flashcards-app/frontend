import { useErrorHandler } from "react-error-boundary"

import ApiError from "../modules/ApiError"


const handleLoginError = (error: ApiError) => {
	const errors = error.getErrorsList()

	if (errors.includes("Incorrect email or password")) {
		return 'סיסמא או כתובת מייל שגויים'
	}
}

const handleRegisterError = (error: ApiError): [string, string] | undefined => {
	const errors = error.getErrorsList()

	if (errors.includes("\"email\" already exists")) {
		return ["email", 'כתובת המייל שהזנת אינה תקינה']
	}
}

const UseErrorsHandler = () => {
	const handleError = useErrorHandler()

	return {
		handleLoginError,
		handleRegisterError,
	}
}

export default UseErrorsHandler
