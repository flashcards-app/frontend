export interface EntityProps {
	isDeleted?: boolean
}

export default class Entity {
	constructor(object: EntityProps = defaultData) {
		this.isDeleted = object.isDeleted ?? false
	}
	
	isDeleted: boolean
	
	transformExclude(params: string[] = []) {
		const transformedObject: {[key: string]: any} = this
		
		params.forEach((param) => delete transformedObject[param])
		
		return transformedObject
	}
	
	transform(fields = [], object = this) {
		const transformed = {}
		
		fields.forEach(field => transformed[field] = object[field])
		
		return transformed
	}
}

const defaultData = {
	isDeleted: false
}
