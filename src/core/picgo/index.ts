/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-08 22:33:14
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-08 22:34:40
 * @FilePath: \nestleify\src\core\picgo\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// import { dbChecker, dbPathChecker } from 'apis/core/datastore/dbChecker'
import pkg from 'root/package.json'
import { PicGo } from 'picgo'
import debounce from 'lodash/debounce'

// const CONFIG_PATH = dbPathChecker()

// dbChecker()

const picgo = new PicGo()
picgo.saveConfig({
  debug: true,
  PICGO_ENV: 'GUI'
})

// global.PICGO_GUI_VERSION = pkg.version
// picgo.GUI_VERSION = global.PICGO_GUI_VERSION

const originPicGoSaveConfig = picgo.saveConfig.bind(picgo)

function flushDB () {
  // db.flush()
}

const debounced = debounce(flushDB, 1000)

// picgo.saveConfig = (config: IStringKeyMap) => {
//   originPicGoSaveConfig(config)
//   // flush electron's db
//   debounced()
// }

export default picgo
