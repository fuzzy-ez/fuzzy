import { resolve } from 'path'
import inquirer from 'inquirer'

import { copySync, pathExistsSync, removeSync } from 'fs-extra'
import {
  failPrompt,
  spinnerStart,
  successPrompt,
  warnPrompt,
} from '../helper/spinner'

import {
  SRC_DIR,
} from '../helper/constant'
const { prompt } = inquirer

type CodingStyle = 'tsx' | 'vue'

interface CreateOptions {
  name?: string
  tsx?: boolean
  sfc?: boolean
}

interface RenderData {
  kebabCaseName: string
  bigCamelizeName: string
  camelizeName: string
  style: CodingStyle
}

export async function create(options: CreateOptions) {
  // const { name, tsx, vue } = options
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

  const componentFolder = resolve(SRC_DIR, renderData.kebabCaseName)
  const componentFolderName = renderData.kebabCaseName

  if (pathExistsSync(componentFolder))
    failPrompt(`\n❌❌ The component ${componentFolderName} already exists! \n`)

  if (options.sfc || options.tsx) {
    renderData.style = options.sfc ? 'vue' : 'tsx'
  }
  else {
    const { style } = await prompt({
      name: 'style',
      type: 'list',
      message: 'Which style do you use to write your component ?',
      choices: [
        { name: 'sfc', value: 'vue' },
        { name: 'tsx', value: 'tsx' },
      ],
      default: 'vue',
    })
    renderData.style = style
  }

  copySync(resolve(__dirname, '../../template/create'), componentFolder)

  await renderTemplates(componentFolder, componentFolderName, renderData)

  if (!renderData.locale)
    removeSync(resolve(componentFolder, '/example/locale'))

  if (renderData.style !== 'vue')
    removeSync(resolve(componentFolder, `${renderData.bigCamelizeName}.vue`))

  if (renderData.style !== 'tsx')
    removeSync(resolve(componentFolder, `${renderData.bigCamelizeName}.tsx`))

  successPrompt(`Create ${componentFolderName} component success!`)
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

  const code = `
    <script setup>
    defineOptions({
      name: '${kebabCaseName}',
    })
    </script>

    <template>
    </template>
  `
}
