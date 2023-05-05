import path from 'path'
import { file } from './core'
import { Context } from './types'
import fs from 'fs'

export default async (ctx: Context): Promise<void> => {
    // 写数据到文件
    const writeMdFile = (ctx: Map<string, any>) => {
        ctx.forEach((val, key) => {
            const parser = path.parse(key);
            const dirName: string = parser.dir
            const fileName: string = parser.name
            const ext: string = parser.ext
            const newFileName: string = fileName + '_base64' + ext
    
    
            let content: string = val.get('content') || ''
            const imgList: Array<string> = val.get('imgList') || [];
            const picsNameArr: Array<string> = val.get('picsNameArr') || [];
            const mapBase64: Map<string, string> = val.get('mapBase64') || new Map()
    
            imgList.forEach((url, index) => {
                content += '\n\n'
                content = content.replace(url, `![image][${picsNameArr[index]}]`);
                content += `[${picsNameArr[index]}]: ${mapBase64.get(picsNameArr[index])}`;
            });
    
            writeFileStream(path.join(dirName, newFileName), content)
        })
    
    
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

    await writeMdFile(ctx.map);
    
}