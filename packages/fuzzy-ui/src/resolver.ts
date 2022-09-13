import type { ComponentResolver } from 'unplugin-vue-components'

export function FuzzyResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^F[A-Z]/))
        return { name, from: 'fuzzy-ui' }
    },
  }
}
