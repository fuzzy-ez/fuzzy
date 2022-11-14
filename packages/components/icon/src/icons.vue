<script setup lang="ts">
import { useNamespace } from '@fuzzy/utils'
import { iconProps } from './props'
const props = defineProps(iconProps)

defineOptions({
  name: 'FIcon',
})
const { n, classes, namespace } = useNamespace('icon')
</script>

<template>
  <i :class="
    classes(
      n(),
      `${namespace}--set`,
      `${namespace}-${props.name}`,
    )
  " :style="{
      fontSize: `${props.size}px`,
      color: props.color,
    }" />
</template>

<style scoped lang="scss">
@import '@fuzzy/icons/dist/css/fuzzy-icons.scss';
</style>
