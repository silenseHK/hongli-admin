<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-button type="success" size="medium" @click="pending" :plain="plain1"
          >待审核</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="auditfailed"
          :plain="plain2"
          >审核未通过</el-button
        >
        <el-button
          type="primary"
          size="medium"
          @click="examination"
          :plain="plain3"
          >审核通过</el-button
        >
      </div>
      <!-- card body -->
      <el-form :model="withData" ref="stroleRef" class="w_fW">
        <el-form-item prop="transaction" class="w230">
          <el-input
            v-model="withData.transaction"
            placeholder="交易单号"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="user_id" class="w230">
          <el-input
            v-model="withData.user_id"
            placeholder="会员ID"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" class="w230">
          <el-input
            v-model="withData.phone"
            placeholder="会员手机号"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item size="normal" prop="arriveTime" class="w450">
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
        <el-form-item size="normal" prop="withdrawTime" v-if="status != 0" class="w450">
          <el-date-picker
            v-model="withData.withdrawTime"
            type="datetimerange"
            align="right"
            unlink-panels
            size="medium"
            placeholder="提现时间"
            range-separator="至"
            start-placeholder="审批时间"
            end-placeholder="审批时间"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <div class='w230' style="margin-bottom: 30px">
          <el-button type="primary" size="medium" @click="mySearch"
            >搜索</el-button
          >
          <el-button type="success" size="medium" @click="handelReset"
            >重置</el-button
          >
          <el-button type="primary" size="medium" @click="handleRefresh"
            >刷新</el-button
          >
        </div>
      </el-form>
     

      <el-table :data="chargeLists" border stripe>
        <el-table-column prop="id" key="1" label="#" width="70">
        </el-table-column>
        <el-table-column prop="user_id" key="1" label="会员ID" width="130">
        </el-table-column>
        <el-table-column prop="order_no" label="单号" key="3" width="230">
        </el-table-column>
        <el-table-column
          key="4"
          prop="user.phone_hide"
          label="会员手机号"
          width="130"
        >
        </el-table-column>
        <el-table-column key="5" prop="nickname" label="会员名称" width="330">
        </el-table-column>
        <el-table-column
          key="6"
          prop="pay_status"
          label="支付状态"
          width="130"
          v-if="status === 1"
        >
          <template slot-scope="scope">
            <el-tag
              type="warning"
              size="mini"
              effect="dark"
              v-if="scope.row.pay_status === 0"
              >三方未支付</el-tag
            >
            <el-tag type="warning" size="mini" effect="dark" v-else
              >三方已支付</el-tag
            >

            <!-- <span>{{
              scope.row.pay_status === 0 ? "三方未支付" : "三方已支付"
            }}</span> -->
          </template>
        </el-table-column>
        <el-table-column key="7" prop="money" label="提现金额" width="130">
        </el-table-column>
        <el-table-column key="8" label="提现方式" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.type === 0 ? "用户提现" : "代理提现" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="service_charge"
          key="9"
          label="手续费"
          width="130"
        >
        </el-table-column>
        <el-table-column prop="payment" key="10" label="打款金额" width="130">
        </el-table-column>
        <el-table-column
          prop="account_holder"
          key="11"
          label="收款人"
          width="130"
        >
        </el-table-column>
        <el-table-column
          key="12"
          prop="ifsc_code"
          label="IFSC CODE"
          width="130"
        >
        </el-table-column>
        <el-table-column key="13" prop="phone" label="持卡人电话" width="130">
        </el-table-column>
        <el-table-column
          key="14"
          prop="bank_number"
          label="银行卡号"
          width="170"
        >
        </el-table-column>

        <el-table-column
          key="15"
          prop="create_time"
          label="申请时间"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="16"
          prop="user.total_recharge"
          label="累计充值"
          width="130"
        >
        </el-table-column>
        <el-table-column
          key="17"
          prop="user.cl_withdrawal"
          label="累计提现"
          width="130"
        >
        </el-table-column>
        <el-table-column
          key="18"
          prop="user.commission"
          label="累计提佣"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="user.cl_betting_total"
          label="累计单数"
          width="130"
          key="19"
        >
        </el-table-column>
        <el-table-column
          prop="user.cl_betting"
          label="累计下单金额"
          width="130"
          key="20"
        >
        </el-table-column>
        <el-table-column
          prop="approval_time"
          key="21"
          label="审批时间"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.approval_time | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="order_no"
          key="22"
          label="交易订单号"
          width="230"
        >
        </el-table-column>
        <el-table-column
          key="23"
          v-if="status == 2"
          label="审核不通过理由"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="loan_time"
          key="24"
          label="到账时间"
          width="180"
          v-else
        >
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
    </el-card>
  </div>
</template>

<script>
import { staffGetwithdrawal, allBy, allFila, getCancel } from "@/api/financial";
import { objDele } from "@/utils/validate";
export default {
  name: "staffFinancial",
  data: () => ({
    plain2: true,
    plain1: false,
    plain3: true,
    chargeLists: [],
    withData: {
      transaction: "",
      phone: "",
      arriveTime: [],
      withdrawTime: [],
      user_id: ""
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 0,
  }),
  activated() {
    this.init();
    this.getCharge();
  },
  methods: {
    init() {
      this.plain2 = true;
      this.plain1 = false;
      this.plain3 = true;
      this.withData = {
        transaction: "",
        phone: "",
        arriveTime: [],
        withdrawTime: [],
        user_id: ""
      };
      this.pageIndex = 1;
      this.status = 0;
    },
    mySearch() {
      this.pageIndex = 1;
      this.getCharge();
    },

    /**
     * 获取充值列j
     */
    getCharge() {
      let { transaction, phone, arriveTime, withdrawTime, user_id } = this.withData;
      let params = {
        status: this.status,
        order_no: transaction,
        phone,
        user_id,
        start_time_withdraw:
          arriveTime && arriveTime.length != 0 ? arriveTime[0] / 1000 : "",
        end_time_withdraw:
          arriveTime && arriveTime.length != 0 ? arriveTime[1] / 1000 : "",
        start_time_exam:
          withdrawTime && withdrawTime.length != 0
            ? withdrawTime[0] / 1000
            : "",
        end_time_exam:
          withdrawTime && withdrawTime.length != 0
            ? withdrawTime[1] / 1000
            : "",
        page: this.pageIndex,
        size: this.pageSize,
      };
      staffGetwithdrawal(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data;
          this.chargeLists = res.data;
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
    handleRefresh() {
      this.getCharge();
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1;
      this.$refs.stroleRef.resetFields();
    },
    /**
     * 审核通过按钮
     */
    examination() {
      this.plain1 = true;
      this.plain2 = true;
      this.plain3 = false;
      this.status = 1;
      this.pageIndex = 1;
      (this.withData = {
        transaction: "",
        phone: "",
        arriveTime: [],
        withdrawTime: [],
      }),
        this.getCharge();
    },
    /**
     * 待审核
     */
    pending() {
      this.plain1 = false;
      this.plain2 = true;
      this.plain3 = true;
      this.status = 0;
      this.pageIndex = 1;
      this.withData = {
        transaction: "",
        phone: "",
        arriveTime: [],
        withdrawTime: [],
      };
      this.getCharge();
    },

    /**
     * 审核未通过
     */
    auditfailed() {
      this.plain1 = true;
      this.plain2 = false;
      this.plain3 = true;
      this.status = 2;
      this.pageIndex = 1;
      this.withData = {
        transaction: "",
        phone: "",
        arriveTime: [],
        withdrawTime: [],
      };
      this.getCharge();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>