<!--
 * @message: file content
 * @Params: {*}
 * @Author: wangxin
 * @since: 2020-02-28 15:28:32
 * @LastAuthor: your name
 * @lastTime: 2020-03-13 13:05:09
 -->
<template>
  <div class="auth-container">
    <!-- <Version /> -->
    <div v-if="openid">
      <div v-if="isAgree">
        <div class="text-center p-t-80">
          <img class="icon-wx" v-if="isWeixin" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeCAMAAAD0W0NJAAABDlBMVEU8sDQAAAA8sDU8sDM8sTY8sTQ8sTQ8sDQ8sDQ8sTQ8sDQ7sTQ7sDQ8sDQ8sTQ8sDQ7sTQ5sTI8rzQ8sDT///8+sTYboxIZog85rzEdpBQfpRZAsjglpxwXoQ03ri81rSwsqiMqqSEiphkToAknqB4wqycVoQz7/vtPuEgzrCpUuk0uqiVEtD1jwF0xrCmy4K/a8NnL6snH6cTl9ePX79Wc15iN0YgQngbo9ue/5r224rN4yXJqw2S85LpavFNLtkPx+vDe8t34/fj0+/Tu+O2X1pOJ0ISGzoHi8+HO68yk2qCU1JB/y3pzx21uxWjC58Bevljr9+rS7dGu3quDzX6547ao3KSQ04x8yncLnAKEfKPdAAAAE3RSTlP8AC5zHKbp4dKEnlvPxol7ayRZWocAtQAACP5JREFUeNrVned62jAUQGm699Cy5T3BbEiAJhBIM8gEkjar7/8iJaSpOy7Yxkrrnl/5In3JsaQryddG5B78zsq7x6+f5P46T14/frfyh8xveo/ePkP/kGdvHy3Qe/8ih/4xuRfv5+k9/+dyM8HnoN7KK5QRXq38qfcSZYiXv+s9RJni4Z1eJu1++OWy17O3vAz1VlAGWfmh9xRlkKd3em9QJnlzq/cIZZRHM73HKKM8nuplt/GmzTfVe44yy/MHuWyG7V3w5jI5592xksvccvYzD3OZjdtZ7OaeoQzzLPcEZZgnuUxs4OexnJ0kGV7JusH0Al1CKRDsJ3kqZbYbkHLhhkFZsmyZ2ZaB7oNcIj2PM5ecXu/VGmsft7bzU3bOPh2uHw17hapM1QSK4vVMypVxq3mGIfL12n6/ynhAUCTi9UhAeflkcxcvpH7UM5gtRRgK1yOm5o0vdnAMPrX6NjXmC4rXI5aG2nUcm8nI1KA+vhc9UvXR8S5OxFrXZDogKFyPIGoOt3Bi1kacI0BQrJ5iaZU6Xopm0S8pKES8HkEsuMRL0yrRsP3E6xHDOV3FKagXnTCGRespJmvjlOwzU7kfPUVVazg1NdVW7kNPsb1DLIDPuqyI11O4V8dCWCVUEa2n2KFdWj4iqojVI64a2gnw44pIPeLRJhbIaklVBOpJzhEWyqHsEWF6xB9hwVw6kig9oqJtDLO7Cu8OoiuMfEWQnsSa8Ahv9xW93JvMdTu76pNphXWobEdXiRA9onUxxJeSY3tGSfP3MEzNm1VgzhVUuq5JQvQ8bxe061hkZl/tbMJ2jntbIfi6AZWPGRGgR5xjcG6wLPK9glwEu9507yrwAgY4cAMBeiUdvOM5dn5cu1E9gDZ3YQW9BM7p5xpJrUd8eBPVpWHoqFDoXP9cYQJ3gJFazyjBG9ATLWwc6zO0swsrSG4DvkRG0urJYwyy6f8IPEuBur/JflQoIXjya3AprR7dwDCVzt3I75xjiN7XuwpfTzBM0U2pV0XzloWtQsecdW2nDFfZKXas2wrKLoY51lLq8TGey1CSNabZlY94Dm0kM6bx07kVDlUpnR5r4flsXRwPW4cLK+y1Ww08n4KbQi+MObGcrTU2b2h8Gtup9KpkV6zZWq3dKyiBa3OZMWrpgS6l0HP7AtW2N8+LHmeM+Q7jaklHkiHpN4lebhkJ9cLIEEXjvMypqlLqDXrD1kVj7WB1Sn2a6G2PbxK9lpRcTz4XJLdRUZnlMrVw/aW+DSR6v1wPXGYhklDvSojcRZFyT+aFYTOP55FvDgdc1kkSPdoSEQ4VagfUHG+GbjD5jZ7FDPJ39a5calCzuxYvxdG1mET+nt6noh/YfATKwYI92SZ/S2/Dkg2/MMFJ2Bz4BokXGikTenvMdO3kf2PIVSWW3nUqu3PHoKSJk7OOGImhZ1fS2HU7hn+6hZdht+9IJFLPHORTtF3HcEbLX5ujkyg9I/i0/LhzAn8fL0/bMUiEHpI38JJs+lVnH6fh2NdJhB5b9j8cuKbWxekYOlKEnlvEy1HkcvrN2Mgni/Uk9/OSA881tnBqCrKyUI9o7aWWMtuiDRFZXsskgF6IWV5maqlQbR+LoOZHpID8LzgxTTovoXoA31TOL6lQslDPLiTXO5W1GtgWRQMV2ztQtrAwLTnOA9ZqAOmFaImnvkPOi2C8dHhQVTvKAVxidwZACw59skiPqOXE8wFj0CVNnCqZpeTKv7ffuhPMSpzin+23W63CenB6NJozgw/AYcTI9z949PtguBtgfg3MUgJ6IYGdbOE9Yhp0QfmyiWYQdj2vBIr3uqov1CNysujoMRO8nr5813qtuSWXUKDZEU+FnGGSrRqifXgO68yWeEXWd3+P26/SrISBicwjDdQL0f0E0bvJtSu45OSrK+lmxzoESqybkip4x1Q39cV6xOTxl95jja9jmBZxTaW7Cs05aFpycoZBihaoF6KopYO4emNNn1t3u/F5By7ZmZXAXMuRT8Nl9DHuVkor5LFQWiz6XQIa0+9M0SpYLBuRrTcLuDqOQT3QuoL1GpYe4z0WbjbjLLiWdi5Yb80z4rwFpPJLHElT9a8E6x0YgB7gV9JOonN5tnC9VR3QAyC6U4xafycq2xesV68CeiCEWmsRY8+l1/cdGvPxjI9R45j2MIDoiQWGnUS/glQUrLfHYuvJ61EJ4gJHZ2L1RjyunlnejtzuyWpTqF1+YMbUIyx6Zmkz1hKq17QlSC+6by/2a2vbfw5kLjY29qHtaHTfrle4w71Br73x616IqIbIwbddNkE9uG9DOZtKBBkmp9wrn3bbR7XN5mQy2agNqtqlQL0vGgL0FvftpMJl6acXVVR5iu2qrsu5ROy+QL2iDevN79v1UO5npBtmP8iH4uZkDcXVYyeAHAARt3DkyyqJq0ebMzm6UE5s8x07JG7ruX3cuA2IKAgXtLB9sqsorl6p0lWBbgVxxATvgJPYekpg6wTFgpTcVQF2Jw5BgF56FBH7lktHR/ejh4hznnqxpR744EAIun+U8gZNdUM74XqkqtVS2ZnAQ11xeoiUaC2NnQ3YCdRDxGRL92/TAuzE6iHiacMltyk20LPp9OAb48ouTk4b+EhRqCcSDV0kTlr0gCfN96SnqLSbsAGvvqKIF0UEQnRNauUTZQVcCQEI1ws/kTo4SiJYsBDEPekhglQ22FtNcm8GEuoJx2V6d2Nr0dYu/HEiI5j700OkSmVldFnPQ2q1Yd8sbIb3jiUEAuiJpCRTrzA+rjU+beVvRT5+vtgbFQOZqoYtVxrhBwZAAD3BGBZn3NXLhf7p6Wl/oJRsKrvGrHklqo5uu/gLQyCQnngkKShZrqqqrunpUvh7Ymil/bObLJwRIAgheqkGqC/tTfu9whFEUj3xENMvX+J1DUH8e72poKqNj5COALKghwiyrTKC+fd2N0gIJit+c+2yfthOxo8qyvhBTxk/Jivjh4xl/Ii2rB9wl/HjATN+uGJ2m+/R/3CwZ9aPRc36obIPPqDM8eH/OdA4c34P/6/DtLN+FHnWD3LP/DH4Wf8SgRkr7178m69geAF8BcM3cEOuP8D+TTYAAAAASUVORK5CYII=">
          <van-icon v-else name="alipay" color="#108ee9" size="120px"/>
        </div>
        <div id="loading-center" v-if="dotshow">
            <div id="loading-center-absolute">
                <div class="object" :class="{zfb: isWeixin}" id="object_one"></div>
                <div class="object" :class="{zfb: isWeixin}" id="object_two"></div>
                <div class="object" :class="{zfb: isWeixin}" id="object_three"></div>
            </div>
        </div>
      </div>
      <div v-else class="site-title">
        {{ siteTitle }}
      </div>
      <div class="text-center txt-desc"
            v-if="!isWeixin"
            v-clipboard:copy="copyInfo"
            v-clipboard:success="onCopy" 
            v-clipboard:error="onErrCopy"
        >{{message1}}</div>
      <div class="text-center txt-desc" v-else>{{message1}}</div>
      <div class="text-center txt-desc">{{message2}}</div>
      <div class="text-center m-t-10">
        <van-button v-if="isAgree"  type="info" @click="reLoad"><van-icon name="replay" />重新授权</van-button>
        <van-button v-else type="primary" class="b-radius f-s-16" @click="readMe">阅读隐私政策</van-button>
      </div>
      <div v-if="!isAgree" class="pp-tip-desc">使用前请先认真阅读并同意“隐私政策”</div>
    </div>
    <div v-else>
        <div class="text-center p-t-80">
            <img class="icon-wx" style="width:180px;height:180px;" src="@/assets/images/wxcode.jpg">
        </div>
        <div class="f-s-16 m-t-10 f-w p-20">{{message3}}</div>
    </div>
    <!-- <Support class="fexd"/> -->
    <van-dialog class="pp-dialog" v-model="isUnRead" title="温馨提示" @confirm="setReadStatus(1)" @cancel="setReadStatus(0)" cancelButtonText="不同意" confirmButtonText="我同意" show-cancel-button>
      <div class="d-main">
        <div class="p">
          感谢您信任并使用{{ siteTitle }}。依据最新的法律法规、监管政策要求，更新了《隐私政策》，特向您推送本提示。请您仔细阅读并充分理解相关条款。
        </div>
        <div class="p">
          一、我们会通过《隐私政策》帮助您了解我们收集、使用、存储和共享个人信息的情况，以及您所享有的相关权利；
        </div>
        <div class="p">
        二、我们会采取业内先进的安全措施保护您的信息安全；
        </div>
        <div class="p">
        三、明确告知您我们的联系通道及方式；
        </div>
        <div class="p">
        您点击【我同意】，即表示您已经阅读并同意上述协议条款，我们将尽全力保障您的合法权益并继续为您提供优质的服务；如您点击【不同意】，将可能导致无法继续使用我们的系统。
        </div>
      </div>
      <div class="p p-10">
        <a class="link" @click="toPrivacyPolicy">
        您可通过阅读完整版《隐私政策》了解详尽条款内容。
        </a>
      </div>
    </van-dialog>
  </div>
  
