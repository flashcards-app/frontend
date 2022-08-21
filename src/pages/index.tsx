import { useEffect } from "react"

import { css } from "@emotion/css"
import { Outlet } from 'react-router'
import { useNavigate } from "react-router-dom"
import tw from "twin.macro"

import { Main } from "../components/UI"
import { useMain } from "../context"
import TokenStorage from "../modules/TokenStorage"


export default () => {
	const { disableAnimations } = useMain()
	const navigate              = useNavigate()

	useEffect(() => {
		if (!TokenStorage.isAuthenticated()) {
			navigate("/login")
		}
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
