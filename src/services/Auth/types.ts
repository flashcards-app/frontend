export interface ApiResult<Data> {
	config: { [key: string]: any }
	data: Data | { [key: string]: any } | any[]
	headers: { [key: string]: any }
	request: XMLHttpRequest
	status: number
	statusText: string
}

export interface ApiError {
	success: boolean;
	message: string;
	data: { [key: string]: any } | any[];
}

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
