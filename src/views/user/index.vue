<template>
  <keep-alive>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-row :gutter="24">
          <!-- 搜索内容 -->
          <el-form inline ref="numberValidateForm" :model="searchData">
            <el-col :span="3">
              <el-form-item>
                <el-input
                  size="small"
                  v-model="searchData.searchId"
                  placeholder="会员ID"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="phone">
                <el-input
                  size="small"
                  v-model="searchData.phone"
                  placeholder="会员手机号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="firstPhone">
                <el-input
                  size="medium"
                  v-model="searchData.firstPhone"
                  placeholder="一级推荐人手机号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item prop="lastPhone">
                <el-input
                  size="small"
                  v-model="searchData.lastPhone"
                  placeholder="二级推荐人手机号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item prop="remarks">
                <el-input
                  size="small"
                  v-model="searchData.remarks"
                  placeholder="备注"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item prop="IP">
                <el-input
                    size="small"
                    v-model="searchData.IP"
                    placeholder="IP"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 1------------ -->
            <el-col :span="3">
              <el-form-item prop="customer">
                <el-select
                  v-model="searchData.customer"
                  filterable
                  size="small"
                  placeholder="选择代理"
                >
                  <el-option
                    v-for="item in customList"
                    :key="item.id"
                    :label="item.phone"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="sourcehType">
                <el-select
                  v-model="searchData.sourcehType"
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
            <el-col :span="3">
              <el-form-item prop="accounType">
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
            </el-col>
            <el-col :span="3">
              <el-form-item prop="transactionType">
                <el-select
                  v-model="searchData.transactionType"
                  filterable
                  size="small"
                  placeholder="交易状态"
                >
                  <el-option
                    v-for="item in transactionList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="time">
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
                <!-- <el-date-picker
                  size="medium"
                  v-model="searchData.time"
                  value-format="timestamp"
                  type="datetime"
                  placeholder="注册时间"
                >
                </el-date-picker> -->
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
          <div style="display: flex">
            <div style="margin-top: 5px">
              <div class="search-btn">
                <el-button size="small" type="primary" @click="searchForm"
                  >查询</el-button
                >
                <el-button
                  class="ml30"
                  size="small"
                  type="success"
                  @click="resetForms('numberValidateForm')"
                  >重置</el-button
                >
              </div>
            </div>
            <div style="margin-left: 30px; margin-top: 5px">
              <div class="search-btn">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handelRemarks"
                >
                  批量修改备注</el-button
                >
                <el-button
                  size="small"
                  @click="testMember"
                  type="success"
                  icon="el-icon-plus"
                  class="ml30"
                >
                  新增测试会员</el-button
                >
                <el-button
                    size="small"
                    @click="clearFakeBetting"
                    type="warning"
                    icon="el-icon-delete"
                    class="ml30"
                >
                  清除虚拟流水</el-button
                >
                <!-- <el-button
                  size="small"
                  type="warning"
                  icon="el-icon-edit"
                  @click="handelservice"
                  class="ml30"
                >
                  批量修改代理线</el-button
                > -->
              </div>
            </div>
          </div>
        <el-row :gutter="24">
          <el-form> </el-form>
          <!-- 按钮组 --start -->

          <!-- 按钮组 --end -->
        </el-row>
      </div>

      <el-table
        :data="userLists"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="#" width="50"> </el-table-column>

        <!-- <el-table-column prop="nickname" label="昵称" width="300">
        </el-table-column> -->

        <el-table-column prop="phone" label="会员手机号" width="150">
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
        <el-table-column
          prop="customer_service_id"
          label="代理手机号"
          width="150"
        >
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
        <el-table-column prop="fake_betting_money" label="虚拟流水" width="150">
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
        <el-table-column prop="remarks" label="备注" width="150">
        </el-table-column>
        <el-table-column prop="is_login" label="账号在线状态" width="140">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
                scope.row.online_status === 0 ? "下线" : "在线"
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_login" label="账号登录状态" width="140">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.status === 0 ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_transaction" label="账号交易状态" width="140">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.is_transaction === 1 ? "允许" : "拒接"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_recharge" label="可充值" width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.is_recharge === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_withdrawal" label="可提现" width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" effect="dark">{{
              scope.row.is_withdrawal === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :min-width="550"
          fixed="right"
        >
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button> -->
            <!-- <el-button size="mini" type="info" @click="clickHaddle(scope.$index)"
            style="margin-right:20px"
              >{{scope.row.show ? '折叠' : '操作'}}</el-button>
            <blockquote v-if='scope.row.show' style="display:inline-block"> -->
            <el-button size="mini" type="primary" @click="modifyUser(scope.row)"
              >修改</el-button
            >
            <el-button size="mini" type="info" @click="userDel(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              :type="scope.row.status === 0 ? 'danger' : 'success'"
              @click="restriction(scope.row)"
              >{{ scope.row.status === 0 ? "封禁" : "解除" }}</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleMoney(scope.row)"
              >赠送礼金</el-button
            >
            <el-button size="mini" type="success" @click="upandUp(scope.row)"
              >上分</el-button
            >
            <el-button size="mini" type="warning" @click="upandDown(scope.row)"
              >下分</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="fundsDetails(scope.row)"
              >资金明细</el-button
            >
            <!-- </blockquote> -->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改用户" :visible.sync="dialogVisible" width="40%">
        <el-form :model="userData" ref="ruleForm" label-width="120px">
          <el-form-item label="平台名称" prop="name">
            <el-input size="small" v-model="userData.name"></el-input>
          </el-form-item>

          <el-form-item label="平台名称缩写" prop="abbreviation">
            <el-input size="mini" v-model="userData.abbreviation"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')"
            >修改</el-button
          >
        </span>
      </el-dialog>
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
    <el-dialog
      top='4vh'
      :title="status === 0 ? '新增会员' : '修改会员'"
      :visible.sync="isUserOpen"
      width="700px"
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
        <el-form-item label="虚拟流水" prop="virtualMoney" v-if='status == 1'>
          <el-input
            size="medium"
            placeholder="请输入虚拟流水"
            v-model="memberData.virtualMoney"
          ></el-input>
        </el-form-item>

        <el-form-item label="推荐人ID" prop="one_recommend_id">
          <el-input
              size="medium"
              placeholder="请输入推荐人id"
              v-model="memberData.two_recommend_id"
          ></el-input>
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
    </el-dialog>
    <!-- 批量修改备注弹框 -->
    <el-dialog title="批量修改备注" :visible.sync="isRemarks" width="30%">
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
    </el-dialog>

    <!-- 批量修改客服弹框 -->
    <el-dialog title="批量修改客服" :visible.sync="isservice" widt="20%">
      <el-form :model="servicedatas" :rules="serviceRules" label-width="120px">
        <el-form-item label="批量修改客服" prop="serviceValue">
          <el-select
            v-model="servicedatas.serviceValue"
            filterable
            size="medium"
            placeholder="选择客服"
          >
            <el-option
              v-for="item in customList"
              :key="item.id"
              :label="item.phone"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isservice = false">取 消</el-button>
        <el-button type="primary" @click="submitServic">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 赠送礼金 -->
    <el-dialog title="赠送礼金" :visible.sync="isGiftMoney" width="30%">
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
    </el-dialog>
    <!-- 上下分内模态框 -->
    <add-balance
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
    />
  </div>
  </keep-alive>
