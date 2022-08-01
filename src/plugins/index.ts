import nProgress from './nprogress'
import { i18nInstall } from './i18n'
import refreshTokenHandler from "./RefreshToken"
// import './pwa';

export default (): void => {
	refreshTokenHandler()
	i18nInstall()
	nProgress()
}
