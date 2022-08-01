import Button from "components/UI/Buttons/Button"
import { useNavigate } from "react-router-dom"
import { Col, Row } from "../../../components/UI/Grid";

export default () => {
	const subjects: string[] = ['Angular', 'Javascript', 'React.js']
	const navigate = useNavigate()
	
	return (
		<Row className="w-full h-full justify-center">
			<Col className="h-full text-center w-[700px] pt-10">
				<h1 className="text-2xl">
					בחר נושא
				</h1>
				<Row className="justify-around pt-20">
					{subjects.map((subject) => (
						<Button
							onClick={() => navigate(`${subject}`)}
							key={subject}>
							{subject}
						</Button>
					))}
				</Row>
			</Col>
		</Row>
	)
}
