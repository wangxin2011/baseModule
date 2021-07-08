<template>
<div id="app">
			<button @click="click">{{message}}</button>
 
			<div id="box" v-show="isShow"></div>
		</div>
</template>
<script>
export default {
data() {
    return {
      isShow: false,
				message: '显示'
    };
},
props: ['index'],
methods: {
    click() {
					this.isShow = !this.isShow;
					if(this.isShow){
						this.message='隐藏';
					}else{
						this.message='显示';
					}
				}
}
};
</script>
<style scoped>
#box {
				width: 50px;
				height: 50px;
				background: red;
			}
</style>