<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span><!-- card title --></span>
        <el-row :gutter="20">
          <el-form :model="perFormdata" ref="perform" size="normal">
            <el-col :span="7" :offset="0">
              <el-form-item prop="time">
                <el-date-picker
                  v-model="perFormdata.time"
                  type="datetimerange"
                  align="right"
                  unlink-panels
                  size="small"
                  range-separator="-"
                  start-placeholder="选择时间"
                  end-placeholder="选择时间"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="0" style="margin-top: 4px">
              <el-button type="primary" size="small" @click="handelSearch"
                >搜索</el-button
              >
              <el-button type="success" size="small" @click="handelRest"
                >重置</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <!-- card body -->
      <el-table :data="perFormanceList" border stripe>
        <el-table-column prop="id" label="#" width="80"> </el-table-column>
        <el-table-column prop="phone" label="代理账号" width="200">
        </el-table-column>
        <el-table-column prop="members" label="会员数" width="120">
        </el-table-column>
        <el-table-column prop="newMembers" label="新增会员" width="120">
        </el-table-column>
        <el-table-column
          prop="ordinaryMembers"
          label="普通新增会员"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="agentMembers" label="代理裂变会员" width="120">
        </el-table-column>
        <el-table-column
          prop="envelopeMembers"
          label="红包裂变会员"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="activePeopleNumber" label="活跃人数" width="120">
        </el-table-column>
        <el-table-column prop="firstChargeNumber" label="首充人数" width="120">
        </el-table-column>
        <el-table-column prop="rechargeMoney" label="充值金额" width="120">
        </el-table-column>
        <el-table-column prop="withdrawalMoney" label="提现金额" width="120">
        </el-table-column>
        <el-table-column
          prop="toBeWithdrawalMoney"
          label="待提现金额"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="120">
        </el-table-column>
        <el-table-column prop="subCommission" label="订单分佣" width="120">
        </el-table-column>
        <el-table-column prop="giveMoney" label="赠金" width="120">
        </el-table-column>
        <el-table-column prop="payEnvelope" label="够买签到礼包" width="120">
        </el-table-column>
        <el-table-column
          prop="receiveEnvelope"
          label="领取签到礼包"
          width="120"
        >
        </el-table-column>
        <!-- <el-table-column prop="col.id" label="礼包分佣" width="120">
        </el-table-column> -->
        <el-table-column prop="bettingNumber" label="订单数" width="120">
        </el-table-column>
        <el-table-column prop="bettingMoney" label="下单金额" width="120">
        </el-table-column>
        <el-table-column prop="serviceMoney" label="服务费" width="120">
        </el-table-column>
        <!-- <el-table-column prop="col.id" label="利差" width="120">
        </el-table-column> -->
      </el-table>
      <!-- card body -->
      <div class="pagination-bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getReport, searchReport } from "@/api/statistical";
export default {
  name: "Performance",
  data: () => ({
    perFormdata: {
      time: [],
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    perFormanceList: [],
  }),
  created() {
    this.getPerform();
  },
  methods: {
    getPerform() {
      const { pageSize, pageIndex } = this;
      getReport(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.perFormanceList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPerform();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getPerform();
      console.log(`当前页: ${val}`);
    },
    handelSearch() {
      const { time } = this.perFormdata;
      const times = time.map((item) => {
        return item / 1000;
      });
      const params = {
        timeMap: times,
        page: this.pageIndex,
        limit: this.pageSize,
      };
      searchReport(params).then((res) => {
        if (res.code === 200) {
          this.perFormanceList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    /**
     * 重置按
     */
    handelRest() {
      this.$refs.perform.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>