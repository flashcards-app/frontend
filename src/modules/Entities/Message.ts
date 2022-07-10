export class Message {
	time?: number
	fromMe: boolean
	message: string

	constructor(props: Message) {
		this.time = Date.now()
		this.fromMe = props.fromMe
		this.message = props.message
	}
}

