import { AxiosResponse } from "axios"
import { useQuery, UseQueryOptions } from "react-query"

import ApiError from "../../modules/ApiError"
import ApiUrlService, { ApiUrlServiceProps } from "../../modules/ApiUrlService"
import Subject from "../../modules/Entities/Subject"
import TokenStorage from "../../modules/TokenStorage"
import { TransformedSubject } from "./types"


const defaultQueryConfig: UseQueryOptions = {}

export default class Subjects extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/subjects`

	constructor(data: ApiUrlServiceProps) {
		super(data)
	}

	async create(subject: Subject): Promise<AxiosResponse<TransformedSubject>> {
		try {
			return await http.post(this.endpoint, subject, TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	get(queryConfig: UseQueryOptions = defaultQueryConfig) {
		return useQuery<TransformedSubject[]>('subjects', async () => {
			const { data } = await http.get(`${this.endpoint}`, TokenStorage.getAuthentication())
			return data
		}, queryConfig as object)
	}
}
