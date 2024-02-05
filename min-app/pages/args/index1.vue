<template>
    <view class="args"> <rich-text :nodes="argHtmls"></rich-text></view>
</template>

<script setup>
import { ref, onMounted } from "vue";
let argHtmls = ref(`
<p><br></p><h3 style="text-align: center;"><strong>天津预颜口腔小程序隐私保护指引</strong></h3><p><span style="font-family: Arial;"></span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">本指引是天津预颜口腔小程序开发者 "天津预颜口腔门诊有限责任公司"（以下简称“开发者”）为处理你的个人信息而制定。</span></p><h4><strong>开发者处理的信息</strong></h4><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">根据法律规定，开发者仅处理实现小程序功能所必要的信息。</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">为了更快速的注册使用小程序，开发者将在获取你的明示同意后，收集你的手机号。</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">为了注册账号支持的基本信息，开发者将在获取你的明示同意后，收集你的微信昵称、头像。</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">开发者 收集你选中的照片或视频信息，用于修改头像。</span></p><h4><strong>你的权益</strong></h4><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">若你在小程序中注册了账号，你可以通过以下方式与开发者联系，申请注销你在小程序中使用的账号。在受理你的申请后，开发者承诺在十五个工作日内完成核查和处理，并按照法律法规要求处理你的相关信息。</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">电话:13821590830</span></p><h4><strong>开发者对信息的存储</strong></h4><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);"> 开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。</span></p><h4><strong>信息的使用规则</strong></h4><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">开发者将会在本指引所明示的用途内使用收集的信息</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以短信或者电话方式告知并征得你的明示同意。</span></p><h4><strong>信息对外提供</strong></h4><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。</span></p><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。</span></p><h4><strong>你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。</strong></h4><p><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">电话 : 13821590830</span></p><p style="text-align: right;"><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">更新日期：2024-02-04</span></p><p style="text-align: right;"><span style="color: rgb(53, 53, 53); background-color: rgb(255, 255, 255);">生效日期：2024-02-04</span></p><p><span style="font-family: Arial;"></span></p><p> </p>
`);
</script>
<style>
.args{
    padding: 20px;
}
</style>
