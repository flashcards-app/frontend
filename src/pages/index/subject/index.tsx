import { useNavigate } from "react-router-dom"
import { subjectsEndpoint } from "services"

import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import { Col, Row, Tooltip, Typography, Button, theme } from "../../../components/UI"


export default () => {
	const { data, status } = subjectsEndpoint.get()
	const navigate         = useNavigate()


	return (
		<QueryHandler status={status}>
			<Row
				{...theme.animations.fadeInOut}
				className="w-full h-full justify-center">


				<Col className="h-full text-center w-[700px] pt-10">
					<Row className="pb-10 justify-around px-4">

						<Col cols={1}>

							<Tooltip tooltip="לדף הראשי" placement="bottom-center">
								<Button
									fab
									icon
									size={20}
									onClick={() => navigate('/')}>
									<IconMdiArrowRight/>
								</Button>
							</Tooltip>

						</Col>

						<Col cols={10}>

							<Typography as="h1" className="h-full text-center">
								בחר נושא
							</Typography>

						</Col>

						<Col cols={1}/>
					</Row>

					<Row
						dir="ltr"
						className="px-2 pt-20 gap-y-6 justify-around flex-wrap gap-x-3">
						{data?.map((subject) => (
							<Button
								className="py-2 px-8 w-fit max-w-[200px] flex-[3] whitespace-nowrap"
								onClick={() => navigate(`${subject.title}`)}
								width={'100%'}
								key={subject.id}>
								{subject.label}
							</Button>
						))}
					</Row>

				</Col>
			</Row>
		</QueryHandler>
	)
}
