import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router"
import { questionsEndpoint } from "services"

import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import QuestionAnswer from "../../../components/Subject/QuestionAnswer"
import { Button, Col, Row, Typography, Tooltip, theme } from "../../../components/UI"
import { QuestionGetResult } from "../../../services/Questions/types"


export default () => {
	const navigate         = useNavigate()
	const { subject }      = useParams()
	const { data, status } = questionsEndpoint.get(subject as string)

	const [currentQuestion, setCurrentQuestion]           = useState<QuestionGetResult>()
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
	const [showAns, setShowAns]                           = useState(false)

	const currentQuestionController = (index: number) => {
		if (data) {
			setCurrentQuestion(data[index])
			setCurrentQuestionIndex(index)
			setShowAns(false)
		}
	}


	useEffect(() => {
		if (status === "success" && data) {
			currentQuestionController(0)
		}
	}, [status])


	return (
		<Row
			{...theme.animations.fadeInOut}
			className="w-full h-full justify-center">
			<Col className="h-full justify-between text-center w-[700px] lg:pt-10 xs:pt-4">
				<Col>
					<Row className="lg:pb-10 xs:pb-3 px-4 justify-around">
						<Col cols={1}>
							<Tooltip tooltip="חזרה לבחירת נושא" placement="bottom-center">
								<Button
									fab
									icon
									size={20}
									onClick={() => navigate('/subject')}>
									<IconMdiArrowRight/>
								</Button>
							</Tooltip>
						</Col>
						<Col cols={10}>
							<Typography as="h2" className="h-full">
								{`תרגול - ${subject}`}
							</Typography>
						</Col>
						<Col cols={1}/>
					</Row>


					<Col className="h-full">
						<QueryHandler status={status}>
							{currentQuestion
								? (
									<QuestionAnswer {...{
										currentQuestionController,
										currentQuestion,
										currentQuestionIndex,
										showAns,
										setShowAns,
									}}/>
								) : (
									<Row className="w-full justify-center text-center">
										<Typography color={theme.colors.gray_400} as="h5">אין שאלות נוספות</Typography>
									</Row>
								)}
						</QueryHandler>
					</Col>
				</Col>
			</Col>
		</Row>
	)
}
