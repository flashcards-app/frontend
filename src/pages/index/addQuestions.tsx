import { useFormik } from "formik"
import * as Yup from "yup"
import TextArea from "../../components/UI/Form/TextArea"
import { questionsEndpoint, subjectsEndpoint } from "../../services"
import Button from "../../components/UI/Buttons/Button"
import Question from "../../modules/Entities/Question"
import Select from "../../components/UI/Form/Select"
import QueryHandler from "../../components/ReactQuery/QueryHandler"
import theme from "../../components/UI/Utils/theme"
import { Col, Row } from "../../components/UI/Grid"
import { useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate"
import Tooltip from "../../components/UI/Tooltip/Tooltip"
import { useNavigate } from "react-router-dom"
import Typography from "../../components/UI/Typograpy"
import ConditionalAnimation from "../../components/UI/Animation/ConditionalAnimation"


export default () => {
	const navigate                                   = useNavigate()
	const subjectsQuery                              = subjectsEndpoint.get()
	const { data: subjects, status: subjectsStatus } = subjectsQuery
	const formRef                                    = useRef(null)

	useEffect(() => {
		if (subjectsStatus === "success") {
			formRef.current && autoAnimate(formRef.current)
		}
	}, [formRef])

	const formik = useFormik({
		initialValues:    {
			subject:  '',
			question: '',
			answer:   '',
		},
		validationSchema: Yup.object({
			subject:  Yup.string().required('יש לבחור נושא'),
			question: Yup.string().required('יש להזין שאלה'),
			answer:   Yup.string().required('יש להזין תשובה'),
		}),
		validateOnBlur:   false,
		validateOnChange: false,
		onSubmit:         async (values) => {
			const { question, answer, subject } = values
			const questionObject                = new Question({ question, answer, subject })
			await questionsEndpoint.create(questionObject)
			formik.resetForm({
				values: {
					subject:  formik.values.subject,
					question: '',
					answer:   '',
				},
			})
		},
	})

	return (
		<Col
			{...theme.animations.fadeInOut}
			className="h-full w-full mx-auto lg:px-[20%] sm:px-[50px] xs:px-[30px] pt-5">
			<Row className="pb-10 justify-around">
				<Col cols={1}>
					<Tooltip tooltip="לדף הראשי" placement="bottom-center">
						<Button
							fab
							icon
							size={20}
							onClick={() => navigate('/')}>
							<IconMdiArrowRight/>
						</Button>
					</Tooltip>
				</Col>
				<Col cols={10}>
					<Typography as="h2" className="h-full text-center">
						הוספת שאלה
					</Typography>
				</Col>
				<Col cols={1}/>
			</Row>

			<form
				ref={formRef}
				className="flex-col pb-36 my-auto"
				onSubmit={formik.handleSubmit}>
				<QueryHandler
					status={subjectsStatus}
					animateLoading
					loadingComponent="skeleton"
					loadingComponentProps={{
						...theme.animations.fadeInOut,
						className: "w-full rounded-lg my-[24px]",
						height:    46,
					}}
				>
					<ConditionalAnimation condition={!!subjects} timeout={300}>
						{subjects && (
								<Select
									wrapperProps={{ ...theme.animations.fadeInOut, className: "w-full" }}
									id="subject"
									label="נושא"
									options={subjects.map(({ label, title: value }) => ({ label, value }))}
									placeholder="בחר נושא"
									value={formik.values.subject}
									onChange={async (value) => formik.setFieldValue("subject", value.value)}
									onBlur={async () => formik.validateField('subject')}
									error={!!formik.errors.subject}
									helperText={formik.errors.subject}/>
							)}
					</ConditionalAnimation>
				</QueryHandler>

				<TextArea
					id="question"
					label="שאלה"
					value={formik.values.question}
					onChange={formik.handleChange}
					onBlur={async () => formik.validateField("question")}
					helperText={formik.errors.question}
					error={!!formik.errors.question}/>

				<TextArea
					id="answer"
					label="תשובה"
					value={formik.values.answer}
					onChange={formik.handleChange}
					onBlur={async () => formik.validateField("answer")}
					helperText={formik.errors.answer}
					error={!!formik.errors.answer}/>

				<div className="flex justify-center">
					<Button type="submit" disabled={!formik.isValid}>
						שמירה
					</Button>
				</div>
			</form>
		</Col>
	)
}
