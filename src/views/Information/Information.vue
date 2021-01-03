<template>
  <div class="centen-infor">
    <el-card>
      <!--工具条-->
      <el-col
        :span="24"
        class="toolbar"
        style="padding-bottom: 0px; width: 86%; margin-top: 15px"
      >
        <el-form :inline="true" :model="filters">
          <!-- <el-form-item>
            <el-input v-model="filters.id" placeholder="id"></el-input>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-button
              type="primary"
              @click="getUsers"
              size="small"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-form-item> -->
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="addNews"
              icon="el-icon-circle-plus-outline"
              >新增</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              @click="deleteAll"
              type="primary"
              :disabled="showDelete"
            >
              批量删除</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="generateList"> 生成列表</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 表格区域start -->
      <el-table
        :data="userInfoList"
        style="width: 100%"
        border
        @select="onSelect"
        @select-all="onSelectAll"
        tooltip-effect="dark"
      >
        <!-- <el-table-column prop="id" label="id" width="80"></el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="brief_title"
          label="副标题"
          width="130"
        ></el-table-column>

        <el-table-column prop="image" label="图片">
          <template slot-scope="scope">
            <el-popover placement="right" title trigger="hover" width="80px">
              <img
                :src="GLOBAL.IMG_URL + scope.row.image"
                style="max-height: 350px; max-width: 380px"
              />
              <img
                slot="reference"
                :src="GLOBAL.IMG_URL + scope.row.image"
                :alt="scope.row.image"
                style="max-height: 50px; max-width: 80px"
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="keyword" label="关键字"></el-table-column>
        <el-table-column
          prop="abstract"
          label="内容摘要"
          width="350"
        ></el-table-column>
        <el-table-column label="内容" width="400" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div v-html="scope.row.content"></div> -->
            <!-- tips悬浮提示 -->
            <el-tooltip
              placement="top"
              v-model="scope.row.showTooltip"
              :open-delay="500"
              effect="dark"
              :disabled="!scope.row.showTooltip"
            >
              <div slot="content" v-html="scope.row.content"></div>
              <div
                @mouseenter="showTips($event, scope.row)"
                v-html="scope.row.content"
                class="myNote"
              ></div>
            </el-tooltip>
          </template>
        </el-table-column>
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
              >修改</el-button
            >
            <el-button
              icon="el-icon-delete"
              size="small"
              type="danger"
              @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <!--编辑与增加的页面-->
      </el-table>

      <!--新增界面-->

      <!-- 分页 -->
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
  Informationlist,
  InformatioDel,
  newsGene,
  newsDeleteAll,
} from "@/api/Information.js";
export default {
  name: "Information",

  data() {
    return {
      defaultProps: {
        children: "children_list",
        label: "permission_name",
      },
      showDelete: true,
      selections: {}, // 保存已选择过的row
      informationsID: "",
      userInfoList: [],
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
      isView2: true,
      powerList: [],
      PermissionList: [],
      rolename: null,
      jurisdictionList: [],
      isShowList: false,
      addFormDatas: {
        cUsername: "",
        titles: "",
        id: null,
        content: "",
        times: "",
        typesOf: "",
      },
      total: 0,
      pagesize: 5,
      currentPage: 1,
      // 表单验证
      rules: {
        cUsername: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20个字符", trigger: "blur" },
        ],
        titles: [
          { required: true, message: "请输入副标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20个字符", trigger: "blur" },
        ],

        content: [
          { required: true, message: "请输入类容", trigger: "blur" },
          { min: 3, message: "请输入类容", trigger: "blur" },
        ],
        typesOf: [
          {
            type: "number",
            required: true,
            message: "请选择类型",
            trigger: "blur",
          },
        ],
        times: [
          {
            type: "date",
            required: true,
            message: "请输入时间",
            trigger: "change",
          },
        ],
      },
      // 查询id
      filters: {
        id: "",
      },
    };
  },

  created: function () {
    this.activated();
  },

  methods: {
    // 关闭对话框的回调
    close() {
      this.addFormDatas.cUsername = "";
      this.addFormDatas.titles = "";
      this.addFormDatas.content = "";
      this.addFormDatas.id = "";
      this.addFormDatas.typesOf = "";
      this.addFormDatas.times = "";
      this.$nextTick(() => {
        this.$refs.formName.clearValidate();
      });
    },
    // 请求资讯数据
    activated() {
      Informationlist(this.pagesize, this.currentPage).then((result) => {
        this.total = result.data.total;
        // console.log(result)
        var _data = result.data.list;
        this.userInfoList = _data;
      });
      // console.log(this.PermissionList)
    },
    //   取消表单验证
    cancelAddCompanyVisible(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      /*
      this.addFormDatas.cUsername = "";
      this.addFormDatas.content = "";
      this.addFormDatas.titles = ""; */
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
      Informationlist(this.pagesize, this.currentPage).then((result) => {
        // console.log(result)
        this.total = result.data.total;
        var _data = result.data.list;
        this.userInfoList = _data;
      });
    },
    // 查询
    // getUsers() {
    //   if (this.filters.id === "") {
    //     this.$message({
    //       type: "warning",
    //       message: "请选择ID",
    //     });
    //   } else {
    //     InformatioFind(this.filters.id).then((result) => {
    //       var _data = result.data;
    //       let arr = [];
    //       arr[0] = _data;
    //       this.userInfoList = arr;
    //     });
    //   }
    // },
    addNews() {
      this.$router.push({
        path: "news-add",
      });
    },

    modifyUser(rowData) {
      this.$store.commit("news/STORE_GOODSFORNO", rowData);
      this.$router.push({
        path: "news-update",
      });
    },

    deleteUser(rowData) {
      // console.log(rowData.id)
      this.$confirm("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          InformatioDel(rowData.id).then((result) => {
            // console.info(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: `已删除`,
              });
              this.loadData();
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
     * 生成类表按钮
     */
    generateList() {
      newsGene().then((res) => {
        console.log(res);
      });
    },

    // 勾选时候，记录[{u_id: row}, ...]
    onSelect(selection, row) {
      if (this.selections[row.id]) {
        delete this.selections[row.id];
        this.showDelete = true;
      } else {
        this.selections[row.id] = row;
        this.showDelete = false;
      }
    },

    // 全选情况
    onSelectAll(selection) {
      // 全选
      if (selection.length) {
        selection.forEach((row) => {
          this.selections[row.id] = row;
          this.showDelete = false;
        });
      } else {
        // 取消全选
        console.log("取消全选");
        this.userInfoList.forEach((row) => {
          delete this.selections[row.id];
          this.showDelete = true;
        });
      }
    },

    // 对已选择过的row勾选，返回到上一页时候
    checkRows() {
      const keys = Object.keys(this.selections);
      const rows = this.userInfoList.filter((row) => {
        return keys.includes(String(row.id));
      });

      rows.map((row) => {
        this.$refs.table.toggleRowSelection(row);
      });
    },
    /**
     * 批量删除按钮
     */
    deleteAll() {
      console.log(this.selections);

      const ids = Object.keys(this.selections);
      newsDeleteAll(ids).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.loadData();
        } else {
          this.$message.erroe("删除失败");
        }
      });
    },
    /**
     * 多余部分隐藏
     */

    showTips(obj, row) {
      /*obj为鼠标移入时的事件对象*/

      /*currentWidth 为文本在页面中所占的宽度，建立标签，加入到页面，获取currentWidth ,最后在移除*/
      let TemporaryTag = document.createElement("span");
      TemporaryTag.innerText = row.note;
      TemporaryTag.className = "getTextWidth";
      document.querySelector("body").appendChild(TemporaryTag);
      let currentWidth = document.querySelector(".getTextWidth").offsetWidth;
      document.querySelector(".getTextWidth").remove();

      /*cellWidth为表格容器的宽度*/
      const cellWidth = obj.target.offsetWidth;

      /*当文本宽度小于||等于容器宽度两倍时，表明文本显示未超过两行*/
      currentWidth <= 2 * cellWidth
        ? (row.showTooltip = false)
        : (row.showTooltip = true);
    },
  },
};
</script>

<style>
.addnews {
  margin-left: 600px;
}
.myNote {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.el-tooltip__popper {
  max-width: 900px;
  line-height: 180%;
}
</style>
