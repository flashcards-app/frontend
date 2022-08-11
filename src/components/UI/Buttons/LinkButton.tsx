import Button from "./Button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"


const LinkButton = Button.withComponent(motion(Link))

export default LinkButton
