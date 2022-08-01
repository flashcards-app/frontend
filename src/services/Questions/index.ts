import ApiUrlService from "../../modules/ApiUrlService";
import ApiError from "../../modules/ApiError"
import Question from "../../modules/Entities/Question"
import TokenStorage from "../../modules/TokenStorage"
import { QuestionCreateResult, QuestionGetResult } from "./types";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";


const defaultQueryConfig: UseQueryOptions = {}

export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/questions`

	async create(question: Question): Promise<AxiosResponse<QuestionCreateResult>> {
		try {
			return await http.post(this.endpoint, question, TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	get(subject: string, queryConfig: UseQueryOptions = defaultQueryConfig): UseQueryResult<AxiosResponse<QuestionGetResult[]>> {
		return useQuery('questions', async () => {
			return http.get(`${this.endpoint}${this.buildUrlParams({ subject })}`, TokenStorage.getAuthentication())
		}, queryConfig as object)
	}
}
