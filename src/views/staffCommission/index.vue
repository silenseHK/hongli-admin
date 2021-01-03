<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button
          type="primary"
          size="medium"
          @click="firstAgent"
          :plain="plain1"
          >一级代理</el-button
        >
        <el-button
          type="success"
          size="medium"
          @click="lastAgent"
          :plain="plain2"
          >二级代理</el-button
        >
      </div>
      <el-form :model="commissionData" ref="stroleRef" class="w_fW">
        <el-form-item prop="phone" class="w230">
          <el-input
            v-model="commissionData.phone"
            placeholder="会员手机号"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
         <el-form-item prop="user_id" class="w230">
          <el-input
            v-model="commissionData.user_id"
            placeholder="会员ID"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="subordinate" class="w230">
          <el-input
            v-model="commissionData.subordinate"
            placeholder="下级会员手机号"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item size="normal" prop="time" class="w450">
          <el-date-picker
            v-model="commissionData.time"
            type="datetimerange"
            align="right"
            unlink-panels
            size="medium"
            range-separator="至"
            start-placeholder="最新分佣时间"
            end-placeholder="最新分佣时间"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <div style="margin-bottom: 20px" class="w230">
          <el-button type="primary" size="medium" @click="mySearch"
            >搜索</el-button
          >
          <el-button type="success" size="medium" @click="handelReset"
            >重置</el-button
          >
        </div>
      </el-form>
      <el-table :data="getCommissions" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="charge_user_id" label="会员ID" width="130"> </el-table-column>
        <el-table-column
          prop="charge_user.phone_hide"
          label="会员手机号"
          width="230"
        >
        </el-table-column>
        <el-table-column
          prop="charge_user.nickname"
          label="会员名称"
          width="230"
        >
        </el-table-column>

        <el-table-column prop="betting_user_id" label="下级账号" width="230">
        </el-table-column>
        <el-table-column prop="money" label="分佣金额" width="230">
        </el-table-column>

        <el-table-column label="分佣时间" width="230">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收益类型">
          <template slot-scope="scope">
            <el-tag
              type="success"
              size="medium"
              effect="dark"
              v-if="scope.row.type === 0"
              >系统收益
            </el-tag>
            <el-tag
              type="success"
              size="medium"
              effect="dark"
              v-else-if="scope.row.type === 1"
              >一级代理</el-tag
            >
            <el-tag type="success" size="medium" effect="dark" v-else
              >二级代理</el-tag
            >
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
import { staffGetCommission } from "@/api/financial";
// import { objDele } from "@/utils/validate";
export default {
  name: "staffCommission",
  data: () => ({
    getCommissions: [],
    commissionData: {
      phone: "",
      subordinate: "",
      time: [],
      user_id: ""
    },
    plain1: false,
    plain2: true,

    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 1,
  }),
  activated() {
    this.init();
    this.getCharge();
  },
  methods: {
    init() {
      this.commissionData = {
        phone: "",
        subordinate: "",
        time: [],
        user_id: ""
      };
      this.plain1 = false;
      this.plain2 = true;
      this.pageIndex = 1;
      this.status = 1;
    },
    mySearch() {
      this.pageIndex = 1;
      this.getCharge();
    },
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex, status } = this;
      let { phone, subordinate, time, user_id } = this.commissionData;
      let params = {
        type: this.status,
        user_phone: phone,
        betting_user_phone: subordinate,
        start_time: time && time.length != 0 ? time[0] / 1000 : "",
        end_time: time && time.length != 0 ? time[1] / 1000 : "",
        page: this.pageIndex,
        size: this.pageSize,
        user_id
      };
      staffGetCommission(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data;
          this.getCommissions = res.data;
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
      this.pageIndex = 1;
      this.$refs.stroleRef.resetFields();
    },
    /**
     * 一级代理
     */
    firstAgent() {
      this.plain1 = false;
      this.plain2 = true;
      this.status = 1;
      this.pageIndex = 1;
      this.commissionData = {
        phone: "",
        subordinate: "",
        time: [],
      };
      this.getCharge();
    },
    /**
     * 二级代理
     */
    lastAgent() {
      this.plain1 = true;
      this.plain2 = false;
      this.status = 2;
      this.pageIndex = 1;
      this.commissionData = {
        phone: "",
        subordinate: "",
        time: [],
      };
      this.getCharge();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>