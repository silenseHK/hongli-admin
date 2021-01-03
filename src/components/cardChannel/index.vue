<!--
 * @Descripttion: 充值渠道设置
 * @version: 
 * @Author: voanit
 * @Date: 2020-06-23 14:27:26
 * @LastEditors: voanit
 * @LastEditTime: 2020-07-01 14:08:34
--> 


<template>
  <div>
    <!-- <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>-->
    <el-button
      type="success"
      size="small"
      @click="addUser"
      icon="el-icon-circle-plus-outline"
      style="margin: 10px 0"
      >新增</el-button
    >

    <!-- 表格区域start -->
    <el-table :data="advertiListdata" style="width: 100%" border>
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column
        prop="title"
        label="渠道名称"
        width="180"
      ></el-table-column>
      <!--  -->
      <el-table-column
        prop="owner_name"
        label="收款人名称"
        width="180"
      ></el-table-column>
      <!-- 银行卡卡号 -->

      <el-table-column
        prop="bank_name"
        label="银行名称"
        width="380"
      ></el-table-column>
      <!-- agent对象部分 -->
      <el-table-column
        prop="open_bank"
        label="开户银行"
        width="230"
      ></el-table-column>
      <el-table-column
        prop="bank_number"
        label="银行卡卡号"
        width="230"
      ></el-table-column>

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
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
      @close="close"
    >
      <el-form
        label-width="120px"
        :model="channelData"
        :rules="bankCardRules"
        ref="pictureData"
        hide-required-asterisk
      >
        <el-form-item label="渠道标题:" prop="title">
          <el-input
            v-model="channelData.title"
            placeholder="请输入渠道标题"
            style="width: 218px"
            clearable
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item label="充值模式:" prop="userId">
            <el-select v-model="channelData.userId" placeholder="请充值模式">
              <el-option
                v-for="item in userData"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <div>
            <el-form-item label="银行卡所属银行:" prop="belongs">
              <el-input
                v-model="channelData.belongs"
                placeholder="请输入银行卡名称"
              ></el-input>
              <!-- <el-select v-model="channelData.belongs" placeholder="银行卡所属银行">
              <el-option
                v-for="item in category "
                :key="item.id"
                :label="item.bank_name"
                :value="item.id"
              ></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item label="收款人姓名:" prop="ownerName">
              <el-input
                v-model="channelData.ownerName"
                autocomplete="off"
                placeholder="收款人姓名"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="银行卡开户行:" prop="banks">
              <el-input
                v-model="channelData.banks"
                autocomplete="off"
                placeholder="银行卡开户行"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="银行卡号:" prop="cardNumber">
              <el-input
                v-model="channelData.cardNumber"
                type="text"
                placeholder="请输入银行卡账号"
                :maxlength="23"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddCompanyVisible('pictureData')" size="small"
          >取 消</el-button
        >
        <el-button
          v-if="isView"
          type="primary"
          @click.native="addSubmit()"
          size="small"
          >确 定</el-button
        >
        <el-button v-if="isView2" type="primary" @click="modify()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

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
  </div>
</template>
<script>
import {
  channelList,
  channelAdd,
  channelDel,
  channelEdit,
} from "@/api/topUp.js";

