<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form :model="bonusData" ref="stroleRef" class="w_fW">
          <el-form-item prop="phone" class="w230">
            <el-input
              v-model="bonusData.phone"
              placeholder="用户手机号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="user_id" class="w230">
            <el-input
              v-model="bonusData.user_id"
              placeholder="会员ID"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item size="normal" prop="time" class="w450">
            <el-date-picker
              v-model="bonusData.time"
              type="datetimerange"
              align="right"
              unlink-panels
              size="medium"
              range-separator="至"
              start-placeholder="操作时间"
              end-placeholder="操作时间"
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
      <el-table :data="bonusList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="会员ID" width="130"> </el-table-column>
        <el-table-column prop="admin.nickname" label="后台操作员昵称">
        </el-table-column>
        <el-table-column prop="user.phone_hide" label="用户手机号">
        </el-table-column>

        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.time | formatDate }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否为首充">
          <template slot-scope="scope">
            <el-tag type="info" size="minni" effect="dark">{{
              scope.row.is_first_recharge === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="money" label="操作金额"> </el-table-column>
        <el-table-column prop="dq_balance" label="操作前余额">
        </el-table-column>
        <el-table-column prop="wc_balance" label="操作后余额">
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
import { staffGetGifyAll } from "@/api/bonus";
import { objDele } from "@/utils/validate";
export default {
  name: "staffBonusList",
  data: () => ({
    bonusList: [],
    bonusData: {
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
    this._getGifAll();
  },
  methods: {
    init(){
      this.bonusData = {
        phone: "",
        time: [],
        user_id: ""
      }
      this.pageIndex = 1
    },
    mySearch(){
      this.pageIndex = 1
      this._getGifAll()
    },
    /**
     *获取列表信息
     */
    _getGifAll() {
      let {phone,time,user_id} = this.bonusData
      let params = {
        phone,
        user_id,
        start_time: (time && time.length !=0) ? time[0]/1000 : '',
        end_time: (time && time.length !=0) ? time[1]/1000 : '',
        page: this.pageIndex,
        size: this.pageSize
      }
      staffGetGifyAll(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data
          this.bonusList = res.data;
          this.total = res.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this._getGifAll();
      console.log(`每页 ${val} 条`);
    },
    
    handleCurrentChange(val) {
      this.pageIndex = val;
      this._getGifAll();
    },
    /**
     * 重置按钮
     */

    handelReset() {
      this.pageIndex = 1;
      this.$refs.stroleRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>