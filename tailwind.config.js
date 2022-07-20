module.exports = {
	content: ['./index.html', 'src/main.tsx', 'src/styles/index.css', 'src/**/*.{html,js,jsx,ts,tsx,css}'],
	important: true,
	colors: {
		extend: {
			animation: {
				bounce200: 'bounce 1s infinite 200ms',
				bounce400: 'bounce 1s infinite 400ms',
			},
		},
	},
}

