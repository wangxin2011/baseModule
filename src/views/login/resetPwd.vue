<template>
  <div class="resetpwd-box">
      <div class="resetpwd-body">
          <div class="resetpwd-form">
            <van-form ref="resetPwd" @submit="onSubmit" @failed="onFailed">
                <van-field
                    name="accout"
                    class="resetpwd-input"
                    left-icon="user-circle-o"
                    :border="false"
                    :error="false"
                    v-model="param.account"
                    maxlength="60"
                    placeholder="请输入账号"
                    :rules="[{ validator: validEmpty, message: '请输入账号' }]"
                     />
                <!-- 输入手机号，调起手机号键盘 -->
                <van-field
                    class="resetpwd-input"
                    v-model="param.phone"
                    left-icon="phone-circle-o"
                    type="tel"
                    :border="false"
                    :error="false"
                    maxlength="11"
                    placeholder="请输入手机号"
                    :rules="[{ validator: validPhone, message: '请输入正确的手机号码' }]"
                    />
                <van-field
                    name="verifyCode"
                    class="resetpwd-input"
                    left-icon="info-o"
                    v-model="param.verifyCode"
                    :border="true"
                    :error="false"
                    maxlength="11"
                    center
                    clearable
                    placeholder="请输入短信验证码"
                    :rules="[{ validator: validEmpty, message: '请输入验证码' }]"
                    >
                    <template #button>
                        <div class="btn-box">
                            <div v-if="!isSendSms" class="btn-sms" @click="sendSms">发送验证码</div>
                            <van-count-down
                                v-else
                                ref="countDown"
                                class="count-down"
                                :auto-start="false"
                                :time="countDownTime"
                                @finish="countDownFinish"
                            >
                                <template #default="timeData">
                                    <span v-if="timeData.minutes" class="block">{{ timeData.minutes }}m</span>
                                    <span class="block">{{ timeData.seconds }}s</span>
                                </template>
                            </van-count-down>
                        </div>
                    </template>
                </van-field>
                <van-field
                    name="password"
                    class="resetpwd-input"
                    left-icon="goods-collect-o"
                    :border="false"
                    :error="false"
                    v-model="param.password"
                    type="password"
                    maxlength="60"
                    :rules="[{ validator: validNewPwd, message: '请输入密码' }]"
                    placeholder="请输入密码" />
                <van-field
                    name="aginPassword"
                    class="resetpwd-input"
                    left-icon="goods-collect-o"
                    :border="false"
                    :error="false"
                    v-model="param.aginPassword"
                    type="password"
                    maxlength="60"
                    :rules="[{ validator: validNewAginPwd, message: '请输入确认密码' }]"
                    placeholder="请输入确认密码" />
                <van-button class="btn-resetpwd" native-type="submit">确定</van-button>
            </van-form>
          </div>
      </div>
  </div>
</template>

<script>
import { CountDown } from 'vant';
import { validMobile, validPassword, Encrypt } from '@/utils/validate'
export default {
    name:'ResetPwd',
    components: {
        [CountDown.name]: CountDown
    },
    data(){
        return {
            countDownTime: 0, // 倒计时时间60秒
            sendCount: 1, // 发送验证码次数
            isSendSms: false, // 是否发送验证码，false未发送，true表示发送
            param:{
                account: '', // 账号
                phone: '', // 手机号
                password: '', // 密码
                aginPassword: '', // 确认密码
                verifyCode: '', // 验证码
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
        // 校验手机号
        validPhone(val){
            // 校验手机号时清除验证码模式
            this.$refs.resetPwd.resetValidation('verifyCode')
            // 重置验证码
            this.param.verifyCode = '';
            if(validMobile(val)){
                return true
            }else{
                return false
            }
           
        },
        // 校验新密码
        validNewPwd(val, rule){
            if(!val){
                rule.message = '请输入新密码';
                return false
            }
            if(validPassword(val)){
                // 满足规则，如果确认密码存在值需求进行校验
                if(this.param.aginPassword){
                    this.$refs.resetPwd.validate('aginPassword')
                }
                return true
            } else {
                // 不满足规则
                rule.message = '您的密码过于简单请重新输入，密码规则6位字母+数字组合';
                return false
            }
        },
         // 校验确认新密码
        validNewAginPwd(val, rule){
            console.log(rule)
             if(!val){
                rule.message = '请输入确认密码';
                return false
            }
            if(validPassword(val)){
                // 满足规则，如果确认密码存在值需求进行校验
                if(this.param.password == val){
                    // 密码一致
                    return true
                } else {
                    rule.message = '确认密码与新密码不一致！';
                    return false
                }
            } else {
                // 不满足规则
                rule.message = '您的密码过于简单请重新输入，密码规则6位字母+数字组合';
                return false
            }
        },
        // 发送验证码
        sendSms(){
            if(!validMobile(this.param.phone)){
                this.$toast('请输入正确的手机号码！')
                return;
            }
           
            // 计算发送时间，第一次60秒，第二次120秒，第三次 180秒，第4次及以后10分钟一次
            if(this.sendCount < 3){
                this.countDownTime = (60 * this.sendCount) * 1000;
            } else {
                this.countDownTime = 10 * 60 * 1000;
            }
            this.isSendSms = true;
            this.$nextTick(() => {
                // 开始计时
                this.$refs.countDown.reset();
                this.$refs.countDown.start();
            })
            console.log("正在发送验证码...")
             this.$store.dispatch('login/doSendSms', {phone: this.param.phone}).then(ret => {
                this.$toast("发送验证码成功！")
                // 发送成功,发送次数+1
                this.sendCount = this.sendCount + 1;
            }).catch(err => {
                console.log(err);
                this.$toast("发送验证码失败！")
                // 发送失败
                this.isSendSms = false
            });
        },
        // 倒计时结束
        countDownFinish() {
            this.$toast('倒计时结束');
            this.isSendSms = false
        },
        // 提交数据
        onSubmit(values){
            console.log(values)
            this.param.openid = this.openid;
            this.$store.dispatch('login/doResetPwd', this.param).then(ret => {
                this.$toast("密码重置成功！")
                setTimeout(() => {
                    // 1秒后进入登录页
                    this.$router.replace({ path: '/login' });
                }, 1000);
                
            }).catch(err => {
                console.log(err);
                this.$toast("密码重置失败！")
            });
        },
        // 提交数据前的校验，校验失败执行
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        },
    }
}
</script>

<style scoped lang="scss">
.resetpwd-box{
    height: calc(100vh);
    overflow: hidden;
    .flex-box{
        position: relative;
        padding: 30px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .resetpwd-logo{
            height: 50px;
        }
        .register{
            position: absolute;
            top: 12px;
            right: 15px;
            padding: 5px 10px;
            background: #FFFFFF;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #61B3FE;
        }
    }
    .resetpwd-body{
        height: calc(100vh - 110px);
        background: #fff;
        border-radius: 30px 30px 0 0;
        padding: 38px;
        .resetpwd-form{
           .resetpwd-input{
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
           .btn-resetpwd{
                margin-top: 30px;
                width: 100%;
                background: #61B3FE;
                box-shadow: 0px 12px 30px 0px rgba(97, 179, 254, 0.25);
                border-radius: 25px;
                color: #fff;
                font-size: 16px;
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
}
</style>