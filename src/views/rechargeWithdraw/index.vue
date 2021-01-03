<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-tabs v-model="currentNav" @tab-click="clickNav">
          <el-tab-pane
            v-for="(item, index) in navList"
            :key="index"
            :label="item.name"
            :name="item.id"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="myDefine-box">
        <div class="myDefine-item-box">
          <el-tabs
            v-model="currentChoice"
            tab-position="left"
            @tab-click="handleCurrentChoice"
            style="height: 700px"
          >
            <el-tab-pane
              :label="item.name"
              :name="item.id"
              v-for="(item, index) in rechargeType"
              :key="index"
            >
              <!-- card body -->
              <el-form class="w_fW">
                <el-form-item :label="`最小${currentNav == 1 ? '提现' : '充值'}额度：`" class="w200">
                  <el-input
                    v-model="formData.min"
                    :placeholder="`请输入最小${currentNav == 1 ? '提现' : '充值'}额度：`"
                    size="small"
                    clearable
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="`最大${currentNav == 1 ? '提现' : '充值'}额度：`" class="w200">
                  <el-input
                    v-model="formData.max"
                    :placeholder="`请输入最大${currentNav == 1 ? '提现' : '充值'}额度：`"
                    size="small"
                    maxlength="7"
                    clearable
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商户号：" class="w200">
                  <el-input
                    v-model="formData.businessNum"
                    placeholder="请输入商户号"
                    size="small"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="秘钥：" class="w200">
                  <el-input
                    v-model="formData.secretKey"
                    placeholder="请输入秘钥："
                    size="small"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="提现开始星期：" class="w200" v-if='currentNav==1'>
                  <el-select v-model="formData.selectWeekStart" clearable placeholder="请选择开始星期">
                    <el-option
                      v-for="item in weekData"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="提现结束星期：" class="w200" v-if='currentNav==1'>
                  <el-select v-model="formData.selectWeekEnd" clearable placeholder="请选择结束星期">
                    <el-option
                      v-for="item in weekData"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="提现时间：" v-if='currentNav==1'>
                  <el-time-picker
                    class="w450"
                    is-range
                    value-format='HH:mm:ss'
                    v-model="formData.selectTime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-form>
              <p class="self-defined">自定义{{currentNav == 1 ? '提现' : '充值'}}选项：</p>
              <div class="my-box">
                <div class="nine-grid-box">
                  <div class="nine-grid">
                    <div v-for="(item, index) in tags" :key="index">
                      <div class="grid-item" v-show="!item.showInp">
                        {{ item.num }}
                      </div>
                      <div class="grid-item-inp-box"  v-show="item.showInp">
                        <el-input v-model="tags[index].num" placeholder="0" maxlength="7" type="number"></el-input>
                        <i class="el-icon-circle-close close-btn" @click="closeTag(index)"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btn-box">
                  <el-button type="primary" v-if='!isEditBtn' @click="addTag">添加</el-button>
                  <el-button type="primary" @click="haddleBtn">{{ isEditBtn ? "编辑" : "确定" }}</el-button>
                </div>
              </div>
               <p class="switch-title">{{payType}}</p>
               <el-switch
                v-show='formData.mySwitch != null'
                v-model="formData.mySwitch"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </el-tab-pane>
          </el-tabs>

         
          <el-button type="primary" class="mySumbit" @click="mySumbit">提交</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getWithdrawConfig,setWithdrawConfig,getRechargeConfig,setRechargeConfig} from "@/api/system";
