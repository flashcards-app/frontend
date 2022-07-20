import { Link } from "react-router-dom"
import { Col, Row } from "../components/UI/Grid"
import { authEndpoint } from "../services"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'
import TextField from "../components/UI/Form/TextField"
import { TokenStorage } from "../modules/TokenStorage"
import { useEffect, useState } from "react"
import Button from "../components/UI/Buttons/Button"
import { useAuth } from "../context"
import ApiError from "../modules/ApiError"


export default () => {
	const navigate = useNavigate()
	const [noSuchEmail, setNoSuchEmail] = useState(false)


	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			navigate("/")
		}
	}, [])

	const checkForDuplicatedEmail = (error: ApiError) => {
		const errors = error.getErrorsList()

		if (errors.includes("No account found with that email")) {
			setNoSuchEmail(true)
			return
		}

		setNoSuchEmail(false)
	}


	const formik = useFormik({
		initialValues:    {
			username: '',
			email:    '',
			password: ''
		},
		validationSchema: Yup.object({
			username: Yup.string()
				          .required('יש להזין שם משתמש'),
			email:    Yup.string()
				          .required('יש להזין כתובת מייל')
				          .email('כתובת המייל שהזנת אינה תקינה')
				          .test('no-such-email', 'The email you entered does not exist', () => !noSuchEmail),
			password: Yup.string()
				          .required('יש להזין סיסמא')
				          .min(6, 'סיסמא חייבת להכיל לפחות 6 תווים')
				          .max(128, 'סיסמא חייבת להכיל לכל היותר 128 תווים')
		}),
		validateOnChange: false,
		validateOnBlur:   false,
		onSubmit:         async (values) => {
			try {
				const { username, email, password } = values

				const result = await authEndpoint.register(email, username, password)
				TokenStorage.storeUserData(result.data)
				navigate('/')
			} catch (error) {
				if (error instanceof ApiError) {
					checkForDuplicatedEmail(error)
				}
			}
		}
	})

	return (
		<Row className="w-full h-full justify-center">
			<Col className="my-auto min-w-70">
				<form onSubmit={formik.handleSubmit}>
					<TextField placeholder={"כתובת מייל"}
					           className="p-1 pt-4"
					           value={formik.values.email}
					           id="email"
					           onChange={formik.handleChange}
					           onBlur={() => formik.validateField('email')}
					           error={formik.errors.email}/>


					<TextField placeholder={"שם משתמש"}
					           className="p-1 pt-4"
					           id="username"
					           value={formik.values.username}
					           onChange={formik.handleChange}
					           onBlur={() => formik.validateField('username')}
					           error={formik.errors.username}/>

					<TextField placeholder={"סיסמא"}
					           className="p-1 pt-4"
					           id="password"
					           value={formik.values.password}
					           onChange={formik.handleChange}
					           onBlur={() => formik.validateField('password')}
					           type="password"
					           error={formik.errors.password}/>

					<div className="w-full flex justify-center pt-4">
						<Button className="w-40 h-10" type="submit" disabled={!formik.isValid}>
							הרשמה
						</Button>
					</div>
				</form>

				<div className="place-self-center pt-1 text-gray-400">
					יש לך משתמש קיים?
					<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/login"> להתחברות</Link>
				</div>
			</Col>
		</Row>
	)
}
