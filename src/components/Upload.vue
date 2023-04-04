<template>
    <div>
        <!-- <div style="z-index:1000">{{ uploadObj }}</div> -->
        <el-upload class="avatar-uploader" :action="action" :on-success="handleAvatarSuccess" :show-file-list="false"
            :before-upload="beforeAvatarUpload">

            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

    </div>
</template>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<script>
export default {
    props: {
        uploadObj: {
            type: Object,
        }
    },
    data() {
        return {
            action: "/api/file/upload",//需要与后端服务器对应，上传地址
            download: "/api/file/download/", //需要与后端服务器对应
            // imageUrl: ''
        };
    },
    methods: {
        handleAvatarSuccess(res, file, fileList) {//文件上传成功时调用，
            // console.log(res, file, fileList)
            // this.imageUrl = this.download + res.description
            // this.uploadObj.fileName 
            this.uploadObj.fileName = res.description
            console.log(this.imageUrl)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onSuccess1(response, file, fileList) {
            console.log(response, file, fileList)

        }
    },
    computed: { // 计算属性，
        imageUrl() {
            console.log("计算图片")
            return this.uploadObj.fileName ? this.download + this.uploadObj.fileName : null
        }
    }
}
</script>