<template>
  <div class="support-box">
    <div class="v-logo">技术支持：<img class="logo" src="@/assets/images/logo.png"></div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "Support",
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
  },
  updated(){
  },
  watch: {

  },
  methods: {
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.support-box{
  width: 100%;
  position: relative;
  padding:5px 10px;
  .v-logo{
    color: #999;
    font-size: 14px;
    text-align: center;
    .logo{
      height: 15px;
      width: auto;
      vertical-align: middle;
    }
  }
  .clear{
    clear: both;
  }
}
</style>