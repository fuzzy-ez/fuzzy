import installer from './default'
export * from '@fuzzy/components'
export * from './install'
export * from './resolver'

export const install = installer.install
export const version = installer.version

export default installer
