<template>
  <div>
    <el-card>
      <div slot="header">
          <el-form :model="placeData" ref="stroleRef" class="w_fW">
            <el-form-item prop="phone" class="w230">
              <el-input
                v-model="placeData.phone"
                placeholder="会员手机号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="user_id" class="w230">
              <el-input
                v-model="placeData.user_id"
                placeholder="会员ID"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item size="normal" prop="num1" class="w230">
              <el-input
                v-model="placeData.num1"
                placeholder="累计充值大于"
                size="medium"
                type="number"
              ></el-input>
            </el-form-item>
            <div class="w230">
              <el-button type="primary" size="medium" @click="mySearch"
                >搜索</el-button
              >
              <el-button type="success" size="medium" @click="handelReset"
                >重置</el-button
              >
            </div>
          </el-form>
      </div>
      <el-table :data="placeLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="recharge[0].user_id" label="会员ID" width="130">
        </el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="170">
        </el-table-column>
        <el-table-column prop="phone_hide" label="用户手机号" width="170">
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

        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" effect="dark">{{
              scope.row.status == 0 ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cl_betting_total" label="下单总数量">
        </el-table-column>
        <el-table-column prop="cl_betting" label="下单总金额">
        </el-table-column>
        <el-table-column prop="time" label="首充时间" width="200">
          <template slot-scope="scope">
            <span v-if='scope.row.recharge && scope.row.recharge.length !=0'>{{ scope.row.recharge[0].arrive_time | formatDate }}</span>
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
import { staffGetPlace,getPlace, placeSearch } from "@/api/user";
import { objDele } from "@/utils/validate";
import {canClickFn} from '@/utils/myAPI';
export default {
  name: "staffPlaceOrderList",
  data: () => ({
    placeLists: [],
    placeData: {
      phone: "",
      num1: "",
      user_id: ""
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
  activated() {
    this.init()
    this.getPlaces();
  },
  methods: {
    init(){
      this.placeData = {
        phone: "",
        num1: "",
        user_id: ""
      }
      this.pageIndex = 1
    },
    mySearch(){
      canClickFn(() => {
        this.pageIndex = 1
        this.getPlaces()
      })
    },
    getPlaces() {
      let {phone,num1,user_id} = this.placeData
      let params = {
        phone,
        user_id,
        min_recharge: num1,
        size: this.pageSize,
        page: this.pageIndex
      }
      staffGetPlace(params).then((res) => {
        if (res.code === 200) {
          this.placeLists = res.data.data;
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