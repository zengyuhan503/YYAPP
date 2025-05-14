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
interface resType {
  code: number,
  data: any,
  msg: string
}
const head_image = ref([]);
const deputy_image = ref([]);
const deputy_image_show = ref(["", "", "", ""]);
const detail_image = ref([]);
let formState = reactive({
  title: null,
  cover: null,
  imageUrl: null,
  desc: null,
  price: 1,
  discount: 100,
  category_id: [13],
});

watch(
  () => formState.discount,
  (newVal) => {
    console.log(newVal);
    formState.discount = parseInt(newVal + "");
  }
);
const handleReset = () => {
  formState.title = null;
  formState.category_id = [13];
  formState.desc = null;
  formState.imageUrl = null;
  formState.cover = null;
  head_image.value = [];
  deputy_image.value = [];
  detail_image.value = [];
};
const handleReset2 = () => {
  formState.discount = 100;
  formState.price = 1;
};
let disPrice = computed(() => {
  let val = (formState.price * (formState.discount / 100)).toFixed(2);
  return val;
});
let diference = computed(() => {
  let val = (formState.price * (formState.discount / 100)).toFixed(2);
  return formState.price - parseFloat(val);
});
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
          head_image.value = [];
          return false;
        }
        if (image.width - image.height > 2) {
          message.error("请上传最小800*800px的正方形图片");
          head_image.value = [];
          return false;
        }
        head_image.value = [...(head_image.value || []), file];
        formState.cover = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};
