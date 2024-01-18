<script setup lang="ts">
import { reactive, ref, watch, onMounted, createVNode } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message, Upload } from "ant-design-vue";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { imageUpLoad, createBanners, editBanners, goodList } from "@/utils/request/index";
let router = useRouter();
let route = useRoute();
const layout = reactive({
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
});
let goodLists = ref([]);
let formState = reactive({
  remark: "",
  url: "",
  cover: "",
  imageUrl: "",
  image: "",
  long_image: "",
  id: "",
  goods_id: "",
});
const coverUploadList = ref([]);
const imagersUploadList = ref([]);
const coverBeforeUpload = (file) => {
  const isLt = file.size / 1024 / 1024 < 20;
  if (!isLt) {
    message.error(`图片不能超过2MB`);
    return false;
  }
  const isPNG = file.type === "image/png" || file.type === "image/jpeg";
  if (!isPNG) {
    message.error(`请上传 JPG/PNG 的图片`);
    coverUploadList.value = [];
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
        const targetAspectRatio = 2; // 目标比例，即 360:180，宽高比例为2:1
        let aspectRatio = img.width / img.height;
        aspectRatio = Math.abs(aspectRatio - targetAspectRatio);
        if (img.width < 360) {
          message.error(
            "请上传最小宽度为360的图片，图片比例为2:1，如360x180分辨率的图片"
          );
          coverUploadList.value = [];
          return false;
        }
        if (aspectRatio > 0.01) {
          message.error("请上传宽高比例为2:1的图片，如360x180分辨率的图片");
          coverUploadList.value = [];
          return false;
        }
        // coverUploadList.value = [...(coverUploadList.value || []), file];
        formState.cover = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};

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
        imagersUploadList.value = [...(imagersUploadList.value || []), file];
        formState.imageUrl = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};
const handleRemoveImages = () => {
  imagersUploadList.value = [];
  formState.imageUrl = "";
};
const handleRemoveCover = () => {
  coverUploadList.value = [];
  formState.cover = "";
};
let submitLoading = ref(false);
const handleSubmit = () => {
  uploadImages()
    .then((res) => {
      console.log(res);
      let params = {
        type: "2",
        url: formState.url,
        goods_id: formState.goods_id,
        remark: formState.remark,
        image: res[0] == undefined ? formState.image : res[0],
        long_image: res[1] == undefined ? formState.long_image : res[1],
        banner_id: null,
      };
      if (formState.id !== "") {
        params = {
          ...params,
          banner_id: formState.id,
        };
        editBanners(params).then((res) => {
          console.log(res);
          message.success("添加成功");
          router.push("/display/banners");
        });
      } else {
        createBanners(params).then((res) => {
          console.log(res);
          message.success("添加成功");
          router.push("/display/banners");
        });
      }

      console.log(params);
    })
    .catch((err) => {
      message.error(err);
    });
};
let uploadTypes = [];
const uploadImages = () => {
  return new Promise((resolve, reject) => {
    if (coverUploadList.value.length == 0 && formState.cover == "") {
      reject("请上传banner图片");
      return false;
    }
    let uploads = [];
    if (coverUploadList.value.length > 0) {
      let coverFormData = new FormData();
      uploadTypes.push("cover");
      coverFormData.append("limit_image", coverUploadList.value[0].originFileObj);
      uploads.push(imageUpLoad(coverFormData));
    } else {
      uploads.push([]);
    }
    if (
      formState.url == "" &&
      imagersUploadList.value.length == 0 &&
      formState.imageUrl == ""
    ) {
      reject("请上传长图，如你不需要上传长图，请填写链接");
      return false;
    } else if (formState.url == "" && imagersUploadList.value.length > 0) {
      uploadTypes.push("imageUrl");
      let imageFormData = new FormData();
      imageFormData.append("limit_image", imagersUploadList.value[0]);
      uploads.push(imageUpLoad(imageFormData));
    } else {
      uploads.push([]);
    }
    if (uploads.length == 0) {
      resolve("noChage");
    } else {
      Promise.all(uploads)
        .then((res) => {
          let data = [res[0].data, res[1].data];
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
const handleGetGoodsList = () => {
  let params = {
    page: 1,
    page_size: 10000,
    status: "1",
  };
  goodList(params).then((res) => {
    goodLists.value = res.data.data;
    console.log(res.data)
  });
};
onMounted(() => {
  handleGetGoodsList();
  let params = route.query;
  for (const key in params) {
    formState[key] = params[key];
  }
  formState.cover = "https://dental.cdwuhu.com/" + params.image;
  formState.imageUrl = "https://dental.cdwuhu.com/" + params.long_image;
  console.log(formState);
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">首页banner配置</p>
        <p>最多可以配置6个banner，每个banner可以配一张长图或者一个链接。</p>
      </div>
    </div>
    <div class="page-body">
      <div class="page-main">
        <p class="title">NO.1 （必填部分）</p>
        <div class="page-form">
          <a-form :model="formState" v-bind="layout">
            <a-row :gutter="180">
              <a-col :span="8">
                <a-form-item label="备注（选填）">
                  <a-input v-model:value="formState.remark" />
                </a-form-item>
                <a-form-item label="主页banner图（必填）">
                  <a-upload
                    name="file"
                    v-model:file-list="coverUploadList"
                    :before-upload="coverBeforeUpload"
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
                <a-form-item label="跳转商品（选填）">
                  <a-select ref="select" v-model:value="formState.goods_id">
                    <a-select-option
                      v-for="(item, index) in goodLists"
                      :key="index"
                      :value="item.id"
                      >{{ item.title }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
                <a-form-item label="长图（选填）">
                  <a-upload
                    name="file"
                    :file-list="imagersUploadList"
                    :disabled="formState.url != ''"
                    :before-upload="imageBeforeUpload"
                    @remove="handleRemoveImages"
                    :maxCount="1"
                  >
                    <a-button type="primary" :disabled="formState.url != ''">
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
                    1.主页banner图（必填）<br />
                    2.banner图上传要求：360PX *180PX 。格式JPG/PNG。小于2M。<br />
                    3.长图与链接只能二选一<br />
                    4.长图的上传要求：宽度750PX。长度低于2000PX。格式JPG/PNG。小于5M。
                  </p>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <a-divider orientation="left">实例</a-divider>
        <div class="banners" style="padding: 20px">
          <a-row :gutter="25">
            <a-col :span="8">
              <div class="item">
                <div class="cover">
                  <img v-show="formState.cover != ''" :src="formState.cover" />
                </div>
              </div>
            </a-col>
            <a-col :span="16">
              <img class="imageUrl" :src="formState.imageUrl" alt="" />
            </a-col>
          </a-row>
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
