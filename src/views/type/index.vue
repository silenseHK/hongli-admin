<template>
  <div>
    <el-card>
      <!--工具条-->
      <el-col
        :span="24"
        class="toolbar"
        style="padding-bottom: 0px; width: 86%; margin-top: 15px; "
      >
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.id" placeholder="id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adSearch" icon="el-icon-search">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser" icon="el-icon-circle-plus-outline">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 表格区域start -->
      <el-table :data="advertiListdata" style="width: 100%; " border>
        <el-table-column prop="id" label="id" width="80"></el-table-column>
        <el-table-column prop="text" label="类型" width="400"></el-table-column>

        <!-- 表格end -->
        <!--第二步  开始进行修改和查询操作-->
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button> -->
            <el-button
              icon="el-icon-edit"
              size="small"
              type="info"
              @click="modifyUser(scope.row)"
            >修改</el-button>
            <el-button
              icon="el-icon-delete"
              size="small"
              type="danger"
              @click="deleteUser(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
        <!--编辑与增加的页面-->
      </el-table>

      <!--新增界面-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="40%"
        :close-on-click-modal="false"
        @close="close"
      >
        <el-form
          label-width="80px"
          :model="pictureData"
          :rules="rules"
          ref="pictureData"
          hide-required-asterisk
        >
          <el-form-item label="资讯类型名:" prop="text" label-width="110px">
            <el-input v-model="pictureData.text" autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddCompanyVisible('pictureData')">取 消</el-button>
          <el-button v-if="isView" type="primary" @click.native="addSubmit()">确 定</el-button>
          <el-button v-if="isView2" type="primary" @click="modify()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div class="block" style=" margin-top: 20px;">
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
import { typeList, typeFind, typeAdd, typeDel, typeEdit } from "@/api/types.js";
export default {
  name: "Advertising",
  components: {},
  data() {
    return {
      //  广告类型
      advertising: [],
      advertiListdata: [],
      // 图片
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
      isView2: true,
      pictureData: {
        text: "",
        id: ""
      },
      total: 0,
      pagesize: 5,
      currentPage: 1,
      // 表单验证
      rules: {
        text: [
          {
            type: "string",
            required: true,
            message: "请输入资讯类型名称",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 3 到 20个字符", trigger: "blur" }
        ]
      },
      // 查询id
      filters: {
        id: ""
      }
    };
  },

  created() {
    // 获取广告类型
    this.activated();
  },

  methods: {
    // 关闭对话框的回调
    close() {
      this.pictureData.text = "";

      this.$nextTick(() => {
        this.$refs.pictureData.clearValidate();
      });
    },
    // 请求
    activated() {
      typeList().then(result => {
        //   this.total = result.data.total;
        // console.log(result)
        var _data = result.data.types;
        this.advertiListdata = _data;
      });
      // console.log(this.PermissionList)
    },
    //   取消表单验证
    cancelAddCompanyVisible(pictureData) {
      this.$refs[pictureData].resetFields();
      this.dialogVisible = false;
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
    },
    // getCheckedKeys() {
    //   this.PermissionList = this.$refs.tree.getCheckedKeys();
    //   console.log(this.PermissionList);
    // },
    loadData() {
      typeList().then(result => {
        // console.log(result)
        // this.total = result.data.total;
        var _data = result.data.types;
        this.advertiListdata = _data;
      });
    },
    // 查询
    adSearch() {
      if (this.filters.id === "") {
        this.$message({
          type: "warning",
          message: "请选择ID"
        });
      } else {
        typeFind(this.filters.id).then(result => {
          var _data = result.data;
          let arr = [];
          arr[0] = _data;
          this.advertiListdata = arr;
        });
      }
    },
    addUser() {
      this.dialogVisible = true;
      this.isView = true;
      this.isView2 = false;
    },

    modifyUser(rowData) {
      this.pictureData.text = rowData.text;
      this.pictureData.id = rowData.id;
      this.isView = false;
      this.isView2 = true;
      this.dialogVisible = true;
      // this.addFormReadOnly = false
    },

    modify() {
      const advertiEdit = {
        id: this.pictureData.id,
        text: this.pictureData.text
      };
      typeEdit(advertiEdit).then(result => {
        if (result.code === 200) {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.loadData();
        } else {
          this.$message({
            type: "error",
            message: "修改失败"
          });
        }
        this.dialogVisible = false;
      });
    },
    deleteUser(rowData) {
      // console.log(rowData.id)
      this.$confirm("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定"
      })
        .then(() => {
          typeDel(rowData.id).then(result => {
            console.info(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: `已删除`
              });
              const totalPage = Math.ceil((this.total - 1) / this.pagesize); // 总页数
              this.currentPage =
                this.currentPage > totalPage ? totalPage : this.currentPage;
              this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
              this.loadData();
            } else {
              this.$message({
                type: "info",
                message: `删除失败`
              });
            }
            this.loadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }, //增加一条记录
    addSubmit() {
      // console.log('123');

      //   代表通过验证 ,将参数传回后台
      this.$refs.pictureData.validate(valid => {
        if (valid) {
          const typeData = {
            text: this.pictureData.text,
            platform_id: this.pictureData.platform_id
          };

          typeAdd(typeData).then(result => {
            // console.log(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.loadData();
            } else {
              this.$message({
                type: "error",
                message: "添加失败"
              });
            }

            this.dialogVisible = false;
          });
        }
      });
    }
  }
};
</script>

<style>
.addnews {
  margin-left: 600px;
}
</style>
