<script setup lang="ts">
import { useNamespace } from '@fuzzy/utils'
import { buttonProps } from './props'

defineProps(buttonProps)

const instance = getCurrentInstance()

defineOptions({
  name: 'FButton',
})

const handleClick = (evt: MouseEvent) => {
  instance?.emit('click', evt)
}

const { n, is } = useNamespace('button')
</script>

<template>
  <button
    :class="[
      n(),
      is('disabled', disabled),
      is('loading', loading),
      is('round', round),
      is('plain', plain),
    ]
    " @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <!-- loading -->
      <div
        v-else :class="[
          n('loadingbox'),
        ]"
      />
    </template>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
@import '../style/index.scss'
</style>
