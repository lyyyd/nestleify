import path from 'path'
import { file } from './core'
import { Context, FileInfo, ImageRef } from './types'
import fs from 'fs'

export default async (ctx: Context): Promise<void> => {

    const readFileStream = (path: string): any => {
        const data = fs.readFileSync(path, 'utf-8');
        return data.toString();
    }
    
    const writeFileStream = (path: string, content: string) => {
        const ws = fs.createWriteStream(path)

        // TODO
        // 写入chunk
        ws.write(content, 'utf-8');
    
        ws.close()
    }

    // 写数据到文件
    const writeMdFile = async (ctx: Context) => {
        // console.log('ctx***', ctx)
        await ctx.fileInfoList.forEach(async (fileInfo: FileInfo) => {
            // console.log('fileInfo path', fileInfo.path)
            // console.log('fileInfo info', fileInfo.info)
            
            // 文件输出路径
            const fileName = path.basename(fileInfo.path);
            const outputPath = path.join('D:\\myGitHub\\nestleify\\mds', fileName)
            console.log('outputPath***', outputPath)

            // 读取文件内容
            const filePath = fileInfo.path;
            let content = await readFileStream(filePath)
            
            // console.log('content', content)
            // 写文件, 替换文件内容,将本地图片引用转为oss上传地址
            fileInfo.info.forEach((imageRef: ImageRef) => {
                const imageRefNew = `![${imageRef.imgName}](${imageRef.ossUri})`
                content = content.replace(imageRef.ref, imageRefNew)
            })

            // console.log('content', content)
            writeFileStream(outputPath, content)

        } )
    
    }

    await writeMdFile(ctx);
    
}