import path from 'path'
import { file } from './core'
import { Context } from './types'
import fs from 'fs'

export default async (ctx: Context): Promise<void> => {
    const filePathsArr: Array<string> = []

    // resolve dest path
    const folderPath = path.resolve(ctx.dest)


    const getFiles = async (filePath: string) => {
        let state = fs.statSync(filePath);
        if (state.isFile()) {
            //是文件
            let fileSuffix = path.extname(filePath)
            if (fileSuffix === '.md') {
                filePathsArr.push(filePath);
            }
        } else if (state.isDirectory()) {
            //是文件夹
            //先读取
            let files = fs.readdirSync(filePath)
            files.forEach(async (file) => {
                await getFiles(path.join(filePath, file))
            });
        }
    }

    // Recursively walk through the folder to find the md file
    await getFiles(folderPath)

    ctx.filePathsArr = filePathsArr;

    console.log('ctx.filePathsArr', ctx.filePathsArr)
}