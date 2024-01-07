module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react/display-name': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'import/no-webpack-loader-syntax': 'off',
		'import/no-anonymous-default-export': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/no-null': 'off',
		'unicorn/filename-case': 'off',
		'unicorn/prefer-node-remove': 'off',
		'unicorn/prefer-query-selector': 'off',
		'unicorn/explicit-length-check': 'off',
		'unicorn/no-reduce': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-nested-ternary': 'off',
		'unicorn/no-fn-reference-in-iterator': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/no-array-push-push': 'off',
		'unicorn/no-useless-fallback-in-spread': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/no-array-callback-reference': 'off',
		'unicorn/no-thenable': 'off',
		'react-hooks/exhaustive-deps': [
			'warn',
			{
				additionalHooks: 'useCallbackWithSnackbar',
			},
		],
	},
}
