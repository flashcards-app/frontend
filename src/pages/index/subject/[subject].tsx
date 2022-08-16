import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router"
import { questionsEndpoint } from "services"

import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import QuestionAnswer from "../../../components/Subject/QuestionAnswer"
import { Button, Col, Row, Typography, Tooltip, theme } from "../../../components/UI"
import usePagination from "../../../hooks/usePagination"
import { QuestionGetResult } from "../../../services/Questions/types"


export default () => {
	const navigate    = useNavigate()
	const { subject } = useParams()

	const { page, perPage, hasMorePages, paginationController } = usePagination({ initialPerPage: 1 })
	const { data, status }                                      = questionsEndpoint.get(subject as string, page, perPage)

	const [currentQuestion, setCurrentQuestion]           = useState<QuestionGetResult>()
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
	const [showAns, setShowAns]                           = useState(false)

	const questionSelector = (index: number) => {
		if (data && hasMorePages) {
			const action = paginationController(data.length, index)

			if (action === 'back') {
				setCurrentQuestionIndex(perPage - 1)
				currentQuestionController(perPage - 1)
				return true
			}

			if (action === 'next') {
				setCurrentQuestionIndex(0)
				currentQuestionController(0)
				return true
			}
		}
	}

	const currentQuestionController = (index: number) => {
		if (data) {
			const hasPaginated = questionSelector(index)

			if (hasPaginated) {
				return
			}

			setCurrentQuestion(data[index])
			setCurrentQuestionIndex(index)
			setShowAns(false)
		}
	}


	useEffect(() => {
		if (status === 'success') currentQuestionController(0)
	}, [status])


	return (
		<Row {...theme.animations.fadeInOut}
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
							{currentQuestion ? (
								<QuestionAnswer {...{
									currentQuestionController,
									currentQuestion,
									currentQuestionIndex,
									showAns,
									page,
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
