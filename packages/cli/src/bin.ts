#!/usr/bin/env ts-node

import cac from 'cac'
import { version } from '../package.json'
import { create } from './command'

const cli = cac()

cli
  .command('create', 'Create a component directory')
  .option('-n , --name <componentsName>', 'Component name')
  .option('-t , --tsx', 'Generate files in tsx format')
  .option('-f , --sfc', 'Generate files in vue3 format')
  .action(create)

cli.version(version)
cli.help()
cli.parse()
