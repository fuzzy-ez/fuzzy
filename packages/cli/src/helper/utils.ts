export function kebabCase(name: string) {
  const ret = name.replace(/([A-Z])/g, ' $1').trim()

  return ret.split(' ').join('-').toLowerCase()
}

export const camelize = (name: string) => name.replace(/-(\w)/g, (_, p) => p.toUpperCase())
export const bigCamelize = (name: string) => name.replace(name.charAt(0), name.charAt(0).toUpperCase())
