import ApiUrlService, { ApiUrlServiceProps } from "../../modules/ApiUrlService"
import ApiError from "../../modules/ApiError"
import Question from "../../modules/Entities/Question"
import TokenStorage from "../../modules/TokenStorage"
import { QuestionCreateResult, QuestionGetResult } from "./types"
import { useQuery, UseQueryOptions } from "react-query"
import { AxiosResponse } from "axios"


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
