import { AxiosResponse } from "axios"
import { useQuery } from "react-query"

import ApiError from "../../modules/ApiError"
import ApiUrlService, { ApiUrlServiceProps } from "../../modules/ApiUrlService"
import TokenStorage from "../../modules/TokenStorage"
import { UserQuestionAddResult } from "./types"
import { QuestionGetResult } from "../Questions/types"
import { DisplayIn } from "../../modules/Entities/UserQuestion"


export default class UserQuestions extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/questions/my`

	constructor(data: ApiUrlServiceProps) {
		super(data)
	}


	async add({ questionId, displayIn }: { questionId: string, displayIn: DisplayIn }): Promise<AxiosResponse<UserQuestionAddResult>> {
		try {
			return await http.post(this.endpoint, {questionId, displayIn}, TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	list(subject: string, page = 1, perPage = 30) {
		return useQuery<QuestionGetResult[]>(`user-questions-${subject}-page-${page}-perPage-${perPage}`, async () => {
			const { data } = await http.get(`${this.endpoint}${this.buildUrlParams({ subject, page, perPage })}`, TokenStorage.getAuthentication())
			return data
		}, { keepPreviousData: true })
	}
}
