import Entity, { EntityProps } from "./Entity"


export type DisplayIn = 'minute' | 'day' | 'week' | 'never'

export const displayInOptions: {value: DisplayIn, label: string}[] = [
	{ value: 'minute', label: 'בעוד דקה' },
	{ value: 'day', label: 'בעוד יום' },
	{ value: 'week', label: 'בעוד שבוע' },
	{ value: 'never', label: 'לעולם לא' }
]

interface UserQuestionProps extends EntityProps {
	displayIn: DisplayIn
	subject: string
}

export default class UserQuestion extends Entity {
	displayIn: DisplayIn

	subject: string

	constructor(data: UserQuestionProps) {
		super(data)
		this.id        = data.id
		this.displayIn = data.displayIn
		this.subject   = data.subject
	}
}
