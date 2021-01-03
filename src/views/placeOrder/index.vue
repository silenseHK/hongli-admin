<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="24">
          <el-form :model="placeData" ref="stroleRef">
            <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="phone">
                <el-input
                  v-model="placeData.phone"
                  placeholder="会员手机号"
                  size="medium"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="sourcehType">
                <el-select
                  v-model="placeData.sourcehType"
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
              :span="4"
              :offset="0"
              :xl="4"
              :lg="6"
              :md="24"
              :sm="24"
              :xs="24"
            >
              <el-form-item size="normal" prop="num1">
                <el-input
                  v-model="placeData.num1"
                  placeholder="累计充值大于"
                  size="medium"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="4"
              :offset="0"
              :xl="4"
              :lg="6"
              :md="24"
              :sm="24"
              :xs="24"
            >
              <!-- <el-form-item size="normal" prop="num2">
                <el-input
                  v-model="placeData.num2"
                  placeholder="最后下单日期距离今天天数大于"
                  size="medium"
                  type="number"
                ></el-input>
              </el-form-item> -->
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
              <el-button type="primary" size="medium" @click="placeSearch"
                >搜索</el-button
              >
              <el-button type="success" size="medium" @click="handelReset"
                >重置</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="placeLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="170">
        </el-table-column>
        <el-table-column prop="phone" label="用户手机号" width="170">
        </el-table-column>
        <el-table-column
          prop="total_recharge"
          label="累计充值"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="cl_withdrawal"
          label="累计提现"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="commission"
          label="持有佣金"
          width="170"
        ></el-table-column>

        <el-table-column prop="is_login" label="账号状态">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" effect="dark">{{
              scope.row.is_login === 1 ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cl_betting_total" label="下单总数量">
        </el-table-column>
        <el-table-column prop="cl_betting" label="下单总金额">
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
import { getPlace, placeSearch } from "@/api/user";
import { objDele } from "@/utils/validate";
export default {
  name: "placeOrder",
  data: () => ({
    placeLists: [],
    placeData: {
      phone: "",
      num1: "",
      sourcehType: "",
      // num2: "",
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
    this.getPlaces();
  },
  methods: {
    /**
     * 获取充值列j
     */
    getPlaces() {
      const { pageSize, pageIndex } = this;
      getPlace(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.placeLists = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPlaces();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getPlaces();
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    placeSearch() {
      const { phone, num1, sourcehType } = this.placeData;

      const searchData = {
        reg_source_id: sourcehType,
        phone: phone,
        total_recharge: num1,
      };
      const paramss = objDele(searchData);
      const params = {
        conditions: paramss,
        ops: {
          // betting_time: "<",
          phone: "like",
          total_recharge: ">",
          reg_source_id: "=",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      placeSearch(params).then((res) => {
        if (res.code === 200) {
          this.placeLists = res.data.list;
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
      // this.getPlaces();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>