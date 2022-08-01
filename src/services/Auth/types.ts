export interface RegisterResult {
	token: {
		tokenType: string
		accessToken: string
		refreshToken: string
		expiresIn: string
	},
	user: {
		isDeleted: boolean
		id: string
		publicId: string
		email: string
		name: string
		createdAt: string
	}
}

export interface LoginResult {
	token: {
		tokenType: string
		accessToken: string
		refreshToken: string
		expiresIn: string
	},
	user: {
		isDeleted: boolean
		id: string
		publicId: string
		email: string
		name: string
		createdAt: string
	}
}

export interface LogoutResult {
	expires: string
	token: string
	userEmail: string
	userId: string
	_id: string
}

export interface RefreshToken {
	accessToken: string
	expiresIn: string
	refreshToken: string
	tokenType: string
}
