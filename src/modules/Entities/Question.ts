import Entity from "./Entity"


export interface QuestionProps {
	isDeleted?: boolean
	question: string
	answer: string
}

class Question extends Entity {
	question: string
	answer: string

	constructor(data: QuestionProps) {
		super(data)
		this.question = data.question
		this.answer = data.answer
	}
}

export default Question;
