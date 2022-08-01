import ApiUrlService, { ApiUrlServiceProps } from '../../modules/ApiUrlService'
import { LoginResult, LogoutResult, RefreshToken, RegisterResult } from "./types"
import { ApiResult } from "../types"
import TokenStorage from "../../modules/TokenStorage"
import ApiError from "../../modules/ApiError"


export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/auth`

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

	async logout(): Promise<ApiResult<LogoutResult>> {
		try {
			const email = TokenStorage.getUserEmail()
			const refreshToken = TokenStorage.getRefreshToken()

			const response = await http.post(`${this.endpoint}/logout`, {
				email,
				refreshToken
			}, await TokenStorage.getAuthentication()) as ApiResult<LogoutResult>

			TokenStorage.clearUserData()
			return response
		} catch (error) {
			throw ApiError.handleError(error)
		} finally {
		}
	}

	async refreshToken(): Promise<string | undefined> {
		if (TokenStorage.getRefreshToken()) {
			try {
				const response = await http.post(`${this.endpoint}/refresh-token`, {
					refreshToken: TokenStorage.getRefreshToken(),
					email:        TokenStorage.getUserEmail(),
				}) as ApiResult<RefreshToken>

				TokenStorage.storeToken(response.data.accessToken)
				TokenStorage.storeRefreshToken(response.data.refreshToken)
				return response.data.accessToken
			} catch (error) {
				throw ApiError.handleError(error)
			}
		}
	}
}
