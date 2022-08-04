import ApiUrlService  from "../../modules/ApiUrlService";
import { ApiResult } from "../types";
import ApiError from "../../modules/ApiError"
import Subject from "../../modules/Entities/Subject"
import TokenStorage from "../../modules/TokenStorage"
import { TransformedSubject } from "./types";
import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

const defaultQueryConfig: UseQueryOptions = {}

export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/subjects`

	async create(subject: Subject): Promise<ApiResult<TransformedSubject>> {
		try {
			return await http.post(this.endpoint, subject, await TokenStorage.getAuthentication())
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	get(queryConfig: UseQueryOptions = defaultQueryConfig): UseQueryResult<AxiosResponse<TransformedSubject[]>> {
		return useQuery('subjects', async () => {
			return http.get(`${this.endpoint}`, TokenStorage.getAuthentication())
		}, queryConfig as object)
	}
}
