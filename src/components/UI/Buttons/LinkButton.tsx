import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import theme from "../Utils/theme";
import { css } from "@emotion/react";


const LinkButton = styled(Link)(() => [
	css`
    color: ${theme.colors.blue_500};
	`,
])

export default LinkButton
