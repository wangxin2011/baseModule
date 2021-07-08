<template>
<div>
    <div class="main">
      <van-cell-group class="message">
        <van-field v-model="value" label="家长" placeholder="删除" input-align="right" @click="del(index)"/>
        <van-field readonly clickable ref="studentRef" label="学生关系" :value="applyForm.student" placeholder="去选择" @click="handleShowPicker('student')" input-align="right" is-link />
        <van-field v-model="parentname" label="姓名" placeholder="去填写" input-align="right" is-link />
        <van-field readonly clickable ref="genderRef" label="性别" :value="applyForm.gender" placeholder="去选择" @click="handleShowPicker('gender')" input-align="right" is-link />
        <van-form>
          <van-field v-model="phonenumber" :rules="[
              { required: true, message: '请填写您的手机号码！' },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'} ]" type="tel" label="手机号" placeholder="去选择" clearable input-align="right" is-link />
        </van-form>
        <van-field v-model="parentwork" label="工作单位" placeholder="去填写" input-align="right" is-link />
        <van-field readonly clickable ref="workRef" label="担任岗位" :value="applyForm.work" placeholder="去选择" @click="handleShowPicker('work')" input-align="right" is-link />
      </van-cell-group>
      <div class="interval"></div>
    </div>
    <!-- 弹出层+picker基础选择器 -->
    <van-popup v-model="showPicker" round position="bottom" >
      <van-picker show-toolbar ref="pickerRef" :title="pickerTitle" :columns="pickerColumns" @cancel="showPicker = false" @confirm="onConfirmPicker" />
    </van-popup>
</div>
</template>
<script>
export default {
data() {
    return {
      parentname:'',
      parentwork:'',
      phonenumber:'',
      value: '',
      show:false,
      showPicker: false,
      pickerColumns: [],
      pickerTitle:'',
      applyForm: { student:'', gender: '', work: ''},
      studentList:[ { text: '父子', value: '00' }, { text: '母子', value: '01' },],
      genderList: [ { text: '男', value: '01' }, { text: '女', value: '02' },{ text: '其他', value: '03' } ],
      workList: [ { text: '普通职工', value: '11' }, { text: '管理', value: '12' } ],
    };
},
props: ['index'],
methods: {
    del(n){
        this.$emit('remove',n);
    },
    handleShowPicker(val) {
      this.showPicker = true
      if (val == 'student') {
        this.pickerColumns = this.studentList
        this.pickerTitle = '学生关系'
      } else if (val == 'gender') {
        this.pickerColumns = this.genderList
        this.pickerTitle = '性别'
      } else if (val == 'work') {
        this.pickerColumns = this.workList
        this.pickerTitle = '担任岗位'
      }
    },
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == '学生关系') {
        this.applyForm.student = values.text
      } else if (this.$refs.pickerRef.title == '性别') {
        this.applyForm.gender = values.text
      } else if (this.$refs.pickerRef.title == '担任岗位') {
        this.applyForm.work = values.text
      }
      this.showPicker = false
    },
    
}
};
</script>
<style scoped>
.message{
  margin-bottom: 7px;
}
</style>