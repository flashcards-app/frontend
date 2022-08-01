import Label from "./Label"


interface ConditionalLabelProps {
	label?: string
	persistentLabel?: boolean
	value?: string | readonly string[] | number | undefined
}

const ConditionalLabel = ({ label, persistentLabel, value }: ConditionalLabelProps) => {
	if ((value && label) || (label && persistentLabel)) {
		return <Label>{label}</Label>
	}

	return <></>
}

ConditionalLabel.defaultProps = {
	label:           undefined,
	persistentLabel: false,
	value:           undefined,
}

export default ConditionalLabel
