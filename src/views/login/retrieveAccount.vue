<template>
  <div class="retrieve-box">
      <div class="retrieve-body">
          <div v-if="!account" class="retrieve-form">
            <van-radio-group
                v-model="param.userType"
                direction="horizontal"
                >
                <van-radio name="1" class="user-type" :class="{active: (param.userType == '1')}">
                    学生
                    <template #icon>
                        <img class="icon-user" src="@/assets/images/icon-student.png" />
                    </template>
                </van-radio>
                <van-radio name="2" class="user-type" :class="{active: (param.userType == '2')}">
                    老师
                    <template #icon>
                        <img class="icon-user" src="@/assets/images/icon-teacher.png" />
                    </template>
                </van-radio>
            </van-radio-group>
            <van-form ref="retrieve" @submit="onSubmit" @failed="onFailed">
                <van-field
                    name="F_StudentCode"
                    class="retrieve-input"
                    left-icon="user-circle-o"
                    :border="false"
                    :error="false"
                    v-model="param.F_StudentCode"
                    maxlength="60"
                    placeholder="请输入学籍号"
                    :rules="[{ validator: validEmpty, message: '请输入学籍号' }]"
                     />
                <van-field
                    name="F_RealName"
                    class="retrieve-input"
                    v-model="param.F_RealName"
                    left-icon="phone-circle-o"
                    :border="false"
                    :error="false"
                    maxlength="20"
                    placeholder="请输入姓名"
                    :rules="[{ validator: validEmpty, message: '请输入姓名' }]"
                    />
                
                <van-button class="btn-retrieve" native-type="submit">确定</van-button>
            </van-form>
          </div>
          <div v-else>
              <!-- 找回账号成功的展示 -->
              <div class="account-info">您的账号是：{{account}}</div>
              <van-button
                class="btn-retrieve"
                v-clipboard:copy="account"
                v-clipboard:success="onCopy" 
                v-clipboard:error="onErrCopy">复制去登录</van-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'RetrieveAccount',
    components: {
    },
    data(){
        return {
            account: '', // 找回的账号信息
            param:{
                userType: 1, // 用户类型
                archiveNo: '', // 学籍号
                F_RealName: '', // 姓名
                inviteCode: '', // 邀请码
                F_OrganizeId: '', // 学校id
                gradeId: '', //年级id
                classId: '', // 班级id
                password: '' // 密码
            }
        }
    },
    computed:{
        openid(){
           return this.$store.getters.openid;
        }
    },
    mounted(){

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
        // 提交数据
        onSubmit(values){
            console.log(this.param)
            this.$store.dispatch('login/doRetrieveAccount', this.param).then(ret => {
                this.$toast("找回账号成功！")
                this.account = this.param.F_StudentCode
                // 缓存账号信息，进入到登录页直接反填
                this.$store.commit('login/SET_ACCOUNT', this.param.F_StudentCode)
            }).catch(err => {
                console.log(err);
                this.$toast("找回账号失败！")
            });
        },
        // 提交数据前的校验，校验失败执行
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        },
        // 拷贝成功
        onCopy(){
            this.$toast("复制成功，1秒后回到登录页！")
            this.toLogin()
        },
        // 拷贝失败
        onErrCopy(){
            console.log("*****onErrCopy********")
            this.toLogin()
        },
        // 去登录
        toLogin(){
            // 进入登录页
            this.$router.replace({ path: '/login' });
        }
    }
}
</script>

<style scoped lang="scss">
.retrieve-box{
    height: calc(100vh);
    overflow: hidden;
    .retrieve-body{
        height: calc(100vh - 110px);
        background: #fff;
        border-radius: 30px 30px 0 0;
        padding: 38px;
        .retrieve-form{
           .user-type{
                width: 110px;
                height: 50px;
                
                border-radius: 50px;
                justify-content: center;
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: bold;
                background: #EEEEEE;
                color: #999999;
                &.active{
                    background: #FFABC4;
                    color: #fff;
                    /deep/.van-radio__label{
                        color: #fff;
                    }
                }
               .icon-user{
                   margin-top: 10px;
                   height: 45px;
                   vertical-align: middle;
               }
               /deep/.van-radio__icon{
                   height: auto;
               }
               /deep/.van-radio__label{
                   color: #999999;
               }
           }
           .retrieve-input{
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
        }
        .btn-box{
            position: relative;
            padding-left: 5px;
            &::before{
                position: absolute;
                content: '';
                left: 0;
                top: 3px;
                width: 1px;
                height: 20px;
                background: #CCCCCC;
            }
            .btn-sms{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #61B3FE;
                &:active{
                    opacity: 0.6;
                }
            }
            .count-down{
                width: 60px;
                text-align: center;
            }
        }
    }
    .account-info{
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
    }
    .btn-retrieve{
        margin-top: 30px;
        width: 100%;
        background: #61B3FE;
        box-shadow: 0px 12px 30px 0px rgba(97, 179, 254, 0.25);
        border-radius: 25px;
        color: #fff;
        font-size: 16px;
    }
}
</style>