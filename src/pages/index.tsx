import { Outlet } from 'react-router'
import { useEffect } from "react"
import TokenStorage from "../modules/TokenStorage"
import { useNavigate } from "react-router-dom"
import { css } from "@emotion/css"
import tw from "twin.macro"
import { useMain } from "../context"
import { Main } from "../components/UI"


export default () => {
	const { disableAnimations } = useMain()
	const navigate              = useNavigate()

	useEffect(() => {
		// if (!TokenStorage.isAuthenticated()) {
		// 	navigate("/login")
		// }
	}, [])

	return (
		<div className={css`
			${tw`h-screen w-full mx-auto`}

			${disableAnimations && css` * {
				transition: none !important;
			}`}`}>

			<Main>
				<Outlet/>
			</Main>
		</div>
	)
}
