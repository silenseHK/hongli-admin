<template>
  <div>
    <el-card>
      <div slot="header">
          <el-form :model="upandDownData" ref="stroleRef" class="w_fW">
            <el-form-item prop="phone" class="w230">
              <el-input
                v-model="upandDownData.phone"
                placeholder="用户手机号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="user_id" class="w230">
              <el-input
                v-model="upandDownData.user_id"
                placeholder="会员ID"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="types" class="w230">
              <el-select
                v-model="upandDownData.types"
                filterable
                placeholder="类型"
                clearable
              >
                <el-option
                  v-for="item in updownType"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="normal" prop="time" class="w450">
              <el-date-picker
                v-model="upandDownData.time"
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
      <el-table :data="upandDownList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="会员ID" width="130"> </el-table-column>
        <el-table-column prop="admin.nickname" label="后台操作员昵称">
        </el-table-column>
        <el-table-column prop="user.phone_hide" label="用户手机号">
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag 
            type="" 
            size="minni"  
            v-if='scope.row.type == 9'
            >手动上分</el-tag>
            <el-tag 
            type="info" 
            size="minni" 
            v-else>手动下分</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="操作时间">
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
import { staffGetUpandDown } from "@/api/bonus";
import { objDele } from "@/utils/validate";
export default {
  name: "staffUpdown",
  data: () => ({
    upandDownList: [],
    upandDownData: {
      phone: "",
      time: [],
      types: "",
      user_id: ""
    },
    updownType: [
      {
        id: 1,
        text: "手动上分",
      },
      {
        id: 2,
        text: "手动下分",
      },
    ],
    pageSize: 10,
    pageIndex: 1,
    total: 0
  }),
  activated() {
    this.init()
    this._getUpAndDown();
  },
  methods: {
    init(){
      this.upandDownData = {
        phone: "",
        time: [],
        types: "",
        user_id: ""
      }
      this.pageIndex = 1
    },
    mySearch(){
      this.pageIndex = 1
      this._getUpAndDown()
    },
    /**
     *获取列表信息
     */
    _getUpAndDown() {
      let { phone, time, types, user_id } = this.upandDownData;
      let params = {
        phone,
        user_id,
        start_time: (time && time.length !=0) ? time[0]/1000 : '',
        end_time: (time && time.length !=0) ? time[1]/1000 : '',
        type: Number(types),
        page: this.pageIndex,
        size: this.pageSize
      }
      staffGetUpandDown(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data
          this.upandDownList = res.data;
          this.total = res.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this._getUpAndDown();
      console.log(`每页 ${val} 条`);
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this._getUpAndDown()
      console.log(`当前页: ${val}`);
    },
    /**
     * 重置按钮
     */

    handelReset() {
      this.pageIndex = 1;
      this.$refs.stroleRef.resetFields();
      // this._getUpAndDown();
      
    },
  },
};
</script>

<style lang="scss" scoped>
</style>