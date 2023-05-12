/*
 * @Author: lyyyd David.Jackson.Lyd@gmail.com
 * @Date: 2023-05-05 20:46:08
 * @LastEditors: lyyyd David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-05-12 23:25:22
 * @FilePath: \nestleify\src\upload.oss.ts
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

    const getPendingFiles = (fileInfoList: FileInfo[]): ImageRef[] => {
        const fileList: ImageRef[] = new Array();
        ctx.fileInfoList.forEach((fileInfo: FileInfo) => {
            fileInfo.info.forEach((imageRef: ImageRef) => {
                fileList.push(imageRef)
            })
        })
        return fileList;
    }

    const upload = async (img?: IUploadOption): Promise<ImgInfo[]|false> => {
        try {
            const output = await picgo.upload(img)
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

    
    const fileList: ImageRef[]= getPendingFiles(ctx.fileInfoList);
    const files: string[] = fileList.map(val => val.imgFilePath)

    console.log('1.files', files)

    const ossUploadedList = await upload(files)
    console.log('2.ossUploadedList', ossUploadedList)

}