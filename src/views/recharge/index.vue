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
      <el-row :gutter="24">
        <el-form :model="rechargeData" ref="stroleRef">
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="single">
              <el-input
                v-model="rechargeData.single"
                placeholder="单号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="phone">
              <el-input
                v-model="rechargeData.phone"
                placeholder="会员手机号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="sourcehType">
              <el-select
                v-model="rechargeData.sourcehType"
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
      <el-table :data="rechargeList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>

        <el-table-column prop="order_no" label="单号" width="230">
        </el-table-column>
        <el-table-column prop="phone" label="会员手机号" width="230">
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
import { getRecharge, searchRecharge, userRecharge } from "@/api/financial";
import UserInfo from "@/components/UserInfo";
import { objDele } from "@/utils/validate";
export default {
  name: "rechage",
  components: {
    UserInfo,
  },
  data: () => ({
    rechargeList: [],
    rechargeData: {
      phone: "",
      time: [],
      single: "",
      sourcehType: "",
    },
    plain1: false,
    plain2: true,
    plain3: true,
    isUserInfo: false,
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 1,
    userData: {},
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
      const { pageSize, pageIndex, status } = this;
      getRecharge(pageSize, pageIndex, status).then((res) => {
        if (res.code === 200) {
          this.rechargeList = res.data.list;
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
      const { phone, time, single, sourcehType } = this.rechargeData;
      const times = time.map((item) => {
        return item / 1000;
      });

      const searchData = {
        status: this.status,
        order_no: single,
        phone: phone,
        time: times,
        reg_source_id: sourcehType,
      };

      const paramss = objDele(searchData);
      const params = {
        conditions: paramss,
        ops: {
          status: "=",
          order_no: "like",
          phone: "like",
          reg_source_id: "=",
          time: "between",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };

      searchRecharge(params).then((res) => {
        if (res.code === 200) {
          this.rechargeList = res.data.list;
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
        single: "",
        sourcehType: ""
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
        single: "",
        sourcehType: ""
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
        single: "",
        sourcehType: ""
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