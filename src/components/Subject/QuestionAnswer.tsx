import { Col, Row } from "../UI/Grid"
import Label from "../UI/Form/Label"
import Button from "../UI/Buttons/Button"
import { useEffect, useRef } from "react"
import { QuestionGetResult } from "../../services/Questions/types"
import autoAnimate from "@formkit/auto-animate"
import { css } from "@emotion/css"
import tw from "twin.macro"


interface QuestionAnswerProps {
	currentQuestion: QuestionGetResult
	currentQuestionController: (index: number) => void
	currentQuestionIndex: number
	showAns: boolean
	setShowAns: (showAns: boolean) => void
}

const QuestionAnswer = (props: QuestionAnswerProps) => {
	const { currentQuestion, currentQuestionController, currentQuestionIndex, showAns, setShowAns } = props

	const colRef       = useRef(null)
	const difficulties = ["קל", "בינוני", "קשה"]

	useEffect(() => {
		colRef.current && autoAnimate(colRef.current)
	}, [colRef])

	return (
		<Col ref={colRef}>
			<Col className="pt-4" center>
				<Label className="text-center mx-auto">
					שאלה
				</Label>
				<p className="min-h-[110px]">
					{currentQuestion.question}
				</p>
			</Col>
			<Button
				className="w-40 mx-auto"
				disabled={showAns}
				onClick={() => setShowAns(true)}>
				הצג תשובה
			</Button>

			{
				showAns
				&& (
					<Col className="pt-4">
						<Label className="text-center mx-auto">
							תשובה
						</Label>
						<p className="min-h-[110px]">
							{currentQuestion.answer}
						</p>

						<Label className="text-center mx-auto">
							בחר רמת קושי
						</Label>

						<Row className="w-full justify-around px-10">
							{
								difficulties.map((difficulty) => (
									<Button className={css`
										min-width: 100px;
										max-width: 160px;
										width: 100%;
										${tw`mx-2`}
									`}
									        key={difficulty}
									        onClick={() => currentQuestionController(currentQuestionIndex + 1)}>
										{difficulty}
									</Button>
								))
							}
						</Row>
					</Col>
				)
			}
		</Col>
	)
}
export default QuestionAnswer
