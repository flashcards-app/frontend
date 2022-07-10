import ApiUrlService, {ApiUrlServiceProps} from "../../modules/ApiUrlService";
import {ApiResult, LoginResult} from "../Auth/types";

export default class Auth extends ApiUrlService {
	
	endpoint: string = `${this.apiFullRootUrl}/questions`
	
	constructor(AuthEndpoint: ApiUrlServiceProps) {
		super(AuthEndpoint)
	}
	
	async create(question: string, answer: string): Promise<ApiResult<LoginResult>> {
		try {
			return await http.post(this.endpoint, {question, answer})
		} catch (error) {
			throw error
		}
	}
}
