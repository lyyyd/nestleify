/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 21:24:55
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-12 21:30:53
 * @FilePath: \nestleify\src\prepare.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import path from 'path'
import { Context } from './types'
import fs from 'fs'
import { PicGo } from 'picgo'

const picgo = new PicGo()

export default async (ctx: Context): Promise<void> => {
    console.log('ctx', ctx);
    const map: Map<string, any> = new Map;

    const readFileStream = (path: string): any => {
        const data = fs.readFileSync(path, 'utf-8');
        return data.toString();
    }

    const getMdFiles = async (src: string) => {
        // Gets a list of md files
        await ctx.files.forEach(async (mdFilePath) => {
            const obj: Map<string, string | Array<string> | Map<string, string>> = new Map

            // 文件所在目录
            const dirname = path.dirname(mdFilePath)
            // 文件内容
            const content = readFileStream(mdFilePath);
            // 图片引用列表
            const picurlArr: Array<string> = content.match(/\!\[.*\]\(.*\)/g) || [];

            // const picsNameArr = picurlArr.map(item => {
            //     let picurl = decodeURI(item);
            //     picurl = (picurl.match(/[\u4E00-\u9FA5\w_\s\-]+\.+(jpg|png|JPG|PNG|jpeg|JPEG|gif|GIF)/g))![0];
            //     return picurl;
            // });
            console.log('picurlArr', picurlArr)
            // console.log('picsNameArr', picsNameArr)

            const mapBase64: Map<string, string> = new Map();
            await picurlArr.forEach(async (item) => {
                // 图片引用的相对路径
                /**
                 * TODO: 网络图片进行阿里云上传
                 */
                const relativePath = path.normalize((decodeURI(item).match(/[\u4E00-\u9FA5\w_\s\-]+[\\|\/]+[\u4E00-\u9FA5\w_\s\-]+\.+(jpg|png|JPG|PNG|jpeg|JPEG|gif|GIF)/g))![0]);
                
                const fileFullPath = path.join(dirname, relativePath);

                console.log('fileFullPath', fileFullPath)
            });
    
            // obj.set('content', content)
            // obj.set('imgList', picurlArr)
            // obj.set('picsNameArr', picsNameArr)
            // obj.set('mapBase64', mapBase64)
            // map.set(mdFilePath, obj)
    
        })

    }

    
    await getMdFiles(ctx.dest)

    ctx.map = map
}