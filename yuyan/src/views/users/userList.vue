<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter, useLink } from "vue-router";
import { userList, changeUserStatus } from "@/utils/request/index";
import { Modal, message } from "ant-design-vue";
let router = useRouter();
let searchStatus = ref(false);
let searchVal = ref("");
const columns = [
  {
    title: "用户昵称",
    dataIndex: "nickname",
    align: "center",
    key: "nickname",
  },
  {
    title: "用户头像",
    dataIndex: "avatar",
    align: "center",
    key: "avatar",
  },
  {
    title: "用户ID",
    dataIndex: "id",
    align: "center",
    key: "id",
  },
  {
    title: "用户电话号码",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "备注（用户不可见）",
    key: "remark",
    align: "center",
    dataIndex: "remark",
  },
  {
    title: "操作",
    align: "center",
    key: "action",
  },
];

const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 6,
  hideOnSinglePage: true,
});
const dataSource = ref([]);

const onSearch = () => {
  pagination.current = 1;
  getList();
};
const getList = () => {
  let params = {
    page: pagination.current,
    page_size: pagination.pageSize,
    keywords: searchVal.value,
  };
  userList(params)
    .then((result) => {
      let data = result.data;
      pagination.total = data.total;
      pagination.current = data.current_page;
      dataSource.value = data.data;
    })
    .catch((err) => {});
};
const handlePageChange = (page) => {
  pagination.current = page.current;
  getList();
};
const handleEdit = (record) => {
  router.push({
    path: "/user/info",
    query: { ...record },
  });
};
onMounted(() => {
  getList();
});
let activeUser = "";
const handleDisabledUser = (record) => {
  activeUser = record.id;
  Modal.confirm({
    title: "确认停用该用户吗",
    content: "停用该用户后，该用户将无法使用预颜小程序上的相关功能，请谨慎操作。",
    onOk() {
      changeUserStatus({
        user_id: activeUser,
        status: "2",
      }).then((res) => {
        message.success("操作成功");
        record.status = 2;
        console.log(res);
      });
    },
  });
};
const handleEnableUser = (record) => {
  activeUser = record.id;
  Modal.confirm({
    title: "确认启用该用户吗",
    content: "启用该用户后，该用户将可以使用预颜小程序上的相关功能，请谨慎操作 ",
    onOk() {
      changeUserStatus({
        user_id: activeUser,
        status: "1",
      }).then((res) => {
        message.success("操作成功");
        record.status = 1;
        console.log(res);
      });
    },
  });
};
const handlechangeUserStatus = (status: string) => {
  console.log(activeUser);
};
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">注册用户管理</p>
        <p>在小程序中注册后的用户都会在以下列表中显</p>
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
    <div class="page-body">
      <div class="page-table">
        <p class="title">用户管理</p>
        <div class="tables">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            @change="handlePageChange"
            :pagination="pagination"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'nickname'">
                {{ record.nickname }}
              </template>
              <template v-if="column.key === 'avatar'">
                <a>
                  <a-avatar :src="'https://yuyandental.com//' + record.avatar" />
                </a>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button
                  danger
                  type="link"
                  v-if="record.status == 2"
                  @click="handleEnableUser(record)"
                  >启用</a-button
                >
                <a-button
                  danger
                  type="link"
                  v-if="record.status == 1"
                  @click="handleDisabledUser(record)"
                  >停用</a-button
                >
              </template>
            </template>
          </a-table>
        </div>
      </div>
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
.ant-pagination-options .ant-select-selector {
  height: 32px !important;
}
</style>
