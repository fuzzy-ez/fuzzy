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
  <div
    :class="[
      n('container'),
      is('disabled', disabled),
      is('loading', loading),
      is('round', round),
      is('plain', plain),
    ]
    "
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <div v-else>
        <!-- loading -->
      </div>
    </template>
  </div>
</template>

<style scoped>
.FU_btn-container{
  color: aquamarine;
}
</style>
