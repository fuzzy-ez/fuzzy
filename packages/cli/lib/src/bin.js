#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cac_1 = __importDefault(require("cac"));
var package_json_1 = require("../package.json");
var command_1 = require("./command");
var cli = (0, cac_1.default)();
cli
    .command('create', 'Create a component directory')
    .option('-n , --name <componentsName>', 'Component name')
    .option('-t , --tsx', 'Generate files in tsx format')
    .option('-u , --vue', 'Generate files in vue3 format')
    .action(command_1.create);
cli.version(package_json_1.version);
cli.help();
cli.parse();
