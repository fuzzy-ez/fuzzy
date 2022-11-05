import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  name: {
    type: String as PropType<string>,
  },
  size: {
    type: [Number, String],
  },
  color: {
    type: String,
  },
  onClick: {
    type: Function as PropType<(event: Event) => void>,
  },
}

export type FIconProps = ExtractPropTypes<typeof iconProps>
