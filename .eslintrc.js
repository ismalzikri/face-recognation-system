export default  {
	root: false,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'prettier'
	],
	rules: {
		// override/add rules settings here, such as:
	}
}