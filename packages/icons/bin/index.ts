import { resolve } from 'path'
import cac from 'cac'
import { ensureDir, readdirSync, removeSync, writeFile } from 'fs-extra'
import webfont from 'webfont'
const CWD = process.cwd()
const SVG_DIR = resolve(CWD, 'svg')
const DIST_DIR = resolve(CWD, 'dist')
const FONTS_DIR = resolve(DIST_DIR, 'fonts')
const CSS_DIR = resolve(DIST_DIR, 'css')
const cli = cac()
const DEFAULT_NAME = 'fuzzy-icons'
const WEBFONT_CONFIG = {
  fontName: DEFAULT_NAME,
  formats: ['ttf', 'woff', 'woff2'],
  fontHeight: 512,
  descent: 64,
}

async function build() {
  const config = {
    base64: true,
    publicPath: undefined,
    fontWeight: 'normal',
    fontStyle: 'normal',
  }

  const { ttf, woff, woff2 } = await webfont({
    files: `${SVG_DIR}/*.svg`,
    ...WEBFONT_CONFIG,
  })

  removeSync(DIST_DIR)
  // create
  await Promise.all([ensureDir(FONTS_DIR), ensureDir(CSS_DIR)])
  const icons = readdirSync(SVG_DIR).map((svgName) => {
    const i = svgName.indexOf('-')
    const extIndex = svgName.lastIndexOf('.')

    return {
      name: svgName.slice(i + 1, extIndex),
      pointCode: svgName.slice(1, i),
    }
  })
  const iconNames = icons.map(iconName => `  "${iconName.name}"`)

  const indexTemplate = `\
module.exports = [
${iconNames.join(',\n')}
]
`

  const indexESMTemplate = `\
export default [
${iconNames.join(',\n')}
]
`

  const cssTemplate = `\
@font-face {
  font-family: "${DEFAULT_NAME}";
  src: url("${
    config.base64
      ? `data:application/font-woff2;charset=utf-8;base64,${Buffer.from(woff2).toString('base64')}`
      : `${config.publicPath}${DEFAULT_NAME}-webfont.woff2`
  }") format("woff2"),
    url("${
      config.base64
        ? `data:application/font-woff;charset=utf-8;base64,${woff.toString('base64')}`
        : `${config.publicPath}${DEFAULT_NAME}-webfont.woff`
    }") format("woff"),
    url("${
      config.base64
        ? `data:font/truetype;charset=utf-8;base64,${ttf.toString('base64')}`
        : `${config.publicPath}${DEFAULT_NAME}-webfont.ttf`
    }") format("truetype");
  font-weight: ${config.fontWeight};
  font-style: ${config.fontStyle};
}

.${DEFAULT_NAME}--set,
.${DEFAULT_NAME}--set::before {
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 "${DEFAULT_NAME}";
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

${icons
  .map((icon) => {
    return `.${DEFAULT_NAME}-${icon.name}::before {
  content: "\\${icon.pointCode}";
}`
  })
  .join('\n\n')}
`

  await Promise.all([
    writeFile(resolve(FONTS_DIR, `${DEFAULT_NAME}-webfont.ttf`), ttf),
    writeFile(resolve(FONTS_DIR, `${DEFAULT_NAME}-webfont.woff`), woff),
    writeFile(resolve(FONTS_DIR, `${DEFAULT_NAME}-webfont.woff2`), woff2),
    writeFile(resolve(CSS_DIR, `${DEFAULT_NAME}.css`), cssTemplate),
    writeFile(resolve(CSS_DIR, `${DEFAULT_NAME}.scss`), cssTemplate),
    writeFile(resolve(DIST_DIR, 'index.js'), indexTemplate),
    writeFile(resolve(DIST_DIR, 'index.esm.js'), indexESMTemplate),
  ])

  // eslint-disable-next-line no-console
  console.log('build success!')
}

cli.command('build', 'build icons').action(build)
cli.help()
cli.parse()
