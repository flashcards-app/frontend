import { useFormik } from "formik"
import * as Yup from "yup"
import TextArea from "../../components/UI/Form/TextArea"
import { questionsEndpoint } from "../../services"
import Button from "../../components/UI/Buttons/Button"
import Question from "../../modules/Entities/Question"


export default () => {
	const formik = useFormik({
		initialValues:    {
			question: '',
			answer:   ''
		},
		validationSchema: Yup.object({
			question: Yup.string().required('יש להזין שאלה'),
			answer:   Yup.string().required('יש להזין תשובה')
		}),
		validateOnChange: false,
		validateOnBlur:   false,
		onSubmit:         async (values) => {
			if (formik.isValid) {
				const { question, answer } = values
				const questionObject       = new Question({ question, answer })
				await questionsEndpoint.create(questionObject)
				formik.handleReset
			}
		}
	})

	return (
		<div className="h-full w-full mx-auto px-50 pt-40">
			<form onSubmit={formik.handleSubmit}>
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
						error={formik.errors.question}/>
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
						error={formik.errors.answer}/>
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
