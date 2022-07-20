import { Col, Row } from "../components/UI/Grid"
import { Link, useNavigate } from "react-router-dom"
import { authEndpoint } from "../services"
import { useFormik } from "formik"
import * as Yup from "yup"
import TextField from "../components/UI/Form/TextField"
import { useEffect } from "react"
import { TokenStorage } from "../modules/TokenStorage"
import Button from "../components/UI/Buttons/Button"


export default () => {
	const navigate               = useNavigate()

	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			navigate("/")
		}
	}, [])

	const formik = useFormik({
		initialValues:    {
			email:    '',
			password: ''
		},
		validationSchema: Yup.object({
			email:    Yup.string()
				          .required('יש להזין כתובת מייל')
				          .email('כתובת המייל שהזנת אינה תקינה'),
			password: Yup.string()
				          .required('יש להזין סיסמא')
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
				console.log(error)
				//TODO: handle error
			}
		}
	})

	return (
		<Row className="w-full h-full justify-center">
			<Col className="my-auto min-w-70">
				<form onSubmit={formik.handleSubmit}>
					<TextField id="email"
					           className="p-1 pt-4"
					           placeholder={"כתובת מייל"}
					           value={formik.values.email}
					           onChange={formik.handleChange}
					           onBlur={() => formik.validateField('email')}
					           error={formik.errors.email}/>

					<TextField id="password"
					           className="p-1 pt-4"
					           placeholder={"סיסמא"}
					           value={formik.values.password}
					           onChange={formik.handleChange}
					           onBlur={() => formik.validateField('password')}
					           error={formik.errors.password}
					           type="password"/>

					<div className="w-full flex justify-center pt-2">
						<Button className="w-40 h-10"
						        disabled={!formik.isValid}
						        type="submit">
							התחברות
						</Button>
					</div>
				</form>

				<div className="place-self-center pt-1 text-gray-400">
					עדיין אין לך משתמש?
					<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/register"> להרשמה</Link>
				</div>
			</Col>
		</Row>
	)
}