export default {
  name: "bankCard",
  components: {},
  data() {
    var checkUsername = function (rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入中文姓名"));
      } else if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
        return callback(new Error("请正确输入中文"));
      } else {
        callback();
      }
    };
    return {
      userData: [], //用户数据
      //  银行卡类别
      category: [],
      agentList: [],
      advertiListdata: [],
      // 图片
      addFormReadOnly: true,
      dialogVisible: false,
      isView: true,
      isView2: true,
      channelData: {
        userId: "",
        ownerName: "",
        banks: "",
        cardNumber: "",
        id: "",
        belongs: "",
        title: "",
      },
      tabPosition: "left",
      total: 0,
      pagesize: 5,
      currentPage: 1,
      // 表单验证
      bankCardRules: {
        title: [
          {
            type: "string",
            required: true,
            message: "请输入渠道标题",
            trigger: "blur",
          },
          { min: 1, max: 30, message: "请输入渠道标题", trigger: "blur" },
        ],
        ownerName: [
          {
            validator: checkUsername,
            trigger: "blur",
          },
        ],
        banks: [
          {
            type: "string",
            required: true,
            message: "请输入开户行",
            trigger: "blur",
          },
          { min: 1, max: 30, message: "请选择所属银行", trigger: "blur" },
        ],
        userId: [
          {
            type: "number",
            required: true,
            message: "选择用户名",
            trigger: "blur",
          },
        ],
        belongs: [
          {
            type: "number",
            required: true,
            message: "请选择所属开户行",
            trigger: "blur",
          },
        ],
        cardNumber: [
          {
            type: "string",
            required: true,
            message: "请输入银行卡号",
            trigger: "blur",
          },
          {
            min: 16,
            max: 19,
            message: "长度在 16 到 19个数字~",
            trigger: "blur",
          },
        ],
      },
      // 查询id
      filters: {
        id: "",
      },
    };
  },

  created() {
    /**
     * 获取模式ID
     */
    this.$store.dispatch("news/modeTypes").then((res) => {
      if (res.code === 200) {
        this.userData = res.data;
        let typedata = res.data;
        let typequdao = typedata.map((item) => item.alias);
        console.log(typequdao);
        let obj = {};
        for (var key in typequdao) {
          obj[key] = typequdao[key];
        }
        console.log(obj);
      }
    });
    /**
     * 获取银行卡名称
     */
    this.$store.dispatch("news/bankTypes").then((res) => {
      if (res.code === 200) {
        this.category = res.data;
      }
    });

    this.activated();
  },
  watch: {},
  methods: {
    // 格式化卡號顯示，每4位加-
    // 输入银行卡号
    validateNum() {},

    // 关闭对话框的回调
    close() {
      this.channelData.ownerName = "";
      this.channelData.title = "";
      this.channelData.userId = "";
      this.channelData.banks = "";
      this.channelData.cardNumber = "";
      this.channelData.phone = "";
      this.channelData.belongs = "";
      this.$nextTick(() => {
        this.$refs.pictureData.clearValidate();
      });
    },
    // 请求资讯数据
    activated() {
      channelList(this.pagesize, this.currentPage).then((result) => {
        this.total = result.data.total;
        // console.log(result)
        var _data = result.data.list;
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
      channelList(this.pagesize, this.currentPage).then((result) => {
        this.total = result.data.total;
        var _data = result.data.list;
        this.advertiListdata = _data;
      });
    },
    // 查询

    addUser() {
      this.dialogVisible = true;
      this.isView = true;
      this.isView2 = false;
    },

    modifyUser(rowData) {
      this.channelData.title = rowData.title; //渠道标题
      this.channelData.userId = rowData.mode_id; //模式ID
      this.channelData.belongs = rowData.bank_name; //所属银行
      this.channelData.ownerName = rowData.owner_name; //收款人姓名
      this.channelData.banks = rowData.open_bank; //开户行
      this.channelData.cardNumber = rowData.bank_number; //卡号
      this.channelData.id = rowData.id;
      this.isView = false;
      this.isView2 = true;
      this.dialogVisible = true;
      // this.addFormReadOnly = false
    },
    // 修改按钮
    modify() {
      const cardEdit = {
        id: this.channelData.id,
        title: this.channelData.title, //渠道标题
        mode_id: this.channelData.userId, //模式ID
        bank_name: this.channelData.belongs, //所属银行
        owner_name: this.channelData.ownerName, //收款人姓名
        open_bank: this.channelData.banks, //开户行
        bank_number: this.channelData.cardNumber, //卡号
      };
      // console.log(cardEdit);

      channelEdit(cardEdit).then((result) => {
        if (result.code === 200) {
          this.dialogVisible = false;
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
    // 删除按钮
    deleteUser(rowData) {
      // console.log(rowData.id)
      this.$confirm("是否删除这条记录", "信息删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          channelDel(rowData.id).then((result) => {
            console.info(result);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: `已删除`,
              });
              const totalPage = Math.ceil((this.total - 1) / this.pagesize); // 总页数
              this.currentPage =
                this.currentPage > totalPage ? totalPage : this.currentPage;
              this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
              this.loadData();
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
    //增加一条记录
    addSubmit() {
      this.$refs.pictureData.validate((valid) => {
        if (valid) {
          const getCardData = {
            title: this.channelData.title, //渠道标题
            mode_id: this.channelData.userId, //模式ID
            bank_name: this.channelData.belongs, //所属银行
            owner_name: this.channelData.ownerName, //收款人姓名
            open_bank: this.channelData.banks, //开户行
            bank_number: this.channelData.cardNumber, //卡号
          };
          channelAdd(getCardData).then((result) => {
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
.addnews {
  margin-left: 600px;
}
</style>
