<template>
  <div>
    <el-row :gutter="24" style="margin-bottom: 30px">
      <el-form :model="withData" ref="stroleRef" inline>
        <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
          <el-form-item prop="phone">
            <el-input
              v-model="withData.single"
              placeholder="单号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
          <el-form-item prop="phone">
            <el-input
              v-model="withData.transaction"
              placeholder="交易单号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
          <el-form-item prop="phone">
            <el-input
              v-model="withData.phone"
              placeholder="会员手机号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          :offset="0"
          :xl="6"
          :lg="8"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <el-form-item size="normal" prop="time">
            <el-date-picker
              v-model="withData.arriveTime"
              type="datetimerange"
              align="right"
              unlink-panels
              size="medium"
              placeholder="提现时间"
              range-separator="至"
              start-placeholder="提现时间"
              end-placeholder="提现时间"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          :offset="0"
          :xl="6"
          :lg="8"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <el-form-item size="normal" prop="time">
            <el-date-picker
              v-model="withData.withdrawTime"
              type="datetimerange"
              align="right"
              unlink-panels
              size="medium"
              placeholder="提现时间"
              range-separator="至"
              start-placeholder="到账时间"
              end-placeholder="到账时间"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          :offset="0"
          :xl="6"
          :lg="6"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <el-button type="primary" size="medium" @click="handelSearch"
            >搜索</el-button
          >
          <el-button type="info" size="medium" @click="handelReset"
            >重置</el-button
          >
        </el-col>
      </el-form>
    </el-row>

    <el-table :data="chargeLists" border stripe>
      <el-table-column prop="id" label="#" width="70"> </el-table-column>
      <el-table-column prop="order_no" label="单号" width="130">
      </el-table-column>
      <el-table-column prop="phone" label="会员手机号" width="130">
      </el-table-column>
      <el-table-column prop="nickname" label="会员名称" width="130">
      </el-table-column>
      <el-table-column prop="money" label="提现金额" width="130">
      </el-table-column>
      <el-table-column prop="service_charge" label="手续费" width="130">
      </el-table-column>
      <el-table-column prop="payment" label="打款金额" width="130">
      </el-table-column>
      <el-table-column prop="account_holder" label="收款人" width="130">
      </el-table-column>
      <el-table-column prop="bank.ifsc_code" label="IFSC CODE" width="130">
      </el-table-column>
      <el-table-column prop="bank.bank_num" label="银行卡号" width="130">
      </el-table-column>

      <el-table-column prop="create_time" label="申请时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user.total_recharge" label="累计充值" width="130">
      </el-table-column>
      <el-table-column prop="user.cl_withdrawal" label="累计提现" width="130">
      </el-table-column>
      <el-table-column prop="user.cl_commission" label="累计提佣" width="130">
      </el-table-column>
      <el-table-column
        prop="user.cl_betting_total"
        label="累计单数"
        width="130"
      >
      </el-table-column>
      <el-table-column prop="user.cl_betting" label="累计下单金额" width="130">
      </el-table-column>
      <el-table-column prop="approval_time" label="审批时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.approval_time | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_no" label="交易订单号" width="130">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="130">
      </el-table-column>
      <el-table-column prop="loan_time" label="到账时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.loan_time | formatDate }}</span>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { withSearch } from "@/api/financial";
export default {
  name: "firstStroke",
  data: () => ({
    chargeLists: [],
    withData: {
      single: "",
      transaction: "",
      phone: "",
      arriveTime: "",
      withdrawTime: "",
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 0,
  }),
  created() {
    this.getCharge();
  },
  methods: {
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex, status } = this;

      const params = {
        conditions: {
          status: status,
        },
        ops: {
          status: "=",
        },
        page: pageIndex,
        limit: pageSize,
      };
      withSearch(params).then((res) => {
        if (res.code === 200) {
          this.chargeLists = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCharge();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getCharge();
      this.pageIndex = val;
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      const { phone, time } = this.withData;
      const params = {
        conditions: {
          phone: phone,
          time: time,
        },
        ops: {
          phone: "like",
          time: "between",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      console.log(params);
      //   chargeSearch(params).then((res) => {
      //     if (res.code === 200) {
      //       this.chargeLists = res.data.list;
      //       this.total = res.total;
      //     }
      //   });
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1
      this.$refs.stroleRef.resetFields();
      // this.getCharge();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>