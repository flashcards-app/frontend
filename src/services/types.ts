import { UseQueryOptions } from "react-query";
import { QueryKey } from "react-query/types/core/types";

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


export type QueryConfig<TData, TQueryKey extends QueryKey = QueryKey> = Omit<UseQueryOptions<unknown, unknown, TData, TQueryKey>, 'queryKey' | 'queryFn'>
