import ApiUrlService, {ApiUrlServiceProps} from "../../modules/ApiUrlService";
import {LoginResult} from "../Auth/types";
import {ApiResult} from "../types";
import ApiError from "../../modules/ApiError"
import Question from "../../modules/Entities/Question"

export default class Auth extends ApiUrlService {

	endpoint: string = `${this.apiFullRootUrl}/questions`

	constructor(AuthEndpoint: ApiUrlServiceProps) {
		super(AuthEndpoint)
	}

	async create(question: Question): Promise<ApiResult<LoginResult>> {
		try {
			return await http.post(this.endpoint, question)
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}
}
