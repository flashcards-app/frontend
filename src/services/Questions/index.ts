import ApiUrlService  from "../../modules/ApiUrlService";
import { ApiResult } from "../types";
import ApiError from "../../modules/ApiError"
import Question from "../../modules/Entities/Question"
import TokenStorage from "../../modules/TokenStorage"
import { QuestionCreateResult, QuestionGetResult } from "./types";

export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/questions`

	async create(question: Question): Promise<ApiResult<QuestionCreateResult>> {
		try {
			return await http.post(this.endpoint, question, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async get(subject: string): Promise<ApiResult<QuestionGetResult[]>> {
		try {
			return await http.get(`${this.endpoint}${this.buildUrlParams({subject})}`, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}
}
