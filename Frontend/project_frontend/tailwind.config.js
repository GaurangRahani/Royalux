/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/**/*.{html,js,jsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
	prefix: 'tw-',
	corePlugins: {
		preflight: false,
	},
	important: true,

	// tailwind.config.js

	theme: {
		extend: {
			colors: {
				'custom-color': '#2ec1ac',
			},
		},
	},



}

