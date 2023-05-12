/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 20:35:49
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-12 21:20:55
 * @FilePath: \nestleify\src\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import prompts from 'prompts'

import list, { ListOptions } from './list'

import { file, http, config, exec, Ware, Middleware } from './core'
import { Options, Context, Template } from './types'

import confirm from './confirm'
import require from './require'
import prepare from './prepare'
import writefile from './writefile'

// export inject for test
const { inject } = prompts

const creator = new Ware<Context>()

creator.use(confirm)

creator.use(require)

creator.use(prepare)

// creator.use(writefile)


export default async (template: string, project: string = '.', options: Options = {}, src: string): Promise<void> => {
  // required arguments
  if (template == null || template === '') {
    throw new Error('Missing required argument: `template`.')
  }
  // await getMdFiles(src);

  // create context
  const context = {
    template,
    project,
    options,
    src: '',
    dest: '',
    config: Object.create(null),
    answers: Object.create(null),
    files: [],
    fileInfoList: [],
    // filePathsArr: [],
    map: new Map(),
    oss: new Map(),
  }

  // running creator
  await creator.run(context)
}


export { inject, file, http, config, exec, Ware, list, Middleware, Options, Context, Template, ListOptions }
