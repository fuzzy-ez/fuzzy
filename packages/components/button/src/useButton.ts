import type { SetupContext } from 'vue'
import type { ButtonEmits, ButtonProps } from './props'

export function useButton(

  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit'],
) {
  const _disabled = computed(() => props.disabled ?? undefined)

  const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
  }

  return {
    _disabled,
    handleClick,
  }
}
