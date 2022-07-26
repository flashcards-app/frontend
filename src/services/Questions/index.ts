import ApiUrlService  from "../../modules/ApiUrlService";
import { LoginResult } from "../Auth/types";
import { ApiResult } from "../types";
import ApiError from "../../modules/ApiError"
import Question from "../../modules/Entities/Question"
import TokenStorage from "../../modules/TokenStorage"

export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/questions`

	async create(question: Question): Promise<ApiResult<LoginResult>> {
		try {
			return await http.post(this.endpoint, question, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async get(subject: string): Promise<ApiResult<LoginResult>> {
		try {
			return await http.get(`${this.endpoint}${this.buildUrlParams({subject})}`, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}
}
