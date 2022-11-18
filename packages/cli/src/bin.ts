#!/usr/bin/env node

import cac from 'cac'
import { version } from '../package.json'
import { build, create } from './command'

const cli = cac()

cli
  .command('create', 'Create a component directory')
  .option('-n , --name <componentsName>', 'Component name')
  .option('-t , --tsx', 'Generate files in tsx format')
  .option('-f , --sfc', 'Generate files in vue3 format')
  .action(create)

cli
  .command('build', 'build script')
  .option('-s , -scss <scss>', 'build scss file')
  .option('-a , -all <all>', 'build all file')
  .action(build)

cli.version(version)
cli.help()
cli.parse()
