import Button from "components/UI/Buttons/Button"
import Select from "components/UI/Form/Select"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { questionsEndpoint } from "services"

export default () => {
	const navigate = useNavigate()
	const { subject } = useParams()
	const [questions, setQuestions] = useState(null)
	const [currQuest, setCurrQuest] = useState(0)
	const [showAns, setShowAns] = useState(false)

	useEffect(() => {
		getQuestions()
	},[])

	const getQuestions = async () => {
		const questionsFromDB = await questionsEndpoint.get(subject)
		setQuestions(questionsFromDB.data)
	}

	const onMoveQuest = (dir: number) => {
		setCurrQuest((prevQuest) => prevQuest + dir)
		setShowAns(false)
	}

	const onGoBack = () => {
		setQuestions(null)
		setCurrQuest(0)
		navigate('/subject')
	}

	return (
		<div className="h-full w-full text-center mx-auto px-50 pt-40">
			<h1>
				תרגול-
				{subject}
			</h1>
			{(!questions || questions[currQuest] === undefined) && <h1>אין שאלות נוספות</h1>}
			{(questions?.[currQuest]?.question) && (
				<div>
					<div>
						שאלה
						{' '}
						{currQuest + 1}
						:
						<h1>
							{questions[currQuest].question}
						</h1>
					</div>
					<Button disabled={showAns} onClick={() => setShowAns(true)}>הצג תשובה</Button>
					{showAns && (
						<section>
							{questions[currQuest].answer}
							<Select
								dir="ltr"
								label="בחר רמת קושי לשאלה זו"
								options={['קשה', 'בינוני', 'קל']}
								placeholder="בחר רמת קושי" />
						</section>
					)}
					<Button disabled={currQuest === 0} onClick={() => onMoveQuest(-1)}>שאלה קודמת</Button>
					<Button onClick={() => onMoveQuest(+1)}>שאלה הבאה</Button>
				</div>
			)}
			<div dir="ltr">
				<Button onClick={onGoBack}>חזור לדף נושאים</Button>
				<Button>🚩 דווח על בעיה </Button>
			</div>
		</div>
	)
}
