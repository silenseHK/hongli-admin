<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <!-- card title -->
        <el-row :gutter="20">
          <el-col
            :span="5"
            :offset="0"
            style="margin-top: 6px"
            :xl="6"
            :lg="6"
            :md="24"
            :sm="24"
            :xs="24"
          >
            <el-button type="primary" size="small" @click="handelAdd"
              >新增</el-button
            >
          </el-col>
        </el-row>
      </div>
      <!-- card body -->
      <el-table :data="ipList" border stripe>
        <el-table-column prop="id" width="80" label="#"> </el-table-column>
        <el-table-column prop="ip" width="360" label="ip"> </el-table-column>

        <el-table-column prop="create_time" width="370" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="message" width="370" label="备注">
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="scope">
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
      <el-dialog
        :title="status === 1 ? '添加IP信息' : '修改IP信息'"
        :visible.sync="isIps"
        width="25%"
        @close="close"
      >
        <el-form
          :model="ipData"
          ref="ipRef"
          label-width="80px"
          :rules="ipRules"
          size="small"
        >
          <el-form-item label="ip" prop="ip">
            <el-input
              v-model="ipData.ip"
              placeholder="请输入IP地址"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="message">
            <el-input
              v-model="ipData.message"
              cearable
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="isIps = false" size="small">取消</el-button>
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
          :page-sizes="[10, 30, 200, 300]"
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
import { getIP, addIp, editIp, deleteIp } from "@/api/system.js";
export default {
  name: "Account",
  data: () => ({
    isIps: false,
    ipList: [],
    status: 1,

    ipData: {
      message: "",
      ip: "",
      id: "",
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    ipRules: {
      ip: [
        { required: true, message: "请输入IP地址", trigger: "blur" },
        { min: 1, max: 33, message: "长度在 1 到 33 个字符", trigger: "blur" },
      ],

      message: [
        { required: true, message: "请输入备注", trigger: "blur" },
        { min: 1, max: 88, message: "长度在 1 到 88 个字符", trigger: "blur" },
      ],
    },
  }),
  activated() {
    this.requestIp();
  },
  methods: {
    /**
     * 获取账户信息
     */
    requestIp() {
      const { pageSize, pageIndex } = this;
      getIP(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.ipList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestIp();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.requestIp();
      console.log(`当前页: ${val}`);
    },
    /**
     * 新增
     */
    handelAdd() {
      this.isIps = true;
      this.status = 1;
    },

    /**
     * 修改按钮
     */
    editAccount(item) {
      this.status = 2;

      const { id, message, ip } = item;
      this.$nextTick(() => {
        this.ipData.message = message;
        this.ipData.id = id;
        this.ipData.ip = ip;
      });
      this.isIps = true;
    },
    /**
     * 删除按钮
     */
    deleAccount(item) {
      const { id } = item;
      const params = {
        id,
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteIp(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
            this.requestIp();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handelSubmit() {
      this.$refs.ipRef.validate((valid) => {
        if (valid) {
          const { message, ip, id } = this.ipData;
          if (this.status === 1) {
            const params = {
              message,
              ip,
            };
            addIp(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
              } else {
                this.$message.error("添加失败");
              }
              this.isIps = false;
              this.requestIp();
            });
          } else if (this.status === 2) {
            const params = {
              id,
              message,
              ip,
            };
            editIp(params).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改成功");
              } else {
                this.$message.error("修改失败");
              }
              this.isIps = false;
              this.requestIp();
            });
          }
        }
      });
    },
    close() {
      this.ipData.id = "";
      this.ipData.message = "";
      this.ipData.ip = "";
      this.$refs.ipRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>