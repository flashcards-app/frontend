import { css } from "@emotion/react"
import styled, { StyledTags } from "@emotion/styled"
import tw from "twin.macro"

import theme from "../Utils/theme"


interface TypographyProps {
	as: keyof StyledTags
	bold?: boolean
	semiBold?: boolean
	color?: string | undefined
	dark?: boolean
	centered?: boolean
}

const Typography = styled.div(({ as, bold, semiBold, color, dark, centered }: TypographyProps) => [
	color && css`
		color: ${color};
	`,

	centered && tw`text-center`,

	as === "h1" && tw`text-5xl`,
	as === "h2" && tw`text-4xl`,
	as === "h3" && tw`text-3xl`,
	as === "h4" && tw`text-2xl`,
	as === "h5" && tw`text-xl`,
	as === "h6" && tw`text-lg`,
	as === "p" && [
		tw`text-base flex flex-row`,

		css`
			color: ${theme.colors.gray_500};
		`,

		(props) => (dark || props.theme.isDark) && css`
			color: ${theme.colors.gray_300};
		`,
	],

	(props) => (dark || props.theme.isDark) && css`
		color: ${theme.colors.white};
	`,

	semiBold && tw`font-semibold`,
	bold && tw`font-bold`,
])


export default Typography
