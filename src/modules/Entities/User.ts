import Entity, {EntityProps} from './Entity'
import {cloneDeep} from 'lodash'
import {TokenStorage} from "../TokenStorage";
import {LoginResult, RegisterResult} from "../../services/Auth/types";

interface UserProps extends EntityProps {
	id: string
	email: string
	name: string
	password: string
}

export class User extends Entity {
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
	password: string

	transformExclude(params: string[] = ['password']) {
		return super.transformExclude(params)
	}
}

const defaultData = {
	id: '',
	email: '',
	name: '',
	password: '',
}
