import path from 'path'
import { file } from './core'
import { Context, FileInfo } from './types'
import fs from 'fs'

export default async (ctx: Context): Promise<void> => {
    // 写数据到文件
    const writeMdFile = (ctx: Context) => {
        console.log('ctx***', ctx)
        ctx.fileInfoList.forEach((fileInfo: FileInfo) => {
            console.log('fileInfo path', fileInfo.path)
            console.log('fileInfo info', fileInfo.info)
        } )
    
    }
    
    const writeFileStream = (path: string, content: string) => {
        const ws = fs.createWriteStream(path)
    
        ws.on("open", () => { // once绑定一次性的事件，触发一次就会失效
        })
    
        ws.once("close", () => { // once绑定一次性的事件，触发一次就会失效
    
        })
    
        // TODO
        // 写入chunk
        ws.write(content, 'utf-8');
    
        ws.close()
    }

    await writeMdFile(ctx);
    
}