<script lang="ts" setup>
import { Repl } from '@vue/repl'
import type { SFCOptions } from '@vue/repl'
import type { UserOptions, Versions } from './composables/store'

const setVH = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
}
window.addEventListener('resize', setVH)
setVH()

// enable experimental features
// const sfcOptions: SFCOptions = {
//   script: {
//     reactivityTransform: true,
//   },
// }

const params = new URLSearchParams(location.search)
const hash = location.hash.slice(1)
const initialUserOptions: UserOptions = {}
const initialVersions: Versions = {
  fuzzy: params.get('fuzzy') || 'latest',
  vue: params.get('vue') || 'latest',
}

const store = useStore({
  serializedState: location.hash.slice(1),
  userOptions: initialUserOptions,
  versions: initialVersions,
})
// eslint-disable-next-line no-console
console.log('🚀 ~ file: App.vue ~ line 30 ~ store', store)

function handleKeydown(evt: KeyboardEvent) {
  // avoid ctrl/cmd + s to save html file
  if ((evt.ctrlKey || evt.metaKey) && evt.code === 'KeyS')
    evt.preventDefault()
}
// useDark()

// persist state
watchEffect(
  () => history.replaceState({}, '', `#${store.serialize()}`),
)
</script>

<template>
  <div>
    <!-- {{ hash }}
    <f-button />
    <f-icon name="checkbox-marked-circle" :size="26" color="red" /> -->
    <Repl
      :store="store"
      auto-resize
      :clear-console="false"
      :show-import-map="store.userOptions.value.showHidden || false"
      @keydown="handleKeydown"
    />
  </div>
</template>

<style scoped>
.dark {
  color-scheme: dark;
}

body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: var(--vh) ;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
