import styled, { StyledTags } from "@emotion/styled"
import tw from "twin.macro"
import { css } from "@emotion/react"


interface TypographyProps {
	as: keyof StyledTags
	bold?: boolean
	semiBold?: boolean
	color?: string | undefined
}

const Typography = styled.div(({ as, bold, semiBold, color }: TypographyProps) => [
	color && css`
		color: ${color};
	`,

	as === "h1" && tw`text-5xl`,
	as === "h2" && tw`text-4xl`,
	as === "h3" && tw`text-3xl`,
	as === "h4" && tw`text-2xl`,
	as === "h5" && tw`text-xl`,
	as === "h6" && tw`text-lg`,

	semiBold && tw`font-semibold`,
	bold && tw`font-bold`,
])


export default Typography
