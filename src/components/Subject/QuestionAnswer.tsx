import { useEffect, useRef } from "react"

import { css } from "@emotion/css"
import autoAnimate from "@formkit/auto-animate"
import { AnimatePresence } from "framer-motion"
import tw from "twin.macro"

import { QuestionGetResult } from "../../services/Questions/types"
import { Col, Row, Label, Button, Card, Tooltip, theme } from "../UI"


interface QuestionAnswerBasic {
	currentQuestion: QuestionGetResult
	showAns: boolean
	page: number
	setShowAns: (showAns: boolean) => void
}

interface QuestionAnswerWithNavigation extends QuestionAnswerBasic {
	currentQuestionController: (action: 'next' | 'back') => void
	hasNavigation: true
}

interface QuestionAnswerWithoutNavigation extends QuestionAnswerBasic {
	hasNavigation: false
}

type QuestionAnswerProps = QuestionAnswerWithNavigation | QuestionAnswerWithoutNavigation

const QuestionAnswer = (props: QuestionAnswerProps) => {
	const { currentQuestion, hasNavigation, showAns, page, setShowAns } = props

	const colRef        = useRef(null)
	const actionsRowRef = useRef(null)

	useEffect(() => {
		colRef.current && autoAnimate(colRef.current)
	}, [colRef])

	useEffect(() => {
		actionsRowRef.current && autoAnimate(actionsRowRef.current)
	}, [actionsRowRef])

	return (
		<Col className="h-full" ref={colRef}>
			<Col className="h-full pt-2" center>

				<Label className="text-center mx-auto">
					שאלה
				</Label>

				<Row className="w=full h-full px-4 py-2">
					<Card className="flex justify-center items-center w-full h-full">
						<p>
							{currentQuestion.question}
						</p>
					</Card>
				</Row>

			</Col>

			<Row
				ref={actionsRowRef}
				className="w-full justify-around lg:px-10 xs:px-2">
				{hasNavigation && (
					<Col className="w-[45px]" justify="center">
						<AnimatePresence>
							{(page > 1) && (
								<Tooltip tooltip="לשאלה הקודמת" placement="center-left">
									<Button
										{...theme.animations.fadeInOut}
										fab
										icon
										size={24}
										onClick={() => {
											props.currentQuestionController('back')
											setShowAns(false)
										}}>
										<IconMdiArrowRight/>
									</Button>
								</Tooltip>
							)}
						</AnimatePresence>
					</Col>
				)}

				<Col className="mx-4 my-2" align="center">
					<Button
						className={css`${tw`w-40 mx-auto my-auto mx-2`}`}
						disabled={showAns}
						onClick={() => setShowAns(true)}>
						הצג תשובה
					</Button>
				</Col>

				{hasNavigation && (
					<Col className="w-[45px]" justify="center">
						<AnimatePresence>
							{showAns && (
								<Tooltip tooltip="לשאלה הבאה" placement="center-right">
									<Button
										{...theme.animations.fadeInOut}
										fab
										icon
										size={24}
										onClick={() => {
											props.currentQuestionController('next')
											setShowAns(false)
										}}>
										<IconMdiArrowLeft/>
									</Button>
								</Tooltip>
							)}
						</AnimatePresence>
					</Col>
				)}
			</Row>


			{showAns && (
				<Col className="pt-2 h-full">
					<Label className="text-center mx-auto">
						תשובה
					</Label>
					<Row className="w=full p-2 pt-2 h-full">
						<Card className="flex justify-center items-center w-full h-full">
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


QuestionAnswer.defaultProps = {
	hasNavigation: false,
}

export default QuestionAnswer
