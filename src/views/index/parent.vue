<!--
 * @message: 家长登记页
 * @Params: {*}
 * @Author: wangxin
 * @since: 2020-02-28 15:28:32
 * @LastAuthor: your name
 * @lastTime: 2020-03-05 23:32:24
 -->
<template>
  <div class="role-container">
      <div class="parent-title">如果您已在注册南昌市监测平台请绑定学生信息</div>
      <div class="role-tip">若多个孩子，请绑定期中一个即可。</div>
      <van-form ref="van-form" @submit="onSubmit">
        <div class="reg-main m-t-10">
            <div class="label-title">学生姓名：</div>
            <van-field
              class="input-box"
              name="StudentName"
              v-model="params.StudentName"
              input-align="left"
              placeholder="请输入学生姓名"
              maxlength="15"
              error-message-align="center"
              :rules="[{ required: true, message: '请输入学生姓名' }]"
            />
            <div class="label-title">证件号码：</div>
            <van-field
              class="input-box"
              name="StudentIdNo"
              v-model="params.StudentIdNo"
              input-align="left"
              placeholder="请输证件号码"
              maxlength="32"
              error-message-align="center"
              :rules="codeRules"
            />
        </div>
        <div class="footer">
          <van-button :disabled="isClick" type="primary" size="large" class="btn-submit">确定</van-button>
          <!-- <div class="tip-desc" @click="toGuide">没注册过点击这里</div> -->
        </div>
    </van-form>
    

  </div>
  
</template>

<script>
import { bindGanFuTongParent } from '@/api/register.js'
import { Encrypt } from '@/utils/validate.js';
export default {
  name: 'Index',
  components: { },
  data() {
    this.codeRules = [
      { required: true, message: "请输入证件号" },
      { validator: this.codeValidator, message: "证件号格式错误" }
    ];
    return {
      isClick: false,
      params:{
        "StudentName": "",
        "StudentIdNo": "",
        "ParentIdNo": ""
      }
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
    // 提交数据
    submit() {
       this.$refs["van-form"].submit();
    },
    // 提交数据
    onSubmit(values) {
       values.StudentIdNo= Encrypt(values.StudentIdNo, true).toString()
       values.ParentIdNo= (this.tocken.openid).replace("2_","");
       bindGanFuTongParent(values).then((resp)=>{
         if(resp.Code == 1){
           // 注册成功,获取用户信息
           this.$store.dispatch("app/getUserInfoByZFB").then((res) => {
                if(res){
                    // 进入页面
                    this.$router.push({
                        path: '/entrance'
                    });
                }else{
                    this.$notify({
                            duration: 3000,
                            message: res.Message || '用户信息获取失败，请联系管理员！',
                            type: 'danger'
                        });
                }
            });
         }else {
            this.$notify({
                            duration: 3000,
                            message: resp.Message || '绑定失败！',
                            type: 'danger'
                        });
         }
       }).catch((err)=>{

       });
    },
    toGuide() {
      this.$router.push({path: '/guide'});
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .van-field--error .van-field__control, 
  /deep/ .van-field--error .van-field__control::placeholder {
      color: #dddddd !important;
      -webkit-text-fill-color: currentColor;
  }
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
    .van-form{
      padding: 10px 20px;
      .label-title{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        padding-bottom: 8px;
      }
      .input-box{
        border: 1px solid #333;
        width: 100%;
        height:50px;
        line-height: 30px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(221, 221, 221, 1);
        border-radius:5px 5px 5px 5px;
        margin-bottom: 25px;
        overflow: inherit;
      }
      /deep/ .van-field__error-message{
        margin-top: 10px;
      }
      .footer{
        margin-top: 50px;
        .btn-submit{
          background: #4ECE3D;
          height: 60px;
          font-size:18px;
          font-family:Microsoft YaHei;
          font-weight:400;
        }
        .tip-desc{
          margin-top: 20px;
          text-align: center;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          text-decoration:underline;
          color:rgba(24,133,255,1);
        }
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
