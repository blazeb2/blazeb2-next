// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    formatters: {
      css: true,
    },
    rules: {
      'react/no-unstable-context-value': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
)
