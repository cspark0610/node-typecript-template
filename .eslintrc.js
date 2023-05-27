module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"pretter/prettier": "error",
		"import/extensions": [0],
		"class-methods-use-this": [0],
		"import/no-extreneous-dependencies": ["error", { devDependencies: true }],
	},
}
