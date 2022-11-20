import { resolve } from 'path'
import inquirer from 'inquirer'

import {
  ensureFile,
  pathExistsSync,
  writeFile,
} from 'fs-extra'
import pc from 'picocolors'
import {
  CWD,
} from '../helper/constant'
import { bigCamelize, camelize, kebabCase } from '../helper/utils'
const { prompt } = inquirer
type CodingStyle = 'ts' | 'vue'

interface CreateOptions {
  name?: string
  ts?: boolean
  sfc?: boolean
}

interface RenderData {
  kebabCaseName: string
  bigCamelizeName: string
  camelizeName: string
  style: CodingStyle
}

export async function create(options: CreateOptions) {
  // eslint-disable-next-line no-console
  console.log('\n📦📦 Create a component ! \n')

  const renderData: RenderData = {
    kebabCaseName: 'component-name',
    bigCamelizeName: 'ComponentName',
    camelizeName: 'componentName',
    style: 'vue',
  }
  const { name } = options.name
    ? options
    : await prompt({
      name: 'name',
      message: 'Name of the component created: ',
      default: renderData.kebabCaseName,
    })

  renderData.kebabCaseName = kebabCase(name)
  renderData.camelizeName = camelize(name)
  renderData.bigCamelizeName = bigCamelize(name)

  const componentFolder = resolve(CWD, renderData.camelizeName)
  const componentFolderName = renderData.camelizeName

  if (pathExistsSync(componentFolder)) {
    // eslint-disable-next-line no-console
    console.log(pc.red(`\n❌❌ The component ${pc.bgYellow(componentFolderName)} already exists! \n`))

    return
  }

  if (options.sfc || options.ts) {
    renderData.style = options.sfc ? 'vue' : 'ts'
  }
  else {
    const { style } = await prompt({
      name: 'style',
      type: 'list',
      message: 'Which style do you use to write your component ?',
      choices: [
        { name: 'sfc', value: 'vue' },
        { name: 'ts', value: 'ts' },
      ],
      default: 'vue',
    })
    renderData.style = style
  }

  await renderTemplates(componentFolder, componentFolderName, renderData)
  // eslint-disable-next-line no-console
  console.log(pc.green('\n✅✅ Create component succeed! \n'))
}

export async function renderTemplates(
  componentFolder: string,
  componentFolderName: string,
  renderData: RenderData) {
  const {
    kebabCaseName,
    bigCamelizeName,
    camelizeName,
    style,
  } = renderData

  const codeSfc
    = `<script setup lang="ts">
defineOptions({
  name: 'F${bigCamelizeName}',
})
</script>

<template>
  <div class="${kebabCaseName}">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>`
  const codeTs
    = `const props = {}
export default defineComponent({
  name: 'F${bigCamelizeName}',
  props,
  setup(){
    return {}
  },
  render(){
    const {
      $slots:slots,
    } = this

    return h('div', { class: 'F${bigCamelizeName}' }, slots)
  }
})`
  const codeIndex
    = `import { withInstall } from '@fuzzy/utils'
import ${bigCamelizeName} from './src/${componentFolderName}.${style}'

export const F${bigCamelizeName} = withInstall(${bigCamelizeName})

export default F${bigCamelizeName}`

  const codeProps
    = `// import { definePropType } from '@fuzzy/utils'
import type { ExtractPropTypes } from 'vue'

export const ${camelizeName}Props = {}

export type ${bigCamelizeName}Props = ExtractPropTypes<typeof ${camelizeName}Props>
  `

  const codeTest
    = `import { describe,it } from 'vitest'

describe('${bigCamelizeName} test', () => {
  it('basic test',() => {

  })
})
`
  await Promise.all([
    ensureFile(`${componentFolder}/src/${componentFolderName}.${style}`),
    ensureFile(`${componentFolder}/style/index.scss`),
    ensureFile(`${componentFolder}/src/props.ts`),
    ensureFile(`${componentFolder}/index.ts`),
    ensureFile(`${componentFolder}/__test__/index.spec.tsx`),
  ])
  await Promise.all([
    writeFile(resolve(`${componentFolder}/src`, `${componentFolderName}.${style}`), style === 'vue' ? codeSfc : codeTs),
    writeFile(resolve(`${componentFolder}/src`, 'props.ts'), codeProps),
    writeFile(resolve(componentFolder, '__test__/index.spec.tsx'), codeTest),
    writeFile(resolve(componentFolder, 'index.ts'), codeIndex),
  ])
}
