import Button from "components/UI/Buttons/Button"
import { useNavigate } from "react-router-dom"
import { subjectsEndpoint } from "services"
import { Col, Row } from "../../../components/UI/Grid"
import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import theme from "../../../components/UI/Utils/theme"
import Typography from "../../../components/UI/Typograpy"
import Tooltip from "../../../components/UI/Tooltip/Tooltip"


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
						<Col cols={1} />
					</Row>

					<Row className="justify-around pt-20">
						{data?.map((subject) => (
							<Button
								onClick={() => navigate(`${subject.title}`)}
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