let upindex = 0;
const coverBeforeChange = (e) => {
  upindex = e;
};
const coverBeforeUpload2 = (file) => {
  const isLt = file.size / 1024 / 1024 < 10;
  if (!isLt) {
    message.error(`图片不能超过1MB`);
    deputy_image.value = [];
    return false;
  }
  const isPNG = file.type === "image/png" || file.type === "image/jpeg";
  if (!isPNG) {
    message.error(`请上传 JPG/PNG 的图片`);
    deputy_image.value = [];
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
          deputy_image.value = [];
          return false;
        }
        if (image.width - image.height > 2) {
          message.error("请上传最小800*800px的正方形图片");
          deputy_image.value = [];
          return false;
        }
      };
      deputy_image.value = [...(deputy_image.value || []), file];
      if (upindex == 0) upindex = deputy_image.value.length;
      deputy_image_show.value[upindex - 1] = src as string;
      image.src = src as string;
      upindex = 0;
    };
  }
  return false;
};
const handleRm = (index) => {
  deputy_image.value.splice(index, 1);
  deputy_image_show.value[index] = "";
};
const handleRemoveimage = (res) => {
  let index = deputy_image.value.findIndex((item) => item.uid == res.uid);
  deputy_image.value.splice(index, 1);
  deputy_image_show.value.splice(index, 1);
};
const imageBeforeUpload = (file) => {
  const isLt = file.size / 1024 / 1024 < 50;
  if (!isLt) {
    message.error(`图片不能超过5MB`);
    detail_image.value = [];
    return false;
  }
  const isPNG = file.type === "image/png" || file.type === "image/jpeg";
  if (!isPNG) {
    message.error(`请上传 JPG/PNG 的图片`);
    detail_image.value = [];
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
          detail_image.value = [];
          return false;
        }
        // if ( img.height > 2000 ) {
        //   message.error(`请上传高度不能超过2000px的长图`);
        //   detail_image.value = [];
        //   return false;
        // }
        detail_image.value = [...(detail_image.value || []), file];
        formState.imageUrl = src as string;
      };
      image.src = src as string;
    };
  }
  return false;
};
let submitLoading = ref(false);
const handleSubmit = () => {
  let key = "imageUrl";
  let can = true;
  Object.keys(formState).forEach((prop) => {
    if (formState[prop] === null || formState[prop] === "") {
      console.log(prop);
      can = false;
    }
  });
  if (!can) {
    message.error("请全部填写后再确定");
    return false;
  }
  submitLoading.value = true;
  uploadImages()
    .then((res) => {
      let head_image = res[0];
      let detail_image = res[1];
      uploadImages2().then((ciimgs) => {
        let imgs = ciimgs ? ciimgs.map((item: { data: any; }) => item.data) : "";
        let cid = [...formState.category_id, "13"];
        cid = Array.from(new Set(cid));
        let params = {
          head_image: head_image.data,
          deputy_image: imgs ? imgs.join(",") : imgs,
          detail_image: detail_image.data,
          price: formState.price,
          category_id: cid.join(","),
          title: formState.title,
          desc: formState.desc,
          discount: formState.discount + "",
        };
        createGoods(params)
          .then((res) => {
            let data = res as unknown as resType;
            if (data.code == 200) {
              message.success("操作成功");
              router.push({
                path: "/commodity/list",
                query: { active: 2 },
              });
            }
          }).finally(() => {
            submitLoading.value = false;
          })
      });
    })
    .catch(() => {
      submitLoading.value = false;
    });
};
const uploadImages2 = () => {
  if (deputy_image.value.length == 0) {
    return Promise.resolve(null);
  }
  let arr = [];
  for (let i = 0; i < deputy_image.value.length; i++) {
    const item = deputy_image.value[i];
    let uploadParams = new FormData();
    uploadParams.append("limit_image", item);
    arr.push(imageUpLoad(uploadParams));
  }
  return Promise.all(arr);
};
const uploadImages = () => {
  return new Promise((resolve, reject) => {
    if (head_image.value.length == 0 || detail_image.value.length == 0) {
      message.error("请上传完整的信息，包括图片");
      reject("请上传完整的信息，包括图片");
      submitLoading.value = false;
    }
    let uploads = [];
    let uploadParams = new FormData();
    let uploadParams2 = new FormData();
    uploadParams.append("limit_image", head_image.value[0]);
    uploads.push(imageUpLoad(uploadParams));
    uploadParams2.append("limit_image", detail_image.value[0]);
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
        <div style="margin-bottom: 20px">
          <a-breadcrumb>
            <a-breadcrumb-item to="">
              <router-link to="/commodity/list">商品管理</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>添加商品</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
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
          <a-button @click="handleReset">清空</a-button>
        </p>
        <div class="page-form" style="width: 100%">
          <a-form :model="formState" v-bind="layout">
            <a-row :gutter="180">
              <a-col :span="8">
                <a-form-item label="商品名称（必填）">
                  <a-input v-model:value="formState.title" />
                </a-form-item>
                <div class="form-upload">
                  <a-form-item label="商品主头图（必填）">
                    <a-upload name="file" :file-list="head_image" :before-upload="coverBeforeUpload" :maxCount="1">
                      <a-button type="primary">
                        <PlusOutlined />
                        上传
                      </a-button>
                    </a-upload>
                  </a-form-item>
                  <a-form-item label="商品次头图（选填）">
                    <a-upload name="file" :file-list="deputy_image" :before-upload="coverBeforeUpload2" :maxCount="4"
                      @remove="handleRemoveimage">
                      <a-button type="primary">
                        <PlusOutlined />
                        上传
                      </a-button>
                    </a-upload>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商品类别（选填）">
                  <a-select ref="select" v-model:value="formState.category_id" mode="multiple">
                    <a-select-option :value="item.id" v-for="(item, index) in goodsCategoryList" :key="index">
                      {{ item.title }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="长图（必填）">
                  <a-upload name="file" :file-list="detail_image" :before-upload="imageBeforeUpload" :maxCount="1">
                    <a-button type="primary">
                      <PlusOutlined />
                      上传
                    </a-button>
                  </a-upload>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商品描述（必填）">
                  <a-textarea v-model:value="formState.desc" :showCount="true" :maxlength="200" :rows="80" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <div class="page-main" style="margin-top: 20px">
        <p class="title">
          价格填写
          <a-button @click="handleReset2">清空</a-button>
        </p>
        <div class="page-form" style="width: 100%">
          <a-form :model="formState" v-bind="layout">
            <a-row :gutter="180">
              <a-col :span="8">
                <a-form-item label="商品原价（必填）">
                  <a-input-number style="width: 100%" id="inputNumber" v-model:value="formState.price" :min="1"
                    :max="999.99" />
                </a-form-item>
                <div class="form-upload form-price">
                  <p>
                    <span class="label">折后价格：</span><span class="price">{{ disPrice }} ¥</span>
                  </p>
                  <p>
                    <span class="label">价格差：</span><span class="price">{{ diference }} ¥</span>
                  </p>
                </div>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商品折扣（选填）">
                  <a-input-number id="inputNumber" v-model:value="formState.discount" :min="1" :max="100" />
                  <span class="unit">%</span>
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
          <div class="covers">
            <img :src="formState.cover" mode="" />
          </div>
          <div class="ci-banners">
            <div class="item" @click="coverBeforeChange(1)">
              <img :src="deputy_image_show[0]" alt="" />
            </div>
            <div class="item" @click="coverBeforeChange(2)">
              <img :src="deputy_image_show[1]" alt="" />
            </div>
            <div class="item" @click="coverBeforeChange(3)">
              <img :src="deputy_image_show[2]" alt="" />
            </div>
            <div class="item" @click="coverBeforeChange(4)">
              <img :src="deputy_image_show[3]" alt="" />
            </div>
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
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit">提 交</a-button>
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

.ci-banners .ant-upload-list {
  display: none !important;
}
</style>
