<template>
  <div>
    <el-button
      type="success"
      size="small"
      @click="addRebate"
      icon="el-icon-circle-plus-outline"
      style="margin:10px 0;"
    >新增</el-button>
    <el-table :data="rebateList" style="width: 100%" border>
      <el-table-column prop="_id.$oid" label="id" width="280"></el-table-column>
      <el-table-column prop="bet_money" label="投注金额" width="280"></el-table-column>
      <el-table-column prop="ratio" label="返点比例" width></el-table-column>
      <el-table-column label="操作" width>
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="small"
            type="info"
            @click="rebateUpdate(scope.row)"
          >修改</el-button>
          <el-button
            icon="el-icon-delete"
            size="small"
            type="danger"
            @click="deleteRebates(scope.row._id.$oid)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹框 -->
    <el-dialog :visible.sync="dialogRebate" width="30%" @close="close">
      <el-form ref="rebateData" :model="rebateData" :rules="rules" label-width="80px">
        <el-form-item label="投注金额" prop="bet_money">
          <el-input v-model="rebateData.bet_money"></el-input>
        </el-form-item>
        <el-form-item label="返点比例" prop="ratio">
          <el-input v-model="rebateData.ratio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog :visible.sync="dialogRebate1" width="30%" @close="close">
      <el-form ref="rebateData" :model="rebateData" :rules="rules" label-width="80px">
        <el-form-item label="投注金额">
          <el-input v-model="rebateData.bet_money"></el-input>
        </el-form-item>
        <el-form-item label="返点比例">
          <el-input v-model="rebateData.ratio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="determine1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRebate,
  createRebate,
  updateRebate,
  deleteRebate,
} from "@/api/topUp";
export default {
  name: "rebateconfig",
  data() {
    return {
      rebateList: [],
      dialogRebate: false,
      dialogRebate1: false,
      rebateData: {
        bet_money: "",
        ratio: "",
        id: "",
      },
      rules: {
        bet_money: [
          {
            type: "string",
            required: true,
            message: "请输入投注金额",
            trigger: "blur",
          },
        ],
        ratio: [
          {
            type: "string",
            required: true,
            message: "请输入返点比例",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    //获取数据
    this._getRebate();
  },
  methods: {
    /**
     * 清楚表单验证
     */
    close() {
      this.rebateData.bet_money = "";
      this.rebateData.ratio = "";
      this.$refs.rebateData.resetFields();
    },
    /**
     * 获取列表数据
     */
    _getRebate() {
      getRebate().then((res) => {
        if (res.code === 200) {
          //   console.log(res.data);
          this.rebateList = res.data;
        }
      });
    },
    /**
     * 新增按钮
     */
    addRebate() {
      this.dialogRebate = true;
    },
    /**
     * 确定按钮
     */
    determine() {
      this.$refs.rebateData.validate((valid) => {
        if (valid) {
          let datas = {
            bet_money: this.rebateData.bet_money,
            ratio: this.rebateData.ratio,
          };
          createRebate(datas).then((res) => {
            if (res.code === 200) {
              this.$message.success("添加成功");
              this._getRebate();
            } else {
              this.$message.error("添加失败");
            }
          });
          this.dialogRebate = false;
        }
      });
    },
    /**
     * 取消按钮
     */
    cancel() {
      this.dialogRebate = false;
    },
    /**
     * 修改数据
     */
    determine1() {
      let params = {
        id: this.rebateData.id,
        bet_money: this.rebateData.bet_money,
        ratio: this.rebateData.ratio,
      };
      updateRebate(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this._getRebate();
        } else {
          this.$message.error("修改失败");
        }
        this.dialogRebate1 = false;
      });
    },
    /**
     * 修改数据取消按钮
     */
    cancel1() {
      this.dialogRebate1 = false;
    },
    /**
     * 修改按钮
     */
    rebateUpdate(row) {
      this.rebateData.id = row._id.$oid;
      this.rebateData.bet_money = row.bet_money;
      this.rebateData.ratio = row.ratio;
      this.dialogRebate1 = true;
    },
    /**
     * 删除按钮
     */
    deleteRebates(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRebate(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this._getRebate();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>