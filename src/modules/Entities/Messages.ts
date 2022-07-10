import { Message } from "./Message"

export class Messages {
	publicId: string
	socketId: string
	username: string
	messages: Message[]

	constructor(props: Messages) {
		this.publicId = props.publicId
		this.socketId = props.socketId
		this.username = props.username
		this.messages = props.messages
	}


}
