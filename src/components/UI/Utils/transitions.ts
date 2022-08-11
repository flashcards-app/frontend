import { AnimationProps } from "framer-motion"


type TransitionDuration = `${number}${'s' | 'ms'}`

export const marginTransition = (duration: TransitionDuration = '500ms') => `margin-right ${duration} ease-in-out, margin-left ${duration} ease-in-out`

export const transformTransition = (duration: TransitionDuration = '500ms') => `transform ${duration} ease-in-out`

export const opacityTransition = (duration: TransitionDuration = '500ms') => `opacity ${duration} ease-in-out`


export const fadeInOut: AnimationProps = {
	initial:    { opacity: 0 },
	animate:    { opacity: 1 },
	exit:       { opacity: 0 },
	transition: { duration: 0.3 },
}
