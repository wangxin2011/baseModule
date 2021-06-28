<!--
 * @message: 支付宝的角色选择入口
 * @Params: {*}
 * @Author: wangxin
 * @since: 2020-02-28 15:28:32
 * @LastAuthor: your name
 * @lastTime: 2020-03-05 22:37:20
 -->
<template>
  <div class="role-container">
      <div class="role-title">请选择身份</div>
      <div class="btn-v" @click="selectRole(2)">
        <div class="btn-d b-b">我是家长</div>
      </div>
      <div class="btn-v m-t-30" @click="selectRole(1)">
        <div class="btn-d g-g">我是教职工或管理员</div>
      </div>
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
       if(type === 2){
         // 家长
         this.$router.push({path: '/parent'});
       }else if(type ===1){
         // 老师
        //  this.$router.push({path: '/guide'});
         this.$toast('如果您是老师无法进入应用，请联系客服！');
       }
    }
  }
}
</script>

<style lang="scss" scoped>
  .role-container{
    .role-title{
      text-align: center;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:600;
      color:rgba(51,51,51,1);
      padding-top: 100px;
      padding-bottom: 50px;
    }
    .parent-title{
      text-align: center;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      padding-top: 50px;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 15px;
    }
    .role-tip{
      text-align: center;
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
    .btn-v{
      .btn-d{
        width:90%;
        height:100px;
        line-height: 100px;
        border-radius:20px;
        color: #fff;
        margin-right: auto;
        margin-left: auto;
        text-align: center;
        &:active{
          opacity: 0.6;
        }
      }
      .b-b{
        background:linear-gradient(90deg,rgba(8,134,247,1),rgba(71,197,255,1));
      }
      .g-g{
        background:linear-gradient(90deg,#379409,#7CE548);
      }
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
