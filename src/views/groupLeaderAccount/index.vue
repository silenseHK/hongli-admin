<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <!-- card title -->
        <el-row :gutter="20">
          <el-form :model="accountData" ref="accountRef" size="normal">
            <el-col
              :span="3"
              :offset="0"
              :xl="3"
              :lg="6"
              :md="24"
              :sm="24"
              :xs="24"
            >
              <el-form-item label="" size="normal" prop="num">
                <el-input
                  v-model="accountData.num"
                  placeholder="账号"
                  size="small"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="0"
              :xl="3"
              :lg="6"
              :md="24"
              :sm="24"
              :xs="24"
            >
              <el-form-item label="" size="normal" prop="name">
                <el-input
                  v-model="accountData.name"
                  placeholder="手机号"
                  size="small"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="0"
              :xl="3"
              :lg="6"
              :md="24"
              :sm="24"
              :xs="24"
            >
              <!-- <el-form-item label="" size="normal" prop="select">
                <el-select
                  v-model="accountData.select"
                  placeholder="请选择客服"
                  clearable
                  size="small"
                  filterable
                >
                  <el-option
                    v-for="item in selectList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-col>
            <el-col style="margin-top: 6px">
              <el-button type="primary" size="small" @click="handelAdd"
                >新增</el-button
              >
              <el-button type="primary" size="small" @click="haddleBangding"
                >绑定账号</el-button
              >
              <el-button type="success" size="small" @click="handelSearch"
                >搜索</el-button
              >
              <el-button type="warning" size="small" @click="handelRest"
                >重置</el-button
              >
            </el-col>
          </el-form>
          <el-col :span="12" :offset="0"></el-col>
        </el-row>
      </div>
      <!-- card body -->
      <el-table :data="accountList" border stripe>
        <el-table-column prop="id" width="80" label="#"> </el-table-column>
        <el-table-column prop="nickname" width="360" label="账号">
        </el-table-column>
        <el-table-column prop="phone" width="170" label="手机号">
        </el-table-column>
        <!-- <el-table-column prop="" width="170" label="角色"> </el-table-column>
        <el-table-column prop="" width="170" label="分组"> </el-table-column> -->
        <el-table-column prop="reg_time" width="170" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.reg_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column width="170" label="状态">
          <template slot-scope="scope">
            <el-tag type='danger' v-if='scope.row.status == 1'>冻结</el-tag>
            <el-tag type='' v-else>正常</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="code" width="170" label="邀请码">
        </el-table-column> -->
        <!-- <el-table-column prop="" width="270" label="发小额红包是否需要审批">
          <template>
            <el-tag type="success" size="mini" effect="dark">1</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="whats_app_account"
          width="170"
          label="whatsApp账号"
        >
        </el-table-column>
        <el-table-column
          prop="whats_app_link"
          width="270"
          label="whatsApp群链接"
        >
        </el-table-column>
        <!-- <el-table-column prop="" width="270" label="elegram账号">
        </el-table-column> -->
        <el-table-column label="操作" align="center" min-width="300" fixed='right'>
          <template slot-scope="scope">
            <el-button 
            v-if='scope.row.status == 1'
            type='primary' size="mini" @click="haddleStatus(2,scope.row.id,scope.$index)"
            >解冻</el-button>
            <el-button 
             v-else
            type='danger' size="mini" @click="haddleStatus(1,scope.row.id,scope.$index)"
            >冻结</el-button>
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="info"
              @click="editAccount(scope.row)"
              >修改</el-button
            >
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="deleAccount(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 绑定账号 -->
       <el-dialog
        title="绑定账号"
        :visible.sync="showBinding"
        width="700px"
      >
        <el-form
          :model="bindingInfo"
          ref="bindingRules"
          label-width="100px"
          @close="closeBangding"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入内容" v-model="bindingInfo.searchTel" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchId"></el-button>
            </el-input>
          </el-form-item>
          <blockquote v-if='showInps'>
            <el-form-item label="userID">
              <el-input
                v-model="bindingInfo.user_id"
                disabled
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="bindingInfo.nickname"
                placeholder="请输入昵称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="accounts">
              <el-input
                v-model="bindingInfo.account"
                placeholder="请输入登录账号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="bindingInfo.password"
                placeholder="请输入密码"
                clearable
              ></el-input>
            </el-form-item>
          </blockquote>
        </el-form>

        <span slot="footer" v-if='showInps'>
          <el-button @click="showBinding = false" size="small">取消</el-button>
          <el-button type="primary" @click="submitBinding" size="small"
            >确定</el-button
          >
        </span>
      </el-dialog>
      <!-- 新增/修改 -->
      <el-dialog
        :title="status === 1 ? '添加账号' : '修改账号'"
        :visible.sync="isAccount"
        width="35%"
        @close="close"
      >
        <el-form
          :model="information"
          ref="informRef"
          label-width="140px"
          :rules="informRules"
          size="small"
        >
          <el-form-item label="昵称" prop="accounts">
            <el-input
              v-model="information.accounts"
              placeholder="请输入昵称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="组长手机号" prop="phone">
            <el-input
              v-model="information.phone"
              clearable
              placeholder="请输入组长手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="information.password"
              :placeholder="status==1 ? '请输入密码' : '不修改可不填'"
              clearable
              type='password'
            ></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="information.time"
              type="datetime"
              placeholder="选择日期时间"
              value-format="timestamp"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="角色" prop="role">
            <el-input
              v-model="information.role"
              cearable
              placeholder="请输入密码"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="发红包权限" prop="envelope">
            <el-radio v-model="information.envelope"
              >小额红包(1000)不需要主管审批</el-radio
            >
          </el-form-item> -->
          <!-- <el-form-item label="邀请码" prop="code">
            <el-input
              v-model="information.code"
              placeholder="邀请码"
              clearable
            ></el-input>
          </el-form-item> -->
          <el-form-item label="WhatsApp账号" prop="whatsApp">
            <el-input
              v-model="information.whatsApp"
              placeholder="客服请输入WhatsApp账号，多个用逗号隔开"
              size="normal"
              type="textarea"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="WhatsApp群链接" prop="groupLink">
            <el-input
              v-model="information.groupLink"
              placeholder="whatApp群链接"
              size="normal"
              type="textarea"
              clearable
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="telegram账号">
            <el-input
              v-model="information.telegram"
              placeholder="客服请输入telegrams账号，多个用逗号隔开"
              size="normal"
              type="textarea"
              clearable
            ></el-input>
          </el-form-item> -->
        </el-form>

        <span slot="footer">
          <el-button @click="isAccount = false" size="small">取消</el-button>
          <el-button type="primary" @click="handelSubmit" size="small"
            >确定</el-button
          >
        </span>
      </el-dialog>
      <div class="pagination-bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 30, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getgroupLeaderAccountList,
  addGroupLeader,
  myBindingAccount,
  searchData,
  delGroupLeaderData,
  motifyGroupLeaderData
} from "@/api/groupLeader.js";
import {
   frozenIT,
  disFrozenIT
} from '@/api/system.js'
import {canClickFn} from '@/utils/myAPI'
export default {
  name: "groupLeaderAccount",
  data: () => ({
    isAccount: false,
    showBinding: false,
    accountList: [],
    status: 1,
    showInps: false,
    selectList: [
      {
        id: 1,
        label: "客服",
      },
    ],
    accountData: {
      name: "",
      select: "",
      num: "",
    },
    bindingInfo: {
      searchTel: '',
      user_id: '',
      password: '',
      nickname: '',
      account: ''
    },
    information: {
      accounts: "",
      name: "",
      password: "",
      role: "",
      envelope: true,
      whatsApp: "",
      groupLink: "",
      telegram: "",
      // code: "",
      phone: "",
      time: "",
      id: ""
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    informRules: {
      accounts: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 24, message: '请输入 2 到 24 个字符', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { min: 8, max: 13, message: '请输入 8 到 13 个字符', trigger: 'blur' }
      ],
      password: [
        {required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: '请输入 6 到 20 个字符', trigger: 'blur' }
      ]
    },
    // bindingRules: {
    //   phone: [
    //     { required: true, message: "请输入手机号", trigger: "blur" },
    //     { min: 8, max: 13, message: '请输入 8 到 13 个字符', trigger: 'blur' }
    //   ],
    //   nickname: [
    //     { required: true, message: "请输入昵称", trigger: "blur" },
    //     { min: 2, max: 24, message: '请输入 2 到 24 个字符', trigger: 'blur' }
    //   ],
    //   accounts: [
    //     { required: true, message: "请输入登录账号", trigger: "blur" },
    //     { min: 4, max: 20, message: '请输入 4 到 20 个字符', trigger: 'blur' }
    //   ],
    //   password: [
    //     {required: true, message: "请输入密码", trigger: "blur" },
    //     { min: 6, max: 20, message: '请输入 6 到 20 个字符', trigger: 'blur' }
    //   ]
    // },
  }),
  activated() {
    this.init()
    this.getSystems();
  },
  methods: {
    init(){
      this.isAccount = false
      this.showInps = false
      this.accountData = {
        name: "",
        select: "",
        num: "",
      }
      this.bindingInfo = {
        searchTel: '',
        user_id: '',
        password: '',
        nickname: '',
        account: ''
      }
      this.information = {
        accounts: "",
        name: "",
        password: "",
        role: "",
        envelope: true,
        whatsApp: "",
        groupLink: "",
        telegram: "",
        // code: "",
        phone: "",
        time: "",
        id: ""
      }
      this.pageSize = 10
      this.pageIndex = 1
    },
    haddleStatus(index,id,itemIndex){
     
      canClickFn(() => {
        if(index == 1){
          // 表示冻结
          frozenIT({user_id:id}).then(resp => {
            if(resp.code == 200){
              //1代表冻结
              this.accountList[itemIndex].status = 1
            }
          })
        }else{
          // 表示解冻
          disFrozenIT({user_id:id}).then(resp => {
            if(resp.code == 200){
              //0代表正常
              this.accountList[itemIndex].status = 0
            }
          })
        }
      })
    },
    haddleBangding(){
      this.bindingInfo = {
        searchTel: '',
        user_id: '',
        password: '',
        nickname: '',
        account: ''
      }
      this.showInps = false
      this.showBinding = true
    },
    submitBinding(){
      let {user_id,password,nickname,account} = this.bindingInfo
      let nicknameLen = nickname.trim().length
      let accountsLen = account.trim().length
      let passwordLen = password.trim().length
      if(nicknameLen == 0){
        this.$message.error('请输入昵称');
        return
      }
      if(nicknameLen <2 || nicknameLen > 24){
        this.$message.error('昵称请输入 2 到 24 个字符');
        return
      }
      if(accountsLen == 0){
         this.$message.error('请输入登录账号');
         return
      }
      if(accountsLen <4 || accountsLen > 20){
        this.$message.error('登录账号请输入 4 到 20 个字符');
        return
      }
      if(passwordLen == 0){
         this.$message.error('请输入密码');
         return
      }
      if(passwordLen <6 || passwordLen > 20){
        this.$message.error('密码请输入 6 到 20 个字符');
        return
      }
      canClickFn(() => {
        let params = {user_id,password,nickname,account}
        myBindingAccount(params).then(resp => {
          if(resp.code == 200){
            this.$message({
              message: '绑定成功',
              type: 'success'
            });
            this.pageIndex = 1
            this.getSystems()
          }else{
            this.$message.error(resp.msg);
          }
        })
      })
     
    },
    searchId(){
      if(this.bindingInfo.searchTel.trim().length == 0){
         this.$message.error('请输入手机号');
         return
      }
      canClickFn(() => {
        searchData({phone: this.bindingInfo.searchTel}).then(resp => {
         if(resp.code == 200){
            this.showInps = true
            this.bindingInfo.user_id = resp.data.id
          }else{
            this.$message.error(resp.msg);
          }
        })
      })
     
    },
    /**
     * 获取账户信息
     */
    getSystems() {
      getgroupLeaderAccountList({
        page: this.pageIndex,
        limit: this.pageSize,
        phone: this.accountData.name,
        nickname: this.accountData.num
      }).then((res) => {
        if (res.code === 200) {
          this.accountList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSystems();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getSystems();
      console.log(`当前页: ${val}`);
    },
    /**
     * 新增
     */
    handelAdd() {
      this.status = 1;
      this.information.accounts = ''
      this.information.time = ''
      this.information.phone = ''
      this.information.whatsApp = ''
      this.information.groupLink = ''
      this.information.id = ''
      this.informRules.password = [
        {required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: '请输入 6 到 20 个字符', trigger: 'blur' }
      ]
      this.isAccount = true
    },
    handelSearch() {
     this.pageIndex = 1
     this.getSystems()
    },
    handelRest() {
      this.$refs.accountRef.resetFields();
    },
    /**
     * 修改按钮
     */
    editAccount(item) {
      this.status = 2;
      const {
        id,
        code,
        nickname,
        phone,
        reg_time,
        whats_app_account,
        whats_app_link
      } = item
      this.information.accounts = nickname.toString()
      this.information.time = reg_time ? reg_time * 1000 : ''
      this.information.phone = phone.toString()
      this.information.whatsApp = whats_app_account
      this.information.groupLink = whats_app_link
      this.information.id = id
      this.informRules.password = [
        { min: 6, max: 20, message: '请输入 6 到 20 个字符', trigger: 'blur' }
      ]
      this.isAccount = true
    },
    /**
     * 删除按钮
     */
    deleAccount(item) {
      const params = { id: item.id};
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGroupLeaderData(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
            this.pageIndex = 1
            this.getSystems();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 新增、修改确定按钮
    handelSubmit() {
      this.$refs.informRef.validate((valid) => {
        if (valid) {
          const {
            accounts,
            phone,
            time,
            whatsApp,
            groupLink,
            code,
            id,
            password,
          } = this.information;
          let params = {
            phone,
            nickname: accounts,
            reg_time: time ? time / 1000 : '',
            whats_app_account: whatsApp,
            whats_app_link: groupLink,
          }
          if(password){
            params.password = password
          }
          if (this.status === 1) {
            addGroupLeader(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
                this.isAccount = false;
                this.pageIndex = 1
                this.getSystems();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else if (this.status === 2) {
            params.id = id
            motifyGroupLeaderData(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.isAccount = false;
                this.pageIndex = 1
                this.getSystems();
              } else {
                this.$message.error("修改失败");
              }
            });
          }
        }
      });
    },
    closeBangding(){
      this.$refs.bindingRules.resetFields();
    },
    close() {
      // this.information.password = "";
      this.$refs.informRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
  
</style>