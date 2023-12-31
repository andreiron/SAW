/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			gridTemplateRows: {
				// Simple 8 row grid
				12: "repeat(12, minmax(0, 1fr))",
				24: "repeat(24, minmax(0, 1fr))",

				// Complex site-specific row configuration
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				day: {
					"primary": "#A0AABA",

					"secondary": "#C8C8C8",

					"accent": "#00ADB5",

					"neutral": "#D2D2D2",

					"base-100": "#F2F2F2",

					"info": "#9EC1F6",

					"success": "#9EF6D4",

					"warning": "#F6DE9E",

					"error": "#F69E9E",
				},
			},
			{
				darkM: {
					"text": "#f6f3ee",
					"base-100": "#211f1f",
					"primary": "#6B728E",
					"secondary": "#393E46",
					"accent": "#00ADB5",
					"neutral": "#222831",

					"info": "#9EC1F6",

					"success": "#9EF6D4",

					"warning": "#F6DE9E",

					"error": "#F69E9E",
				},
			},

			"light",
			"dark",
			"cupcake",
			"forest",
			"aqua",
			"business",
			"coffee",
		],
	},
}
