import Button from "components/UI/Buttons/Button"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { subjectsEndpoint } from "services";
import { Col, Row } from "../../../components/UI/Grid";

export default () => {
	const {data, status} = subjectsEndpoint.get()
	const [subjects, setSubjects] = useState([])
	const navigate = useNavigate()
	
	
	useEffect(() => {
		if (status === "success" && data) {
			setSubjects(data.data)
		}
	}, [status])
	
	return (
		<Row className="w-full h-full justify-center">
			<Col className="h-full text-center w-[700px] pt-10">
				<h1 className="text-2xl">
					בחר נושא
				</h1>
				<Row className="justify-around pt-20">
					{subjects.length>0 && subjects.map((subject) => (
						<Button
							onClick={() => navigate(`${subject.title}`)}
							key={subject.id}>
							{subject.label}
						</Button>
					))}
				</Row>
			</Col>
		</Row>
	)
}
