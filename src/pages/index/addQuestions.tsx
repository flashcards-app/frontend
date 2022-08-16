import { useEffect, useRef } from "react"

import autoAnimate from "@formkit/auto-animate"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import { Col, Row, Typography, Tooltip, Select, Button, TextArea, theme } from "../../components/UI"
import Question from "../../modules/Entities/Question"
import { questionsEndpoint, subjectsEndpoint } from "../../services"


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
				<Select
					wrapperProps={{ ...theme.animations.fadeInOut, className: "w-full" }}
					id="subject"
					label="נושא"
					options={subjects ? subjects.map(({ label, title: value }) => ({ label, value })) : []}
					placeholder="בחר נושא"
					value={formik.values.subject}
					onChange={async (value) => formik.setFieldValue("subject", value.value)}
					isLoading={!subjects}
					onBlur={async () => formik.validateField('subject')}
					error={!!formik.errors.subject}
					helperText={formik.errors.subject}/>
				<TextArea
					id="question"
					label="שאלה"
					minHeight="100px"
					value={formik.values.question}
					onChange={formik.handleChange}
					onBlur={async () => formik.validateField("question")}
					helperText={formik.errors.question}
					error={!!formik.errors.question}/>

				<TextArea
					id="answer"
					label="תשובה"
					minHeight="100px"
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
