<!--
 * @message: 应用信息首页
 * @Params: {*}
 * @Author: wangxin
 * @since: 2020-02-28 15:28:32
 * @LastAuthor: your name
 * @lastTime: 2020-03-13 13:05:09
 -->
<template>
  <div class="index-container">
    <HDheader :left-arrow="false" title="学生信息页"/>
    <div class="index-top-view">
      <div class="flex-box">
        <div>
          <!-- <van-image
            class="user-avatar"
            round
            fit="contain"
            src="@/assets/images/user-avatar.png"
          /> -->
          <img class="user-avatar" src="@/assets/images/user-avatar.png">
        </div>
        <div class="flex-box-1">
          <div class="user-info">张三同学你好！</div>
          <div class="user-desc">张三同学</div>
        </div>
        <div>
           <div class="user-setting">
             <van-icon name="setting-o" class="setting-icon"/>设置
           </div>
        </div>
      </div>
    </div>
    <div class="index-body-view">
      <van-cell-group>
        <van-cell icon="edit" title="我的信息" is-link @click="gotoPage('user')" />
        <van-cell v-if="currentUser && currentUser.uerType != 1" icon="description" title="我的班级" is-link  @click="gotoPage('user')" />
        <template v-else-if="currentUser && currentUser.uerType == 1">
          <van-cell icon="description" title="班级管理" is-link  @click="gotoPage('user')" />
          <van-cell icon="friends-o" title="教师管理" is-link  @click="gotoPage('user')" />
        </template>
      </van-cell-group>
    </div>
  </div>
  
</template>

<script>
import { Encrypt } from '@/utils/validate.js';
import HDheader from '@/components/header'
import { setReadStatus, postLogs } from "@/api/base.js";
// import { mixins } from "@/utils/mixins.js";
export default {
  name: 'Index',
  // mixins: [mixins],
  components: { HDheader: HDheader },
  data() {
    return {
       
    }
  },
  computed: {
    openid() {
      // openid
        return this.$store.getters.openid;
    },
    token() {
      // token
        return this.$store.getters.token;
    },
    userInfo(){
      // 当前登录用户的所有学校
      return this.$store.getters.userinfo;
    },
    currentUser(){
      // 当前登录信息默认账号信息
      return this.$store.getters.currentUser || {};
    }
  },
  mounted() {

  },
  activated(){
  },
  methods: {
    // 进入到其它页面
    gotoPage(path){
       this.$router.push({ path: path });
    }
  }
}
</script>
<style lang="scss" scoped>
    .index-container{
      background: #F6F7F9;
      .index-top-view{
        background: #fff;
        padding: 30px 0;
        .flex-box{
          display: flex;
          justify-content: center;
          align-items: center;
          .flex-box-1{
            flex: 1;
          }
        }
        .user-avatar{
          margin-left: 20px;
          height: 55px;
          width: 55px;
          margin-right: 10px;
          border-radius: 100%;
        }
        .user-info{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .user-desc{
          margin-top: 8px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
        .user-setting{
          padding: 8px 12px;
          background: #61B3FE;
          border-radius: 28px 0px 0px 28px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          .setting-icon{
            margin-right: 6px;
            vertical-align: middle;
          }
        }
      }
      .index-body-view{
        margin-top: 15px;
      }
    }
</style>

