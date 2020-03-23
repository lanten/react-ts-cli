#! /usr/bin/env node

const path = require('path')
const crossEnv = require('../lib/cross-env')

const args = process.argv.slice(2)

args.push('ts-node', path.resolve(__dirname, '../build/tasks/dev-server.ts'))

console.log('test ok', process.argv, args, crossEnv)

// crossEnv(args)
