<template>
  <div v-if="version" class="version-box">
    <div class="version" v-html="version"></div>
     <!-- <span>客服热线：4001166263</span> <span class="f-r">版本号：{{version}}</span> -->
     <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "Version",
  data() {
    return {
      version: process.env.VUE_APP_VERSION
    };
  },
  props: {
  },
  activated() {
  },
  mounted(){
    let _this= this;
    let _help= document.getElementsByClassName("help-doc");
    function toHelp(){
         _this.toHelp();
    }
    if(_help){
      for(let i=0; i< _help.length; i++){
        _help[i].removeEventListener("click", toHelp, false);
        _help[i].addEventListener("click", toHelp, false);
      }
    }
  },
  updated(){
  },
  watch: {

  },
  methods: {
    // 帮助手册
    toHelp(){
      this.$router.push({ path: '/help'});
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.version-box{
  width: 100%;
  position: relative;
  padding:5px 15px;
  .version{
      text-align: center;
      color: #999;
      right: 10px;
      font-size: 12px;
      left:0;
      /deep/ .help-doc{
        color: #1AA5FE;
        font-weight: bold;
        text-decoration: underline;
        letter-spacing:2px;
      }
      /deep/ .sp-version{
        color:#ccc;
      }
      /deep/ .f-l{
        float: left;
      }
      /deep/ .f-r{
        float: right;
      }
  }
  .clear{
    clear: both;
  }
}
</style>