/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				black: {
					DEFAULT: '#1e1e1e',
					100: '#686868',
					200: '#545454',
					300: '#4D4D4D',
				},
				white: {
					DEFAULT: '#FFFFff',
					100: '#FBFBFB',
					200: '#F5EFE6',
				},
				green: {
					DEFAULT: '#3D8D7A',
					100: '#ECFFF4',
				},
			},
		},
		fontFamily: {
			'poppins': ['Poppins-Regular', 'sans-serif'],
			'poppins-bold': ['Poppins-Bold', 'sans-serif'],
			'poppins-semiBold': ['Poppins-SemiBold', 'sans-serif'],
			'poppins-medium': ['Poppins-Medium', 'sans-serif'],
			'poppins-thin': ['Poppins-Thin', 'sans-serif'],
		},
	},
	plugins: [],
};