export default {
  name: "rechargeWithdraw",
  computed:{
    payType(){
      return (this.formData.mySwitch ? '开启' : '关闭') + this.rechargeType[this.currentChoice].name + (this.currentNav == 1 ? '提现' : '充值')
    }
  },
  data: () => ({
    weekData: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
    canClick: true,
    isEditBtn: true,
    tags: [], //标签数
    defaultTags: [ //默认标签数
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
      {
        num: 0,
        showInp: false,
      },
    ],
    currentChoice: "", //控制充值方式
    myInp: "",
    currentNav: "1",
    navList: [
      {
        //导航
        name: "提现",
        id: "1",
      },
      {
        name: "充值",
        id: "2",
      },
    ],
    rechargeType: [], //充值方式
    formData: {
      min: 0,
      max: 0,
      businessNum: "",
      secretKey: "",
      selectWeekStart: '',
      selectWeekEnd: '',
      selectTime: '',
      mySwitch: null
    },
  }),
  activated() {
    this.init();
    this.getWithdrawConfigData(0)
  },
  methods: {
    init() {
      this.formData = {
        min: 0,
        max: 0,
        businessNum: "",
        secretKey: "",
        selectWeekStart: '',
        selectWeekEnd: '',
        selectTime: '',
        mySwitch: null
      }
    },
    // 点击提交
    mySumbit(){
      let {min,max,businessNum,secretKey,mySwitch,selectWeekStart,selectWeekEnd,selectTime} = this.formData
      let tagsLen = this.tags.length
      let index = null
      let index2 = null
      let isExist = null
      let isCanSubmit = null
      for(let i=0;i<tagsLen;i++){
        let currentTagNum = this.tags[i].num
        if(currentTagNum == "" || currentTagNum == 0){
          isExist = true
          index = i + 1
          break
        }else{
          if(Number(currentTagNum)  < Number(min) || Number(currentTagNum) > Number(max)){
            isCanSubmit = true
            index2 = i + 1
            break
          }
        }
      }
      if(!min){
        this.$message.error('请输入最小'+ (this.currentNav == 1 ? '提现额度' : '充值额度'))
        return
      }
      if(!max){
        this.$message.error('请输入最大'+ (this.currentNav == 1 ? '提现额度' : '充值额度'))
        return
      }
      if(businessNum == ''){
        this.$message.error('请输入商户号')
        return
      }
      if(secretKey == ''){
        this.$message.error('请输入秘钥')
        return
      }
      if(isExist){
        this.$message.error('自定义'+ (this.currentNav == 1 ? '提现' : '充值') + '选项  第'+ index +'项  不能为0或者空')
        return
      }
      if(isCanSubmit){
        this.$message.error('自定义'+ (this.currentNav == 1 ? '提现' : '充值') + '选项  第'+ index2 +'项  不能小于最小额度或者大于最大额度')
        return
      }
      //如果当前是提现
      if(this.currentNav == 1){
        if(!selectWeekStart){
          this.$message.error('请选择提现开始星期')
          return
        }
        if(!selectWeekEnd){
          this.$message.error('请选择提现结束星期')
          return
        }
        if(!selectTime){
          this.$message.error('请选择提现结束时间')
          return
        }
      }
      if(this.canClick){
        this.canClick = false
        setTimeout(() => {
          this.canClick = true
        },2500)
          let btn = this.tags.reduce((result,item) => {
            result.push(item.num)
            return result
          },[])
          let params = {
            type: this.rechargeType[this.currentChoice].name,
            max,
            min,
            btn,
            merchant_id: businessNum,
            secret_key: secretKey,
            status: mySwitch ? 1 : 2
          }
          if(this.currentNav == 1){
            params.start_week	= selectWeekStart
            params.end_week = selectWeekEnd
            params.during_time = selectTime[0] + ' - ' + selectTime[1]
            setWithdrawConfig(params).then(resp => {
              if(resp.code == 200){
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
              }
            })
          }else{
            setRechargeConfig(params).then(resp => {
              if(resp.code == 200){
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
              }
            })
          }
      }
    },
    //数据回填
    dataProcessing(res,type){
      if(Object.keys(res).length == 0){
        this.formData = {
          min: 0,
          max: 0,
          businessNum: "",
          secretKey: "",
          selectWeekStart: '',
          selectWeekEnd: '',
          selectTime: [],
          mySwitch: false
        }
        this.rechargeType = []
        this.currentChoice = ''

      }
      this.rechargeType = res.reduce((result,item,index) => {
        result.push({
          name: item.type,
          id: index.toString()
        })
        return result
      },[])
      this.currentChoice = this.rechargeType[type].id
      this.formData = {
        min: res[type].limit.min,
        max: res[type].limit.max,
        businessNum: res[type].merchant_id,
        secretKey: res[type].secret_key,
        mySwitch: res[type].status == 1 ? true : false,
        selectWeekStart: (this.currentNav == 1) ? res[type].start_week : '',
        selectWeekEnd: (this.currentNav == 1) ? res[type].end_week : '',
        selectTime: (this.currentNav == 1) ? res[type].during_time.split(' - ') : ''
      }
      //渲染标签数
      if(res[type].btn.length == 0){
        this.tags = JSON.parse(JSON.stringify(this.defaultTags)) 
      }else{
        this.tags = res[type].btn.reduce((result,item) => {
          result.push({
            num: item,
            showInp: false
          })
          return result
        },[])
      } 
    },
    //提现数据回填
    getWithdrawConfigData(type){ //type为支付方式选项
      getWithdrawConfig().then(resp => {
        if(resp.code == 200){
          this.dataProcessing(resp.data,type)
        }
      })
    },
     //充值数据回填
    getRechargeConfigData(type){ //type为支付方式选项
      getRechargeConfig().then(resp => {
        if(resp.code == 200){
          this.dataProcessing(resp.data,type)
        }
      })
    },
    // 点击Input的删除按钮
    closeTag(index){
      if(this.tags.length ==1){
        this.$message({
          message: '至少自定义1个',
          type: 'warning'
        });
        return
      }
      this.tags.splice(index,1)
    },
    // 点击添加按钮
    addTag(){
      if(this.tags.length >=9){
        this.$message({
          message: '最多只能自定义9个',
          type: 'warning'
        });
        return
      }
      this.tags.push({
        num: 0,
        showInp: true
      })
    },
    // 点击编辑/确定
    haddleBtn() {
      this.isEditBtn = !this.isEditBtn
      if (this.isEditBtn) {
         this.tags = this.tags.map((item) => {
          item.num = item.num ? item.num : 0
          item.showInp = false;
          return item;
        });
      } else {
        this.tags = this.tags.map((item) => {
          item.showInp = true;
          return item;
        });
       
      }
    },
    // 切换充值方式
    handleCurrentChoice() {
      if(this.currentNav == 1){
        this.getWithdrawConfigData(this.currentChoice)
      }else{
        this.getRechargeConfigData(this.currentChoice)
      }
      
    },
    // 点击添加按钮
    addMyDefine() {
      this.btns.push({
        inpText: this.myInp,
        inpOpen: false,
      });
    },
    //点击删除按钮
    handleClose(index) {
      this.btns.splice(this.btns.indexOf(index), 1);
    },
    //点击导航
    clickNav() {
      if(this.currentNav == 1){
        this.getWithdrawConfigData(0)
      }else{
        this.getRechargeConfigData(0)
      }
    },
    handelEdit() {},
  },
};
</script>

