"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplates = exports.create = void 0;
/* eslint-disable no-template-curly-in-string */
var path_1 = require("path");
var inquirer_1 = __importDefault(require("inquirer"));
var fs_extra_1 = require("fs-extra");
var picocolors_1 = __importDefault(require("picocolors"));
var constant_1 = require("../helper/constant");
var utils_1 = require("../helper/utils");
var prompt = inquirer_1.default.prompt;
function create(options) {
    return __awaiter(this, void 0, void 0, function () {
        var renderData, name, _a, componentFolder, componentFolderName, style;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // eslint-disable-next-line no-console
                    console.log('\n📦📦 Create a component ! \n');
                    renderData = {
                        kebabCaseName: 'component-name',
                        bigCamelizeName: 'ComponentName',
                        camelizeName: 'componentName',
                        style: 'vue',
                    };
                    if (!options.name) return [3 /*break*/, 1];
                    _a = options;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, prompt({
                        name: 'name',
                        message: 'Name of the component created: ',
                        default: renderData.kebabCaseName,
                    })];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    name = (_a).name;
                    renderData.kebabCaseName = (0, utils_1.kebabCase)(name);
                    renderData.camelizeName = (0, utils_1.camelize)(name);
                    renderData.bigCamelizeName = (0, utils_1.bigCamelize)(name);
                    componentFolder = (0, path_1.resolve)(constant_1.CWD, renderData.camelizeName);
                    componentFolderName = renderData.camelizeName;
                    if ((0, fs_extra_1.pathExistsSync)(componentFolder)) {
                        // eslint-disable-next-line no-console
                        console.log(picocolors_1.default.red("\n\u274C\u274C The component ".concat(picocolors_1.default.bgYellow(componentFolderName), " already exists! \n")));
                        return [2 /*return*/];
                    }
                    if (!(options.sfc || options.ts)) return [3 /*break*/, 4];
                    renderData.style = options.sfc ? 'vue' : 'ts';
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, prompt({
                        name: 'style',
                        type: 'list',
                        message: 'Which style do you use to write your component ?',
                        choices: [
                            { name: 'sfc', value: 'vue' },
                            { name: 'ts', value: 'ts' },
                        ],
                        default: 'vue',
                    })];
                case 5:
                    style = (_b.sent()).style;
                    renderData.style = style;
                    _b.label = 6;
                case 6: return [4 /*yield*/, renderTemplates(componentFolder, componentFolderName, renderData)
                    // eslint-disable-next-line no-console
                ];
                case 7:
                    _b.sent();
                    // eslint-disable-next-line no-console
                    console.log(picocolors_1.default.green('\n✅✅ Create component succeed! \n'));
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function renderTemplates(componentFolder, componentFolderName, renderData) {
    return __awaiter(this, void 0, void 0, function () {
        var kebabCaseName, bigCamelizeName, style, codeSfc, codeTs, codeIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    kebabCaseName = renderData.kebabCaseName, bigCamelizeName = renderData.bigCamelizeName, style = renderData.style;
                    codeSfc = "<script setup lang=\"ts\">\ndefineOptions({\n  name: 'F".concat(bigCamelizeName, "',\n})\n</script>\n\n<template>\n  <div class=\"").concat(kebabCaseName, "\">\n    <slot />\n  </div>\n</template>\n\n<style scoped lang=\"scss\">\n</style>");
                    codeTs = "const props = {}\nexport default defineComponent({\n  name: 'F".concat(bigCamelizeName, "',\n  props,\n  setup(){\n    return {}\n  },\n  render(){\n    const {\n      $slots:slots,\n    } = this\n    return h('div', { class: F'").concat(bigCamelizeName, "' }, slots)\n  }\n})");
                    codeIndex = "import { withInstall } from '@fuzzy/utils'\nimport ".concat(bigCamelizeName, " from './src/").concat(componentFolderName, ".").concat(style, "'\n\nexport const F").concat(bigCamelizeName, " = withInstall(").concat(bigCamelizeName, ")\n\nexport default F").concat(bigCamelizeName);
                    return [4 /*yield*/, Promise.all([
                            (0, fs_extra_1.ensureFile)("".concat(componentFolder, "/src/").concat(componentFolderName, ".").concat(style)),
                            (0, fs_extra_1.ensureFile)("".concat(componentFolder, "/style/index.scss")),
                            (0, fs_extra_1.ensureFile)("".concat(componentFolder, "/props.ts")),
                            (0, fs_extra_1.ensureFile)("".concat(componentFolder, "/index.ts")),
                            (0, fs_extra_1.ensureFile)("".concat(componentFolder, "/__test__/index.spec.ts")),
                        ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)("".concat(componentFolder, "/src"), "".concat(componentFolderName, ".").concat(style)), style === 'vue' ? codeSfc : codeTs),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(componentFolder, 'props.ts'), ''),
                            (0, fs_extra_1.writeFile)((0, path_1.resolve)(componentFolder, 'index.ts'), codeIndex),
                        ])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.renderTemplates = renderTemplates;
