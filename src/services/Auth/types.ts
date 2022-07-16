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
