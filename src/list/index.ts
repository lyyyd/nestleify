/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 21:24:56
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-14 18:47:36
 * @FilePath: \nestleify\src\list\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { config } from '../core'
import fetch from './fetch'

export interface ListOptions {
  json?: boolean
  short?: boolean
}

/**
 * Show all available templates.
 */
export default async (owner: string = config.official, options: ListOptions = {}): Promise<void> => {
  const results = await fetch(owner)

  const isOfficial = owner === config.official

  // json output
  if (options.json ?? false) {
    return console.log(JSON.stringify(results))
  }

  // short output
  if (options.short ?? false) {
    return results.forEach(i => console.log(`→ ${isOfficial ? i.name : i.fullname}`))
  }

  // full mode
  if (results.length === 0) {
    return console.log('No available templates.')
  }

  console.log(`Available ${isOfficial ? 'official' : owner}'s templates:`)
  const infos = results.map(i => [isOfficial ? i.name : i.fullname, i.description])
  const width = Math.max(5, ...infos.map(i => i[0].length))
  const gap = (name: string): string => ' '.repeat(width - name.length)
  infos.forEach(([name, desc]) => console.log(`  → ${name} ${gap(name)} ${desc}`))
}
