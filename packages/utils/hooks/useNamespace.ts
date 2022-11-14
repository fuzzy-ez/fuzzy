import { isArray } from '../helper'

// export const defaultNamespace = 'fu'
const statePrefix = 'is'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix = '',
  element = '',
  modifier = '',
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix)
    cls += `-${blockSuffix}`

  if (element)
    cls += `__${element}`

  if (modifier)
    cls += `--${modifier}`

  return cls
}

type ClassName = string | undefined | null
export type Classes = (ClassName | [any, ClassName, ClassName?])[]

export function useNamespace(name: string) {
  const namespace = `fuzzy-${name}`
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    _bem(namespace, name, blockSuffix, element, modifier)

  const classes = (...classes: Classes): any[] => {
    return classes.map((className) => {
      if (isArray(className)) {
        const [condition, truthy, falsy = null] = className

        return condition ? truthy : falsy
      }

      return className
    })
  }

  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true

    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    namespace,
    n: bem,
    classes,
    is,
  }
}
