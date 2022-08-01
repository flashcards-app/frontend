export interface EntityProps {
	isDeleted?: boolean
}

const defaultData = {
	isDeleted: false,
}

export default class Entity {
	constructor(object: EntityProps = defaultData) {
		this.isDeleted = object.isDeleted ?? false
	}

	isDeleted: boolean

	transformExclude(params: string[] = []) {
		const transformedObject: Record<string, any> = this

		params.forEach((param) => delete transformedObject[param])

		return transformedObject
	}

	transform(fields = [], object = this) {
		const transformed = {}

		fields.forEach((field) => transformed[field] = object[field])

		return transformed
	}
}
