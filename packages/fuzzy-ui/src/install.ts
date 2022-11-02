import type { App, Plugin } from '@vue/runtime-core'
import { version as ver } from '../package.json'
export const INSTALL_KEY = Symbol('INSTALL_KEY')

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: Object) => {
    if (app[INSTALL_KEY]) return
    app[INSTALL_KEY] = true
    components.forEach(com => app.use(com))
    if (options) {
      // do some
    }
  }

  return {
    install,
    version: ver,
  }
}
