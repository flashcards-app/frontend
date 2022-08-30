import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router"
import { userQuestionsEndpoint } from "services"

import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import QuestionAnswer from "../../../components/Subject/QuestionAnswer"
import { Button, Col, Row, Typography, Tooltip, theme } from "../../../components/UI"
import usePagination from "../../../hooks/usePagination"
import { useQueryClient } from "react-query"
import { DisplayIn, difficultyOptions, colorForDifficulty } from "../../../modules/Entities/UserQuestion"


export default () => {
	const queryClient = useQueryClient()
	const navigate    = useNavigate()
	const { subject } = useParams()

	const { page, perPage } = usePagination({ initialPerPage: 1 })
	const { data, status }  = userQuestionsEndpoint.list(subject as string, page, perPage)

	const [showAns, setShowAns] = useState(false)

	const currentQuestionController = async (action: 'next' | 'back', displayIn: DisplayIn) => {
		if (data && data[0] && action === 'next') {
			await userQuestionsEndpoint.add({ questionId: data[0].id, displayIn })
			await queryClient.invalidateQueries(`user-questions-${subject}-page-${page}-perPage-${perPage}`)
			setShowAns(false)
		}
	}

	useEffect(() => {
		(async () => await queryClient.invalidateQueries(`user-questions-${subject}-page-${page}-perPage-${perPage}`))()
	}, [])


	return (
		<Row {...theme.animations.fadeInOut}
		     className="w-full h-full justify-center">
			<Col className="h-full justify-between text-center w-[700px] lg:pt-10 xs:pt-4">

				<Col>
					<Row className="lg:pb-10 xs:pb-2 px-4 justify-around">

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

							{data && data[0] ? (
									<QuestionAnswer
										currentQuestion={data[0]}
										{...{
											showAns,
											page,
											setShowAns,
										}}/>
								)
								:
								(
									<Row className="w-full justify-center text-center">
										<Typography color={theme.colors.gray_400} as="h5">אין שאלות נוספות</Typography>
									</Row>
								)}
						</QueryHandler>

					</Col>

					<Row className="px-6 pb-3 w-full" justify="space-between">

						{showAns && difficultyOptions.map(({ label, value }) => (

							<Col className="px-2"
							     key={value}
							     cols={difficultyOptions.length}>

								<Button
									onClick={() => currentQuestionController('next', value)}
									dark
									colorsForStates={colorForDifficulty[value]}
									className="w-full h-full">
									{label}
								</Button>

							</Col>

						))}

					</Row>

				</Col>
			</Col>
		</Row>
	)
}
