import Entity, { EntityProps } from "./Entity"
import { theme } from "../../components/UI"
import { ColorsForState } from "../../components/UI/Buttons/Button"


export type DisplayIn = 'minute' | 'day' | 'week' | 'never'

export const difficultyOptions: { value: DisplayIn, label: string }[] = [
	{ value: 'minute', label: 'בעוד דקה' },
	{ value: 'day', label: 'בעוד יום' },
	{ value: 'week', label: 'בעוד שבוע' },
	{ value: 'never', label: 'לעולם לא' }
]


export const colorForDifficulty: Record<string, ColorsForState> = {
	minute: {
		default: '#3266e7',
		hover: '#467ce7',
		active: '#4b77d0'
	},
	day:    {
		default: '#4b7eef',
		hover: '#4879d3',
		active: '#5486e3'
	},
	week:   {
		default: '#4d8bda',
		hover: '#3c87da',
		active: '#468fda'
	},
	never:  {
		default: '#4f97ea',
		hover: '#528cde',
		active: '#5199e5'
	}
}

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