<style lang="scss" scoped>
.displayN {
  display: none;
}
.switch-title{
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  color: #606266;
}
.self-defined{
  font-size: 15px;
  line-height: 40px;
  color: #606266;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.w200 {
  width: 200px;
  margin-right: 40px;
}
.addInp-box {
  display: flex;
  align-items: center;
  .my-inp {
    width: 200px;
    margin-right: 30px;
  }
}
.nine-grid-box {
  width: 308px;
  height: 200px;
  position: relative;
  .nine-grid {
    width: 318px;
    .grid-item {
      width: 96px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #409eff;
      color: #fff;
      border-radius: 5px;
      font-size: 17px;
      font-weight: bold;
    }
    .grid-item-inp-box{
      position: relative;
      width: 96px;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      .close-btn{
        font-size: 16px;
        position: absolute;
        top: 4px;
        right: 4px;
        color: gainsboro;
        cursor: pointer;
      }
      .close-btn:hover{
        color: #409eff;
      }
    }
   
  }
}
.myDefine-item-box {
  position: relative;
}
.my-box {
 width: 500px;
 display: flex;
 justify-content: space-between;
}

.mySumbit{
  position: absolute;
  bottom: 20px;
  left: 100px;
  width: 200px;
}
.w450{width: 450px;}
</style>