<template>
  <el-upload
    class="upload-demo"
    action="http://macro-oss.oss-cn-shenzhen.aliyuncs.com"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <el-button
      slot="trigger"
      size="small"
      type="primary"
    >点击上传</el-button>
    <div
      slot="tip"
      class="el-upload__tip"
    >只能上传jpg/png文件，且不超过10MB</div>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      fileList: []
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>