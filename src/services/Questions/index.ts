import { AxiosResponse } from "axios"
import { useQuery } from "react-query"

import ApiError from "../../modules/ApiError"
import ApiUrlService, { ApiUrlServiceProps } from "../../modules/ApiUrlService"
import Question from "../../modules/Entities/Question"
import TokenStorage from "../../modules/TokenStorage"
import { QuestionCreateResult, QuestionGetResult } from "./types"


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

	get(subject: string, page = 1, perPage = 30) {
		return useQuery<QuestionGetResult[]>(`questions-${subject}-page-${page}-perPage-${perPage}`, async () => {
			const { data } = await http.get(`${this.endpoint}${this.buildUrlParams({ subject, page, perPage })}`, TokenStorage.getAuthentication())
			return data
		}, { keepPreviousData : true })
	}
}
