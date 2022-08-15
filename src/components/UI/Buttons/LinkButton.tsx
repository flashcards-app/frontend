import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import Button from "./Button"


const LinkButton = Button.withComponent(motion(Link))

export default LinkButton
