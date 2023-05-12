/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 20:46:08
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-08 23:02:26
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

    // const upload  = async (img?: any[]): Promise<any> => {
    //     try {
    //         const output = await picgo.upload(img)
    //         return output;
    //     } catch (e: any) {
    //         return false
    //     }
    // }

    const upload = async (img?: IUploadOption): Promise<ImgInfo[]|false> => {
        try {
            const output = await picgo.upload(img)
            console.log('output***', output)
            // return true
            if (Array.isArray(output) && output.some((item: ImgInfo) => item.imgUrl)) {
                return output.filter(item => item.imgUrl)
            }else{
                return false
            }
        } catch (e: any) {
            return false
        }
    }



    const getMdFiles = async (src: string) => {
        // Gets a list of md files
        await ctx.filePathsArr.forEach(async (mdFilePath) => {
            const obj: Map<string, string | Array<string> | Map<string, string>> = new Map
            const filename = path.basename(mdFilePath)
            const dirname = path.dirname(mdFilePath)
    
            const content = readFileStream(mdFilePath);
    
            const picurlArr: Array<string> = content.match(/\!\[.*\]\(.*\)/g) || [];
    
            const picsNameArr = picurlArr.map(item => {
                let picurl = decodeURI(item);
                picurl = (picurl.match(/[\u4E00-\u9FA5\w_\s\-]+\.+(jpg|png|JPG|PNG|jpeg|JPEG|gif|GIF)/g))![0];
                return picurl;
            });
            
    
    
            // const picsBase = decodeURI(((picurlArr[0])
            //     .match(/(file:[\/\\]{2}([\/\\]\w\:[\/\\])(\w*[\/\\])*|\w:.*|([\u4E00-\u9FA5\w\_\s\-\.]*[\/\\]))/g))![0]);
            
            console.log('picurlArr', picurlArr)
            const mapBase64: Map<string, string> = new Map();
            await picurlArr.forEach(async (item) => {
                let relativePath = ''
                try {
                    relativePath = path.normalize((decodeURI(item).match(/[\u4E00-\u9FA5\w_\s\-]+[\\|\/]+[\u4E00-\u9FA5\w_\s\-]+\.+(jpg|png|JPG|PNG|jpeg|JPEG|gif|GIF)/g))![0]);
                } catch (error) {
                    console.log('relativePath 获取报错')
                }
                
                console.log('relativePath', relativePath)

                const fileFullPath = path.join(dirname, relativePath);

                console.log('fileFullPath', fileFullPath)

                // 上传阿里云
                const res = await upload([fileFullPath]);

                console.log('res', res)

                if (res && res.length > 0) {
                    // 记录路径
                    ctx.oss.set(fileFullPath, res[0])
                }

                
                // let fileSuffix = path.extname(path.join(dirname, relativePath)).substring(1);
    
                // const data = fs.readFileSync(path.join(dirname, relativePath));
    
                // const filename = path.basename(path.join(dirname, relativePath))
    
                // const strBase64 = 'data:image/' + fileSuffix + ';base64,' + data.toString('base64');
    
                // // mapBase64.set(filename, strBase64.substring(0, 50))
                // mapBase64.set(filename, strBase64)
    
            });
    
            // obj.set('content', content)
            obj.set('imgList', picurlArr)
            obj.set('picsNameArr', picsNameArr)
            obj.set('mapBase64', mapBase64)
            map.set(mdFilePath, obj)
    
        })

    }

    
    await getMdFiles(ctx.dest)

    ctx.map = map

    console.log('ctx', ctx)
}