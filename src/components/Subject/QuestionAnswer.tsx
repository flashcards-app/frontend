import { useEffect, useRef } from "react"

import { css } from "@emotion/css"
import autoAnimate from "@formkit/auto-animate"
import tw from "twin.macro"

import { QuestionGetResult } from "../../services/Questions/types"
import { Col, Row, Label, Button, Card, Tooltip } from "../UI"


interface QuestionAnswerProps {
	currentQuestion: QuestionGetResult
	currentQuestionController: (action: 'next' | 'back') => void
	showAns: boolean
	page: number
	setShowAns: (showAns: boolean) => void
}

const QuestionAnswer = (props: QuestionAnswerProps) => {
	const { currentQuestion, currentQuestionController, showAns, page, setShowAns } = props

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
				<Col className="w-[45px]" justify="center">
					{(page > 1) && (
						<Tooltip tooltip="לשאלה הקודמת" placement="center-left">
							<Button
								fab
								icon
								size={24}
								onClick={() => {
									currentQuestionController('back')
									setShowAns(false)
								}}>
								<IconMdiArrowRight/>
							</Button>
						</Tooltip>
					)}
				</Col>

				<Col className="mx-4 my-2" align="center">
					<Button
						className={css`${tw`w-40 mx-auto my-auto mx-2`}`}
						disabled={showAns}
						onClick={() => setShowAns(true)}>
						הצג תשובה
					</Button>
				</Col>

				<Col className="w-[45px]" justify="center">
					{showAns && (
						<Tooltip tooltip="לשאלה הבאה" placement="center-right">
							<Button
								fab
								icon
								size={24}
								onClick={() => {
									currentQuestionController('next')
									setShowAns(false)
								}}>
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
