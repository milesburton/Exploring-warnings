const tsParser = require('@typescript-eslint/parser');
const angularEslint = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const importPlugin = require('eslint-plugin-import');

module.exports = [
    // Global ignores moved from .eslintignore
    {
        ignores: ['**/*.html'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                createDefaultProgram: true,
            },
        },
        plugins: {
            '@angular-eslint': angularEslint,
            import: importPlugin,
        },
        rules: {
            ...angularEslint.configs.recommended.rules,
            'import/no-duplicates': 'error',
            'import/order': 'warn',
            'lines-between-class-members': ['error', 'always'],
            // Prevent accidental use of deprecated field name 'severity'
            'no-restricted-syntax': [
                'error',
                {
                    selector: "Property[key.name='severity']",
                    message:
                        "Use 'level' instead of 'severity' in warning-related objects.",
                },
            ],
        },
    },
];
