import { useEffect } from "react"

import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'

import { Button, Col, Row, TextField, theme } from "../components/UI"
import useErrorsHandler from "../hooks/useErrorsHandler"
import ApiError from "../modules/ApiError"
import TokenStorage from "../modules/TokenStorage"
import { authEndpoint } from "../services"


export default () => {
	const navigate                = useNavigate()
	const { handleRegisterError } = useErrorsHandler()


	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			navigate("/")
		}
	}, [])


	const formik = useFormik({
		initialValues:    {
			username: '',
			email:    '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string()
				          .required('יש להזין שם משתמש'),
			email:    Yup.string()
				          .required('יש להזין כתובת מייל')
				          .email('כתובת המייל שהזנת אינה תקינה'),
			password: Yup.string()
				          .required('יש להזין סיסמא')
				          .min(6, 'סיסמא חייבת להכיל לפחות 6 תווים')
				          .max(128, 'סיסמא חייבת להכיל לכל היותר 128 תווים'),
		}),
		validateOnChange: false,
		validateOnBlur:   false,
		onSubmit:         async (values) => {
			try {
				const { username, email, password } = values
				const { data }                      = await authEndpoint.register(email, username, password)
				TokenStorage.storeUserData(data)
				navigate('/')
			} catch (error) {
				if (error instanceof ApiError) {
					const errors = handleRegisterError(error)

					errors && formik.setFieldError(...errors)
				}
			}
		},
	})

	return (
		<Row
			{...theme.animations.fadeInOut}
			className="w-full h-full justify-center">
			<Col className="my-auto w-[300px]">
				<form onSubmit={formik.handleSubmit}>


					<TextField label="כתובת מייל"
					           value={formik.values.email}
					           id="email"
					           onChange={formik.handleChange}
					           onInput={() => !formik.isValid && formik.validateField('email')}
					           onBlur={async () => formik.validateField('email')}
					           helperText={formik.errors.email}
					           error={!!formik.errors.email}/>


					<TextField label="שם משתמש"
					           id="username"
					           value={formik.values.username}
					           onChange={formik.handleChange}
					           onInput={() => !formik.isValid && formik.validateField('username')}
					           onBlur={async () => formik.validateField('username')}
					           helperText={formik.errors.username}
					           error={!!formik.errors.username}/>

					<TextField label="סיסמא"
					           id="password"
					           value={formik.values.password}
					           onChange={formik.handleChange}
					           onInput={() => !formik.isValid && formik.validateField('password')}
					           onBlur={async () => formik.validateField('password')}
					           helperText={formik.errors.password}
					           error={!!formik.errors.password}
					           type="password"/>

					<div className="w-full flex justify-center pt-4">
						<Button className="w-60 h-10" type="submit" disabled={!formik.isValid}>
							הרשמה
						</Button>
					</div>
				</form>

				<div className="place-self-center pt-1 text-gray-400">
					יש לך משתמש קיים?
					<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/login"> התחבר</Link>
				</div>
			</Col>
		</Row>
	)
}
