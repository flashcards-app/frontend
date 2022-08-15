export interface EntityProps {
	isDeleted?: boolean
	id?: string
}

export default class Entity {
	constructor(data: EntityProps) {
		this.id        = data.id
		this.isDeleted = data.isDeleted ?? false
	}

	id: string | undefined

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
