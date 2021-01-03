<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-form :model="bankCardData" ref="stroleRef">
            <el-col style="width:300px;margin-right:20px">
              <el-form-item prop="phone">
                <el-input
                  v-model="bankCardData.phone"
                  placeholder="用户手机号"
                  size="medium"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col style="width: 100px">
              <el-button type="primary" size="medium" @click="handelSearch"
                >搜索</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="bankCardList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="account_holder" label="开户人" width="120">
        </el-table-column>
        <el-table-column prop="user.nickname" label="银行所属用户" width="200">
        </el-table-column>
        <el-table-column prop="bank_num" label="银行卡号" width="320">
        </el-table-column>
        <el-table-column prop="bank_opening" label="开户行" width="170">
        </el-table-column>

        <el-table-column prop="phone" label="预留手机号" width="170">
        </el-table-column>
        <el-table-column prop="status" label="银行卡状态" width="150">
          <template slot-scope="scope">
            <el-tag type="success" size="small" effect="dark">{{
              scope.row.status === 0 ? "正常" : "删除"
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="add_time" label="添加时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="编辑时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | formatDate }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-sizes="[10, 40, 80, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getBankCard, bankCardSearch } from "@/api/bankCard";
export default {
  name: "bankcard",
  data: () => ({
    bankCardList: [],
    bankCardData: {
      phone: "",
      time: [],
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
  created() {
    this.getCharge();
  },
  methods: {
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex } = this;
      getBankCard(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.bankCardList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCharge();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getCharge();
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      const { phone } = this.bankCardData;
      const params = {
        phone,
        limit: this.pageSize,
        page: this.pageIndex,
      };
      bankCardSearch(params).then((res) => {
        if (res.code === 200) {
          this.bankCardList = res.data.list;
          this.total = res.data.total;
        }
      });
      //   const params = {
      //     conditions: {
      //       phone: phone,
      //       time: time,
      //     },
      //     ops: {
      //       phone: "like",
      //       time: "between",
      //     },
      //     page: this.pageIndex,
      //     limit: this.pageSize,
      //   };
      // bankCardId(phone).then((res) => {
      //   if (res.code === 200) {
      //     this.bankCardList = res.data;
      //     //   this.total = res.data.total;
      //   }
      // });
    },
    /**
     * 重置按钮
     */
    handelReset() {
      // this.getCharge();
      this.pageIndex = 1
      this.$refs.stroleRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>