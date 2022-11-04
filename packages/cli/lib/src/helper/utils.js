"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigCamelize = exports.camelize = exports.kebabCase = void 0;
function kebabCase(name) {
    var ret = name.replace(/([A-Z])/g, ' $1').trim();
    return ret.split(' ').join('-').toLowerCase();
}
exports.kebabCase = kebabCase;
var camelize = function (name) { return name.replace(/-(\w)/g, function (_, p) { return p.toUpperCase(); }); };
exports.camelize = camelize;
var bigCamelize = function (name) { return name.replace(name.charAt(0), name.charAt(0).toUpperCase()); };
exports.bigCamelize = bigCamelize;
