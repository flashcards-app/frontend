import Button from "components/UI/Buttons/Button"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { questionsEndpoint } from "services"
import { QuestionGetResult } from "../../../services/Questions/types"
import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import { Col, Row } from "../../../components/UI/Grid"
import QuestionAnswer from "../../../components/Subject/QuestionAnswer"
import autoAnimate from "@formkit/auto-animate"
import LinkButton from "../../../components/UI/Buttons/LinkButton"


export default () => {
	const navigate                                        = useNavigate()
	const { subject }                                     = useParams()
	const { data, status }                                = questionsEndpoint.get(subject as string)
	const [currentQuestion, setCurrentQuestion]           = useState<QuestionGetResult>()
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
	const [showAns, setShowAns]                           = useState(false)
	const bottomNavRef                                    = useRef(null)

	const currentQuestionController = (index: number) => {
		if (data) {
			setCurrentQuestion(data.data[index])
			setCurrentQuestionIndex(index)
			setShowAns(false)
		}
	}

	useEffect(() => {
		bottomNavRef.current && autoAnimate(bottomNavRef.current)
	}, [bottomNavRef])

	useEffect(() => {
		if (status === "success" && data) {
			currentQuestionController(0)
		}
	}, [status])


	return (
		<Row className="w-full h-full justify-center">
			<Col className="h-full justify-between text-center w-[700px] pt-10">
				<Col>
					<h1 className="text-2xl h-full">
						{`תרגול - ${subject}`}
					</h1>

					<Col className="h-full">
						<QueryHandler status={status}>
							{
								!currentQuestion
									? (
										<Row className="w-full justify-center text-center">
											<h1>אין שאלות נוספות -</h1>
											&nbsp;
											<LinkButton to="/subject">
												חזור לדף נושאים
											</LinkButton>
										</Row>
									)
									: (
										<QuestionAnswer {...{
											currentQuestionController,
											currentQuestion,
											currentQuestionIndex,
											showAns,
											setShowAns,
										}}/>
									)
							}
						</QueryHandler>
					</Col>
				</Col>


				<Row ref={bottomNavRef} className="pb-10 justify-around">
					{
						((status !== "success") || currentQuestion)
						&& <Button onClick={() => navigate('/subject')}>חזור לדף נושאים</Button>
					}
					<Button>🚩 דווח על בעיה </Button>
				</Row>
			</Col>
		</Row>
	)
}
