import Entity from "./Entity"


export interface SubjectProps {
	isDeleted?: boolean
	label: string
}

class Subject extends Entity {
	label: string
	

	constructor(data: SubjectProps) {
		super(data)
		this.label = data.label
	}
}


export default Subject;
