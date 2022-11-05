import { isArray } from '../helper'

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
  const namespace = `fu-${name}`
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace, name, blockSuffix, element, modifier)
      : ''
  const classes = (...classes: Classes): any[] => {
    return classes.map((className) => {
      if (isArray(className)) {
        const [condition, truthy, falsy = null] = className

        return condition ? truthy : falsy
      }

      return className
    })
  }

  return {
    namespace,
    n: bem,
    classes,
  }
}
