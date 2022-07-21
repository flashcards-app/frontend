import { useFormik } from "formik"
import * as Yup from "yup"
import TextArea from "../../components/UI/Form/TextArea"
import Select from "../../components/UI/Form/Select"
import { questionsEndpoint } from "../../services"
import Button from "../../components/UI/Buttons/Button"
import Question from "../../modules/Entities/Question"


export default () => {
	const formik = useFormik({
		initialValues: {
			subject: '',
			question: '',
			answer: '',
		},
		validationSchema: Yup.object({
			subject: Yup.string().required('יש להזין נושא'),
			question: Yup.string().required('יש להזין שאלה'),
			answer: Yup.string().required('יש להזין תשובה'),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			const { question, answer, subject } = values
			const questionObject = new Question({ question, answer, subject })
			await questionsEndpoint.create(questionObject)
			formik.resetForm()
		}
	})
	const options = ['React.js', 'Javascript', 'Angular']

	return (
		<div className="h-full w-full mx-auto px-50 pt-40">
			<form onSubmit={formik.handleSubmit}>
				<section>
					<Select
						dir="ltr"
						label={'נושא'}
						options={options}
						placeholder="בחר נושא"
						defaultValue = {formik.values.subject}
						onChange={(ev) => formik.setFieldValue('subject', ev.target.value)}
						id="subject"
						onBlur={() => formik.validateField('subject')}
						error={formik.errors.subject} />
				</section>
				<section>
					<label>
						שאלה
					</label>
					<TextArea
						id="question"
						placeholder={'שאלה'}
						value={formik.values.question}
						onChange={formik.handleChange}
						onBlur={() => formik.validateField('question')}
						error={formik.errors.question} />
				</section>

				<section>
					<label>
						תשובה
					</label>
					<TextArea
						id="answer"
						placeholder={'תשובה'}
						value={formik.values.answer}
						onChange={formik.handleChange}
						onBlur={() => formik.validateField('answer')}
<<<<<<< HEAD
						error={formik.errors.answer}/>
=======
						error={formik.errors.answer} />

>>>>>>> a1ee624 (feat(questions page): created select menu for subject)
				</section>

				<div className="flex justify-center">
					<Button type="submit" disabled={!formik.isValid}>
						שמירה
					</Button>
				</div>
			</form>
		</div>
	)
}
