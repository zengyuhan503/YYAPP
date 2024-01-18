<script setup lang="ts">
import { reactive, ref, watch, onMounted, createVNode } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Modal, message } from "ant-design-vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import {
  goodsCategorys,
  imageUpLoad,
  cateCategorys,
  editCategorys,
  rmCategorys,
  goodList,
  changeGoodsStatus,
} from "@/utils/request/index";
let router = useRouter();
let route = useRoute();
let searchStatus = ref(false);
let tabActive = ref(1);
let searchVal = ref("");
const onSearch = () => {};
let goodsCategoryList = ref([]);
const columns = [
  {
    title: "分类名称",
    dataIndex: "title",
    align: "center",
    key: "title",
  },
  {
    title: "分类icon",
    dataIndex: "icon",
    align: "center",
    key: "icon",
  },
  {
    title: "备注",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "操作",
    align: "center",
    key: "action",
  },
];
const columns2 = ref([
  {
    title: "商品ID",
    dataIndex: "id",
    align: "center",
    key: "id",
  },
  {
    title: "商品缩略图",
    dataIndex: "head_image",
    align: "center",
    key: "head_image",
  },
  {
    title: "商品名称",
    dataIndex: "title",
    align: "center",
    key: "title",
  },
  {
    title: "原价",
    dataIndex: "price",
    align: "center",
    key: "price",
  },
  {
    title: "折扣",
    dataIndex: "discount",
    align: "center",
    key: "discount",
    customRender: (record) => {
      let number = Number(record.text);
      let decimalPlaces = 2; // 可以根据需要更改小数点后的位数
      let percentage = number.toFixed(decimalPlaces) + "%";
      return percentage;
    },
  },
  {
    title: "折后价",
    dataIndex: "sale_price",
    align: "center",
    key: "sale_price",
  },
  {
    title: "添加时间",
    dataIndex: "create_time",
    align: "center",
    key: "create_time",
  },
  {
    title: "商品简介",
    dataIndex: "desc",
    align: "center",
    key: "desc",
  },
  {
    title: "操作",
    align: "center",
    key: "action",
  },
]);

const data = [{}];
const data2 = [{}];
const handleEdit = (record) => {
  router.push({
    path: "/commodity/detail",
    query: record,
  });
};
const handleDelete = (record) => {};
const changeTables = (status) => {
  tabActive.value = status;
  if (status == 2) {
    handleGetGoodsList();
  } else {
    handleGetGoodsCategorys();
  }
};

const addCateOpen = ref(false);
const EditCateOpen = ref(false);
let cateForm = reactive({
  title: "",
  iconFiles: [],
  icon: "",
  uploadLoading: false,
});
let editCateForm = ref({
  title: "",
  iconFiles: [],
  icon: "",
  uploadLoading: false,
  id: "",
});
const handleAddItem = () => {
  addCateOpen.value = true;
};
const handleOk = () => {
  if (cateForm.title == "" || cateForm.icon == "") {
    message.error("请全部填写后再确定");
    return false;
  }
  let params = new FormData();
  params.append("limit_image", cateForm.iconFiles[0].originFileObj);
  imageUpLoad(params).then((res) => {
    let params2 = {
      title: cateForm.title,
      icon: res.data,
    };
    cateCategorys(params2).then((res) => {
      message.success("操作成功");
      handleRest();
      addCateOpen.value = false;
      handleGetGoodsCategorys();
    });
  });
};
const handleEditOk = async () => {
  if (editCateForm.value.title == "" || editCateForm.value.icon == "") {
    message.error("请全部填写后再确定");
    return false;
  }

  if (EditCateOpen.value) {
    let icon = "";
    if (editCateForm.value.iconFiles.length != 0) {
      let params = new FormData();
      params.append("limit_image", editCateForm.value.iconFiles[0].originFileObj);
       icon=(await imageUpLoad(params)).data;
    }else{
      icon=editCateForm.value.icon.replace("https://dental.cdwuhu.com/", "");
    }
    let params2 = {
      title: editCateForm.value.title,
      icon: icon,
      category_id: editCateForm.value.id,
    };
    editCategorys(params2).then((res) => {
      message.success("操作成功");
      handleRest();
      EditCateOpen.value = false;
      handleGetGoodsCategorys();
    });
  } else {
    let params = new FormData();
    params.append("limit_image", cateForm.iconFiles[0].originFileObj);
    imageUpLoad(params).then((res) => {
      let params2 = {
        title: editCateForm.value.title,
        icon: res.data,
      };
      cateCategorys(params2).then((res) => {
        message.success("操作成功");
        handleRest();
        addCateOpen.value = false;
        handleGetGoodsCategorys();
      });
    });
  }
};
const handleEditCate = (record) => {
  let newRecord = JSON.parse(JSON.stringify(record));
  for (const key in newRecord) {
    editCateForm.value[key] = newRecord[key];
  }
  editCateForm.value.icon = "https://dental.cdwuhu.com/" + editCateForm.value.icon;
  EditCateOpen.value = true;
};
const handleRmCate = (record) => {
  let params = {
    category_id: record.id,
  };
  Modal.confirm({
    title: "你确定要删除当前分类吗",
    content: "已经存在商品的分类不能被删除，分类被删除后将无法恢复，请谨慎操作",
    onOk() {
      rmCategorys(params).then((res) => {
        if (res.code !== 200) return false;
        message.success("操作成功");
        handleGetGoodsCategorys();
      });
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};
const handleRest = () => {
  cateForm.title = "";
  cateForm.iconFiles = [];
  cateForm.icon = "";
  cateForm.icon = "";
  editCateForm.value.icon = "";
  editCateForm.value.iconFiles = [];
  editCateForm.value.title = "";
};
const handleGetGoodsCategorys = () => {
  let params = {
    page: 1,
    page_size: 10000,
    keywords: searchVal.value,
  };
  goodsCategorys(params).then((res) => {
    goodsCategoryList.value = res.data.data;
  });
};
let goodsList = ref([]);
const handleGetGoodsList = () => {
  let params = {
    page: 1,
    page_size: 10000,
    status: null,
    keywords: searchVal.value,
  };
  goodList(params).then((res) => {
    goodsList.value = res.data.data;
  });
};
const handleUploadIcon = (file) => {
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
        if (img.width !== 256 || img.height !== 256) {
          message.error("请上传255x255分辨率的图片");
          return false;
        }
        cateForm.icon = src as string;
        editCateForm.value.icon = src as string;
      };
      image.src = src as string;
    };
    return false;
  }
};
const handleUploadImage = () => {};
const toCreate = () => {
  router.push("/commodity/create");
};

