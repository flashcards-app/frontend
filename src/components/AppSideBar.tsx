import { css } from "@emotion/css"
import { Link, useNavigate } from 'react-router-dom'
import tw from "twin.macro"

import TokenStorage from "../modules/TokenStorage"
import { authEndpoint } from "../services"
import LanguageSelector from './LanguageSelector'
import { SideBar, ThemeToggle, LongDivider, IconButton, Tooltip, Row, Col, SideBarLink, SideBarLinkWrapper } from './UI'


const AppSideBar = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const signOut = async () => {
		await authEndpoint.logout()
		TokenStorage.clearUserData()
		navigate("/login")
	}

	return (
		<SideBar>
			<Col className={css`${tw`flex h-full flex-col justify-between`}`}>
				<Col>
					<Link to="/" className={css`${tw`py-4 px-4 flex flex-row justify-around items-center`}`}>
						<h3 className={css`${tw`px-3 text-2xl font-semibold tracking-widest text-gray-900 dark:text-white
																		uppercase rounded-lg focus:outline-none`}`}>
							{t('App Name')}
						</h3>
					</Link>

					<SideBarLinkWrapper id="home-button">
						<SideBarLink to="/">{t('Home')}</SideBarLink>
					</SideBarLinkWrapper>

					<SideBarLinkWrapper id="crypto-button">
						<SideBarLink to="/cryptocurrencies">{t('Cryptocurrencies')}</SideBarLink>
					</SideBarLinkWrapper>

					<SideBarLinkWrapper id="news-button">
						<SideBarLink to="/news">{t('News')}</SideBarLink>
					</SideBarLinkWrapper>

					<SideBarLinkWrapper id="about-button">
						<SideBarLink to="/about">{t('About')}</SideBarLink>
					</SideBarLinkWrapper>

					<SideBarLinkWrapper id="404-button">
						<SideBarLink to="/someNonExistingPage">{t('404')}</SideBarLink>
					</SideBarLinkWrapper>
				</Col>

				<Col>
					<LongDivider/>
					<Row className="py-3 px-3 justify-around">

						<Tooltip placement="top-center" tooltip={t('Settings')}>
							<IconButton>
								<IconMdiSettings/>
							</IconButton>
						</Tooltip>

						<Tooltip placement="top-center" tooltip={t('Notifications')}>
							<IconButton>
								<IconMdiBellOutline/>
							</IconButton>
						</Tooltip>

						<Tooltip placement="top-center" tooltip={t('Theme')}>
							<ThemeToggle/>
						</Tooltip>

						<Tooltip placement="top-center" tooltip={t('Language')}>
							<LanguageSelector/>
						</Tooltip>

						<Tooltip placement="top-center" tooltip={t('Logout')}>
							<IconButton onClick={signOut}>
								<IconMdiLogout/>
							</IconButton>
						</Tooltip>

					</Row>
				</Col>
			</Col>
		</SideBar>
	)
}

export default AppSideBar
