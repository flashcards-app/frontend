import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Main from '../components/UI/Main/Main'
import { useEffect } from "react"
import TokenStorage from "../modules/TokenStorage"
import { useNavigate } from "react-router-dom"
import SideBarButton from "../components/UI/SideBar/SideBarButton"
import { css } from "@emotion/css"
import tw from "twin.macro"
import { useMain } from "../context"


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
			}`}`
		}>
			<SideBar/>
			<SideBarButton/>

			<Main>
				<Outlet/>
			</Main>
		</div>
	)
}
