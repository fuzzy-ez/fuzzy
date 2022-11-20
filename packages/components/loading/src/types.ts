import type { MaybeRef } from '@vueuse/core'

export interface LoadingOptionsResolved {
  svg: MaybeRef<string>
  background: MaybeRef<string>
  // '0 0 50 50'
  svgViewBox: MaybeRef<string>
  spinner: MaybeRef<boolean | string>
  text: MaybeRef<string>
  customClass: MaybeRef<string>
  visible: boolean
  target: HTMLElement
  beforeClose?: () => boolean
  closed?: () => void
}

export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'target'> & {
    target: HTMLElement | string
    body: boolean
  }
>
