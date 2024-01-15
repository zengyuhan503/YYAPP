<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
   
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
page {
  height: 100%;
  width: 100%;
  background: rgba(249, 249, 249, 0.94);
  box-sizing: border-box;
}

view {
  box-sizing: border-box;
}

.uni-nav-bar-text {
  font-size: 17px !important;
  font-weight: 500;
  color: #ffffff;
}
</style>
