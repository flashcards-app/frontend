export interface QuestionGetResult {
	id: string
	isDeleted: boolean
	question: string
	answer: string
	subject: string
	createdAt: string
}

export interface QuestionCreateResult {
	isDeleted: boolean
	subject: string
	question: string
	answer: string
	createdAt: string
}
