import { ApiErrorData, ApiErrorsOptions, ApiErrorObject } from "../services/types"


export default class ApiError {
	config: { [key: string]: any }
	data: ApiErrorData
	headers: { [key: string]: any }
	request: XMLHttpRequest
	status: number
	statusText: string


	constructor(error: ApiError) {
		this.config     = error.config
		this.data       = error.data
		this.headers    = error.headers
		this.request    = error.request
		this.status     = error.status
		this.statusText = error.statusText
	}

	static handleError(error: any) {
		if (error.response)
			return new ApiError(error.response as ApiError)

		return error
	}

	getErrorsList(errorData: ApiErrorData = this.data): string[] {
		if (errorData.errors) {
			return ApiError.flattenErrors(errorData.errors)
		}

		return [errorData.message]
	}

	private static flattenErrors(errors: ApiErrorsOptions): string[] {
		if (errors instanceof Array) {
			let flattenErrors: string[] = []

			errors.forEach(errorObject => {
				flattenErrors = [...flattenErrors, ...ApiError.getMessages(errorObject as ApiErrorObject)]
			})

			return flattenErrors
		}

		return ApiError.getMessages(errors as ApiErrorObject)
	}

	private static getMessages(error: ApiErrorObject): string[] {
		if (error.messages)
			return error.messages

		return [error.message as string]
	}
}
