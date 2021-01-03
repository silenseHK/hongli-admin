<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-tabs v-model="currentNav" @tab-click="clickNav">
          <el-tab-pane v-for='(item,index) in navList' :key='index' :label="item.name" :name="item.id"></el-tab-pane>
        </el-tabs>
      </div>
          
      
      <!-- card body -->
      <el-form label-width="130px">
        <el-form-item label="天杀率：" class="w500">
          <el-input
            v-model="systemList.dateKill"
            placeholder="请输入天杀率"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="局杀率：" class="w500">
          <el-input
            v-model="systemList.oneKill"
            placeholder="请输入局杀率"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item  label="开奖方式：" class="w500">
          <el-radio 
          v-model="systemList.myRadio" 
          :label="item.value"
          v-for='(item,index) in regulations'
          :key='index'
          >{{item.title}}</el-radio>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" size="small" @click="handelEdit"
            >修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getRegulation,modifyRegulation } from "@/api/system";
import {canClickFn} from '../../utils/myAPI'
export default {
  name: "Configuration",
  data: () => ({
    currentNav: '',
    regulations: [], //开奖规则
    navList: [],
    allData: {},  //存接口返回的所有数据
    systemList: {
      dateKill: "",
      oneKill: "",
      myRadio: ''
    }
  }),
  activated() {
    this.init()
    this.getRegulationData()
  },
  methods: {
    init(){
      this.currentNav = ''
      this.regulations = [] //开奖规则
      this.navList = []
      this.allData = {}  //存接口返回的所有数据
      this.systemList = {
        dateKill: "",
        oneKill: "",
        myRadio: ''
      }
    },
    //数据回填
    getRegulationData(){
      getRegulation().then(resp => {
        if(resp.code == 200){
          let res = resp.data
          this.regulations = res.rules
          this.allData = res
          this.navList = res.games.reduce((result,item) => {
            result.push({
              name: item.name,
              id: item.id.toString()
            })
            return result
          },[])
          this.currentNav = this.navList[0].id
          let showData = res.games[0]
          this.systemList = {
            dateKill: showData.date_kill,
            oneKill: showData.one_kill,
            myRadio:  showData.open_type.value
          }
        }
      })
    },
    //点击导航
    clickNav(){
      getRegulation().then(resp => {
        if(resp.code == 200){
          let gameData = resp.data.games.filter(item => item.id == this.currentNav)[0]
          this.systemList = {
            dateKill: gameData.date_kill,
            oneKill: gameData.one_kill,
            myRadio: gameData.open_type.value
          }
        }
      })
    },
    //点击修改
    handelEdit(){
      canClickFn(() => {
        let {dateKill,oneKill,myRadio} = this.systemList
        modifyRegulation({
          id: this.currentNav,
          open_type: myRadio,
          date_kill: dateKill,
          one_kill: oneKill
        }).then(res => {
          if(res.code == 200){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        })
      })
    }
   
  },
};
</script>

<style lang="scss" scoped>
.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-radio{
  display: inline-block;
}
.w500{width: 500px;}
</style>