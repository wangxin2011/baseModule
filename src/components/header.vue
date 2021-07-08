/**
 *
 *头组件
 */
<template>
  <div class="tool-bar">
    <van-nav-bar :border="false" :title="title" @click-left="onBack">
      <template v-if="leftArrow" #left>
        <van-icon name="down" color="#1AA5FE" size="20" class="icon-back"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'
export default {
  name: "HDHeader",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "云平台数据治理"
      }
    },
    leftArrow: {
        type: Boolean,
        default: () => {
          return true
        }
    }
  },
  data() {
    return {
     
    };
  },
  mounted() {
    console.log("************")
  },
  methods: {
    // 返回
    onBack(){
      this.$router.back()
    }
  }
};
</script>

<style lang="scss" scoped>
 .tool-bar {
    position: relative;
    .icon-back{
      transform:rotate(90deg);
      -ms-transform:rotate(90deg); /* Internet Explorer */
      -moz-transform:rotate(90deg); /* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg); /* Opera */
    }
     &::after{
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      bottom: 0;
      right: -50%;
      left: -50%;
      border: 0 solid #ccc;
      -webkit-transform: scale(.5);
      -ms-transform: scale(.5);
      transform: scale(.5);
      z-index: 1;
      border-width: 1px 0 0 0;
    }
  }
</style>
