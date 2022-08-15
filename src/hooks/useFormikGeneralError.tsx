import { useEffect, useState } from "react"
import { FormikProps } from "formik"


type UseFormikGeneralErrorProps<T = string> = (formik: FormikProps<any>, initialState: T) => [string, (error: string) => void]

const useFormikGeneralError: UseFormikGeneralErrorProps = (formik, initialState) => {
	const [generalError, setGeneralError] = useState(initialState)

	useEffect(() => {
		if (generalError) setGeneralError('')
	}, [formik.values])

	return [generalError, setGeneralError]
}

export default useFormikGeneralError
