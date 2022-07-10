import ApiUrlService, {ApiUrlServiceProps} from '../../modules/ApiUrlService'
import {ApiResult, LoginResult, RegisterResult} from "./types";
import {TokenStorage} from "../../modules/TokenStorage";
import {User} from "../../modules/Entities/User";

export default class Auth extends ApiUrlService {

	endpoint: string = `${this.apiFullRootUrl}/auth`

	constructor(AuthEndpoint: ApiUrlServiceProps) {
		super(AuthEndpoint)
	}

	async login(email: string, password: string): Promise<ApiResult<LoginResult>> {
		try {
			return await http.post(`${this.endpoint}/login`, {email, password})
		} catch (error) {
			throw error
		}
	}

	async register(email: string, name: string, password: string): Promise<ApiResult<RegisterResult>> {
		try {
			return await http.post(`${this.endpoint}/register`, {email, name, password})
		} catch (error) {
			throw error
		}
	}

	async logout() {
		try {
			const email        = TokenStorage.getUserEmail()
			const refreshToken = TokenStorage.getRefreshToken()

			await http.post(`${this.endpoint}/logout`, {email, refreshToken}, await TokenStorage.getAuthentication())

			User.clearUserData()
		} catch (error) {
			throw(error)
		}
	}

	async refreshToken() {
		if (TokenStorage.getRefreshToken()) {
			try {
				const response = await http.post(`${this.endpoint}/refresh-token`, {
					refreshToken: TokenStorage.getRefreshToken(),
					email: TokenStorage.getUserEmail(),
				})

				TokenStorage.storeToken(response.data?.accessToken)
				TokenStorage.storeRefreshToken(response.data?.refreshToken)
				return response.data?.accessToken
			} catch (error) {
				throw error
			}
		}
	}
}
