import htmlPlugin from 'eslint-plugin-html';
import ui5Plugin from 'eslint-plugin-ui5';

export default [
  {
    files: ['**/*.js', '**/*.xml'], // Lint .js and .xml files
    languageOptions: {
      ecmaVersion: 2021, // Support for modern JavaScript features
      sourceType: 'module', // Allow ES modules (import/export)
    },
    plugins: {
      html: htmlPlugin,
      ui5: ui5Plugin, // SAP UI5-specific plugin
    },
    rules: {
      'indent': ['error', 2], // or use 4 or 'tab' based on your preferred style
		
      'no-unused-vars': 'warn', // Example JavaScript rule
      // 'ui5/no-inline-style': 'warn',
    },
  },
];
