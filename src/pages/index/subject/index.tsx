import Button from "components/UI/Buttons/Button"
import { useState } from "react"
import { questionsEndpoint } from "../../../services"
import { useNavigate } from "react-router-dom"

export default () => {
	const subjects: string[] = ['Angular', 'Javascript', 'React.js']
	const navigate = useNavigate()

	return (
		<div className="h-full w-full mx-auto px-50 pt-40">

			<h1>בחר נושא</h1>
			{subjects.map((subject) => {
				return <Button onClick={() => navigate(`${subject}`)} key={subject}>{subject}</Button>
			})}
		</div>
	)
}
