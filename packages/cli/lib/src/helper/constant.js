"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRC_DIR = exports.CWD = void 0;
var path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
