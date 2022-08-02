import ApiUrlService  from "../../modules/ApiUrlService";
import { ApiResult } from "../types";
import ApiError from "../../modules/ApiError"
import Subject from "../../modules/Entities/Subject"
import TokenStorage from "../../modules/TokenStorage"
import { SubjectCreateResult, SubjectGetResult } from "./types";

export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/subjects`

	async create(subject: Subject): Promise<ApiResult<SubjectCreateResult>> {
		try {
			return await http.post(this.endpoint, subject, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async get(): Promise<ApiResult<SubjectGetResult[]>> {
		try {
			return await http.get(`${this.endpoint}`, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}
}
