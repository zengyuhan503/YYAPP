<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons-vue";
import { imageUpLoad, createBanners, editBanners } from "@/utils/request/index";
import { message } from "ant-design-vue";
import { about_edit, about_detail } from "@/utils/request/index";
let router = useRouter();
let route = useRoute();
const layout = reactive({
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
});
let formState = reactive({
  desc: "",
  image: "",
});
const coverUploadList = ref([]);
const imagersUploadList = ref([]);

const imageBeforeUpload = (file) => {
  const isLt = file.size / 1024 / 1024 < 50;
  if (!isLt) {
    message.error(`图片不能超过5MB`);
    return false;
  }
  const isPNG = file.type === "image/png" || file.type === "image/jpeg";
  if (!isPNG) {
    message.error(`请上传 JPG/PNG 的图片`);
    return false;
  }
  if (isPNG) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      const src = e.target.result;
      const image = new Image();
      image.onload = async function () {
        const img = this as HTMLImageElement;
        if (img.width != 750) {
          message.error(`请上传宽度为750px长图`);
          return false;
        }
        if (img.height > 2000) {
          message.error(`请上传高度不能超过2000px的长图`);
          return false;
        }
        coverUploadList.value = [...(coverUploadList.value || []), file];
        formState.image = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};
const handleRemoveCover = () => {
  coverUploadList.value = [];
  formState.image = "";
};
let submitLoading = ref(false);
const handleSubmit = () => {
  uploadImages()
    .then((res) => {
      console.log(res);
      handleEditDetail(res);
    })
    .catch((err) => {
      //   message.error(err);
      console.log(err);
    });
};
let uploadTypes = [];
const uploadImages = () => {
  return new Promise((resolve, reject) => {
    let uploads = [];
    if (coverUploadList.value.length > 0) {
      let coverFormData = new FormData();
      uploadTypes.push("cover");
      coverFormData.append("limit_image", coverUploadList.value[0]);
      uploads.push(imageUpLoad(coverFormData));
    } else {
      uploads.push([]);
    }
    if (uploads.length == 0) {
      resolve([detail.image]);
    } else {
      Promise.all(uploads)
        .then((res) => {
          console.log(res);
          let data = [res[0].data];
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
let detail = { desc: "", image: "" };
const handleGetInfo = () => {
  about_detail().then((res) => {
    detail.desc = res.data.desc as string;
    detail.image = res.data.image as string;
    formState.desc = detail.desc;
    formState.image = "https://dental.cdwuhu.com/" + detail.image;
  });
};
const handleEditDetail = (res) => {
  let params = {
    desc: formState.desc,
    image: res[0],
  };
  about_edit(params).then((res) => {
    console.log(res);
    handleGetInfo();
  });
};

onMounted(() => {
  handleGetInfo();
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">关于我们 长图配置</p>
        <p>上传长图后，会立即生效，请检查仔细后再上</p>
      </div>
    </div>
    <div class="page-body">
      <div class="page-main">
        <p class="title">长图上传</p>
        <div class="page-form">
          <a-form :model="formState" v-bind="layout">
            <a-row :gutter="180" justify="space-between">
              <a-col :span="8">
                <a-form-item label="备注（选填）">
                  <a-input v-model:value="formState.desc" />
                </a-form-item>
                <a-form-item label="长图（选填）">
                  <a-upload
                    name="file"
                    :file-list="coverUploadList"
                    :before-upload="imageBeforeUpload"
                    @remove="handleRemoveCover"
                    :maxCount="1"
                  >
                    <a-button type="primary">
                      <upload-outlined></upload-outlined>
                      上传
                    </a-button>
                  </a-upload>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <div class="explain">
                  <p style="color: rgba(0, 0, 0, 0.85)">说明</p>
                  <p>
                    1.长图的上传要求：宽度750PX。长度低于2000PX。格式JPG/PNG。小于5M。
                  </p>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <a-divider orientation="left">实例</a-divider>
      <div class="banners" style="padding: 20px">
        <div class="cover">
          <img
            style="width: 700px"
            v-show="formState.image != ''"
            :src="formState.image"
          />
        </div>
      </div>
      <div class="submit-footer">
        <a-button style="margin-right: 10px" @click="router.go(-1)"> 取 消 </a-button>
        <a-button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提 交</a-button
        >
      </div>
      <div style="height: 100px"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style>
.login-form .ant-message {
  position: absolute;
}
</style>
