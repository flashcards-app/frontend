import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Main from '../components/UI/Main/Main'
import { useEffect } from "react"
import { TokenStorage } from "../modules/TokenStorage"
import { useNavigate } from "react-router-dom"


export default () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (!TokenStorage.isAuthenticated()) {
			navigate("/login")
		}
	}, [])

	return (
		<div className="h-full w-full mx-auto">
			<SideBar/>

			<Main>
				<Outlet/>
			</Main>
		</div>
	)
}
