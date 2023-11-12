#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { inquirerPrompt } = require('./inquirer')
const { checkMkdirExists, copyDir } = require('./copy')
const path = require('path')
const process = require('process')

yargs(hideBin(process.argv))
  .command(
    ['create', 'c'],
    '新建一个模板',
    yargs => {
      return yargs.positional('create', {
        describe: 'port to bind on',
        default: 5000
      })
    },
    argv => {
      inquirerPrompt(argv).then(answers => {
        const { name, type } = answers
        const isMkdirExists = checkMkdirExists(path.resolve(process.cwd(), `../examples/${name}`))
        if (isMkdirExists) {
          console.log(`${name}文件夹已经存在`)
        } else {
          copyDir(
            path.resolve(__dirname, `./template/${type}`),
            path.resolve(process.cwd(), `../examples/${name}`)
          )
        }
      })
    }
  )
  .option('name', {
    alias: 'n',
    demand: true,
    describe: '模板名称',
    type: 'string'
  })
  .parse()
