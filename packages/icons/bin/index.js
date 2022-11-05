"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const cac_1 = __importDefault(require("cac"));
const fs_extra_1 = require("fs-extra");
const webfont_1 = __importDefault(require("webfont"));
const CWD = process.cwd();
const SVG_DIR = (0, path_1.resolve)(CWD, 'svg');
const DIST_DIR = (0, path_1.resolve)(CWD, 'dist');
const FONTS_DIR = (0, path_1.resolve)(DIST_DIR, 'fonts');
const CSS_DIR = (0, path_1.resolve)(DIST_DIR, 'css');
const cli = (0, cac_1.default)();
const DEFAULT_NAME = 'fuzzy-icons';
const NAMESPACE = 'fu-icon';
const CONFIG = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    base64: true,
    publicPath: undefined,
};
async function build() {
    const { ttf, woff, woff2 } = await (0, webfont_1.default)({
        files: `${SVG_DIR}/*.svg`,
        fontName: DEFAULT_NAME,
        formats: ['ttf', 'woff', 'woff2'],
        fontHeight: 512,
        descent: 64,
    });
    (0, fs_extra_1.removeSync)(DIST_DIR);
    // create
    await Promise.all([(0, fs_extra_1.ensureDir)(FONTS_DIR), (0, fs_extra_1.ensureDir)(CSS_DIR)]);
    const icons = (0, fs_extra_1.readdirSync)(SVG_DIR).map((svgName) => {
        const i = svgName.indexOf('-');
        const extIndex = svgName.lastIndexOf('.');
        return {
            name: svgName.slice(i + 1, extIndex),
            pointCode: svgName.slice(1, i),
        };
    });
    const iconNames = icons.map(iconName => `  "${iconName.name}"`);
    const indexTemplate = `\
module.exports = [
${iconNames.join(',\n')}
]
`;
    const indexESMTemplate = `\
export default [
${iconNames.join(',\n')}
]
`;
    const cssTemplate = `\
@font-face {
  font-family: "${DEFAULT_NAME}";
  src: url("${CONFIG.base64
        ? `data:application/font-woff2;charset=utf-8;base64,${Buffer.from(woff2).toString('base64')}`
        : `${CONFIG.publicPath}${DEFAULT_NAME}-webfont.woff2`}") format("woff2"),
    url("${CONFIG.base64
        ? `data:application/font-woff;charset=utf-8;base64,${woff.toString('base64')}`
        : `${CONFIG.publicPath}${DEFAULT_NAME}-webfont.woff`}") format("woff"),
    url("${CONFIG.base64
        ? `data:font/truetype;charset=utf-8;base64,${ttf.toString('base64')}`
        : `${CONFIG.publicPath}${DEFAULT_NAME}-webfont.ttf`}") format("truetype");
  font-weight: ${CONFIG.fontWeight};
  font-style: ${CONFIG.fontStyle};
}

.${NAMESPACE}--set,
.${NAMESPACE}--set::before {
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 "${DEFAULT_NAME}";
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

${icons
        .map((icon) => {
        return `.${NAMESPACE}-${icon.name}::before {
  content: "\\${icon.pointCode}";
}`;
    })
        .join('\n\n')}
`;
    await Promise.all([
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(FONTS_DIR, `${DEFAULT_NAME}-webfont.ttf`), ttf),
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(FONTS_DIR, `${DEFAULT_NAME}-webfont.woff`), woff),
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(FONTS_DIR, `${DEFAULT_NAME}-webfont.woff2`), woff2),
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(CSS_DIR, `${DEFAULT_NAME}.css`), cssTemplate),
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(CSS_DIR, `${DEFAULT_NAME}.scss`), cssTemplate),
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(DIST_DIR, 'index.js'), indexTemplate),
        (0, fs_extra_1.writeFile)((0, path_1.resolve)(DIST_DIR, 'index.esm.js'), indexESMTemplate),
    ]);
    // eslint-disable-next-line no-console
    console.log('build success!');
}
cli.command('build', 'build icons').action(build);
cli.help();
cli.parse();
