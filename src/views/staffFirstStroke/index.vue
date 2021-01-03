<template>
  <div>
    <el-card>
      <div slot="header">
        <!-- <el-row :gutter="24"> -->
          <el-form :model="strokeData" ref="stroleRef" class="w_fW">
            <!-- <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24"> -->
              <el-form-item prop="user_id" class="w230">
                <el-input
                  v-model="strokeData.user_id"
                  placeholder="会员ID"
                  size="small"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="phone" class="w230">
                <el-input
                  v-model="strokeData.phone"
                  placeholder="会员手机号"
                  size="small"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item size="normal" prop="time" class="w450">
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
            <div style="width:230px;margin-top:5px">
              <el-button type="primary" size="small" @click="mySearch"
                >搜索</el-button
              >
              <el-button type="success" size="small" @click="handelReset"
                >重置</el-button
              >
            </div>
          </el-form>

      </div>
      <el-table :data="chargeLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="会员ID" width="130">
        </el-table-column>
        <el-table-column prop="user.nickname" label="用户昵称" width="170">
        </el-table-column>
        <el-table-column prop="user.phone_hide" label="用户手机号" width="170">
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

        <el-table-column prop="user.one_recommend_phone_hide" label="一级推荐人">
        </el-table-column>
        <el-table-column prop="user.two_recommend_phone_hide" label="二级推荐人">
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
import { staffChargeList } from "@/api/user";
import { objDele } from "@/utils/validate";
import {canClickFn} from '@/utils/myAPI';
export default {
  name: "staffFirstStroke",
  data: () => ({
    chargeLists: [],
    strokeData: {
      phone: "",
      time: [],
      user_id: ""
      // sourcehType: "",
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    //注册来源
    // sourceList: [
    //   {
    //     id: 0,
    //     label: "普通H5注册",
    //   },
    //   {
    //     id: 1,
    //     label: "网站测试会员",
    //   },
    // ],
  }),
  activated() {
    this.init()
    this.getStaffCharge();
  },
  methods: {
    init(){
      this.strokeData = {
        phone: "",
        time: [],
        user_id: ""
      }
      this.pageIndex = 1
    },
    mySearch(){
      canClickFn(() => {
        this.pageIndex = 1
        this.getStaffCharge()
      })
    },
    getStaffCharge() {
      let {phone,time,user_id} = this.strokeData
      let params = {
        page: this.pageIndex,
        size: this.pageSize,
        phone,
        start_time: (time && time.length != 0) ? time[0]/1000 : '',
        end_time: (time && time.length != 0) ? time[1]/1000 : '',
        user_id
      }
      staffChargeList(params).then((res) => {
        if (res.code === 200) {
          this.chargeLists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStaffCharge();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getStaffCharge();
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