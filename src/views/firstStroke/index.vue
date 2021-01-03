<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="24">
          <el-form :model="strokeData" ref="stroleRef">
            <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="phone">
                <el-input
                  v-model="strokeData.phone"
                  placeholder="会员手机号"
                  size="small"
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
                  v-model="strokeData.time"
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
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="sourcehType">
                <el-select
                  v-model="strokeData.sourcehType"
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
            <el-col
              :span="5"
              :offset="0"
              :xl="6"
              :lg="6"
              :md="24"
              :sm="24"
              :xs="24"
              style="margin-top: 5px"
            >
              <el-button type="primary" size="small" @click="handelSearch"
                >搜索</el-button
              >
              <el-button type="success" size="small" @click="handelReset"
                >重置</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="chargeLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user.nickname" label="用户昵称" width="170">
        </el-table-column>
        <el-table-column prop="user.phone" label="用户手机号" width="170">
        </el-table-column>
        <el-table-column
          prop="user.total_recharge"
          label="累计充值"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="user.cl_withdrawal"
          label="累计提现"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="user.balance"
          label="余额"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="user.commission"
          label="持有佣金"
          width="170"
        ></el-table-column>

        <el-table-column prop="user.one_recommend_phone" label="一级推荐人">
        </el-table-column>
        <el-table-column prop="user.two_recommend_phone" label="二级推荐人">
        </el-table-column>
        <el-table-column prop="time" label="首充时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.time | formatDate }}</span>
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
import { chargeList, chargeSearch } from "@/api/user";
import { objDele } from "@/utils/validate";
export default {
  name: "firstStroke",
  data: () => ({
    chargeLists: [],
    strokeData: {
      phone: "",
      time: [],
      sourcehType: "",
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
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
      const { pageSize, pageIndex } = this;
      chargeList(pageSize, pageIndex).then((res) => {
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
      this.pageIndex = val;
      this.getCharge();
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      const { phone, time, sourcehType } = this.strokeData;
      const times = time.map((item) => {
        return item / 1000;
      });
      const searchData = {
        phone: phone,
        time: times,
        reg_source_id: sourcehType,
      };
      /**
       * 参数去掉为空的
       */
      const searchObj = objDele(searchData);
      const params = {
        conditions: searchObj,
        ops: {
          phone: "like",
          time: "between",
          reg_source_id: "=",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };

      chargeSearch(params).then((res) => {
        if (res.code === 200) {
          this.chargeLists = res.data.list;
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