</template>

<script>
import { Encrypt } from '@/utils/validate.js';
// import Version from '@/components/version.vue';
// import Support from '@/components/support.vue';
import { reload } from "@/utils/util.js";
import { setReadStatus, postLogs } from "@/api/config.js";
// import { mixins } from "@/utils/mixins.js";
export default {
  name: 'Index',
  // components: { Version, Support },
  // mixins: [mixins],
  data() {
    return {
        siteTitle: process.env.VUE_APP_WEB_TITLE,
        isAgree: true,
        isUnRead: false,  // 是否已读通知公告
        dotshow: true, // 显示加载点
        message1: '正在获取微信授权',
        message2: '请耐心等待',
        message3: '使用别人分享给您的地址或二维码是无法正常使用应用的，请到官方指定的入口进入应用，如有疑问可联系相关人员。',
        mdata:''
    }
  },
  computed: {
    isWeixin(){
      let _isplatform= this.$store.state.app.isPlatform;
      return (_isplatform==1 || _isplatform ==2? true: false);
    },
    copyInfo(){
        let _info='';
        let _param= this.$store.state.app.zfbParam;
        let _token= this.$store.state.app.token;
        let _zfb= this.$store.state.app.zfb;
        if(_token){
            _info= _token.openid;
        }
        if(_param){
            _info=_info + "|#|" + Encrypt(JSON.stringify(_param), true).toString();
        }
        if(_zfb){
            _info=_info + "|#|" + Encrypt(JSON.stringify(_zfb), true).toString();
        }
        return _info;
    },
    openid() {
        return this.$store.state.app.openid;
    },
    tocken() {
        return this.$store.state.app.token;
    },
    userInfo(){
      return this.$store.state.app.userinfo;
    }
  },
  mounted() {
    this.getAuth();
  },
  activated(){
  },
  methods: {
    // 获取是否已读通知公告接口
    setReadStatus(privacy){
      this.$storage.write("isReadStatus" + this.userInfo.F_Uid, (privacy ? "true": ""));
      if(privacy == 1){
        this.isAgree = true;
        // 已查看
        this.nativationTo();
      }else{
        this.message1="";
        this.message2="";
        this.isAgree = false;
      }
      setReadStatus({Uid: this.userInfo.F_Uid, Privacy: privacy}).then((res) => {
        console.log(res);
      }).catch(err => {

      });
    },
     // 
      onCopy(e){

      },
      onErrCopy(e) {
      },
     getAuth(){
         this.dotshow=true;
         let _path= 'app/getUserInfoByToken';
         let _message="测试线";
         this.message1='正在获取微信授权';
         this.message2= '请耐心等待';
         if(this.openid){         
            if(!this.isWeixin){
                _path= 'app/getUserInfoByZFB';
                _message="支付宝";
                this.message1="正在获取授权";
                this.message3=process.env.VUE_APP_KEY_AUTH_GFT_TXT;
            }else{
                // 微信
                _path= 'app/getUserInfoByToken';
                this.message3=process.env.VUE_APP_KEY_AUTH_WX_TXT;
            }
            this.$store.dispatch(_path).then((resp) => {
                this.dotshow=false;
                if(resp || this.tocken){
                  this.message1 = "授权成功！";
                  this.message2 = '';
                  // 获取状态
                  let _isReadStatus= this.$storage.read("isReadStatus" + this.userInfo.F_Uid);
                  if((this.config && !this.config.isShowAgree) || (_isReadStatus && _isReadStatus === 'true')){
                    // 已存在已读,进入授权
                    this.nativationTo();
                    this.isUnRead = false;
                  }else{
                    // 检查接口状态
                    if(resp && resp.F_Privacy == 2){
                      this.$storage.write("isReadStatus"+this.userInfo.F_Uid, "true");
                      this.nativationTo();
                      this.isUnRead = false;
                    }else{
                      this.isUnRead = true;
                      this.message1="";
                      this.message2="";
                    }
                  }
                  
                } else{
                  let _message= "授权失败，请稍后访问！";
                  if(this.isWeixin){
                    _message= "微信"+ _message;
                  }
                  this.message1= _message;
                  this.message2="";
                  this.mdata="";
                  // 写日志，保存url地址
                  this.writeLog();
                }
            }).catch(err => {
               this.writeLog();
            });
         }else{
           this.writeLog();
         }
     },
     // 写日志
     writeLog(logs = ''){
          logs = logs + " and platform="+(this.isWeixin?'微信':'支付宝')+" and " + location.href;
      //  if(this.hasYangXin){
         // Uid，OpenId，Time，Url，UrlParam，Ip，ClientType
          postLogs({Url: location.href, UrlParam: logs, ClientType: (this.isWeixin ? '微信' : '支付宝'), Time: new Date().getTime()}).then(ret => {
            
          }).catch( err => {

          });
      // }
     },
    readMe(){
      this.isUnRead = true;
    },
     // 入口处理
    nativationTo(){
        if(this.userInfo){
            // 进入页面
            this.$router.push({
                path: '/entrance'
            });
        }else if(this.tocken){
            if(process.env.VUE_APP_ENV != 'xinyu' && !this.isWeixin){
                  // 南昌市支付宝
                this.$router.push({
                    path: '/role'
                });
            }else{
              // 南昌市微信、新余支付宝
              // 获取到token，未获取用户数据时直接进入注册页
              this.$router.push({
                  path: '/register'
              });
            }
        }
    },
    // type 1: 老师 2：家长
    selectRole(type) {
      if(type === 2){
        // 家长
        this.$router.push({path: '/parent'});
      }else if(type ===1){
        // 老师,在第一次获取用户信息时已经确定保存状态
        this.$router.push({path: '/guide'});
      }
    },
    // 重新授权
    reLoad() {
      reload();
    },
    // 帮助手册
    toPrivacyPolicy(){
      this.$router.push({ path: '/privacypolicy'});
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
  }

    .icon-wx{
        width: 100px;
        height: 100px;
        margin-bottom: 40px;
    }
    .txt-desc{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:30px;
    }
  .p-t-80{
    padding-top: 80px;
  }
  .m-t-10{
    margin-top: 10px;
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
   .m-t-30{
      margin-top: 30px;
    }
  .p-20{
    padding:20px;
  }
	#loading-center{
		width: 100%;
		height: 50px;
		position: relative;
	}
	#loading-center-absolute {
		position: absolute;
		left: 50%;
		top: 50%;
		height: 50px;
		width: 150px;
		margin-top: -25px;
		margin-left: -50px;
	}
  .zfb{
    background-color: #108ee9;
  }
	.object{
		width: 20px;
		height: 20px;
		background-color: #3CB034;
		float: left;
		margin-right: 20px;
		margin-top: 10px;
		-moz-border-radius: 50% 50% 50% 50%;
		-webkit-border-radius: 50% 50% 50% 50%;
		border-radius: 50% 50% 50% 50%;
	}

	#object_one {	
		-webkit-animation: object_one 1.5s infinite;
		animation: object_one 1.5s infinite;
  }
	#object_two {
    -webkit-animation: object_two 1.5s infinite;
    animation: object_two 1.5s infinite;
    -webkit-animation-delay: 0.25s; 
    animation-delay: 0.25s;
	}
	#object_three {
    -webkit-animation: object_three 1.5s infinite;
    animation: object_three 1.5s infinite;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;	
  }
  .b-radius{
    border-radius: 4px;
  }
  .site-title{
    font-size: 24px;
    padding: 50px 30px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 2px;
  }
  .pp-tip-desc{
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #333;
    margin-top: 20px;
  }
  .pp-dialog{
    top: 50% !important;
    .d-main{
      max-height: calc(100vh - 160px);
      overflow: auto;
      padding:15px;
      .p{
        text-indent: 2em;
      }
      
    }
    .link{
      text-decoration: underline;
      &:active{
        color: #108ee9;
      }
    }
  }
  .fexd{
    position: fixed;
    bottom: 0;
    background: #fff;
  }
	@-webkit-keyframes object_one {
	75% { 
      -webkit-transform: scale(0);
    }
	}
	@keyframes object_one {
	75% { 
    transform: scale(0);
    -webkit-transform: scale(0);
  }
	}
	@-webkit-keyframes object_two {
	75% { -webkit-transform: scale(0); }
	}
	@keyframes object_two {
	75% { 
    transform: scale(0);
    -webkit-transform:  scale(0);
  }
	}
	@-webkit-keyframes object_three {
	75% { -webkit-transform: scale(0); }
	}
	@keyframes object_three {
  75% { 
    transform: scale(0);
    -webkit-transform: scale(0);
  } 
  }
</style>

