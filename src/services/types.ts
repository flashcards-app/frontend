export interface ApiErrorData {
	code: number
	errors: ApiErrorsOptions
	message: string
	// stack - only in development
	stack?: string
}

export type ApiErrorsOptions = ApiErrorObject[] | ApiErrorObject | string[] | string

export interface ApiErrorObject {
	field: string
	location: string
	messages?: string[]
	message?: string
}
