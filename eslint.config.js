// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: true,
    unocss: true,
    typescript: true,
    vue: true,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
)
