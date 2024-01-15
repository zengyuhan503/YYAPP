<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { message, Upload } from "ant-design-vue";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { imageUpLoad, goodsCategorys, createGoods } from "@/utils/request/index";
let router = useRouter();
const layout = reactive({
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
});
let formState = reactive({
  title: null,
  cover: null,
  imageUrl: null,
  desc: null,
  price: null,
  discount: 100,
  category_id: [],
});
let disPrice=computed(()=>{
    let val=formState.price*(formState.discount/100);
    return val
})
const head_image = ref([]);
const deputy_image = ref([]);
const detail_image = ref([]);
const coverBeforeUpload = (file) => {
  const isLt = file.size / 1024 / 1024 < 10;
  if (!isLt) {
    message.error(`图片不能超过1MB`);
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
        // 这里this.width和this.height是图片的宽高px
        if (image.width < 800) {
          message.error("请上传最小800*800px的正方形图片");
          return false;
        }
        if (image.width - image.height > 2) {
          message.error("请上传最小800*800px的正方形图片");
          return false;
        }
        formState.cover = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};

const coverBeforeUpload2 = (file) => {
  const isLt = file.size / 1024 / 1024 < 10;
  if (!isLt) {
    message.error(`图片不能超过1MB`);
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
        // 这里this.width和this.height是图片的宽高px
        if (image.width < 800) {
          message.error("请上传最小800*800px的正方形图片");
          return false;
        }
        if (image.width - image.height > 2) {
          message.error("请上传最小800*800px的正方形图片");
          return false;
        }
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
        formState.imageUrl = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};
let submitLoading = ref(false);
const handleSubmit = () => {
  if (Object.values(formState).includes(null) || Object.values(formState).includes("")) {
    message.error("请全部填写后再确定");
    return false;
  }
  uploadImages().then((res) => {
    let head_image = res[0];
    let deputy_image = res[1];
    let detail_image = res[2];
    let params = {
      head_image: head_image.data,
      deputy_image: deputy_image.data,
      detail_image: detail_image.data,
      price: formState.price,
      category_id: formState.category_id.join(","),
      title: formState.title,
      desc: formState.desc,
      discount: formState.discount + "",
    };
    createGoods(params).then((res) => {
      console.log(res);
      if (res.code == 200) {
        message.success("操作成功");
        router.push({
          path: "/commodity/list",
          query: { active: 2 },
        });
      }
    });
  });
};
const uploadImages = () => {
  return new Promise((resolve, reject) => {
    if (
      head_image.value.length == 0 ||
      deputy_image.value.length == 0 ||
      detail_image.value.length == 0
    ) {
      message.error("请上传完整的信息，包括图片");
      reject("请上传完整的信息，包括图片");
    }
    let uploads = [];
    let uploadParams = new FormData();
    let uploadParams1 = new FormData();
    let uploadParams2 = new FormData();
    uploadParams.append("limit_image", head_image.value[0].originFileObj);
    uploads.push(imageUpLoad(uploadParams));
    uploadParams1.append("limit_image", deputy_image.value[0].originFileObj);
    uploads.push(imageUpLoad(uploadParams1));
    uploadParams2.append("limit_image", detail_image.value[0].originFileObj);
    uploads.push(imageUpLoad(uploadParams2));
    Promise.all(uploads)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
let goodsCategoryList = ref([]);
const handleGetGoodsCategorys = () => {
  let params = {
    page: 1,
    page_size: 10000,
  };
  goodsCategorys(params).then((res) => {
    goodsCategoryList.value = res.data.data;
  });
};
onMounted(() => {
  handleGetGoodsCategorys();
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">添加商品</p>
        <p>每个商品必须上传一张主图，最多上传5张。</p>
      </div>
      <div class="page-text">
        <div style="color: #000000">说明：</div>
        <div>
          1.商品头图上传要求：最小800px*800px的正方形,单张大小不超过1M。格式JPG/PNG。
          <br />
          2.长图的上传要求：宽度750PX。长度低于2000PX。格式JPG/PNG。小于5M。<br />
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="page-main">
        <p class="title">
          信息填写
          <a-button>清空</a-button>
        </p>
        <div class="page-form" style="width: 100%">
          <a-form :model="formState" v-bind="layout">
            <a-row :gutter="180">
              <a-col :span="8">
                <a-form-item label="商品名称">
                  <a-input v-model:value="formState.title" />
                </a-form-item>
                <div class="form-upload">
                  <a-form-item label="商品主头图（必填）">
                    <a-upload
                      name="file"
                      v-model:file-list="head_image"
                      :before-upload="coverBeforeUpload"
                      :maxCount="1"
                    >
                      <a-button type="primary">
                        <PlusOutlined />
                        上传
                      </a-button>
                    </a-upload>
                  </a-form-item>
                  <a-form-item label="商品次头图（选填）">
                    <a-upload
                      name="file"
                      v-model:file-list="deputy_image"
                      :before-upload="coverBeforeUpload2"
                      :maxCount="1"
                    >
                      <a-button type="primary">
                        <PlusOutlined />
                        上传
                      </a-button>
                    </a-upload>
                  </a-form-item>
                </div>
                <p style="text-align: right; color: rgba(111, 111, 111, 0.4)">
                  如需精准排序请在下方上传
                </p>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商品类别（选填）">
                  <a-select
                    ref="select"
                    v-model:value="formState.category_id"
                    mode="multiple"
                  >
                    <a-select-option
                      :value="item.id"
                      v-for="(item, index) in goodsCategoryList"
                      :key="index"
                    >
                      {{ item.title }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="长图（必填）">
                  <a-upload
                    name="file"
                    v-model:file-list="detail_image"
                    :before-upload="imageBeforeUpload"
                    :maxCount="1"
                  >
                    <a-button type="primary">
                      <PlusOutlined />
                      上传
                    </a-button>
                  </a-upload>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商品描述（必填）">
                  <a-textarea
                    v-model:value="formState.desc"
                    placeholder="Basic usage"
                    :rows="80"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <div class="page-main" style="margin-top: 20px">
        <p class="title">价格填写</p>
        <div class="page-form" style="width: 100%">
          <a-form :model="formState" v-bind="layout">
            <a-row :gutter="180">
              <a-col :span="8">
                <a-form-item label="商品原价（必填）">
                  <a-input v-model:value="formState.price" />
                </a-form-item>
                <div class="form-upload form-price">
                  <p>
                    <span class="label">折后价格：</span><span class="price">{{ disPrice }} ¥</span>
                  </p>
                  <p><span class="label">价格差：</span><span class="price">{{ formState.price - disPrice }} ¥</span></p>
                </div>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商品折扣（选填）">
                  <a-input-number
                    id="inputNumber"
                    v-model:value="formState.discount"
                    :min="1"
                    :max="100"
                    :formatter="(value) => `${value}%`"
                    :parser="(value) => value.replace('%', '')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <div class="explain">
                  <p style="color: rgba(0, 0, 0, 0.85)">说明</p>
                  <p>
                    1.默认是100%无折扣。<br />
                    2.小程序上会展示折扣，以及价差。
                  </p>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <div class="goods-show">
        <div class="cover-show">
          <p>商品主图（缩略预览）</p>
          <div>
            <img :src="formState.cover" mode="" />
          </div>
        </div>
        <div class="long-show">
          <p>长图展示</p>
          <div>
            <img :src="formState.imageUrl" mode="" />
          </div>
        </div>
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
</template>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style>
.login-form .ant-message {
  position: absolute;
}
</style>
