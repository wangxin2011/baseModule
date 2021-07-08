<template>
  <div class="body">
    <!-- 顶部导航栏 -->
    <van-sticky>
      <div>
        <van-nav-bar title="我的信息" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <van-icon name="ellipsis" />
          </template>
        </van-nav-bar>
      </div>
      <div @click="basicClick" class="basicTitle">
        <van-cell-group title="基本信息"></van-cell-group>
      </div>
    </van-sticky>
    <!-- 信息栏 -->   
    <div class="main">
      <div v-show="basicshopShow">
        <van-cell-group class="information" >
          <van-field v-model="name" label="姓名" placeholder="去填写" input-align="right" center />
          <van-field readonly clickable label="证件类型" :value="idType" placeholder="去选择" @click="idTypePicker = true" input-align="right" is-link />
          <van-field v-model="idNo" type="tel" label="证件号码" placeholder="去填写" clearable input-align="right" is-link />
        </van-cell-group>
        <div class="interval"></div>
        <van-cell-group class="information">
          <van-field readonly clickable label="性别" :value="gender" placeholder="去选择" @click="genderPicker = true" input-align="right" is-link />
          <van-field readonly clickable label="是否随迁子女" :value="isNotLocal" placeholder="去选择" @click="isNotLocalPicker = true" input-align="right" is-link />
          <van-field readonly clickable label="是否留守儿童" :value="isStayed" placeholder="去选择" @click="isStayedPicker = true" input-align="right" is-link />
          <van-field readonly clickable label="政治面貌" :value="political" placeholder="去选择" @click="politicalPicker = true" input-align="right" is-link />
          <van-field readonly clickable label="民族" :value="nation" placeholder="去选择" @click="nationPicker = true" input-align="right" is-link />
          <van-field readonly clickable @click="showPopup" label="籍贯" placeholder="去选择" v-model="carmodel" input-align="right" is-link />
          <van-field readonly clickable label="户口类型" :value="registType" placeholder="去选择" @click="registTypePicker = true" input-align="right" is-link />
        </van-cell-group>
        <div class="interval"></div>
        <van-cell-group class="information"> 
          <van-field readonly clickable label="家庭住址" :value="valueArea" placeholder="添加地址" @click="bindShow" input-align="right" is-link/>
        </van-cell-group>
        <div class="interval"></div>
      </div> 
      <!-- 家长信息 -->
      <van-sticky :offset-top="86">
        <div @click="familyClick" class="basicTitle">
          <van-cell-group title="家庭信息"></van-cell-group>
        </div>
      </van-sticky>
      <div v-show="familyshopShow">         
        <van-cell-group class="parent">
          <children v-for="(item,index) in arr" :key="index" :index="index" @remove="remove"></children> 
          <van-field v-model="value" readonly label-class="parentclass" label="家长信息" @click="add" placeholder="添加" input-align="right" :error = "true"/>
        </van-cell-group>
      </div>
    </div>
    <div class="buttondiv">
        <button class="button">提交</button>
    </div>
    <!-- 籍贯选择器 -->
    <van-popup v-model="show" round position="bottom" >
      <van-area :area-list="areaList" :columns-num="2" ref="myArea" title="籍贯" @change="onChange" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
    <!--选择省市区选择器-->
    <van-popup v-model="showArea" round position="bottom" >
      <van-area :area-list="areaList" @confirm="onAreaConfirm" @cancel="bindCancel" />
    </van-popup>
    <!-- 证件类型选择器 -->
    <van-popup v-model="idTypePicker" position="bottom">
      <van-picker show-toolbar :columns="idTypecolumns" @confirm="idTypeonConfirm" @cancel="idTypePicker = false" />
    </van-popup>
    <!-- 性别选择器 -->
    <van-popup v-model="genderPicker" position="bottom">
      <van-picker show-toolbar :columns="gendercolumns" @confirm="genderonConfirm" @cancel="genderPicker = false" />
    </van-popup>
    <!-- 是否随迁子女选择器 -->
    <van-popup v-model="isNotLocalPicker" position="bottom">
      <van-picker show-toolbar :columns="isNotLocalcolumns" @confirm="isNotLocalonConfirm" @cancel="isNotLocalPicker = false" />
    </van-popup>
    <!-- 是否留守儿童选择器 -->
    <van-popup v-model="isStayedPicker" position="bottom">
      <van-picker show-toolbar :columns="isStayedcolumns" @confirm="isStayedonConfirm" @cancel="isStayedPicker = false" />
    </van-popup>
    <!-- 政治面貌选择器 -->
    <van-popup v-model="politicalPicker" position="bottom">
      <van-picker show-toolbar :columns="politicalcolumns" @confirm="politicalonConfirm" @cancel="politicalPicker = false" />
    </van-popup>
    <!-- 民族选择器 -->
    <van-popup v-model="nationPicker" position="bottom">
      <van-picker show-toolbar :columns="nationcolumns" @confirm="nationonConfirm" @cancel="nationPicker = false" />
    </van-popup>
    <!-- 户口类型选择器 -->
    <van-popup v-model="registTypePicker" position="bottom">
      <van-picker show-toolbar :columns="registTypecolumns" @confirm="registTypeonConfirm" @cancel="registTypePicker = false" />
    </van-popup>
  </div>
