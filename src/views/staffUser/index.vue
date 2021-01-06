<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-form inline ref="numberValidateForm" :model="searchData" class="w_fW">
          <!-- 搜索内容 -->
          <el-form-item class="w230">
            <el-input
              size="small"
              v-model="searchData.searchId"
              placeholder="会员ID"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" class="w230">
            <el-input
              size="small"
              v-model="searchData.phone"
              placeholder="会员手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="firstPhone" class="w230">
            <el-input
              size="medium"
              v-model="searchData.firstPhone"
              placeholder="一级推荐人手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="lastPhone" class="w230">
            <el-input
              size="small"
              v-model="searchData.lastPhone"
              placeholder="二级推荐人手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="IP" class="w230">
            <el-input
                size="small"
                v-model="searchData.IP"
                placeholder="IP"
            ></el-input>
          </el-form-item>
          <el-form-item prop="accounType" class="w230">
            <el-select
              v-model="searchData.accounType"
              filterable
              size="small"
              placeholder="账号状态"
            >
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="time" class="w450">
            <el-date-picker
              v-model="searchData.time"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              size="small"
              end-placeholder="结束日期"
              value-format="timestamp"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="w230">
            <el-button size="small" type="primary" @click="mySearch"
              >查询</el-button
            >
            <el-button
              size="small"
              type="success"
              @click="resetForms('numberValidateForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-row :gutter="24">
          <el-form> </el-form>
          <!-- 按钮组 --start -->

          <!-- 按钮组 --end -->
        </el-row>
      </div>

      <el-table :data="userLists" style="width: 100%" border>
        <el-table-column prop="id" label="会员ID" width="130">
        </el-table-column>
        <!-- <el-table-column prop="nickname" label="昵称" width="300">
        </el-table-column> -->

        <el-table-column prop="phone_hide" label="会员手机号" width="150">
        </el-table-column>
        <el-table-column prop="total_recharge" label="累计充值" width="150">
        </el-table-column>
        <el-table-column prop="cl_withdrawal" label="累计提现" width="150">
        </el-table-column>
        <el-table-column prop="total_win_money" label="输赢情况" width="150">
        </el-table-column>

        <el-table-column prop="balance" label="余额" width="150">
        </el-table-column>
        <el-table-column prop="commission" label="持有佣金" width="150">
        </el-table-column>
        <el-table-column prop="one_number" label="一级推荐人数" width="150">
        </el-table-column>
        <el-table-column prop="one_commission" label="一级累计佣金" width="150">
        </el-table-column>
        <el-table-column prop="two_number" label="二级推荐人数" width="150">
        </el-table-column>
        <el-table-column prop="two_commission" label="二级累计佣金" width="150">
        </el-table-column>
        <el-table-column prop="cl_commission" label="累计提佣" width="150">
        </el-table-column>
        <el-table-column prop="one_recommend_id" label="一级推荐人" width="150">
        </el-table-column>
        <el-table-column prop="two_recommend_id" label="二级推荐人" width="150">
        </el-table-column>

        <el-table-column prop="reg_time" label="注册时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.reg_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="last_time" label="最后登录时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.last_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP" width="150">
        </el-table-column>
        <el-table-column label="账号在线状态" width="140">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
                scope.row.online_status === 0 ? "下线" : "在线"
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账号登录状态" width="140">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.status === 0 ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账号交易状态" width="140">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.is_transaction === 1 ? "允许" : "拒接"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="可充值" width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.is_recharge === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="可提现" width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.is_withdrawal === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :min-width="130"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="fundsDetails(scope.row)"
              >资金明细</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 50px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- <el-dialog
      :title="status === 0 ? '新增会员' : '修改会员'"
      :visible.sync="isUserOpen"
      width="35%"
      @close="close"
    >
      <el-form
        :model="memberData"
        :rules="rules"
        ref="userRef"
        label-width="100px"
      >
        <el-form-item label="昵称">
          <el-input
            size="medium"
            placeholder="请输入昵称"
            v-model="memberData.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="userPhone">
          <el-input
            size="medium"
            placeholder="手机号码"
            v-model="memberData.userPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            size="medium"
            placeholder="请输入密码"
            v-model="memberData.password"
          ></el-input>
        </el-form-item>

        <el-form-item label="一级推荐人" prop="one_recommend_id">
          <el-select
            v-model="memberData.one_recommend_id"
            value-key=""
            size="medium"
            placeholder="一级推荐人"
            clearable
            style="width: 320px"
            filterable
          >
            <el-option
              v-for="item in referrersList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级推荐人" prop="two_recommend_id">
          <el-select
            v-model="memberData.two_recommend_id"
            value-key=""
            size="medium"
            placeholder="二级推荐人"
            style="width: 320px"
            clearable
            filterable
          >
            <el-option
              v-for="item in referrersList"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录状态">
          <el-radio-group v-model="memberData.is_login">
            <el-radio :label="item.id" :key="item.id" v-for="item in isLogin">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="交易状态">
          <el-radio-group v-model="memberData.is_transaction">
            <el-radio :label="item.id" :key="item.id" v-for="item in isLogin">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="充值状态">
          <el-radio-group v-model="memberData.is_recharge">
            <el-radio :label="item.id" :key="item.id" v-for="item in isLogin">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提现状态">
          <el-radio-group v-model="memberData.is_withdrawal">
            <el-radio :label="item.id" :key="item.id" v-for="item in isLogin">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="memberData.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUserOpen = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitUser" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 批量修改备注弹框 -->
    <!-- <el-dialog title="批量修改备注" :visible.sync="isRemarks" width="30%">
      <el-form :model="remarksdatas" :rules="remarkRules" label-width="80px">
        <el-form-item label="备注" prop="name">
          <el-input
            placeholder="请输入备注，最多50个字"
            v-model="remarksdatas.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRemarks = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitRemarks" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 赠送礼金 -->
    <!-- <el-dialog title="赠送礼金" :visible.sync="isGiftMoney" width="30%">
      <el-form :model="giftData" label-width="200">
        <el-form-item label="礼金金额">
          <el-input
            v-model="giftData.giftMoney"
            placeholder="请输入赠送礼金金额"
            size="mini"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="isGiftMoney = false" size="mini">取消</el-button>
        <el-button type="primary" @click="submitGiftMoney" size="mini"
          >确定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 上下分内模态框 -->
    <!-- <add-balance
      :isBanlance="isBanlance"
      :banlanceId="banlanceId"
      :title="title1"
      :status="banlanStatus"
      :show.sync="isBanlance"
    />
    <add-balance
      :isBanlance="isBanDown"
      :banlanceId="banlanceId"
      :title="title2"
      :status="banlanStatus"
      :show.sync="isBanDown"
    /> -->
  </div>
