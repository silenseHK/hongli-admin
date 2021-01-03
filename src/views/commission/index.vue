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
      <el-row :gutter="24">
        <el-form :model="commissionData" ref="stroleRef">
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="phone">
              <el-input
                v-model="commissionData.phone"
                placeholder="会员手机号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="subordinate">
              <el-input
                v-model="commissionData.subordinate"
                placeholder="下级会员手机号"
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
            <el-button type="success" size="medium" @click="handelReset"
              >重置</el-button
            >
          </el-col>
        </el-form>
      </el-row>
      <el-table :data="getCommissions" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>

        <el-table-column prop="user.phone" label="会员手机号" width="230">
        </el-table-column>
        <el-table-column prop="user.nickname" label="会员名称" width="230">
        </el-table-column>

        <el-table-column prop="charge_user.phone" label="下级账号" width="230">
        </el-table-column>
        <el-table-column prop="number" label="分佣订单个数" width="230">
        </el-table-column>
        <el-table-column prop="money" label="分佣金额" width="230">
        </el-table-column>

        <el-table-column prop="create_time" label="最新分佣时间" width="230">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收益类型">
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
import { getCommission, searchCommission } from "@/api/financial";
// import { objDele } from "@/utils/validate";
export default {
  name: "commission",
  data: () => ({
    getCommissions: [],
    commissionData: {
      phone: "",
      time: [],
      subordinate: ''
    },
    plain1: false,
    plain2: true,

    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 1,
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
  created() {
    this.getCharge();
  },
  methods: {
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex, status } = this;
      getCommission(pageSize, pageIndex, status).then((res) => {
        if (res.code === 200) {
          this.getCommissions = res.data.list;
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
      this.pageIndex = val;
      this.getCharge();
      
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      const { phone, time, subordinate } = this.commissionData;
      const times = time.map((item) => item / 1000);
      // const searchData = {
      //   user_phone: phone,
      //   charge_phone: subordinate,
      //   create_time: times,
      //   type: 1,
      //   status: status,
      //   reg_source_id: sourcehType,
      // };
      // const paramss = objDele(searchData);
      const params = {
        conditions: {
          user_phone: phone,
          charge_phone: subordinate,
          create_time: times,
          type: 1,
          status: status,
        },
        ops: {
          user_phone: "like",
          charge_phone: "like",
          create_time: "between",
          type: "=",
          status: "=",
          reg_source_id: "=",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      searchCommission(params).then((res) => {
        if (res.code === 200) {
          this.getCommissions = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1
      this.$refs.stroleRef.resetFields();
      // this.getCharge();
    },
    /**
     * 一级代理
     */
    firstAgent() {
      this.plain1 = false;
      this.plain2 = true;
      this.status = 1;
      this.pageIndex = 1
      this.commissionData = {
        phone: "",
        time: [],
        subordinate: ''
      }
      this.getCharge();
    },
    /**
     * 二级代理
     */
    lastAgent() {
      this.plain1 = true;
      this.plain2 = false;
      this.status = 2;
      this.pageIndex = 1
      this.commissionData = {
        phone: "",
        time: [],
        subordinate: ''
      }
      this.getCharge();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>