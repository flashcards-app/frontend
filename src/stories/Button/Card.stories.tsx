import { Story } from "@storybook/react"

import Card, { CardProps } from "../../components/UI/Cards/Card"


export default {
	title:      'Card',
	component:  Card,
	parameters: {
		backgrounds: {
			values: [
				{ name: 'light', value: '#ffffff' },
				{ name: 'dark', value: '#181818' },
			],
		},
	},
}

const CardTemplate: Story<CardProps> = (args) => <Card {...args} />

export const Light = CardTemplate.bind({})
Light.parameters   = {
	backgrounds: { default: 'light' },
}
Light.args         = {
	dark:     false,
	height:   "300px",
	width:    "200px",
}

export const Dark = CardTemplate.bind({})
Dark.parameters   = {
	backgrounds: { default: 'dark' },
}
Dark.args         = {
	dark:     true,
	height:   "300px",
	width:    "200px",
}
