import { definePropType } from '@fuzzy/utils'
import type { ExtractPropTypes } from 'vue'
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  '',
] as const

export const buttonProps = {
  type: {
    type: String,
    value: buttonTypes,
    default: '',
  },
  icon: {
    type: definePropType<string>([String]),
  },
  disabled: Boolean,
  round: Boolean,
  plain: Boolean,
  color: String,
  loading: Boolean,
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
