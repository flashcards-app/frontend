import ApiUrlService, { ApiUrlServiceProps } from '../../modules/ApiUrlService'
import { LoginResult, RegisterResult } from "./types"
import { ApiResult } from "../types"
import { TokenStorage } from "../../modules/TokenStorage"
import { User } from "../../modules/Entities/User"
import ApiError from "../../modules/ApiError"


export default class Auth extends ApiUrlService {

	endpoint: string = `${this.apiFullRootUrl}/auth`

	constructor(AuthEndpoint: ApiUrlServiceProps) {
		super(AuthEndpoint)
	}

	async login(email: string, password: string): Promise<ApiResult<LoginResult>> {
		try {
			return await http.post(`${this.endpoint}/login`, { email, password })
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async register(email: string, name: string, password: string): Promise<ApiResult<RegisterResult>> {
		try {
			return await http.post(`${this.endpoint}/register`, { email, name, password })
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async logout() {
		try {
			const email        = TokenStorage.getUserEmail()
			const refreshToken = TokenStorage.getRefreshToken()

			await http.post(`${this.endpoint}/logout`, { email, refreshToken }, await TokenStorage.getAuthentication())

			TokenStorage.clearUserData()
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async refreshToken() {
		if (TokenStorage.getRefreshToken()) {
			try {
				const response = await http.post(`${this.endpoint}/refresh-token`, {
					refreshToken: TokenStorage.getRefreshToken(),
					email:        TokenStorage.getUserEmail(),
				})

				TokenStorage.storeToken(response.data?.accessToken)
				TokenStorage.storeRefreshToken(response.data?.refreshToken)
				return response.data?.accessToken
			} catch (error) {
				throw ApiError.handleError(error)
			}
		}
	}
}
