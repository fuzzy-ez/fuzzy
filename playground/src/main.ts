import { createApp } from 'vue'
import 'fuzzy-ui/dist/style.css'
import '@vue/repl/style.css'
import Fuzzy from 'fuzzy-ui'
import App from './App.vue'

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: 'repl',
}

createApp(App).use(Fuzzy).mount('#app')
