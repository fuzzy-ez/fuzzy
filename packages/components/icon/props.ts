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
}

export type FIconProps = ExtractPropTypes<typeof iconProps>
