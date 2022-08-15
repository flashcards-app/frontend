import { cloneDeep } from 'lodash'

import Entity, { EntityProps } from './Entity'

interface UserProps extends EntityProps {
	id: string
	email: string
	name: string
	password?: string
}

const defaultData = {
	id: '',
	email: '',
	name: '',
	password: '',
}

export default class User extends Entity {
	constructor(user: UserProps = cloneDeep(defaultData)) {
		super(user)
		this.id = user.id
		this.email = user.email
		this.name = user.name
		this.password = user.password ?? ''
	}

	id: string

	email: string

	name: string

	password?: string

	transformExclude(params: string[] = ['password']) {
		return super.transformExclude(params)
	}
}
