import ApiUrlService, { ApiUrlServiceProps } from '../../modules/ApiUrlService'
import { LoginResult, LogoutResult, RefreshToken, RegisterResult } from "./types"
import TokenStorage from "../../modules/TokenStorage"
import ApiError from "../../modules/ApiError"
import { AxiosResponse } from "axios"


export default class Auth extends ApiUrlService {
	endpoint = `${this.apiFullRootUrl}/auth`

	constructor(data: ApiUrlServiceProps) {
		super(data)
	}

	async login(email: string, password: string): Promise<AxiosResponse<LoginResult>> {
		try {
			return await http.post(`${this.endpoint}/login`, { email, password })
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async register(email: string, name: string, password: string): Promise<AxiosResponse<RegisterResult>> {
		try {
			return await http.post(`${this.endpoint}/register`, { email, name, password })
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async logout(): Promise<AxiosResponse<LogoutResult>> {
		try {
			const email        = TokenStorage.getUserEmail()
			const refreshToken = TokenStorage.getRefreshToken()


			const response = await http.post(`${this.endpoint}/logout`, {
				email,
				refreshToken,
			}, TokenStorage.getAuthentication())

			TokenStorage.clearUserData()
			return response as AxiosResponse<LogoutResult>
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}

	async refreshToken(): Promise<AxiosResponse<RefreshToken>> {
		try {
			return await http.post(`${this.endpoint}/refresh-token`, {
				refreshToken: TokenStorage.getRefreshToken(),
				email:        TokenStorage.getUserEmail(),
			})
		} catch (error) {
			throw ApiError.handleError(error)
		}
	}
}
