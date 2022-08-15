import Entity, { EntityProps } from "./Entity"


export interface QuestionProps extends EntityProps {
	question: string
	answer: string
	subject: string
}

class Question extends Entity {
	question: string

	answer: string

	subject: string

	constructor(data: QuestionProps) {
		super(data)
		this.question = data.question
		this.answer   = data.answer
		this.subject  = data.subject
	}
}


export default Question
