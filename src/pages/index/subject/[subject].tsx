import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router"
import { questionsEndpoint } from "services"

import QueryHandler from "../../../components/ReactQuery/QueryHandler"
import QuestionAnswer from "../../../components/Subject/QuestionAnswer"
import { Button, Col, Row, Typography, Tooltip, theme } from "../../../components/UI"
import usePagination from "../../../hooks/usePagination"


export default () => {
	const navigate    = useNavigate()
	const { subject } = useParams()

	const { page, setPage, perPage } = usePagination({ initialPerPage: 1 })
	const { data, status }           = questionsEndpoint.get(subject as string, page, perPage)

	const [showAns, setShowAns] = useState(false)


	const currentQuestionController = (action: 'next' | 'back') => {
		if (data && data[0] && action === 'next') {
			setPage(page + 1)
		}

		if (action === 'back' && page > 1) {
			setPage(page - 1)
		}
	}


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
							{data && data[0] ? (
								<QuestionAnswer {...{
									currentQuestionController,
									currentQuestion: data[0],
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
