<template>
  <div>
    <el-card>
      <!--工具条-->
      <el-col
        :span="24"
        class="toolbar"
        style="padding-bottom: 0px; width: 86%; margin-top: 15px"
      >
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.id"
              placeholder="id"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              v-on:click="getUsers"
              size="small"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="addUser"
              icon="el-icon-circle-plus-outline"
              >新增</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="userInfoList" style="width: 100%" border>
        <el-table-column prop="id" label="id" width="180"></el-table-column>

        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="role.rolename"
          label="关联角色"
          width="180"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-tag type="success">{{
              scope.row.status === 1 ? "在线" : "下线"
            }}</el-tag>
          </template>
        </el-table-column>
        <!--第二步  开始进行修改和查询操作-->
        <el-table-column
          label="操作"
          align="center"
          min-width="260"
          prop="status"
        >
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button> -->
            <el-button
              size="small"
              icon="el-icon-edit"
              type="info"
              @click="modifyUser(scope.row)"
              >修改</el-button
            >
            <el-button
              size="small"
              icon="el-icon-delete"
              type="danger"
              @click="deleteUser(scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              v-show="scope.row.status !== '封禁'"
              type="warning"
              @click="limitUser(scope.row)"
              >封禁</el-button
            >
            <el-button
              size="small"
              v-show="scope.row.status == '封禁'"
              type="info"
              @click="limitUser2(scope.row)"
              >已封禁</el-button
            >
          </template>
        </el-table-column>
        <!--编辑与增加的页面-->
      </el-table>
      <!--新增界面-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :title="addFormData.id ? '修改用户' : '新增用户'"
        :close-on-click-modal="false"
      >
        <!-- <el-divider content-position="left" slot="title" class="dialog-title">新增</el-divider>   -->
        <!-- <div slot="title" style="font-size:18px">新增</div> -->
        <el-form
          :model="addFormData"
          :rules="rules2"
          ref="addFormData"
          label-width="80px"
          class="demo-ruleForm login-container"
        >
          <el-form-item label="类型">
            <template>
              <el-select
                v-model="rolename"
                @change="select"
                :placeholder="addFormData.cNickname"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.rolename"
                  :value="item.id"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item prop="cUsername" label="用户名">
            <el-input
              type="text"
              v-model="addFormData.cUsername"
              @input="change($event)"
              auto-complete="on"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="cPassword" label="密码">
            <el-input
              type="text"
              v-model="addFormData.cPassword"
              @input="change($event)"
              auto-complete="on"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="cNickname" label="昵称">
            <el-input
              type="text"
              v-model="addFormData.cNickname"
              @input="change($event)"
              auto-complete="on"
              placeholder="昵称"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click.native="
              (dialogVisible = false),
                (addFormData = { cId: '', cUsername: '', cPwd: '' })
            "
            >取 消</el-button
          >
          <el-button v-if="isView" type="primary" @click.native="addSubmit()"
            >确 定</el-button
          >
          <el-button v-if="isView2" type="primary" @click="modify()"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <div class="block" style="margin-top: 20px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  AdminAdd,
  AdminList,
  AdminFind,
  AdminDel,
  AdminEdit,
  LimitUser,
  AdminRelieve,
} from "@/api/administrators.js";
export default {
  name: "home",
  data() {
    return {
      defaultProps: {
        children: "children_list",
        label: "permission_name",
      },
      roleList: [],
      roleId: "",
      userInfoList: [],
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
      isView2: true,
      powerList: [],
      PermissionList: [],
      rolename: null,
      jurisdictionList: [],
      isLimit: true,
      isLimit2: false,
      addFormData: {
        cUsername: "",
        cPassword: "",
        cNickname: "",
        cRole_id: "",
      },
      total: 0,
      pagesize: 5,
      currentPage: 1,
      rules2: {
        cUsername: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        cPassword: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        cNickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur",
          },
        ],
        cRole_id: [
          {
            required: true,
            message: "关联角色id不能为空",
            trigger: "blur",
          },
        ],
      },
      filters: {
        id: "",
      },
    };
  },
  activated() {
    AdminList(this.pagesize, this.currentPage).then((result) => {
      this.roleList = result.data.role;
      this.total = result.data.total;
      var _data = result.data.list;
      this.userInfoList = _data;
    });
  },
  mounted: function () {
    // this.loadData();
    // console.log(this.userInfoList)
  },

  methods: {
    limitUser(rowData) {
      // console.log(rowData);
      //  let status = rowData.status
      this.$confirm("是否封禁管理员", "管理员封禁", {
        confirmButtonText: "确定",
      })
        .then(() => {
          LimitUser(rowData.id).then((result) => {
            if (result.code === 200) {
              this.$message({
                type: "info",
                message: `已封禁`,
              });
            } else {
              this.$message({
                type: "info",
                message: `封禁失败`,
              });
            }
            this.loadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消封禁",
          });
        });
    },
    limitUser2(rowData) {
      // console.log(rowData);
      //  let status = rowData.status
      this.$confirm("是否解除封禁管理员", "解除管理员封禁", {
        confirmButtonText: "确定",
      })
        .then(() => {
          AdminRelieve(rowData.id).then((result) => {
            if (result.code === 200) {
              this.$message({
                type: "info",
                message: `已解除封禁`,
              });
            } else {
              this.$message({
                type: "info",
                message: `解除封禁失败`,
              });
            }
            this.loadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解除封禁",
          });
        });
    },
    select(val) {
      this.roleId = val;
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
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
      this.loadData();
      // console.log(val) //当前第几页
      // console.log(`当前页: ${val}`);
    },
    getCheckedKeys() {
      this.PermissionList = this.$refs.tree.getCheckedKeys();
      // console.log(this.PermissionList)
    },
    loadData() {
      // let param = {
      //   filter: this.filters.id
      // };
      AdminList(this.pagesize, this.currentPage).then((result) => {
        // console.log(result)
        this.total = result.data.total;
        var _data = result.data.list;
        this.userInfoList = _data;
      });
      // console.log(this.filters.id)
      // RoleFind(this.filters.id).then((result) => {
      //   console.log(result)
      // var _data = result.data;
      // this.userInfoList = _data;
      // });
    },
    getUsers() {
      AdminFind(this.filters.id).then((result) => {
        // console.log(result)
        var _data = result.data;
        let arr = [];
        arr[0] = _data;
        this.userInfoList = arr;
      });
    },
    addUser() {
      // console.log(this.roleList)
      this.jurisdictionList = [];
      this.addFormData = {
        // cId: '',
        cUsername: "",
        // cPwd: ''
      };
      // console.log(this.addFormData.cUsername)
      this.isView = true;
      this.isView2 = false;
      this.dialogVisible = true;
      //    this.addFormReadOnly = false;
    },
    checkDetail(rowData) {
      this.addFormData = Object.assign({}, rowData);
      this.isView = false;
      this.dialogVisible = true;

      //    this.addFormReadOnly = true;
    },
    modifyUser(rowData) {
      // console.log(rowData)
      // console.log(this.addFormData)
      this.$nextTick(() => {
        this.addFormData.cUsername = JSON.parse(
          JSON.stringify(rowData.username)
        );
        this.addFormData.cNickname = JSON.parse(
          JSON.stringify(rowData.nickname)
        );
        this.roleId = JSON.parse(JSON.stringify(rowData.role_id));
        this.rolename = JSON.parse(JSON.stringify(rowData.role_id));
      });
      // console.log(this.addFormData.cUsername)
      this.addFormData = Object.assign({}, rowData);
      this.isView = false;
      this.isView2 = true;
      this.dialogVisible = true;
      // this.addFormReadOnly = false
      // let param = Object.assign({}, this.addFormData);
    },

    modify() {
      // console.log(this.addFormData)
      AdminEdit(
        this.addFormData.id,
        this.addFormData.cUsername,
        this.addFormData.cPassword,
        this.addFormData.cNickname,
        this.roleId
      ).then((result) => {
        if (result.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.loadData();
        } else {
          this.$message({
            type: "info",
            message: "修改失败",
          });
        }
        this.dialogVisible = false;
      });
    },
    deleteUser(rowData) {
      // console.log(rowData.id)
      this.$confirm("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          AdminDel(rowData.id).then((result) => {
            // console.info(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: `删除成功`,
              });
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
    }, //增加一条记录
    addSubmit() {
      //先判断表单是否通过了判断
      this.$refs.addFormData.validate((valid) => {
        //代表通过验证 ,将参数传回后台
        if (valid) {
          AdminAdd(
            this.addFormData.cUsername,
            this.addFormData.cPassword,
            this.addFormData.cNickname,
            this.roleId
          ).then((result) => {
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.loadData();
            } else {
              this.$message({
                type: "info",
                message: "添加失败",
              });
            }
            this.dialogVisible = false;
          });
        }
      });
    },
  },
};
</script>

<style>
body {
  background: #dfe9fb;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
.dialog-title {
  font-size: 18px;
}
</style>
