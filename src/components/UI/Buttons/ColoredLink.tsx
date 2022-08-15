import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import theme from "../Utils/theme";


const ColoredLink = styled(Link)(() => [
	css`
    color: ${theme.colors.blue_500};
	`,
])

export default ColoredLink
