import Button from "components/UI/Buttons/Button"
import Select from "components/UI/Form/Select"
import Question from "modules/Entities/Question"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { questionsEndpoint } from "services"

export default () => {
	const navigate = useNavigate()
	const { subject } = useParams()
	const [questions, setQuestions] = useState(null)
	const [currQuestion, setCurrQuestion] = useState(null)
	const [showAns, setShowAns] = useState(false)

	const fetchQuestions = async () => {
		const questionsFromDB = await questionsEndpoint.get(subject)
		setQuestions(questionsFromDB.data)
		setCurrQuestion(questionsFromDB.data[0])
	}

	useEffect(() => {
		(async () => await fetchQuestions())();
	}, [])


	const onMoveQuest = (dir: number) => {
		const idx = questions.findIndex(quest=> quest === currQuestion)
		if (!idx && dir === -1) return
		setCurrQuestion(questions[idx+dir])
	}

	const options = [
		{ value: 'קל', label: 'קל' },
		{ value: 'בינוני', label: 'בינוני' },
		{ value: 'קשה', label: 'קשה' },
	]

	return (
		<div className="h-full w-full text-center mx-auto px-50 pt-40">
			<h1>
				תרגול-
				{subject}
			</h1>
			{(!questions || !currQuestion) && <h1>אין שאלות נוספות</h1>}
			{(currQuestion) && (
				<div>
					<div>
						שאלה:
						<h1>
							{currQuestion.question}
						</h1>
					</div>
					תשובה:
					<Button disabled={showAns} onClick={() => setShowAns(true)}>הצג תשובה</Button>
					{showAns && (
						<section>
							{currQuestion.answer}
							<Select
								dir="ltr"
								label="בחר רמת קושי לשאלה זו"
								options={options}
								placeholder="בחר רמת קושי" />
						</section>
					)}
					<Button onClick={() => onMoveQuest(-1)}>שאלה קודמת</Button>
					<Button onClick={() => onMoveQuest(+1)}>שאלה הבאה</Button>
				</div>
			)}
			<div dir="ltr">
				<Button onClick={() => navigate('/subject')}>חזור לדף נושאים</Button>
				<Button>🚩 דווח על בעיה </Button>
			</div>
		</div>
	)
}
