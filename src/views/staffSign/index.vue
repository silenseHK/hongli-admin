<template>
  <div>
    <el-card>
      <div slot="header">
          <el-form :model="signData" ref="stroleRef" class="w_fW">
            <el-form-item prop="phone" class="w230">
              <el-input
                v-model="signData.phone"
                placeholder="会员手机号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="user_id" class="w230">
              <el-input
                v-model="signData.user_id"
                placeholder="会员ID"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item size="normal" prop="time" class="w450">
              <el-date-picker
                v-model="signData.time"
                type="datetimerange"
                align="right"
                unlink-panels
                size="medium"
                range-separator="至"
                start-placeholder="购买时间"
                end-placeholder="购买时间"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item class="w230">
              <el-button type="primary" size="medium" @click="mySearch">搜索</el-button>
              <el-button type="success" size="medium" @click="handelReset">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
      <el-table :data="SignLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="会员ID" width="130"> </el-table-column>
        <el-table-column prop="phone_hide" label="会员手机号" width="200">
        </el-table-column>
        <el-table-column prop="nickname" label="会员昵称" width="200">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="礼包单价"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="daily_rebate"
          label="礼包每日领取金额"
          width="170"
        ></el-table-column>

        <el-table-column label="购买时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="过期时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="yet_receive_count"
          label="已领取次数"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="yet_receive_amount"
          label="已领取金额"
          width="200"
        ></el-table-column>
      </el-table>
      <div class="pagination-bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-sizes="[10, 40, 80, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { staffGetSign } from "@/api/financial";
import { objDele } from "@/utils/validate";
export default {
  name: "staffSign",
  data: () => ({
    SignLists: [],
    signData: {
      phone: "",
      time: [],
      user_id: ""
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
  activated() {
    this.init()
    this.getCharge();
  },
  methods: {
    init(){
      this.signData = {
        phone: "",
        time: [],
        user_id: ""
      }
      this.pageIndex = 1
    },
    mySearch(){
      this.pageIndex = 1
      this.getCharge()
    },
    /**
     * 获取充值列j
     */
    getCharge() {
      let {phone,time,user_id} = this.signData
      let params = {
        phone,
        user_id,
        start_time: (time && time.length !=0) ? time[0]/1000 : '',
        end_time: (time && time.length !=0) ? time[1]/1000 : '',
        page: this.pageIndex,
        size: this.pageSize
      }
      staffGetSign(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data
          this.SignLists = res.data;
          this.total = res.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCharge();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getCharge();
      console.log(`当前页: ${val}`);
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1
      this.$refs.stroleRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>