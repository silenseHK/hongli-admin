<template>
  <div class="dashbord">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-row >
          <el-col style="width: 200px;margin-right:20px" v-if='roleType==1'>
            <el-select
              v-model="sourcehType"
              filterable
              size="small"
              placeholder="注册来源"
            >
              <el-option
                v-for="item in sourceList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col style="width:600px">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              align="right"
              unlink-panels
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
            <el-button
              type="primary"
              size="small"
              @click="mySearch"
              style="margin-left: 15px"
              >搜索</el-button
            >
            <!-- <el-button type="success" size="small" @click="resetHome"
              >重置</el-button
            > -->
          </el-col>
        </el-row>
      </div>
      <!-- card body -->
      <div class="statistics color-green1">会员统计</div>
      <div class="infoCrads">
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.members !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal='startVal'
                    :endVal="Number(homeList.members)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">会员总数</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box color-blue fwb20">
                <blockquote v-if='homeList.newMembers !=null'>
                  <count-to
                    :startVal="startVal"
                    :endVal="Number(homeList.newMembers)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">新增会员</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user-solid color-blue"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
               <div class="count-num-box">
                <blockquote v-if='homeList.ordinaryMembers !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.ordinaryMembers)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
               </div>
              <p class="cardItem_p1">新增普通会员</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user-solid color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.agentMembers !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.agentMembers)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">代理裂变会员</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user color-green2"></i>
            </div>
          </div>
        </el-col>
     
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
               <div class="count-num-box">
                <blockquote v-if='homeList.envelopeMembers !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.envelopeMembers)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">红包裂变会员</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.activePeopleNumber !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.activePeopleNumber)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">活跃人数</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user-solid color-blue"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.firstChargeNumber !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.firstChargeNumber)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">首充人数</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user-solid color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.agentFirstChargeNumber !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.agentFirstChargeNumber)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">代理首充</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user color-green2"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top: 20px" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.ordinaryFirstChargeNumber !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.ordinaryFirstChargeNumber)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">普通首充</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-user color-green2"></i>
            </div>
          </div>
        </el-col>
      </div>

      <div class="statistics color-blue">出入金汇总</div>
      <div class="infoCrads">
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.rechargeMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.rechargeMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">充值金额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-coin color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.withdrawalMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-blue"
                    :startVal="startVal"
                    :endVal="Number(homeList.withdrawalMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">已提现金额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-bank-card color-blue"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.toBeWithdrawalMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.toBeWithdrawalMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">待提现金额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-wallet color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==2'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.balance_commission !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.balance_commission)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">用户总余额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-wallet color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==2'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.wait_withdraw_money !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.wait_withdraw_money)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">待审核提现金额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-wallet color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.subCommission !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.subCommission)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">订单分佣</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-money color-green2"></i>
            </div>
          </div>
        </el-col>
    
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.giveMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.giveMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">赠金</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-coin color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.payEnvelopeAmount !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.payEnvelopeAmount)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">购买签到礼包金额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-bank-card color-blue"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.receiveEnvelope !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.receiveEnvelope)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">签到礼包领取</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-money color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.backstageGiftMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-green2"
                    :startVal="startVal"
                    :endVal="Number(homeList.backstageGiftMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">后台赠送礼金</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-money color-green2"></i>
            </div>
          </div>
        </el-col>
      </div>
      <div class="statistics color-red">订单汇总</div>
      <div class="infoCrads">
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
               <div class="count-num-box">
                <blockquote v-if='homeList.bettingNumber !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.bettingNumber)"
                    :duration="2000"
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">订单数</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.bettingMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-blue"
                    :startVal="startVal"
                    :endVal="Number(homeList.bettingMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">下单金额</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-blue"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
               <div class="count-num-box">
                <blockquote v-if='homeList.serviceMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.serviceMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">总服务费</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.userProfit !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.userProfit)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">用户投注盈利</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" v-if='roleType==2'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.service_money !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.service_money)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">收到的服务费</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top: 20px" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.platformServiceMoney !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.platformServiceMoney)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">平台服务费</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-green1"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top: 20px" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
              <div class="count-num-box">
                <blockquote v-if='homeList.totalProfitLoss !=null'>
                  <count-to
                    class="cardItem_p0 color-blue"
                    :startVal="startVal"
                    :endVal="Number(homeList.totalProfitLoss)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">总盈亏</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-blue"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top: 20px" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
               <div class="count-num-box">
                <blockquote v-if='homeList.upperSeparation !=null'>
                  <count-to
                    class="cardItem_p0 color-red"
                    :startVal="startVal"
                    :endVal="Number(homeList.upperSeparation)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">上分</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-red"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top: 20px" v-if='roleType==1'>
          <div class="cardItem">
            <div class="cardItem_txt">
               <div class="count-num-box">
                <blockquote v-if='homeList.downSeparation !=null'>
                  <count-to
                    class="cardItem_p0 color-green1"
                    :startVal="startVal"
                    :endVal="Number(homeList.downSeparation)"
                    :duration="2000"
                    :decimals='decimals'
                  ></count-to>
                </blockquote>
              </div>
              <p class="cardItem_p1">下分</p>
            </div>
            <div class="cardItem_icon">
              <i class="el-icon-s-order color-green1"></i>
            </div>
          </div>
        </el-col>
      </div>
    </el-card>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import {getHome, searchHome,getHomeData } from "@/api/user";
