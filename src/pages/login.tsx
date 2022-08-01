import { Col, Row } from "../components/UI/Grid"
import { Link, useNavigate } from "react-router-dom"
import { authEndpoint } from "../services"
import { useFormik } from "formik"
import * as Yup from "yup"
import TextField from "../components/UI/Form/TextField"
import { useEffect } from "react"
import TokenStorage from "../modules/TokenStorage"
import Button from "../components/UI/Buttons/Button"
import ApiError from "../modules/ApiError"


export default () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			navigate("/")
		}
	}, [])

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
				const result              = await authEndpoint.login(email, password)
				TokenStorage.storeUserData(result.data)
				navigate('/')
			} catch (error) {
				if (error instanceof ApiError) {
					// display error message
				}
			}
		},
	})

	return (
		<Row className="w-full h-full justify-center">
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

					<div className="w-full flex justify-center pt-2">
						<Button className="w-60 h-10"
						        disabled={!formik.isValid}
						        type="submit">
							התחברות
						</Button>
					</div>
				</form>

				<div className="place-self-center pt-1 text-gray-400">
					עדיין אין לך משתמש?
					<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/register"> הרשם</Link>
				</div>
			</Col>
		</Row>
	)
}
