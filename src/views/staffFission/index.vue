<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form :model="strokeData" ref="stroleRef" class="w_fW">
          <el-form-item prop="phone" class="w230">
            <el-input
              v-model="strokeData.phone"
              placeholder="会员手机号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" class="w230">
            <el-input
              v-model="strokeData.user_id"
              placeholder="会员ID"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item size="normal" prop="time" class="w450">
            <el-date-picker
              v-model="strokeData.time"
              type="datetimerange"
              align="right"
              unlink-panels
              size="medium"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="w230"> 
            <el-button type="primary" size="medium" @click="mySearch">搜索</el-button>
            <el-button type="success" size="medium" @click="handelReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="fissionList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="会员ID" width="130"> </el-table-column>
        <el-table-column prop="user.nickname" label="用户昵称" width="300">
        </el-table-column>
        <el-table-column prop="user.phone_hide" label="用户手机号" width="300">
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="user.rec_ok_count"
          label="邀请个数"
          width="300"
        ></el-table-column>

        <el-table-column label="创建时间" width="200">
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
import { staffPacketList } from "@/api/financial";
import { objDele } from "@/utils/validate";
export default {
  name: "staffFission",
  data: () => ({
    fissionList: [],
    strokeData: {
      phone: "",
      time: [],
      user_id: ""
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0
  }),
  activated() {
    this.init()
    this.getFission();
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
      this.pageIndex = 1
      this.getFission()
    },
    /**
     * 获取充值列j
     */
    getFission() {
      let {phone,time,user_id} = this.strokeData
      let params = {
        phone,
        start_time: (time && time.length != 0) ? time[0]/1000 : '',
        end_time: ((time && time.length != 0)) ? time[1]/1000 : '',
        page: this.pageIndex,
        size: this.pageSize,
        user_id
      }
      staffPacketList(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data
          this.fissionList = res.data;
          this.total = res.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFission();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getFission();
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