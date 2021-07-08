<template>
  <div class="login-box">
      <div class="flex-box">
          <img class="login-logo" src="@/assets/images/icon-logo.png" >
          <div class="register">注册账号</div>
      </div>
      <div class="login-body">
          <div class="login-form">
            <van-form @submit="onSubmit" @failed="onFailed">
                <van-field
                    name="accout"
                    class="login-input"
                    left-icon="user-circle-o"
                    :border="false"
                    v-model="param.account"
                    maxlength="60"
                    placeholder="请输入账号"
                    :rules="[{ validator: validEmpty, message: '请输入账号' }]"
                     />
                <van-field
                    name="password"
                    class="login-input"
                    left-icon="goods-collect-o"
                    :border="false"
                    v-model="param.password"
                    type="password"
                    maxlength="60"
                    :rules="[{ validator: validEmpty, message: '请输入密码' }]"
                    placeholder="请输入密码" />
                <van-button class="btn-login" native-type="submit">登录</van-button>
                <div class="login-other">
                    <a class="find-account" @click="gotoPage('retrieve')">找回账号</a>|<a class="reset-password" @click="gotoPage('resetpwd')">重置密码</a>
                </div>
            </van-form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Login',
    components: {
     },
    data(){
        return {
            param:{
                account: '', // 账号
                password: '', // 密码
                openid: '' // openid
            }
        }
    },
    computed:{
        openid(){
           return this.$store.getters.openid;
        },
        account(){
            return this.$store.getters.account || ''
        }
    },
    mounted(){
        this.param.account = this.account
    },
    methods:{
        // 校验是否为空的规则
        validEmpty(val) {
            if(!val){
                return false;
            }else if(!val.replace(/\s+/g,"")){//空字符串校验
                return false;
            }
            return true;
        },
        // 页面跳转
        gotoPage(path){
            if(path){
                this.$router.push({path: path});
            }
        },
        // 提交数据
        onSubmit(values){
            console.log(values)
            this.param.openid = this.openid;
            this.$store.dispatch('login/doLogin', this.param).then(ret => {
                this.$toast("绑定成功！")
                setTimeout(() => {
                    // 1秒后进入主页
                    this.$router.replace({ path: '/index' });
                }, 1000);
                
            }).catch(err => {
                console.log(err);
                this.$toast("绑定异常！")
            });
        },
        // 提交数据前的校验，校验失败执行
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        },
    }
}
</script>

<style lang="scss">
.login-box{
    height: calc(100vh);
    background: #61B3FE;
    overflow: hidden;
    .flex-box{
        position: relative;
        padding: 30px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-logo{
            height: 50px;
        }
        .register{
            position: absolute;
            top: 12px;
            right: 15px;
            padding: 5px 10px;
            background: #FFFFFF;
            border-radius: 24px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #61B3FE;
        }
    }
    .login-body{
        height: calc(100vh - 110px);
        background: #fff;
        border-radius: 30px 30px 0 0;
        padding: 38px;
        .login-form{
           .login-input{
               border-radius: 25px;
               background: #F6F6F6;
               margin-top: 20px;
                /deep/.van-field__value {
                   .van-field__error-message{
                        position: fixed;
                        margin-top: 8px;
                   }
                }
           }
           .btn-login{
                margin-top: 30px;
                width: 100%;
                background: #61B3FE;
                box-shadow: 0px 12px 30px 0px rgba(97, 179, 254, 0.25);
                border-radius: 25px;
                color: #fff;
                font-size: 16px;
           }
           .login-other{
               margin-top: 30px;
               padding: 10px;
               text-align: center;
               .find-account{
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #666666;
                    padding-left: 10px;
                    padding-right: 10px;
               }
               .reset-password{
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #666666;
                    padding-left: 10px;
                    padding-right: 10px;
               }
           }
        }
    }
}
</style>