</template>
<script>
import { areaList } from "@/utils/area.js";
import Children from '@/components/Children'
export default {
  data() {
    return {
      basicshopShow: true, //默认内容显示
      familyshopShow: true,
      name:'',//姓名
      idNo:'',//证件号码
      idType:'',//证件类型
      gender:'',//性别
      isNotLocal:'',//是否随迁子女
      isStayed:'',//是否留守儿童
      political:'',//政治面貌
      nation:'',//民族
      registType:'',//户口类型
      arr:[],//家长信息列表
      value: '',
      carmodel: '',//籍贯
      areaList: areaList, //引用地区信息
      valueArea: '', //地区值
      arrArea: '', //存放地区数组
      idTypecolumns: ["身份证","军官证","港澳通行证"],
      gendercolumns: ["男","女"],
      isNotLocalcolumns: ["是","否"],
      isStayedcolumns: ["是","否"],
      politicalcolumns: ["中共党员","共青团员","群众"],
      nationcolumns: ["汉族","回族"],
      registTypecolumns: ["城镇户口","农村户口"],
      idTypePicker: false,
      genderPicker: false,
      isNotLocalPicker: false,
      isStayedPicker: false,
      politicalPicker: false,
      nationPicker: false,
      registTypePicker: false,
      show:false,
      showArea: false, 
    };
  },
  components: {
    Children
  },
  methods: {
    onClickLeft() {
      this.$router.push({path:'/index'})
    },
    onClickRight() {
    },
    //证件类型
    idTypeonConfirm(value) {
      this.idType = value;
      this.idTypePicker = false;
    },
    //性别选择
    genderonConfirm(value) {
      this.gender = value;
      this.genderPicker = false;
    },
    //是否随迁子女选择
    isNotLocalonConfirm(value) {
      this.isNotLocal = value;
      this.isNotLocalPicker = false;
    },
    //是否留守儿童选择
    isStayedonConfirm(value) {
      this.isStayed = value;
      this.isStayedPicker = false;
    },
    //政治面貌选择
    politicalonConfirm(value) {
      this.political = value;
      this.politicalPicker = false;
    },
    //民族选择
    nationonConfirm(value) {
      this.nation = value;
      this.nationPicker = false;
    },
    // 户口类型选择
    registTypeonConfirm(value) {
      this.registType = value;
      this.registTypePicker = false;
    },
    // 籍贯选择
    showPopup() {
      this.show = true;// 弹出层显示
    },
    onChange(picker, index, value) {
      let val = picker.getValues();//value=0改变省，1改变市，2改变区
      console.log(val); //查看打印
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i == 0 ? "" : "") + val[i].name;
      }
      this.carmodel = areaName;
    },
    onConfirm(val) {
      console.log(val[0].name + "," + val[1].name);//确定选择城市
      this.show = false; //关闭弹框
    },
    onCancel() {
      this.show = false;//取消选中城市
      this.$refs.myArea.reset(); // 重置城市列表
    },
    // 家庭住址选择省市区
    bindShow(){
      this.showArea= true;
      },
    bindCancel(){
      this.showArea= false;
      },
    onAreaConfirm(val) {
      this.showArea = false;//地区选择
      this.arrArea = val;
      var addrInfo = val[0].name + val[1].name + val[2].name;
      this.valueArea = addrInfo
      },
    //点击新增子组件 
    add(){
      this.arr.push({})
    },
    //删除子组件
    remove(n){
      this.arr.splice(n,1); 
    },
    // 折叠
    basicClick () {
        this.basicshopShow = !this.basicshopShow //使true变为false显示
    },
    familyClick () {
        this.familyshopShow = !this.familyshopShow //使true变为false显示
    },

  },
};
</script>
<style lang="scss" scoped>
.parent{
    margin-bottom: 200px;
}
.navbarbox {
  .van-nav-bar__text {
    color: #EF1726;
  }

  .navbar {
    color: #000;
  }
}

// 基本信息
.buttondiv {
  height: 70px;
  width: 100%;
  border: none;
  background-color: rgb(247, 247, 247);
  position: fixed;
  bottom: 0;

  .button {
    background-color: rgb(99, 178, 252);
    border-radius: 5px;
    font-size: 18px;
    width: 330px;
    height: 50px;
    // margin: 130px auto;
    border: none;
    color: rgb(250, 246, 246);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>