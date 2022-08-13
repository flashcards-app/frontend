import { Col, Row, ThemeToggle, Typography, LinkButton, Tooltip, IconButton, theme } from "../../components/UI"
import questionsImage from "../../assets/question.jpg"
import { useNavigate } from "react-router-dom"
import { authEndpoint } from "../../services"
import TokenStorage from "../../modules/TokenStorage"
import { css } from "@emotion/css"
import useWindowVars from "../../hooks/useWindowVars"


export default () => {
	const { windowWidth } = useWindowVars()
	const navigate        = useNavigate()

	const signOut = async () => {
		await authEndpoint.logout()
		TokenStorage.clearUserData()
		navigate("/login")
	}

	return (
		<Row
			{...theme.animations.fadeInOut}
			className="h-full">
			{
				windowWidth >= theme.screens.md && (
					<img className="h-[100vh] object-cover origin-right"
					     width={windowWidth < theme.screens.xl ? windowWidth / 2 : undefined}
					     src={questionsImage}
					     alt=""/>
				)
			}

			<Col
				className={`${windowWidth <= theme.screens.md && css`
					background-image: url(${questionsImage});
					background-repeat: no-repeat;
					background-position: right;
				`}`}
				align="center"
				cols={1}>
				<Typography className="mt-8"
				            color={windowWidth < theme.screens.md ? theme.colors.white : undefined}
				            semiBold
				            as="h1">
					Flashcards
				</Typography>

				<Col className="w-full h-full pt-6 space-y-8" justify="center" align="center">
					<LinkButton to="/subject"
					            className="w-60 text-center">
						לשאלות
					</LinkButton>

					<LinkButton to="/add-questions"
					            className="w-60 text-center">
						להוספת שאלות
					</LinkButton>

				</Col>

				<Row className="py-3 pb-28 justify-center">
					<Tooltip placement="top-center" tooltip="התנתק">
						<IconButton className="px-1.5"
						            dark={windowWidth < theme.screens.md ? true : undefined}
						            size={22}
						            onClick={signOut}>
							<IconMdiLogout/>
						</IconButton>
					</Tooltip>

					<Tooltip placement="top-center" tooltip="נושא">
						<ThemeToggle
							size={22}
							dark={windowWidth < theme.screens.md ? true : undefined}
							className="px-1.5"/>
					</Tooltip>
				</Row>
			</Col>
		</Row>
	)
}
