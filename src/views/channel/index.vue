<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-form :model="search" ref="stroleRef">
            <el-col :span="6"
                    :offset="0"
                    :xl="6"
                    :lg="8"
                    :md="24"
                    :sm="24"
                    :xs="24">
              <el-form-item prop="time">
                <el-date-picker
                    v-model="search.time"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    size="medium"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="截至时间"
                    value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5"
                    :offset="0"
                    :xl="6"
                    :lg="6"
                    :md="24"
                    :sm="24"
                    :xs="24"
              style="margin-left:10px;"
            >
              <el-button type="primary" size="medium" @click="getCharge"
                >搜索</el-button
              >
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <transition name="el-zoom-in-top">
            <ul class="alert-info" >
              <li>
                <h1>充值总金额:</h1>
                <span>{{ all.recharge }}</span>
              </li>
              <li>
                <h1>提现总金额:</h1>
                <span>{{ all.withdraw.withdraw_money }}</span>
              </li>
<!--              <li>-->
<!--                <h1>提现总服务费:</h1>-->
<!--                <span>{{ all.withdraw.service_charge }}</span>-->
<!--              </li>-->
            </ul>
          </transition>
        </el-row>
      </div>
      <el-table :data="list" border stripe>
        <el-table-column prop="channel" label="通道" width="200"> </el-table-column>
        <el-table-column prop="statistics.recharge" label="充值金额">
        </el-table-column>
        <el-table-column prop="statistics.withdraw.withdraw_money" label="提现金额">
        </el-table-column>
<!--        <el-table-column prop="statistics.withdraw.service_charge" label="提现手续费">-->
<!--        </el-table-column>-->
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { statistics } from "@/api/channel";
export default {
  name: "bankcard",
  data: () => ({
    bankCardList: [],
    list: [],
    all: {
      recharge: 0,
      withdraw: {
        withdraw_money: 0,
      }
    },
    search: {
      time: []
    },
  }),
  created() {
    this.getCharge();
  },
  methods: {
    /**
     * 获取充值列j
     */
    getCharge() {
      let {time} = this.search;
      let [start_time, end_time] = [0,0]
      if(time){
        const times = time.map((item) => {
          return item / 1000;
        });
        start_time = times[0];
        end_time = times[1];
      }

      statistics({start_time, end_time}).then((res)=>{
        if(res.code == 200){
          this.list = res.data.list;
          this.all = res.data.all;
        }else{
          this.$message.error(res.msg)
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-info {
  widows: 100%;
  margin: 20px 0;
  height: 50px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  > li {
    display: flex;
    font-weight: bold;
    font-size: 20px;
    padding: 0 30px;
  }
}
</style>