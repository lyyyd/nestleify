import path from 'path'
import { Context, FileInfo, IImgInfo, ImageRef } from './types'
import { PicGo } from '@lyland/picgo'

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


    const upload = async (img?: string[]): Promise<any> => {
        try {
            const output = await picgo.upload(img)
            // return true
            if (Array.isArray(output) && output.some((item: any) => item.imgUrl)) {
                // return output.filter(item => item.imgUrl)
                return output
            } else {
                return false
            }
        } catch (e: any) {
            return false
        }
    }


    const fileList: ImageRef[] = getPendingFiles(ctx.fileInfoList);
    const files: string[] = fileList.map(val => val.imgFilePath)

    // console.log('1.files', files)

    const ossUploadedList = await upload(files)
    // console.log('2.ossUploadedList', ossUploadedList)

    const map: Map<string, IImgInfo> = new Map()
    ossUploadedList.forEach((ossInfo: IImgInfo) => {
        map.set(ossInfo.filePath, ossInfo)
    });


    const setUplodedUri = (fileInfoList?: FileInfo[]): ImageRef[] => {
        const fileList: ImageRef[] = new Array();
        ctx.fileInfoList.forEach((fileInfo: FileInfo) => {
            fileInfo.info.forEach((imageRef: ImageRef) => {
                if (map.has(imageRef.imgFilePath)) {
                    imageRef.ossUri = map.get(imageRef.imgFilePath)?.imgUrl || undefined
                }
                fileList.push(imageRef)
            })
            // console.log('fileInfo***', fileInfo)
        })
        return fileList;
    }

    setUplodedUri()

    
    // console.log('ctx', ctx);
}