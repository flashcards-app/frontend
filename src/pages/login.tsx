import { Link, useNavigate } from "react-router-dom"
import { authEndpoint } from "../services"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useEffect } from "react"
import TokenStorage from "../modules/TokenStorage"
import ApiError from "../modules/ApiError"
import { Col, Row, TextField, FormButton,theme } from "../components/UI"
import useErrorsHandler from "../hooks/useErrorsHandler"
import useFormikGeneralError from "../hooks/useFormikGeneralError"
import theme from "../components/UI/Utils/theme"


const useLoginFormik = () => {
	const navigate             = useNavigate()
	const { handleLoginError } = useErrorsHandler()


	const formik = useFormik({
		initialValues:    {
			email:    '',
			password: '',
		},
		validationSchema: Yup.object({
			email:    Yup.string()
				          .required('יש להזין כתובת מייל')
				          .email('כתובת המייל שהזנת אינה תקינה'),
			password: Yup.string()
				          .required('יש להזין סיסמא'),
		}),
		validateOnChange: false,
		validateOnBlur:   false,
		onSubmit:         async (values) => {
			try {
				const { email, password } = values
				const { data }            = await authEndpoint.login(email, password)
				TokenStorage.storeUserData(data)
				navigate('/')
			} catch (error) {
				if (error instanceof ApiError) {
					const errorMessage = handleLoginError(error)

					if (errorMessage) setGeneralError(errorMessage)
				}
			}
		},
	})

	const [generalError, setGeneralError] = useFormikGeneralError(formik, '')

	return { formik, generalError }
}

export default () => {
	const navigate                 = useNavigate()
	const { formik, generalError } = useLoginFormik()

	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			navigate("/")
		}
	}, [])


	return (
		<Row
			{...theme.animations.fadeInOut}
			className="w-full h-full justify-center">
			<Col className="my-auto w-[300px]">
				<form onSubmit={formik.handleSubmit}>
					<TextField id="email"
					           label="כתובת מייל"
					           value={formik.values.email}
					           onChange={formik.handleChange}
					           onInput={() => !formik.isValid && formik.validateField('email')}
					           onBlur={async () => formik.validateField('email')}
					           helperText={formik.errors.email}
					           error={!!formik.errors.email}/>

					<TextField id="password"
					           label="סיסמא"
					           value={formik.values.password}
					           onChange={formik.handleChange}
					           onInput={() => !formik.isValid && formik.validateField('password')}
					           onBlur={async () => formik.validateField('password')}
					           helperText={formik.errors.password}
					           error={!!formik.errors.password}
					           type="password"/>

					<FormButton
						className="h-10 w-60"
						centered
						error
						disabled={!formik.isValid || !!generalError}
						helperText={generalError}>
						התחברות
					</FormButton>
				</form>

				<div className="place-self-center pt-1 text-gray-400">
					עדיין אין לך משתמש?
					<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/register"> הרשם</Link>
				</div>
			</Col>
		</Row>
	)
}
