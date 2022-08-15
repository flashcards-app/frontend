import tw from "twin.macro"
import { css } from "@emotion/css"
import i18n from "i18next"
import { useMain } from "../../../context"
import IconButton from "../Buttons/IconButton"
import theme from "../Utils/theme"
import { conditionalRotate, conditionalTranslate } from "../Utils/utils"
import { transformTransition } from "../Utils/transitions"
import { ReactDivProps } from "../../../types"
import windowVariables from "../../../hooks/useWindowVars"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import clsx from "clsx"
import { isDark } from '..'


const SideBarButtonWrapper = styled(motion.div)(({ dark, width, state }: { state: boolean, width?: number, dark?: boolean }) => [
	css`
		background-color: ${theme.colors.white};
		color: ${theme.colors.gray_700};
		z-index: ${theme.zIndex.sideBar};
	`,
	tw`self-center fixed mt-10 shadow-lg`,
	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colors.dark_500};
	`,
	theme.transitions([transformTransition()]),
	theme.transforms([
		conditionalRotate(!state, 180),
		conditionalTranslate(state, `${width as number}px`),
	]),

])

interface SideBarButtonProps extends ReactDivProps {
	dir?: "ltr" | "rtl",
	dark?: boolean
}

const SideBarButton = ({ className, dir, dark }: SideBarButtonProps) => {
	const { sideBarState: state, setSideBarState: setState, setOverlayState, sideBarOpts } = useMain()

	const darkMode = dark || isDark()

	const { windowWidth }        = windowVariables()
	const { width, shrinkPoint } = sideBarOpts

	const setOpenState = (state: boolean) => {
		setState(state)

		if (shrinkPoint && windowWidth < shrinkPoint) {
			if (state) {
				setOverlayState(true)
				return
			}

			setOverlayState(false)
		}
	}

	return (
		<SideBarButtonWrapper className={clsx(className)}
		                      dark={darkMode}
		                      state={state}
		                      width={width}>
			<IconButton
				dark={darkMode}
				onClick={() => setOpenState(!state)}>
				{(dir || i18n.dir()) === 'ltr' ? <IconCarbonChevronLeft/> : <IconCarbonChevronRight/>}
			</IconButton>
		</SideBarButtonWrapper>
	)
}

SideBarButton.defaultProps = {
	dir:  undefined,
	dark: undefined,
}

export default SideBarButton
