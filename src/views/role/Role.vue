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
            <el-button type="primary" v-on:click="getUsers" size="small"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="addUser"
              size="small"
              icon="el-icon-circle-plus-outline"
              >新增</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="userInfoList" style="width: 100%" border>
        <el-table-column prop="id" label="id" width="80"></el-table-column>

        <el-table-column
          prop="rolename"
          label="角色名称"
          width="280"
        ></el-table-column>
        <el-table-column label="权限" width="850">
          <template slot-scope="scope">
            <div v-html="scope.row.jurisdiction"></div>
          </template>
        </el-table-column>

        <!--第二步  开始进行修改和查询操作-->
        <el-table-column label="操作" align="center" min-width="200">
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
          </template>
        </el-table-column>
        <!--编辑与增加的页面-->
      </el-table>
      <!--新增界面-->
      <el-dialog
        :title="addFormData.id ? '修改角色' : '新增角色'"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addFormData"
          :rules="rules2"
          ref="addFormData"
          label-width="20px"
          class="demo-ruleForm login-container"
        >
          <el-form-item prop="cUsername">
            <el-input
              type="text"
              v-model="addFormData.cUsername"
              @input="change($event)"
              placeholder="角色名称"
              auto-complete="on"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-tree
          :data="powerList"
          show-checkbox
          ref="tree"
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="jurisdictionList"
          :props="defaultProps"
        ></el-tree>

        <span slot="footer" class="dialog-footer">
          <el-button
            @click.native="
              (dialogVisible = false),
                (addFormData = { cId: '', cUsername: '', cPwd: '' })
            "
            >取 消</el-button
          >
          <el-button
            v-if="isView"
            type="primary"
            @click.native="getCheckedKeys(), addSubmit()"
            >确 定</el-button
          >
          <el-button
            v-if="isView2"
            type="primary"
            @click="
              getCheckedKeys();
              modify();
            "
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
  RoleAdd,
  RoleList,
  RoleFind,
  RoleDel,
  PowerFind,
  RoleEdit,
} from "@/api/role.js";

export default {
  name: "home",
  data() {
    return {
      defaultProps: {
        children: "children_list",
        label: "permission_name",
      },
      userInfoList: [],
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
      isView2: true,
      powerList: [],
      PermissionList: [],
      rolename: null,
      jurisdictionList: [],
      addFormData: {
        cUsername: "",
        cId: "",
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
        cPwd: [
          {
            required: true,
            message: "密码不能为空",
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
    // console.log(this.PermissionList)
  },
  created() {
    RoleList(this.pagesize, this.currentPage).then((result) => {
      this.total = result.data.total;
      // console.log(result)
      var _data = result.data.list;
      this.userInfoList = _data;
    });
  },
  mounted: function () {
    // this.loadData();
    // console.log(this.userInfoList)
  },

  methods: {
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
    },
    loadData() {
      // let param = {
      //   filter: this.filters.id
      // };
      RoleList(this.pagesize, this.currentPage).then((result) => {
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
      RoleFind(this.filters.id).then((result) => {
        var _data = result.data;
        let arr = [];
        arr[0] = _data;
        this.userInfoList = arr;
      });
    },
    addUser() {
      this.jurisdictionList = [];
      this.addFormData = {
        // cId: '',
        cUsername: "",
        // cPwd: ''
      };
      // console.log(this.addFormData.cUsername)
      PowerFind().then((res) => {
        this.powerList = res.data;
        // console.log('this.powerList--->',this.powerList)
      });
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
      this.$nextTick(() => {
        this.addFormData.cId = JSON.parse(JSON.stringify(rowData.id));
        this.addFormData.cUsername = rowData.rolename;
      });
      // console.log(this.addFormData.cUsername)

      RoleFind(rowData.id).then((result) => {
        // console.log(result)
        this.rolename = result.data.rolename;
        this.jurisdictionList = result.data.jurisdiction.split(",");
        this.jurisdictionList = JSON.parse(
          JSON.stringify(this.jurisdictionList)
        );
        // console.log(this.jurisdictionList)
        this.$nextTick(() => {
          // console.log(this.jurisdictionList)
          this.$refs.tree.setCheckedKeys(this.jurisdictionList); //获取已经设置的资源后渲染
        });
      }),
        PowerFind().then((res) => {
          this.powerList = res.data;
          // console.log('这--->',this.powerList)
        }),
        // console.log(rowData)
        (this.addFormData = Object.assign({}, rowData));
      this.isView = false;
      this.isView2 = true;
      this.dialogVisible = true;
      // this.addFormReadOnly = false
      // let param = Object.assign({}, this.addFormData);
    },

    modify() {
      let PermissionList = this.PermissionList.join(",");

      RoleEdit(
        this.addFormData.id,
        this.addFormData.cUsername,
        PermissionList
      ).then((result) => {
        if (result.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.loadData();
        } else {
          this.$message({
            type: "error",
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
          RoleDel(rowData.id).then((result) => {
            // console.info(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: `已删除`,
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
          // let param = Object.assign({}, this.addFormData);
          // console.log(this.PermissionList)
          let PermissionList = this.PermissionList.join(",");

          RoleAdd(this.addFormData.cUsername, PermissionList).then((result) => {
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.loadData();
            } else {
              this.$message({
                type: "error",
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
</style>
