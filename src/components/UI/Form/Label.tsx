import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"
import { css } from "@emotion/react"
import theme from "../Utils/theme"
import i18n from "i18next";


const Label = styled(motion.span)(({ dark, dir }: { dark?: boolean, dir?: "ltr" | "rtl" }) => [
	css`
    color: ${theme.colors.gray_500};
	`,

	(props) => (dark || props.theme.isDark) && css`
    color: ${theme.colors.gray_300};
	`,

	(dir || i18n.dir()) === "rtl" && tw`text-right`,

	(dir || i18n.dir()) === "ltr" && tw`text-left`,

	tw`text-sm !w-fit px-[2px]`,
])

export default Label
