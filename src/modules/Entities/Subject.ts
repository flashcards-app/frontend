import Entity, { EntityProps } from "./Entity"


export interface SubjectProps extends EntityProps {
	title?: string
	label: string
}

class Subject extends Entity {
	label: string


	constructor(data: SubjectProps) {
		super(data)
		this.label = data.label
	}
}


export default Subject
