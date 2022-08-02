import { useFormik } from "formik"
import * as Yup from "yup"
import TextArea from "../../components/UI/Form/TextArea"
import Select from "../../components/UI/Form/Select"
import { questionsEndpoint, subjectsEndpoint } from "../../services"
import Button from "../../components/UI/Buttons/Button"
import Question from "../../modules/Entities/Question"
import { useEffect, useState } from "react"
import { ApiResult } from "services/types"
import { SubjectGetResult } from "services/Subjects/types"
import Subject from "modules/Entities/Subject"


export default () => {
	const [subjects, setSubjects] = useState([])
	const formik = useFormik({
		initialValues: {
			subject: '',
			question: '',
			answer: '',
		},
		validationSchema: Yup.object({
			subject: Yup.string().required('יש לבחור נושא'),
			question: Yup.string().required('יש להזין שאלה'),
			answer: Yup.string().required('יש להזין תשובה'),
		}),
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			const { question, answer, subject } = values
			const questionObject = new Question({ question, answer, subject })
			await questionsEndpoint.create(questionObject)
			if (!subjects.length){
				const newSubject  = new Subject({label: subject})
				await subjectsEndpoint.create(newSubject)
				await fetchSubjects()
			}
			formik.resetForm({
				values: {
					subject: formik.values.subject,
					question: '',
					answer: '',
				},
			})
		},
	})

	const fetchSubjects = async () => {
		const subjectsFromDB: ApiResult<SubjectGetResult[]> = await subjectsEndpoint.get()
		setSubjects(subjectsFromDB.data)
	}

	useEffect(() => {
		(async () => await fetchSubjects())()
	}, [])

	return (
		<div className="h-full w-full mx-auto lg:px-[20%] sm:px-[50px] xs:px-[30px] pt-40">
			<form onSubmit={formik.handleSubmit}>
				{subjects.length && <> <Select
					id="subject"
					label="נושא"
					options={
						subjects.map(subject => {
							return {
								label: subject.label,
								value: subject.label
							}
						})}
					placeholder="בחר נושא"
					value={formik.values.subject}
					onChange={async (value) => formik.setFieldValue("subject", value.value)}
					onBlur={async () => formik.validateField('subject')}
					error={!!formik.errors.subject}
					helperText={formik.errors.subject} />
					<Button onClick={()=>setSubjects([])}>הוסף נושא חדש</Button>
				</>
				}

				{!subjects.length && <>
					<TextArea
						id="subject"
						label="נושא"
						value={formik.values.subject}
						onChange={formik.handleChange}
						onBlur={async () => formik.validateField('subject')}
						error={!!formik.errors.subject}
						helperText={formik.errors.subject} />
						<Button onClick={async ()=>fetchSubjects()}>בחר מרשימת הנושאים</Button>
						</>
				}

				<TextArea
					id="question"
					label="שאלה"
					value={formik.values.question}
					onChange={formik.handleChange}
					onBlur={async () => formik.validateField("question")}
					helperText={formik.errors.question}
					error={!!formik.errors.question} />

				<TextArea
					id="answer"
					label="תשובה"
					value={formik.values.answer}
					onChange={formik.handleChange}
					onBlur={async () => formik.validateField("answer")}
					helperText={formik.errors.answer}
					error={!!formik.errors.answer} />

				<div className="flex justify-center">
					<Button type="submit" disabled={!formik.isValid}>
						שמירה
					</Button>
				</div>
			</form>
		</div>
	)
}