import {getInfo} from "@/api/login"
import { objDele } from "@/utils/validate";
import {canClickFn} from '@/utils/myAPI';
export default {
  data: () => ({
    time: [],
    startVal: 0,
    decimals: 2,
    vistors: 1000,
    homeList: {
      members: null,
      newMembers: null,
      ordinaryMembers: null,
      agentMembers: null,
      envelopeMembers: null,
      activePeopleNumber: null,
      firstChargeNumber: null,
      ordinaryFirstChargeNumber: null,
      agentFirstChargeNumber: null,
      rechargeMoney: null,
      withdrawalMoney: null,
      wait_withdraw_money: null,
      service_money: null,
      balance_commission: null,
      toBeWithdrawalMoney: null,
      subCommission: null,
      giveMoney: null,
      payEnvelope: null,
      receiveEnvelope: null,
      bettingNumber: null,
      bettingMoney: null,
      serviceMoney: null,
      payEnvelopeAmount: null,
      userProfit: null,
      platformServiceMoney: null,
      totalProfitLoss: null,
      backstageGiftMoney: null,
      upperSeparation: null,
      downSeparation: null
    },
    sourcehType: "",
    //注册来源
    sourceList: [
      {
        id: 0,
        label: "普通H5注册",
      },
      {
        id: 1,
        label: "网站测试会员",
      },
    ],
  }),
  components: {
    CountTo,
  },
  activated() {
    this.homeList = {
      members: null,
      newMembers: null,
      ordinaryMembers: null,
      agentMembers: null,
      envelopeMembers: null,
      activePeopleNumber: null,
      firstChargeNumber: null,
      ordinaryFirstChargeNumber: null,
      agentFirstChargeNumber: null,
      rechargeMoney: null,
      withdrawalMoney: null,
      wait_withdraw_money: null,
      service_money: null,
      balance_commission: null,
      toBeWithdrawalMoney: null,
      subCommission: null,
      giveMoney: null,
      payEnvelope: null,
      receiveEnvelope: null,
      bettingNumber: null,
      bettingMoney: null,
      serviceMoney: null,
      payEnvelopeAmount: null,
      userProfit: null,
      platformServiceMoney: null,
      totalProfitLoss: null,
      backstageGiftMoney: null,
      upperSeparation: null,
      downSeparation: null
    }
    this.time = []
    if(this.roleType){
      switch(this.roleType.toString()){
        case "1":
          this.requestHome();
          break;
        case "2":
          this.getAllData()
      }
    }else{
      getInfo({},{hiddenLoadingloading: true}).then((res) => {
        if(res.code == 200){
          let _roleType = res.data.role_type
          localStorage.setItem("roleType", _roleType)
          switch(_roleType.toString()){
            case "1":
              this.requestHome();
              break;
            case "2":
                this.getAllData()
          }
          return _role_type
        }
      })
    }
  },
  computed:{
    roleType(){
      return localStorage.getItem("roleType")
    }
  },
  methods: {
    mySearch(){
      canClickFn(() => {
        this.searchHome()
      })
    },
    searchHome() {
      if(this.roleType == '1'){
        const { time, sourcehType } = this;
        const times = time.map((item) => item / 1000);

        const paramss = {
          timeMap: times,
          reg_source_id: sourcehType,
        };
        const searchData = objDele(paramss);
        searchHome(searchData).then((res) => {
          if (res.code === 200) {
            this.homeList = res.data;
          }
        });
      }else{
        this.getAllData()
      }
      
    },
    // resetHome(){},
    getAllData() {
      getHomeData({
        start_time: (this.time && this.time.length !=0) ? this.time[0]/1000 : '',
        end_time: (this.time && this.time.length !=0) ? this.time[1]/1000 : ''
      }).then((resp) => {
        if(resp.code == 200){
          let res = resp.data
          let member_data = res.member_data
          let money_data = res.money_data
          let order_data = res.order_data
          const datas = {
            members: member_data.member_total,
            newMembers: member_data.new_member_num,
            activePeopleNumber: member_data.active_member_num,
            firstChargeNumber: member_data.first_recharge_num,
            rechargeMoney: money_data.recharge_money,
            withdrawalMoney: money_data.success_withdraw_money,
            wait_withdraw_money: money_data.wait_withdraw_money,
            balance_commission: money_data.balance_commission,
            subCommission: money_data.commission_money,
            payEnvelopeAmount: money_data.sign_money,
            receiveEnvelope: money_data.receive_sign_money,
            giveMoney: money_data.giveMoney,
            bettingNumber: order_data.order_num,
            bettingMoney: order_data.order_money,
            userProfit: order_data.order_win_money,
            service_money: order_data.service_money
          };
          this.homeList = datas;
        }
      })
    },
    /**
     * 获取数据
     */
    requestHome() {
      // console.log('走着')
      getHome().then((res) => {
        if (res.code === 200) {
          // for (const i in res.data) {
          //   if (res.data.hasOwnProperty(i)) {
          //     const element = Number(res.data[i]);

          //   }
          // }
          const {
            members,
            newMembers,
            ordinaryMembers,
            agentMembers,
            envelopeMembers,
            activePeopleNumber,
            firstChargeNumber,
            ordinaryFirstChargeNumber,
            agentFirstChargeNumber,
            rechargeMoney,
            withdrawalMoney,
            toBeWithdrawalMoney,
            subCommission,
            giveMoney,
            payEnvelope,
            receiveEnvelope,
            bettingNumber,
            bettingMoney,
            serviceMoney,
            payEnvelopeAmount,
            userProfit,
            platformServiceMoney,
            totalProfitLoss,
            backstageGiftMoney,
            upperSeparation,
            downSeparation,
          } = res.data;
          const datas = {
            members: Number(members),
            newMembers: Number(newMembers),
            ordinaryMembers: ordinaryMembers,
            agentMembers: Number(agentMembers),
            envelopeMembers: Number(envelopeMembers),
            activePeopleNumber: Number(activePeopleNumber),
            firstChargeNumber: Number(firstChargeNumber),
            ordinaryFirstChargeNumber: Number(ordinaryFirstChargeNumber),
            agentFirstChargeNumber: agentFirstChargeNumber,
            rechargeMoney: Number(rechargeMoney),
            withdrawalMoney: Number(withdrawalMoney),
            toBeWithdrawalMoney: Number(toBeWithdrawalMoney),
            subCommission: Number(subCommission),
            giveMoney: Number(giveMoney),
            payEnvelope: Number(payEnvelope),
            receiveEnvelope: Number(receiveEnvelope),
            bettingNumber: Number(bettingNumber),
            bettingMoney: Number(bettingMoney),
            serviceMoney: Number(serviceMoney),
            payEnvelopeAmount: Number(payEnvelopeAmount),
            userProfit: Number(userProfit),
            platformServiceMoney: Number(platformServiceMoney),
            totalProfitLoss: Number(totalProfitLoss),
            backstageGiftMoney: Number(backstageGiftMoney),
            upperSeparation: Number(upperSeparation),
            downSeparation: Number(downSeparation),
          };
          this.homeList = datas;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.count-num-box{
  height: 25px;
}
.fwb20{font-weight: bold;font-size: 20px;}
.animateClass {
  .user_p0,
  .user_p1,
  .user_img {
    animation: bounceInUp 1s;
  }
}
.user {
  overflow: hidden;
  .user_p0 {
    font-size: 36px;
    text-align: center;
    padding-top: 55px;
    animation-fill-mode: forwards;
  }
  .user_p1 {
    font-size: 20px;
    text-align: center;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  .user_img {
    text-align: center;
    margin-top: 46px;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
}
$mgTop: 30px;
@mixin shadow {
  box-shadow: 0 0 10px #e2e2e2;
}
.color-green1 {
  color: #40c9c6 !important;
}
.color-blue {
  color: #36a3f7 !important;
}
.color-red {
  color: #f4516c !important;
}
.color-green2 {
  color: #34bfa3 !important;
}
.dashbord {
  background-color: #f0f3f4;
}
.infoCrads {
  margin: 0 -20px 0 -20px;
  .el-col {
    padding: 0 20px;
    .cardItem {
      height: 108px;
      margin-bottom: 20px;
      background: rgb(234, 235, 236);
    }
  }
}
.infoCrads{
  display: flex;
  flex-wrap: wrap;
}
.infoCrads::after{
  content: '';
  flex: auto
}
.cardItem {
  color: rgb(14, 1, 1);
  font-size: 18px;
  position: relative;
  @include shadow();
  .cardItem_txt {
    float: left;
    margin: 26px 0 0 20px;

    .cardItem_p0 {
      font-size: 20px;
      font-weight: bold;
    }
    .cardItem_p1 {
      font-size: 18px;
      font-weight: bold;
      max-width: 110px;
    }
  }
  .cardItem_icon {
    position: absolute;
    top: 24px;
    right: 15px;
    i {
      font-size: 55px;
    }
  }
}
.lCharts {
  background: #fff;
  margin-top: $mgTop;
  padding: 30px 0;
  @include shadow();
}
.barCharts {
  background: #fff;
  margin-top: $mgTop;
  padding: 30px 0;
  @include shadow();
}
.pieCharts {
  background: #fff;
  padding: 20px 0;
  @include shadow();
}
.tableChart {
  margin-top: $mgTop;
}
.statistics {
  color: #34bfa3;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0;
}
</style>
