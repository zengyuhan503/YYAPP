# hjy-image-cropper
# 属性
|名称			|功能			|默认值	|可选值			|
|:-:			|:-:			|:-:	|:-:			|
|crop-width		|裁剪框宽度		|200	|0 ~ max		|
|crop-height	|裁剪框度度		|200	|0 ~ max		|
|src			|待裁剪图片地址	|无		|本地文件路径	|
|crop-fixed		|是否固定裁剪框	|false	|true / false	|
|show-reset-btn	|显示重置按钮	|true	|true / false	|
|show-rotate-btn|显示旋转按钮	|true	|true / false	|
# 事件
|名称	|功能						|返回值												|
|:-:	|:-:						|:-:												|
|confirm|截图后点击确定的回调事件	|detail.tempFilePath获取裁剪后的图片地址（base64）	|
|cancel	|点击取消的回调事件			|无													|