import { AxiosResponse } from "axios"
import { useQuery, UseQueryOptions } from "react-query"

import ApiError from "../../modules/ApiError"
import ApiUrlService, { ApiUrlServiceProps } from "../../modules/ApiUrlService"
import Question from "../../modules/Entities/Question"
import TokenStorage from "../../modules/TokenStorage"
import { QuestionCreateResult, QuestionGetResult } from "./types"


const defaultQueryConfig: UseQueryOptions = {}

export default class Questions extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/questions`

	constructor(data: ApiUrlServiceProps) {
		super(data)
	}


	async create(question: Question): Promise<AxiosResponse<QuestionCreateResult>> {
		try {
			return await http.post(this.endpoint, question, TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	get(subject: string) {
		return useQuery<QuestionGetResult[]>(`questions-${subject}`, async () => {
			const { data } = await http.get(`${this.endpoint}${this.buildUrlParams({ subject })}`, TokenStorage.getAuthentication())
			return data
		}, defaultQueryConfig as object)
	}
}
