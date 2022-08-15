import { Col, Row } from "../UI/Grid"
import Label from "../UI/Form/Label"
import Button from "../UI/Buttons/Button"
import { useEffect, useRef } from "react"
import { QuestionGetResult } from "../../services/Questions/types"
import autoAnimate from "@formkit/auto-animate"
import { css } from "@emotion/css"
import tw from "twin.macro"
import Card from "../UI/Cards/Card"
import Tooltip from "../UI/Tooltip/Tooltip"


interface QuestionAnswerProps {
	currentQuestion: QuestionGetResult
	currentQuestionController: (index: number) => void
	currentQuestionIndex: number
	showAns: boolean
	setShowAns: (showAns: boolean) => void
}

const QuestionAnswer = (props: QuestionAnswerProps) => {
	const { currentQuestion, currentQuestionController, currentQuestionIndex, showAns, setShowAns } = props

	const colRef        = useRef(null)
	const actionsRowRef = useRef(null)

	useEffect(() => {
		colRef.current && autoAnimate(colRef.current)
	}, [colRef])

	useEffect(() => {
		actionsRowRef.current && autoAnimate(actionsRowRef.current)
	}, [actionsRowRef])

	return (
		<Col ref={colRef}>
			<Col className="pt-4" center>
				<Label className="text-center mx-auto">
					שאלה
				</Label>
				<Row className="w=full p-4">
					<Card className="flex justify-center items-center w-full h-[200px]">
						<p>
							{currentQuestion.question}
						</p>
					</Card>
				</Row>


			</Col>

			<Row
				ref={actionsRowRef}
				className="w-full justify-around lg:px-10 xs:px-2">
				<Col justify="center" cols={1}>
					{currentQuestionIndex > 0 && (
						<Tooltip tooltip="לשאלה הקודמת" placement="center-left">
							<Button
								fab
								icon
								size={24}
								onClick={() => currentQuestionController(currentQuestionIndex - 1)}>
								<IconMdiArrowRight/>
							</Button>
						</Tooltip>
					)}
				</Col>

				<Col className="mx-4 my-2" align="center" cols={10}>
					<Button
						className={css`${tw`w-40 mx-auto my-auto mx-2`}`}
						disabled={showAns}
						onClick={() => setShowAns(true)}>
						הצג תשובה
					</Button>
				</Col>

				<Col justify="center" cols={1}>
					{showAns && (
						<Tooltip tooltip="לשאלה הבאה" placement="center-right">
							<Button
								fab
								icon
								size={24}
								onClick={() => currentQuestionController(currentQuestionIndex + 1)}>
								<IconMdiArrowLeft/>
							</Button>
						</Tooltip>
					)}
				</Col>
			</Row>


			{showAns && (
				<Col className="pt-4">
					<Label className="text-center mx-auto">
						תשובה
					</Label>
					<Row className="w=full p-4">
						<Card className="flex justify-center items-center w-full h-[200px]">
							<p>
								{currentQuestion.answer}
							</p>
						</Card>
					</Row>
				</Col>
			)}
		</Col>
	)
}
export default QuestionAnswer