</template>

<script>
import { staffCustomerAll } from "@/api/user";
import { objDele, winorLose } from "@/utils/validate";
import AddBalance from "./components/AddBalance";
import { canClickFn } from "@/utils/myAPI";

export default {
  name: "staffUser",
  data() {
    return {
      columnMinWidth: 130,
      status: 0,
      //账号状态
      accountList: [
        {
          id: 1,
          label: "启用",
        },
        {
          id: 0,
          label: "禁用",
        },
      ],
      transactionList: [
        {
          id: 1,
          label: "允许",
        },
        {
          id: 0,
          label: "禁止",
        },
      ],
      isLogin: [
        {
          id: 0,
          label: "禁止",
        },
        {
          id: 1,
          label: "允许",
        },
      ],

      searchType: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      searchData: {
        phone: "", //手机号
        firstPhone: "", //一级推荐人手机号
        lastPhone: "", //额吉推荐人手机号
        remarks: "", //备注
        customer: "", //客服
        sourcehType: "", //注册来源
        accounType: "", //账号状态
        transactionType: "", // j交j状态
        time: [], //时间搜索
        searchId: "", //id搜索
        IP: "", //IP查询
      },
      page: 1,
      //表单验证
      rules: {
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
      pagesize: 10,
      currentPage: 1,
      total: 0,
      userLists: [],
    };
  },
  components: { AddBalance },
  activated() {
    this.init();
    this.getSearchData();
  },
  methods: {
    init() {
      this.currentPage = 1;
      this.page = 1;
      this.status = 0;
      this.searchData = {
        phone: "", //手机号
        firstPhone: "", //一级推荐人手机号
        lastPhone: "", //额吉推荐人手机号
        remarks: "", //备注
        customer: "", //客服
        sourcehType: "", //注册来源
        accounType: "", //账号状态
        transactionType: "", // j交j状态
        time: [], //时间搜索
        searchId: "", //id搜索
        IP: "", //IP查询
      };
    },
    mySearch() {
      canClickFn(() => {
        this.currentPage = 1;
        this.getSearchData();
      });
    },
    // 查询列表
    getSearchData() {
      let searchData = this.searchData;
      let parms = {
        user_id: searchData.searchId,
        phone: searchData.phone,
        one_recommend_phone: searchData.firstPhone,
        two_recommend_phone: searchData.lastPhone,
        status: searchData.accounType,
        ip: searchData.IP,
        start_time:
          searchData.time && searchData.time.length != 0
            ? searchData.time[0] / 1000
            : "",
        end_time:
          searchData.time && searchData.time.length != 0
            ? searchData.time[1] / 1000
            : "",
        page: this.currentPage,
        size: this.pagesize,
      };
      staffCustomerAll(parms).then((result) => {
        let res = result.data;
        this.total = res.total;
        this.userLists = winorLose(res.data);
        // console.log(winorLose(_data));
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getSearchData();
      // console.log(val) //当前每页几条
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSearchData();
      console.log(`当前页: ${val}`);
    },
    /**
     * 点击重置按钮
     */
    resetForms() {
      this.currentPage = 1;
      this.$refs.numberValidateForm.resetFields();
    },
    /**
     * 资金明细按钮
     */
    fundsDetails(item) {
      console.log(item);
      this.$router.push({
        path: "/staffUser/details",
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-btn {
  display: flex;
  justify-content: space-between;
}
</style>