</template>

<script>
import {
  userList,
  userDel,
  useSearch,
  customerAll,
  addUsers,
  userEdit,
  modifyEdit,
  customerEdit,
  userStatus,
  getReferrer,
  requestGify,
  clearFakeBetting,
  searchInviteUser
} from "@/api/user";
import { objDele, winorLose } from "@/utils/validate";
import AddBalance from "./components/AddBalance";

export default {
  name: "User",
  data() {
    return {
      columnMinWidth: 130,
      referrersList: [],
      status: 0,
      customList: [],
      isservice: false,
      isRemarks: false, //修改备注
      isUserOpen: false, //用户添加
      giftData: {
        id: 0,
        giftMoney: "",
      },
      //加减余额
      isBanlance: false,
      banlanceId: 0,
      title1: "上分",
      // 下分
      isBanDown: false,
      downId: 0,
      title2: "下分",
      banlanStatus: 1,

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

      isGiftMoney: false,
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
        searchId: "", //ID搜索
        IP: "",  //IP搜索
      },
      //会员新增
      memberData: {
        userPhone: "",
        password: "",
        virtualMoney: "",
        nickname: "",
        remarks: "",
        two_recommend_id: "",
        is_login: 1,
        is_transaction: 1,
        is_recharge: 1,
        is_withdrawal: 1,
      },
      page: 1,
      //批量修改
      remarksdatas: {
        name: "",
        remarksData: [],
      },
      //批量修改
      servicedatas: {
        serviceValue: "",
      },
      serviceRules: {
        serviceValue: [
          { required: true, message: "请选择客服", trigger: "chang" },
        ],
      },
      remarkRules: {
        name: [
          { required: true, message: "请输入备注", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
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
      dialogVisible: false,
      platform: [],
      userData: {
        name: "",
        abbreviation: "",
        id: "",
      },
      loading: false,
      inviteUserList:[],
    };
  },
  components: { AddBalance },
  // 请求资讯数据
  activated() {

    // console.log(this.PermissionList)
  },

  created() {
    //获取所有客服
    this.getcustomer();
    //获取推荐人
    this.getReferrers();

    userList(this.pagesize, this.currentPage).then((result) => {
      this.total = result.data.total;
      // console.log(result)
      var _data = result.data.list;
      this.userLists = winorLose(_data);
      // console.log(winorLose(_data));
    });
  },
  methods: {
    // clickHaddle(index){
    //   this.userLists[index].show = !this.userLists[index].show
    //   this.columnMinWidth = this.columnMinWidth == 700 ? 130 : 700
    // },
    /**
     * 关闭弹框
     */
    loadData() {
      userList(this.pagesize, this.currentPage).then((result) => {
        // console.log(result)
        this.total = result.data.total;
        var _data = result.data.list;
        this.userLists = winorLose(_data);
      });
    },
    /**
     * 提交按钮
     */
    submitForm() {
      console.log("修改");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 新增按钮
     */
    addChannel() {
      this.dialogVisible = true;
      this.status = 0;
    },
    /**
     * 获取当前行数据
     */
    modifyUser(rowDate) {
      this.status = 1;
      this.memberData.id = rowDate.id;
      this.memberData.virtualMoney = rowDate.fake_betting_money
      this.memberData.userPhone = rowDate.phone;
      this.memberData.password = rowDate.password;
      this.memberData.nickname = rowDate.nickname;
      this.memberData.remarks = rowDate.remarks;
      this.memberData.is_login = rowDate.is_login;
      this.memberData.is_transaction = rowDate.is_transaction;
      this.memberData.is_recharge = rowDate.is_recharge;
      this.memberData.is_withdrawal = rowDate.is_withdrawal;
      this.memberData.one_recommend_id = rowDate.one_recommend_id;
      this.memberData.two_recommend_id = rowDate.two_recommend_id;
      // console.log(rowDate);
      this.isUserOpen = true;
    },
    deleteUser() {},
    change() {
      this.$forceUpdate();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      // console.log(val) //当前每页几条
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.loadData();
      if (this.page === 1) {
        this.loadData();
      } else if (this.page === 2) {
        this.getSearchs();
      }

      console.log(`当前页: ${val}`);
    },
    /**
     * 删除按钮
     */
    userDel(rowData) {
      // console.log(rowData.id)
      const getParams = {
        id: rowData.id,
      };
      this.$confirm("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          userDel(getParams).then((result) => {
            // console.info(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: `已删除`,
              });

              const totalPage = Math.ceil((this.total - 1) / this.pagesize); // 总页数
              this.currentPage =
                this.currentPage > totalPage ? totalPage : this.currentPage;
              this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
            } else {
              this.$message({
                type: "info",
                message: `删除失败`,
              });
            }
            this.loadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 点击重置按钮
     */
    resetForms() {
      this.pagee = 1;
      this.loadData();
      this.$refs.numberValidateForm.resetFields();
    },
    getSearchs() {
      const {
        phone,
        lastPhone,
        firstPhone,
        remarks,
        customer,
        sourcehType,
        accounType,
        transactionType,
        time,
        searchId,
          IP
      } = this.searchData;
      const times = time.map((item) => {
        return item / 1000;
      });

      const conditions = {
        phone: phone,
        one_recommend_phone: firstPhone,
        two_recommend_phone: lastPhone,
        remarks: remarks,
        customer_service_id: customer,
        reg_source_id: sourcehType,
        is_login: accounType,
        is_transaction: transactionType,
        reg_time: times,
        id: searchId,
        IP: IP
      };

      // for (const key in conditions) {
      //   if (conditions[key] === "") {
      //     delete conditions[key];
      //   }
      // }
      const condi = objDele(conditions);
      const paramss = {
        conditions: condi,
        ops: {
          id: "=",
          phone: "like",
          one_recommend_phone: "like",
          two_recommend_phone: "like",
          remarks: "=",
          customer_service_id: "=",
          reg_source_id: "=",
          is_login: "=",
          is_transaction: "=",
          reg_time: "between",
          IP: "="
        },
        page: this.currentPage,
        limit: this.pagesize,
      };
      useSearch(paramss).then((res) => {
        if (res.code === 200) {
          this.userLists = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    /**
     * 点击搜索按钮
     */
    searchForm() {
      this.currentPage = 1;
      this.getSearchs();
    },
    /**
     * 查询所有客服列表
     */
    getcustomer() {
      customerAll().then((res) => {
        if (res.code === 200) {
          this.customList = res.data;
        }
      });
    },
    /**
     * 全选修改
     */
    handleSelectionChange(val) {
      const idCollection = val.map((item) => item.id);
      this.remarksdatas.remarksData = idCollection;

      // this.multipleSelection = val;
    },
    /**
     * 添加会员
     */
    testMember() {
      this.isUserOpen = true;
      this.status = 0;
    },
    /**
     * 清流虚拟打码量
     */
    clearFakeBetting(){
      this.$confirm('确定清理所有用户的虚拟流水?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearFakeBetting().then((res)=>{
          if(res.code == 200){
            this.$message.success('操作成功');
            this.loadData();
          }else{
            this.$message.error(res.msg);
          }
        })

      }).catch(() => {});
    },
    /**
     * 提交新增修改按钮
     */
    submitUser() {
      this.$refs.userRef.validate((valid) => {
        if (valid) {
          const {
            userPhone,
            password,
            nickname,
            remarks,
            is_login,
            is_transaction,
            is_recharge,
            is_withdrawal,
            two_recommend_id
          } = this.memberData;
          if (this.status === 0) {
            const params = {
              phone: userPhone,
              reg_source_id: 1,
              password,
              nickname,
              remarks,
              is_login,
              is_transaction,
              is_recharge,
              is_withdrawal,
              two_recommend_id,
            };
            addUsers(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
                this.loadData();
              } else {
                this.$message.error("添加失败");
              }
            });
          } else if (this.status === 1) {
            console.log("status-1");
            const {
              userPhone,
              password,
              nickname,
              remarks,
              is_login,
              is_transaction,
              is_recharge,
              is_withdrawal,
              id,
              one_recommend_id,
              two_recommend_id,
              virtualMoney
            } = this.memberData;
            const paramsEidt = {
              phone: userPhone,
              password,
              nickname,
              remarks,
              is_login,
              is_transaction,
              is_recharge,
              is_withdrawal,
              one_recommend_id,
              two_recommend_id,
              id: id,
              fake_betting_money: virtualMoney
            };
            userEdit(paramsEidt).then((res) => {
              this.isUserOpen = false;
              if (res.code === 200) {
                this.getSearchs();
                this.$message.success("修改成功");
              } else {
                this.$message.error("修改失败");
              }
            });
          }
        }
        this.isUserOpen = false;
      });
    },
    /**
     * 对话框关闭
     */
    close() {
      this.memberData.userPhone = "";
      this.memberData.password = "";
      this.memberData.nickname = "";
      this.memberData.remarks = "";
      this.memberData.one_recommend_id = "";
      this.memberData.two_recommend_id = "";
      this.memberData.money = "";
    },
    /**
     * 批量修改备注
     */
    handelRemarks() {
      if (this.remarksdatas.remarksData.length === 0) {
        this.$notify({
          title: "警告",
          message: "请选择会员信息",
          type: "warning",
        });
        return false;
      } else {
        this.isRemarks = true;
      }
    },
    submitRemarks() {
      const { name, remarksData } = this.remarksdatas;
      const params = {
        ids: remarksData,
        message: name,
      };
      modifyEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
        this.loadData();
        this.isRemarks = false;
      });
    },
    /**
     * 批量修改客服
     */
    submitServic() {
      const { serviceValue } = this.servicedatas;
      const { remarksData } = this.remarksdatas;
      const params = {
        ids: remarksData,
        customer_id: serviceValue,
      };
      customerEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
        } else {
          this.$message(res.msg);
        }
        this.loadData();
        this.isservice = false;
      });
    },
    handelservice() {
      if (this.remarksdatas.remarksData.length === 0) {
        this.$notify({
          title: "警告",
          message: "请选择会员信息",
          type: "warning",
        });
        return false;
      } else {
        this.isservice = true;
      }
    },
    /**
     * 封禁按钮
     */

    restriction(row) {
      const { id, status } = row;
      if (status === 0) {
        const params = {
          id,
          status: 1,
        };
        userStatus(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("封禁成功");
          } else {
            this.$message.error("封禁失败");
          }
          this.loadData();
        });
      } else {
        const params = {
          id,
          status: 0,
        };
        userStatus(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("解封成功");
          } else {
            this.$message.error("解封失败");
          }
          this.loadData();
        });
      }
    },
    getReferrers() {
      getReferrer().then((res) => {
        if (res.code === 200) {
          this.referrersList = res.data;
        } else {
          this.$message.error("获取失败");
        }
      });
    },
    handleMoney(item) {
      this.giftData.id = item.id;
      this.isGiftMoney = true;
      // console.log(item);
    },
    /**
     * 赠送礼金
     */
    submitGiftMoney() {
      const { id, giftMoney } = this.giftData;
      const params = {
        id,
        money: giftMoney,
      };
      requestGify(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("赠送成功");
            this.loadData();
          } else {
            this.$message.error(res.msg);
          }
          this.isGiftMoney = false;
        })
        .catch((error) => console.error(error));
    },
    /**
     * 上下分
     */
    upandUp(item) {
      this.isBanlance = true;
      const { id } = item;
      this.banlanceId = id;
      this.banlanStatus = 1;
    },
    /**
     * 下分
     */
    upandDown(item) {
      this.isBanDown = true;
      const { id } = item;
      this.banlanceId = id;
      this.banlanStatus = 2;
    },
    /**
     * 资金明细按钮
     */
    fundsDetails(item) {
      console.log(item);
      this.$router.push({
        path: "/user/details",
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
.ml30{margin-left: 30px;}
</style>