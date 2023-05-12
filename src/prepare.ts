/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 21:24:55
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-12 22:58:03
 * @FilePath: \nestleify\src\prepare.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import path from 'path'
import { Context, FileInfo, ImageRef } from './types'
import fs from 'fs'
import { PicGo } from 'picgo'

const picgo = new PicGo()

export default async (ctx: Context): Promise<void> => {
    // console.log('ctx', ctx);

    /**
     * fileInfoList的数据结构为
     *          
     * example:
     * 
     * [{
     *      path: '',
     *      info: [{
     *          ref: '',
     *          imgFilePath: ''
     *      }, {
     *          ref: '',
     *          imgFilePath: ''
     *      }]
     *  }]
     * 
     */


    const readFileStream = (path: string): any => {
        const data = fs.readFileSync(path, 'utf-8');
        return data.toString();
    }

    const fileInfoList: FileInfo[] = new Array;
    const getMdFiles = async () => {
        // Gets a list of md files
        
        await ctx.files.forEach(async (filePath) => {
            // const fileMap: Map<string, Array<Map<string, string>>> = new Map();

            // 文件所在目录
            const dirname = path.dirname(filePath);
            // 文件内容
            const content = readFileStream(filePath);
            // 图片引用列表
            const imgRefArr: Array<string> = content.match(/\!\[.*\]\(.*\)/g) || [];

            const imgRefList: ImageRef[] = new Array;
            imgRefArr.forEach(async (imageRef) => {
                let imageRefMap: Map<string, ImageRef> = new Map()
                // 图片引用的相对路径
                /**
                 * TODO: 网络图片进行阿里云上传
                 */
                const relativePath = path.normalize((decodeURI(imageRef).match(/[\u4E00-\u9FA5\w_\s\-]+[\\|\/]+[\u4E00-\u9FA5\w_\s\-]+\.+(jpg|png|JPG|PNG|jpeg|JPEG|gif|GIF)/g))![0]);
                
                const fileFullPath = path.join(dirname, relativePath);

                // const map: Map<string, string> = new Map()
                // map.set('ref', imageRef)
                // aaa.set('fileFullPath', fileFullPath)

                imgRefList.push({
                    ref: imageRef,
                    imgFilePath: fileFullPath,
                })

            });

            // console.log('1.imgRefList***', imgRefList)

            fileInfoList.push(
                {
                    path: filePath,
                    info: imgRefList
                }
            )

        })
    }
    await getMdFiles()


    console.log('2.fileInfoList***', fileInfoList)
    ctx.fileInfoList = fileInfoList
}