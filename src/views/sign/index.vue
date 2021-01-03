<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="24">
          <el-form :model="signData" ref="stroleRef">
            <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="phone">
                <el-input
                  v-model="signData.phone"
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
            </el-col>
            <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="sourcehType">
                <el-select
                  v-model="signData.sourcehType"
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
              </el-form-item>
            </el-col>
            <!-- <el-col
              :span="3"
              :offset="0"
              :xl="3"
              :lg="8"
              :md="24"
              :sm="24"
              :xs="24"
            >
              <el-form-item prop="accounType">
                <el-select
                  v-model="signData.accounType"
                  filterable
                  size="medium"
                  placeholder="是否是测试用户"
                >
                  <el-option
                    v-for="item in accountList"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
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
      <el-table :data="SignLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="phone" label="会员手机号" width="200">
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

        <el-table-column prop="start_time" label="购买时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="过期时间" width="200">
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
import { getSign, searSign } from "@/api/financial";
import { objDele } from "@/utils/validate";
export default {
  name: "sign",
  data: () => ({
    SignLists: [],
    signData: {
      phone: "",
      time: [],
      accounType: "",
      sourcehType: "",
    },
    accountList: [
      {
        id: 1,
        text: "是",
      },
      {
        id: 2,
        text: "否",
      },
    ],
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
      getSign(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.SignLists = res.data.list;
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
      const { phone, time, sourcehType } = this.signData;
      const times = time.map((item) => {
        return item / 1000;
      });

      const searchData = {
        phone: phone,
        start_time: times,
        reg_source_id: sourcehType,
      };
      const paramss = objDele(searchData);
      const params = {
        conditions: paramss,
        ops: {
          phone: "like",
          start_time: "between",
          reg_source_id: "=",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      searSign(params).then((res) => {
        if (res.code === 200) {
          this.SignLists = res.data.list;
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