import Entity, {EntityProps} from './Entity'
import {cloneDeep} from 'lodash'
import {TokenStorage} from "../TokenStorage";
import {LoginResult, RegisterResult} from "../../services/Auth/types";
import {LocalStorage} from "../LocalStorage";

interface UserProps extends EntityProps {
	id: string
	email: string
	name: string
	password: string
}

export class User extends Entity {
	constructor(user: UserProps = cloneDeep(defaultData)) {
		super(user)
		this.id = user.id
		this.email = user.email
		this.name = user.name
		this.password = user.password ?? ''
	}
	
	id: string
	email: string
	name: string
	password: string
	
	transformExclude(params: string[] = ['password']) {
		return super.transformExclude(params)
	}
	
	static storeUserData(data: LoginResult | RegisterResult) {
		TokenStorage.storeToken(data.token.accessToken)
		TokenStorage.storeRefreshToken(data.token.refreshToken)
		TokenStorage.storeUserEmail(data.user.email)
		TokenStorage.storeUserName(data.user.name)
		TokenStorage.storeUserId(data.user.id)
		TokenStorage.storePublicId(data.user.publicId)
		LocalStorage.setMessages([])
	}
	
	static clearUserData() {
		localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN)
		localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN)
		localStorage.removeItem(TokenStorage.LOCAL_USER_EMAIL)
		localStorage.removeItem(TokenStorage.LOCAL_USER_NAME)
		localStorage.removeItem(TokenStorage.LOCAL_USER_ID)
		localStorage.removeItem(TokenStorage.LOCAL_PUBLIC_ID)
		localStorage.removeItem(LocalStorage.MESSAGES)
	}
}

const defaultData = {
	id: '',
	email: '',
	name: '',
	password: '',
}
