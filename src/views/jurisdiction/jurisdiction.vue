<template>
  <div>
    <el-card style="height: 100vh">
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
            <el-button type="primary" size="small" v-on:click="getUsers"
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
      <el-tree
        style="float: left; background-color: #fff; width: 100%; height: 300px"
        @node-click="checkChange"
        :data="infoList"
        :props="defaultProps"
      >
        <!--  <div style="margin-left: 1000px;">
  <template slot-scope="scope">
    <el-button type="info" @click="modifyUser(scope.row)">修改</el-button>
  </template>
  </div> -->
      </el-tree>
      <el-dialog
        title="新增权限"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addFormData"
          :rules="rules2"
          ref="addFormData"
          label-width="100px"
          class="demo-ruleForm login-container"
        >
          <el-form-item prop="cName" label="权限名称">
            <el-input
              type="text"
              v-model="addFormData.cName"
              @input="change($event)"
              placeholder="权限名"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item prop="cAddress" label="权限地址">
            <el-input
              type="text"
              v-model="addFormData.cAddress"
              @input="change($event)"
              placeholder="接口地址"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级名称">
            <template>
              <el-select
                v-model="permission_name"
                @change="select"
                placeholder="选择上级权限id,不选则为0"
              >
                <el-option
                  v-for="item in limitList"
                  :key="item.id"
                  :label="item.permission_name"
                  :value="item.id"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </template>
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
    </el-card>
  </div>
</template>

<script>
import {
  JurFind,
  JurAdd,
  JurFind2,
  JurFindBy,
  JurEdit,
} from "@/api/Jurisdiction.js";

export default {
  data() {
    return {
      limitList: [],
      infoList: [],
      filters: {
        id: "",
      },
      id: "",
      roleName: "",
      permission_name: "",
      addFormData: {
        cId: "",
        cName: "",
        cAddress: "",
        cParent_id: "",
      },
      isView: true,
      isView2: true,
      dialogVisible: false,
      rules2: {
        cName: [
          {
            required: true,
            message: "权限名不能为空",
            trigger: "blur",
          },
        ],
        cAddress: [
          {
            required: true,
            message: "接口地址不能为空",
            trigger: "blur",
          },
        ],
        cParent_id: [
          {
            required: true,
            message: "上级id不能为空",
            trigger: "blur",
          },
        ],
      },
      powerList: [],
      jurisdictionList: [],
      defaultProps: {
        children: "children_list",
        label: "permission_name",
      },
    };
  },
  activated() {},
  created() {
    JurFind().then((res) => {
      this.total = res.data.total;
      // console.log(result)
      var _data = res.data.list;
      this.infoList = _data;
      // console.log(this.infoList)
    });
  },
  methods: {
    checkChange(data) {
      // console.log(data)
      JurFind2().then((res) => {
        // console.log(res.data )
        this.limitList = res.data;
        this.limitList.map((item) => {
          if (item.id === data.parent_id) {
            this.permission_name = item.permission_name;
          }
        });
      });
      if (data.parent_id === 0) {
        this.id = 0;
      }
      this.addFormData.cId = data.id;
      this.addFormData.cName = data.permission_name;
      this.addFormData.cAddress = data.address;
      this.id = data.parent_id;
      this.isView = false;
      this.isView2 = true;
      this.dialogVisible = true;
    },
    getUsers() {
      JurFindBy(this.filters.id).then((result) => {
        // console.log(result)
        var _data = result.data;
        let arr = [];
        arr[0] = _data;
        this.infoList = arr;
      });
    },
    select(val) {
      this.id = val;
    },
    change() {
      this.$forceUpdate();
    },
    loadData() {
      JurFind().then((res) => {
        this.total = res.data.total;
        // console.log(result)
        var _data = res.data.list;
        this.infoList = _data;
        // console.log(this.infoList)
      });
    },
    addUser() {
      JurFind2().then((res) => {
        this.limitList = res.data;
      });
      this.isView = true;
      this.isView2 = false;
      this.dialogVisible = true;
    },
    addSubmit() {
      //先判断表单是否通过了判断
      this.$refs.addFormData.validate((valid) => {
        //代表通过验证 ,将参数传回后台
        if (valid) {
          JurAdd(
            this.addFormData.cName,
            this.addFormData.cAddress,
            this.id
          ).then((result) => {
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
    modify() {
      // console.log(this.addFormData)
      JurEdit(
        this.addFormData.cId,
        this.addFormData.cName,
        this.addFormData.cAddress,
        this.id
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
  },
};
</script>

<style>
</style>
