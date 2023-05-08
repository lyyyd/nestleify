import { PicGo } from 'picgo'

const picgo = new PicGo()

// upload a picture from path
// picgo.upload(['D:\\myGitHub\\nestleify\\img\\dog-1280×881.jpg'])

// // upload a picture from clipboard
// picgo.upload()

const upload = async (img) => {
    const output = await picgo.upload(img)
}

upload(['D:\\myGitHub\\nestleify\\img\\dog-1280×881.jpg'])

// https://lyyyd-halo-blog-oss.oss-cn-shanghai.aliyuncs.com/hexo-blog/java/dog-1280%C3%97881.jpg
// https://lyyyd-halo-blog-oss.oss-cn-shanghai.aliyuncs.com/hexo-blog/java/dog-1280%C3%97881.jpg
// https://lyyyd-halo-blog-oss.oss-cn-shanghai.aliyuncs.com/hexo-blog/java/202305082144335.jpg