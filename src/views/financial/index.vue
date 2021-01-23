<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-button type="success" size="medium" @click="pending" :plain="plain1">待审核</el-button>
        <el-button
          type="warning"
          size="medium"
          @click="auditfailed"
          :plain="plain2">审核未通过</el-button>
        <el-button
          type="primary"
          size="medium"
          @click="examination"
          :plain="plain3">审核通过</el-button>
        <el-button
          type="info"
          size="medium"
          @click="all"
          :plain="plain3">全部</el-button>
      </div>
      <!-- card body -->
      <el-row :gutter="24">
        <el-form :model="withData" ref="stroleRef" inline>
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="transaction">
              <el-input
                v-model="withData.transaction"
                placeholder="交易单号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="phone">
              <el-input
                v-model="withData.phone"
                placeholder="会员手机号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="sourcehType">
              <el-select
                v-model="withData.sourcehType"
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
            :span="7"
            :offset="0"
            :xl="7"
            :lg="8"
            :md="24"
            :sm="24"
            :xs="24"
          >
            <el-form-item size="normal" prop="arriveTime">
              <el-date-picker
                v-model="withData.arriveTime"
                type="datetimerange"
                align="right"
                unlink-panels
                size="medium"
                placeholder="提现时间"
                range-separator="至"
                start-placeholder="提现时间"
                end-placeholder="提现时间"
                value-format="timestamp"
              >
              </el-date-picker>
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
            <el-form-item size="normal" prop="withdrawTime">
              <el-date-picker
                v-model="withData.withdrawTime"
                type="datetimerange"
                align="right"
                unlink-panels
                size="medium"
                placeholder="提现时间"
                range-separator="至"
                start-placeholder="审批时间"
                end-placeholder="审批时间"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 30px">
        <el-col
          :span="5"
          :offset="0"
          :xl="4"
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
          <el-button type="primary" size="medium" @click="handleRefresh"
            >刷新</el-button
          >
        </el-col>
        <el-col
          :span="4"
          :offset="0"
          :xl="4"
          :lg="6"
          :md="24"
          :sm="24"
          :xs="24"
          v-if="status === 0"
        >
          <el-button type="success" size="medium" @click="handelAllSearch"
            >批量通过</el-button
          >
          <el-button type="danger" size="medium" @click="handelAllReset"
            >批量拒接</el-button
          >
        </el-col>
      </el-row>

      <el-table
        :data="chargeLists"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" key="1" label="#" width="70">
        </el-table-column>
        <el-table-column type="selection" key="2" width="55"> </el-table-column>
        <el-table-column prop="order_no" label="单号" key="3" width="230">
        </el-table-column>
        <el-table-column
          key="4"
          prop="user.phone"
          label="会员手机号"
          width="130"
        >
        </el-table-column>
        <el-table-column key="5" prop="user.id" label="会员ID" width="130">
        </el-table-column>
        <el-table-column
          key="6"
          prop="pay_status"
          label="支付状态"
          width="130"
          v-if="status === 1"
        >
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.pay_status != 0"
              size="mini"
              effect="dark"
              :type="(scope.row.pay_status == 1 ? 'success' : (scope.row.pay_status == 2 ? 'info' : (scope.row.pay_status == 3 ? 'warning' : 'danger')))"
              >{{scope.row.pay_status_json.text}}</el-tag
            >
            <el-tag
                v-if="scope.row.pay_status == 0"
                size="mini"
                effect="dark"
            >{{scope.row.pay_status_json.text}}</el-tag
            >

            <!-- <span>{{
              scope.row.pay_status === 0 ? "三方未支付" : "三方已支付"
            }}</span> -->
          </template>
        </el-table-column>
        <el-table-column key="7" prop="money" label="提现金额" width="130">
        </el-table-column>
        <el-table-column prop="type" key="8" label="提现类型" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.type === 0 ? "用户提现" : "代理提现" }}</span>
          </template>
        </el-table-column>
        <el-table-column key="9" prop="with_type" label="提现渠道" width="130"></el-table-column>

        <el-table-column
          prop="service_charge"
          key="10"
          label="手续费"
          width="130"
        >
        </el-table-column>
        <el-table-column prop="payment" key="11" label="打款金额" width="130">
        </el-table-column>
        <el-table-column
          prop="account_holder"
          key="12"
          label="收款人"
          width="130"
        >
        </el-table-column>
        <el-table-column
          key="13"
          prop="ifsc_code"
          label="IFSC CODE"
          width="130"
        >
        </el-table-column>
        <el-table-column key="14" prop="phone" label="持卡人电话" width="130">
        </el-table-column>
        <el-table-column
          key="15"
          prop="bank_number"
          label="银行卡号"
          width="170"
        >
        </el-table-column>

        <el-table-column
          key="16"
          prop="create_time"
          label="申请时间"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="17"
          prop="user.total_recharge"
          label="累计充值"
          width="130"
        >
        </el-table-column>
        <el-table-column
          key="18"
          prop="user.cl_withdrawal"
          label="累计提现"
          width="130"
        >
        </el-table-column>
        <el-table-column
          key="19"
          prop="user.cl_commission"
          label="累计提佣"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="user.cl_betting_total"
          label="累计单数"
          width="130"
          key="20"
        >
        </el-table-column>
        <el-table-column
          prop="user.cl_betting"
          label="累计下单金额"
          width="130"
          key="21"
        >
        </el-table-column>
        <el-table-column
          prop="approval_time"
          key="22"
          label="审批时间"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.approval_time | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="pltf_order_no"
          key="23"
          label="第三方订单号"
          width="230"
        >
        </el-table-column>
        <el-table-column
          key="24"
          v-if="status == 2"
          label="审核不通过理由"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="loan_time"
          key="25"
          label="到账时间"
          width="180"
          v-else
        >
          <template slot-scope="scope">
            <span>{{ scope.row.loan_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
            key="26"
            label="状态"
            width="150"
            fixed="right"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="info" size="mini" effect="dark">待审核</el-tag>
            <el-tag v-if="scope.row.status == 1 && scope.row.pay_status == 0" type="info" size="mini" effect="dark">待支付</el-tag>
            <el-tag v-if="scope.row.status == 1 && scope.row.pay_status == 1" type="success" size="mini" effect="dark">已支付</el-tag>
            <el-tag v-if="scope.row.status == 1 && scope.row.pay_status == 2" type="warning" size="mini" effect="dark">已失效</el-tag>
            <el-tag v-if="scope.row.status == 1 && scope.row.pay_status == 3" type="danger" size="mini" effect="dark">订单异常</el-tag>
            <el-tag v-if="scope.row.status == 2 && scope.row.pay_status == 0" size="mini" effect="dark">审核未通过</el-tag>
            <el-tag v-if="scope.row.status == 2 && scope.row.pay_status == 3" size="mini" effect="dark">订单异常-已退还余额</el-tag>
            <el-tag v-if="scope.row.status == 2 && scope.row.pay_status == 2" size="mini" effect="dark">已失效</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          key="26"
          label="可提现"
          width="70"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark" v-if='scope.row.user'>
              {{ scope.row.user.is_withdrawal == 1 ? '是' : '否'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          key="27"
          label="用户备注"
          width="150"
          fixed="right"
          :show-overflow-tooltip='true'
        >
          <template slot-scope="scope">
            <span class="remarks-css" v-if='scope.row.user'>{{ scope.row.user.remarks}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="loan_time"
          label="操作"
          align="center"
          key="28"
          fixed="right"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 0"
              type="primary"
              size="mini"
              @click="review(scope.row)"
              >审核</el-button
            >
            <el-button
              v-else-if="scope.row.status === 1"
              type="warning"
              size="mini"
              @click="handleCancel(scope.row)"
              >取消</el-button
            >
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
      <!-- 填写审核不通过理由 -->

      <el-dialog title="审核" :visible.sync="isFail2" width="30%">
        <el-input
          v-model="message"
          type="textarea"
          :rows="2"
          placeholder="请输入不通过理由"
        ></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="isFail2 = false">取消</el-button>
          <el-button type="primary" @click="handleFinanci">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  withSearch,
  getwithdrawal,
  reviewWith,
  allBy,
  allFila,
  getCancel,
} from "@/api/financial";
import { objDele } from "@/utils/validate";
export default {
  name: "firstStroke",
  data: () => ({
    plain2: true,
    plain1: false,
    plain3: true,
    chargeLists: [],
    isFail: false,
    isFail2: false,
    withData: {
      single: "",
      transaction: "",
      phone: "",
      sourcehType: "",
      arriveTime: [],
      withdrawTime: [],
      //注册来源
    },
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
    message: "",
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    status: 0,
    selectAll: [],
    id: "",
    type: "",
    es: {},
  }),
  created() {
    this.getCharge();
    // this.setupStream();
  },
  // watch: {
  //   $route(newPath) {
  //     console.log(newPath);
  //     if (newPath.name !== "/financial/financial") {
  //       if (this.es !== "undefined") {
  //         this.deleteStream();
  //       }
  //     } else {
  //       this.setupStream();
  //     }
  //   },
  // },
  methods: {
    /**
     * 定时器
     */

    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex, status } = this;

      getwithdrawal(pageSize, pageIndex, status).then((res) => {
        if (res.code === 200) {
          this.chargeLists = res.data.list
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handelSearch();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.handelSearch();
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      const {
        transaction,
        phone,
        arriveTime,
        withdrawTime,
        sourcehType,
      } = this.withData;
      const { status } = this;

      const searchData = {
        order_no: transaction,
        phone: phone,
        create_time: arriveTime,
        loan_time: withdrawTime,
        status: status,
        reg_source_id: sourcehType,
      };

      const paramss = objDele(searchData);

      const params = {
        conditions: paramss,
        ops: {
          order_no: "like",
          phone: "like",
          create_time: "between",
          loan_time: "between",
          status: "=",
          reg_source_id: "=",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      withSearch(params).then((res) => {
        if (res.code === 200) {
          this.chargeLists = res.data.list
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
     * 审核通过按钮
     */
    examination() {
      this.plain1 = true;
      this.plain2 = true;
      this.plain3 = false;
      this.status = 1;
      this.pageIndex = 1
      this.withData = {
        single: "",
        transaction: "",
        phone: "",
        sourcehType: "",
        arriveTime: [],
        withdrawTime: []
      }
      this.getCharge();
    },
    all(){
      this.plain1 = true;
      this.plain2 = true;
      this.plain3 = true;
      this.plain4 = false;
      this.status = -1;
      this.withData = {
        single: "",
        transaction: "",
        phone: "",
        sourcehType: "",
        arriveTime: [],
        withdrawTime: []
      }
      this.getCharge();
    },
    /**
     * 待审核
     */
    pending() {
      this.plain1 = false;
      this.plain2 = true;
      this.plain3 = true;
      this.pageIndex = 1
      this.status = 0;
      this.withData = {
        single: "",
        transaction: "",
        phone: "",
        sourcehType: "",
        arriveTime: [],
        withdrawTime: []
      }
      this.getCharge();
    },

    /**
     * 审核未通过
     */
    auditfailed() {
      this.plain1 = true;
      this.plain2 = false;
      this.plain3 = true;
      this.status = 2;
      this.pageIndex = 1
      this.withData = {
        single: "",
        transaction: "",
        phone: "",
        sourcehType: "",
        arriveTime: [],
        withdrawTime: []
      }
      this.getCharge();
    },
    submitFail() {},
    handleFinanci() {
      const params = {
        id: this.id,
        type: this.type,
        status: 2,
        message: this.message,
      };

      reviewWith(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          this.getCharge();
        } else {
          this.$message.error(res.msg);
        }
        this.isFail2 = false;
      });
    },

    /**
     * 点击审核按钮
     */
    review(item) {
      const { id, type } = item;
      // this.isFail = true;
      this.id = id;
      this.type = type;
      this.$confirm("请选择用户提现通过状态", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
      })
        .then(() => {
          const params = {
            id: this.id,
            type: this.type,
            status: 1,
            message: "",
          };
          reviewWith(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("操作成功");
              this.getCharge();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.isFail2 = true;
        });
    },

    /**
     * 全选
     */
    handleSelectionChange(val) {
      this.selectAll = val;
    },
    // 全选审批通过
    handelAllSearch() {
      const params = {
        ids: this.selectAll,
      };
      allBy(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("审核成功");
          this.getCharge();
        } else {
          this.$message.error("审核失败");
        }
      });
    },
    //全选审拒接
    handelAllReset() {
      this.$confirm("请填写不通过理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showInput: true,
        inputType: "textarea",
        showClose: false,
      })
        .then(({ value }) => {
          const params = {
            ids: this.selectAll,
            message: value,
          };
          allFila(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("操作成功");
              this.getCharge();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    handleRefresh() {
      this.getCharge();
    },
    /**
     * 点击取消()
     */
    handleCancel(item) {
      const { id } = item;

      this.$confirm("请输入取消备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showInput: true,
        inputType: "textarea",
        showClose: false,
      }).then(({ value }) => {
        const params = {
          id: id,
          message: value
        };
        getCancel(params)
          .then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
            this.getCharge();
          })
            .catch((error) => console.error(error));
          }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>