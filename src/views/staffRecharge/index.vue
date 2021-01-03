<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button type="primary" size="medium" @click="payment" :plain="plain1"
          >等待支付</el-button
        >
        <el-button type="success" size="medium" @click="failed" :plain="plain2"
          >充值成功</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="successfully"
          :plain="plain3"
          >充值失败</el-button
        >
      </div>
        <el-form :model="rechargeData" ref="stroleRef" class="w_fW">
          <el-form-item prop="single" class="w230">
            <el-input
              v-model="rechargeData.single"
              placeholder="单号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="user_id" class="w230">
            <el-input
              v-model="rechargeData.user_id"
              placeholder="会员ID"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" class="w230">
            <el-input
              v-model="rechargeData.phone"
              placeholder="会员手机号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item size="normal" prop="time" class="w450">
            <el-date-picker
              v-model="rechargeData.time"
              type="datetimerange"
              align="right"
              unlink-panels
              size="medium"
              range-separator="至"
              start-placeholder="充值时间"
              end-placeholder="充值时间"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <div style="width:230px;margin-bottom:20px">
            <el-button type="primary" size="medium" @click="mySearch"
              >搜索</el-button
            >
            <el-button type="success" size="medium" @click="handelReset"
              >重置</el-button
            >
          </div>
        </el-form>
      <el-table :data="rechargeList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
         <el-table-column prop="user_id" label="会员ID" width="130">
        </el-table-column>
        <el-table-column prop="order_no" label="单号" width="230">
        </el-table-column>
        <el-table-column prop="phone_hide" label="会员手机号" width="230">
        </el-table-column>

        <el-table-column prop="nickname" label="会员名称" width="230">
        </el-table-column>
        <el-table-column prop="money" label="充值金额" width="100">
        </el-table-column>

        <el-table-column prop="time" label="充值时间" width="230">
          <template slot-scope="scope">
            <span>{{ scope.row.time | formatDate }}</span> </template
          >;
        </el-table-column>

        <el-table-column prop="pay_company" label="支付公司" width="150">
        </el-table-column>
        <el-table-column prop="pay_type" label="支付方式" width="150">
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="userDetails(scope.row)"
            >
              用户详情
            </el-button>
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
      <!-- 点击用户详情 -->
      <el-dialog title="提示" :visible.sync="isUserInfo" width="30%" center>
        <user-info :userInfoData="userData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="isUserInfo = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="isUserInfo = false" size="mini"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { staffGetRecharge,getRecharge, searchRecharge, userRecharge } from "@/api/financial";
import UserInfo from "@/components/UserInfo";
import { objDele } from "@/utils/validate";
import {canClickFn} from "@/utils/myAPI"
export default {
  name: "staffRecharge",
  components: {
    UserInfo,
  },
  data: () => ({
    rechargeList: [],
    rechargeData: {
      phone: "",
      time: [],
      single: "",
      user_id: ""
    },
    plain1: false,
    plain2: true,
    plain3: true,
    isUserInfo: false,
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 1,
    userData: {}
  }),
  activated() {
    this.init()
    this.getCharge();
  },
  methods: {
    init(){
      this.rechargeData ={
        phone: "",
        time: [],
        single: "",
        user_id: ""
      }
      this.pageIndex = 1
      this.status = 1
      this.plain1 = false
      this.plain2 = true
      this.plain3 = true
      this.isUserInfo = false
    },
    mySearch(){
      canClickFn(() => {
        this.pageIndex = 1
        this.getCharge()
      })
    },
    getCharge() {
      // const { pageSize, pageIndex, status } = this;
      
      let {phone,time,single,user_id} = this.rechargeData
      console.log('time--->',time)
      let params = {
        status: this.status,
        order_no: single,
        phone,
        user_id,
        start_time: (time && time.length != 0) ? time[0]/1000 : '',
        end_time: (time && time.length != 0) ? time[1]/1000 : '',
        page: this.pageIndex,
        size: this.pageSize
      }
      staffGetRecharge(params).then((res) => {
        if (res.code === 200) {
          this.rechargeList = res.data.data;
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
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1
      this.$refs.stroleRef.resetFields()
    },
    /**
     * 等待支付
     */
    payment() {
      this.plain1 = false;
      this.plain2 = true;
      this.plain3 = true;
      this.status = 1;
      this.pageIndex = 1
      this.rechargeData = {
        phone: "",
        time: [],
        single: ""
      }
      this.getCharge();
    },
    /**
     * 充值成功
     */
    failed() {
      this.plain1 = true;
      this.plain2 = false;
      this.plain3 = true;
      this.status = 2;
      this.pageIndex = 1
      this.rechargeData = {
        phone: "",
        time: [],
        single: ""
      }
      this.getCharge();
    },
    /**
     * 充值失败
     */
    successfully() {
      this.plain1 = true;
      this.plain2 = true;
      this.plain3 = false;
      this.status = 3;
      this.pageIndex = 1
      this.rechargeData = {
        phone: "",
        time: [],
        single: ""
      }
      this.getCharge();
    },
    /**
     * 查看会员详情
     */
    userDetails(row) {
      const { user_id } = row;
      const params = {
        id: user_id,
      };
      userRecharge(params).then((res) => {
        if (res.code === 200) {
          this.userData = res.data;
          this.isUserInfo = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>