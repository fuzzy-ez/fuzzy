import type { DirectiveBinding, UnwrapRef } from 'vue'

import type { LoadingOptions } from './types'
import type { LoadingInstance } from './loading'

const INSTANCE_KEY = Symbol('FULoading')

export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>
export interface FUementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}

const createInstance = (
  el: FUementLoading,
  binding: DirectiveBinding<LoadingBinding>,
) => {
  const vm = binding.instance
  const options: LoadingOptions = {

  }
  // el[INSTANCE_KEY] = {
  //   options,
  //   instance: Loading(options),
  // }
}