const handleChangeStatus = (record) => {
  let status = JSON.parse(JSON.stringify(record)).status;
  let title = status ? "你确定要下架当前商品吗" : "你确定要上架当前商品吗";
  console.log(record);
  Modal.confirm({
    title: title,
    onOk() {
      let params = {
        status: status == 0 ? 1 : 0,
        goods_id: record.id,
      };
      changeGoodsStatus(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          message.success("操作成功");
          handleGetGoodsList();
        }
      });
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};
onMounted(() => {
  let queractive = route.query.active;
  queractive && (tabActive.value = queractive);
  handleGetGoodsCategorys();
  handleGetGoodsList();
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">商品管理</p>
      </div>
      <div class="page-form">
        <a-input-search
          v-model:value="searchVal"
          enter-button="搜 索"
          placeholder="请输入"
          @search="onSearch"
          :loading="searchStatus"
        />
      </div>
    </div>
    <div class="tabs">
      <span @click="changeTables(1)" :class="{ active: tabActive == 1 }">分类管理</span>
      <span @click="changeTables(2)" :class="{ active: tabActive == 2 }">商品管理</span>
    </div>
    <div class="page-body">
      <div class="page-table" v-if="tabActive == 1">
        <p class="title">分类列表</p>
        <div class="tables">
          <a-table
            :columns="columns"
            :data-source="goodsCategoryList"
            :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'icon'">
                <a-avatar :src="'https://dental.cdwuhu.com/' + record.icon" />
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" @click="handleEditCate(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button danger type="link" @click="handleRmCate(record)">删除</a-button>
              </template>
            </template>
          </a-table>
          <div class="addItem" @click="handleAddItem">
            <PlusOutlined />
            新增分类
          </div>
        </div>
      </div>
      <div class="page-table" v-else>
        <p class="title">
          商品列表
          <a-button type="primary" @click="toCreate"> <PlusOutlined />新增</a-button>
        </p>
        <div class="tables">
          <a-table :columns="columns2" :data-source="goodsList" :pagination="false">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'head_image'">
                <a>
                  <a-avatar :src="'https://dental.cdwuhu.com/' + record.head_image" />
                </a>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button
                  v-if="record.status == 1"
                  danger
                  type="link"
                  @click="handleChangeStatus(record)"
                  >下架</a-button
                >
                <a-button v-else type="link" @click="handleChangeStatus(record)"
                  >上架</a-button
                >
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <a-modal
      v-model:open="addCateOpen"
      :destroyOnClose="true"
      title="新建分类"
      @ok="handleOk"
    >
      <div class="modal-form">
        <div>
          <a-input v-model:value="cateForm.title" placeholder="请输入分类名称" />
          <p class="desc">
            1.分类名称4个中文字以内。<br />
            2.icon只支持PNG格式<br />
            3.icon尺寸256*256
          </p>
        </div>
        <div>
          <a-upload
            v-model:file-list="cateForm.iconFiles"
            name="avatar"
            :maxCount="1"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :beforeUpload="handleUploadIcon"
          >
            <img
              style="width: 100%"
              v-if="cateForm.icon"
              :src="cateForm.icon"
              alt="avatar"
            />
            <div v-else class="upload-icon">
              <loading-outlined v-if="cateForm.uploadLoading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">上传icon</div>
            </div>
          </a-upload>
          <p>只支持.png 格式</p>
        </div>
      </div>
    </a-modal>

    <a-modal
      v-model:open="EditCateOpen"
      :destroyOnClose="true"
      title="编辑分类"
      @ok="handleEditOk"
    >
      <div class="modal-form">
        <div>
          <a-input v-model:value="editCateForm.title" placeholder="请输入分类名称" />
          <p class="desc">
            1.分类名称4个中文字以内。<br />
            2.icon只支持PNG格式<br />
            3.icon尺寸256*256
          </p>
        </div>
        <div>
          <a-upload
            v-model:file-list="editCateForm.iconFiles"
            name="avatar"
            :maxCount="1"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :beforeUpload="handleUploadIcon"
          >
            <img
              style="width: 100%"
              v-if="editCateForm.icon"
              :src="editCateForm.icon"
              alt="avatar"
            />
            <div v-else class="upload-icon">
              <loading-outlined v-if="cateForm.uploadLoading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">上传icon</div>
            </div>
          </a-upload>
          <p>只支持.png 格式</p>
        </div>
      </div>
    </a-modal>
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
