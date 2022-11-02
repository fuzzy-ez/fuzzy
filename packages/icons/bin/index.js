"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path_1 = require("path");
var cac_1 = require("cac");
var fs_extra_1 = require("fs-extra");
var webfont_1 = require("webfont");
var CWD = process.cwd();
var SVG_DIR = (0, path_1.resolve)(CWD, 'svg');
var DIST_DIR = (0, path_1.resolve)(CWD, 'dist');
var FONTS_DIR = (0, path_1.resolve)(DIST_DIR, 'fonts');
var CSS_DIR = (0, path_1.resolve)(DIST_DIR, 'css');
var cli = (0, cac_1["default"])();
var DEFAULT_NAME = 'fuzzy-icons';
var WEBFONT_CONFIG = {
    fontName: DEFAULT_NAME,
    formats: ['ttf', 'woff', 'woff2'],
    fontHeight: 512,
    descent: 64
};
function build() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, ttf, woff, woff2, icons, iconNames, indexTemplate, indexESMTemplate, cssTemplate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = {
                        base64: true,
                        publicPath: undefined,
                        fontWeight: 'normal',
                        fontStyle: 'normal'
                    };
                    return [4 /*yield*/, (0, webfont_1["default"])(__assign({ files: "".concat(SVG_DIR, "/*.svg") }, WEBFONT_CONFIG))];
                case 1:
                    _a = _b.sent(), ttf = _a.ttf, woff = _a.woff, woff2 = _a.woff2;
                    (0, fs_extra_1.removeSync)(DIST_DIR);
                    // create
                    return [4 /*yield*/, Promise.all([(0, fs_extra_1.ensureDir)(FONTS_DIR), (0, fs_extra_1.ensureDir)(CSS_DIR)])];
                case 2:
                    // create
                    _b.sent();
                    icons = (0, fs_extra_1.readdirSync)(SVG_DIR).map(function (svgName) {
                        var i = svgName.indexOf('-');
                        var extIndex = svgName.lastIndexOf('.');
                        return {
                            name: svgName.slice(i + 1, extIndex),
                            pointCode: svgName.slice(1, i)
                        };
                    });
                    iconNames = icons.map(function (iconName) { return "  \"".concat(iconName.name, "\""); });
                    indexTemplate = "module.exports = [\n".concat(iconNames.join(',\n'), "\n]\n");
                    indexESMTemplate = "export default [\n".concat(iconNames.join(',\n'), "\n]\n");
                    cssTemplate = "@font-face {\n  font-family: \"".concat(DEFAULT_NAME, "\";\n  src: url(\"").concat(config.base64
                        ? "data:application/font-woff2;charset=utf-8;base64,".concat(Buffer.from(woff2).toString('base64'))
                        : "".concat(config.publicPath).concat(DEFAULT_NAME, "-webfont.woff2"), "\") format(\"woff2\"),\n    url(\"").concat(config.base64
                        ? "data:application/font-woff;charset=utf-8;base64,".concat(woff.toString('base64'))
                        : "".concat(config.publicPath).concat(DEFAULT_NAME, "-webfont.woff"), "\") format(\"woff\"),\n    url(\"").concat(config.base64
                        ? "data:font/truetype;charset=utf-8;base64,".concat(ttf.toString('base64'))
                        : "".concat(config.publicPath).concat(DEFAULT_NAME, "-webfont.ttf"), "\") format(\"truetype\");\n  font-weight: ").concat(config.fontWeight, ";\n  font-style: ").concat(config.fontStyle, ";\n}\n\n.").concat(DEFAULT_NAME, "--set,\n.").concat(DEFAULT_NAME, "--set::before {\n  position: relative;\n  display: inline-block;\n  font: normal normal normal 14px/1 \"").concat(DEFAULT_NAME, "\";\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n}\n\n").concat(icons
                        .map(function (icon) {
                        return ".".concat(DEFAULT_NAME, "-").concat(icon.name, "::before {\n  content: \"\\").concat(icon.pointCode, "\";\n}");
                    })
                        .join('\n\n'), "\n");
                    return [4 /*yield*/, Promise.all([
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(FONTS_DIR, "".concat(DEFAULT_NAME, "-webfont.ttf")), ttf),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(FONTS_DIR, "".concat(DEFAULT_NAME, "-webfont.woff")), woff),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(FONTS_DIR, "".concat(DEFAULT_NAME, "-webfont.woff2")), woff2),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(CSS_DIR, "".concat(DEFAULT_NAME, ".css")), cssTemplate),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(CSS_DIR, "".concat(DEFAULT_NAME, ".scss")), cssTemplate),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(DIST_DIR, 'index.js'), indexTemplate),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(DIST_DIR, 'index.esm.js'), indexESMTemplate),
                        ])
                        // eslint-disable-next-line no-console
                    ];
                case 3:
                    _b.sent();
                    // eslint-disable-next-line no-console
                    console.log('build success!');
                    return [2 /*return*/];
            }
        });
    });
}
cli.command('build', 'build icons').action(build);
cli.help();
cli.parse();
