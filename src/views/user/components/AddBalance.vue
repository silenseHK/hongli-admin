<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="30%"
      center
      @close="handelUpdate()"
    >
      <el-form :model="balanceData" label-width="200">
        <el-form-item label="金额">
          <el-input
            v-model="balanceData.money"
            placeholder="请输入金额"
            size="mini"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="handelUpdate" size="mini">取消</el-button>
        <el-button type="primary" @click="submitBalannce" size="mini"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { requestBanUp, requestBanDown } from "@/api/user";
export default {
  name: "addBanlance",
  props: {
    isBanlance: {
      type: Boolean,
      default: false,
    },
    banlanceId: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "位置",
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isShow: this.isBanlance,
      balanceData: {
        money: "",
      },
    };
  },
  watch: {
    isBanlance(val) {
      this.isShow = val;
    },
  },
  methods: {
    handelUpdate() {
      this.$emit("update:show", false);
      this.balanceData.money = "";
    },
    /**
     * 提交上分
     */

    submitBalannce() {
      console.log(this.banlanceId);
      if (this.status === 1) {
        console.log(1);
        const params = {
          id: this.banlanceId,
          money: this.balanceData.money,
        };
        requestBanUp(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("上分成功");
          } else {
            this.$message.error(res.msg);
          }
          this.balanceData.money = "";
        });
      } else if (this.status === 2) {
        const params = {
          id: this.banlanceId,
          money: this.balanceData.money,
        };
        requestBanDown(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("下成功");
          } else {
            this.$message.error(res.msg);
          }
          this.balanceData.money = "";
        });
      }

      this.$emit("update:show", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>