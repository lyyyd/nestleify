/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 20:46:08
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-12 22:13:01
 * @FilePath: \nestleify\src\upload.oss.ts
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

    const upload = async (img?: IUploadOption): Promise<ImgInfo[]|false> => {
        try {
            const output = await picgo.upload(img)
            // console.log('output***', output)
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

    }

    
    await getMdFiles(ctx.dest)

    ctx.map = map

    // console.log('ctx', ctx)
}