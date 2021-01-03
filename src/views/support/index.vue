<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="24">
          <el-form :model="supportData" ref="stroleRef">
            <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="name">
                <el-input
                  v-model="supportData.name"
                  placeholder="单号"
                  size="medium"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="phone">
                <el-input
                  v-model="supportData.phone"
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
                  v-model="supportData.time"
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
      </div>
      <el-table :data="getSupports" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>

        <el-table-column prop="order_no" label="单号" width="300">
        </el-table-column>
        <el-table-column prop="phone" label="会员手机号" width="300">
        </el-table-column>

        <el-table-column prop="nickname" label="会员名称" width="300">
        </el-table-column>
        <el-table-column prop="money" label="提佣金额" width="300">
        </el-table-column>

        <el-table-column prop="time" label="申请时间" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.time | formatDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="type" label="收益类型">
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
        </el-table-column> -->
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
import { getSupport, searSupport } from "@/api/financial";
export default {
  name: "support",
  data: () => ({
    getSupports: [],
    supportData: {
      phone: "",
      time: [],
      name: "",
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
  created() {
    this.getCharge();
  },
  methods: {
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex } = this;
      getSupport(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.getSupports = res.data.list;
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
      const { phone, time, name } = this.supportData;
      const times = time.map((item) => item / 1000);
      const params = {
        conditions: {
          order_no: name,
          phone: phone,
          time: times,
        },
        ops: {
          order_no: "like",
          phone: "like",
          time: "between",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      searSupport(params).then((res) => {
        if (res.code === 200) {
          this.getSupports = res.data.list;
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
  },
};
</script>

<style lang="scss" scoped>
</style>