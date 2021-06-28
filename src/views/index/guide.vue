<!--
 * @message: 引导页
 * @Params: {*}
 * @Author: wangxin
 * @since: 2020-02-28 15:28:32
 * @LastAuthor: your name
 * @lastTime: 2020-03-05 20:24:09
 -->
<template>
  <div class="guide-container">
      <div class="guide-title">请<span class="f-c">先关注“南昌教育云平台”</span>公众号（二维码 在底部）。关注公众号后，点击“监测平台”按钮创建身份：</div>
      <div class="guide-img"><img src="@/assets/images/guide.jpg" ></div>
      <div class="line"></div>
      <div class="wxqrcode"><img src="@/assets/images/wxcode.jpg" ></div>
      <div class="wxname">扫一扫，关注“南昌教育云平台”</div>
  </div>
  
</template>

<script>

export default {
  name: 'Index',
  components: { },
  data() {
    return {
    }
  },
  computed: {
    tocken() {
        return this.$store.state.app.token;
    }
  },
  mounted() {

  },
  activated(){

  },
  methods: {
     // 校验函数返回 Promise 来实现异步校验港 澳台通行证（数字加字母<13位）、外专证（数字加字母18位）
    codeValidator(val) {
      return /^[a-zA-Z0-9]{2,32}$/.test(val);
    },
    // 角色选择
    // type 1: 老师 2：家长
    selectRole(type) {
       if(type === 1){
         // 家长

       }else if(type ===2){
         // 老师
         
       }
    }
  }
}
</script>

<style lang="scss" scoped>
  .guide-container{
    background: #fff;
    .guide-title{
      text-align: left;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      padding: 20px;
    }
    .guide-img{
      text-align: center;
      img{
        width: 80%;
      }
    }
    .line{
      width: 100%;
      height:2px;
      margin-top: 20px;
      margin-bottom: 20px;
      background:rgba(221,221,221,1);
    }
    .wxqrcode{
      text-align: center;
      img{
        height: 190px;
        width: 190px;
      }
    }
    .wxname{
      text-align: center;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,1);
      padding: 10px 20px 30px 20px;
    }
    .f-c{
      color: #FF4F01;
    }
  
    .p-t-80{
      padding-top: 80px;
    }
    .m-t-10{
      margin-top: 10px;
    }
    .m-t-30{
      margin-top: 30px;
    }
    .text-center{
      text-align: center;
    }
    .f-s-16{
      font-size: 16px;
    }
    .f-w{
      font-weight: bold;
    }
    .p-10{
      padding: 5px 15px;
    }
    .p-20{
      padding:20px;
    }
  }

</style>
