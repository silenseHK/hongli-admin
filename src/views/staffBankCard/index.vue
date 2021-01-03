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
            <el-col style="width:300px;margin-right:20px">
              <el-form-item prop="user_id">
                <el-input
                  v-model="bankCardData.user_id"
                  placeholder="用户ID"
                  size="medium"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 100px">
              <el-button type="primary" size="medium" @click="mySearch"
                >搜索</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="bankCardList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="120">
        </el-table-column>
        <el-table-column prop="account_holder" label="开户人" width="120">
        </el-table-column>
        <el-table-column prop="user.phone_hide" label="银行所属用户" width="200">
        </el-table-column>
        <el-table-column prop="bank_num" label="银行卡号" width="320">
        </el-table-column>
        <el-table-column prop="bank_type_id" label="开户行" width="170">
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
          :current-page="pageIndex"
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
import { staffgetBankCard } from "@/api/bankCard";
import {canClickFn} from '@/utils/myAPI';
export default {
  name: "staffBankCard",
  data: () => ({
    bankCardList: [],
    bankCardData: {
      phone: "",
      user_id: ""
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
  activated() {
    this.init()
    this.getCharge();
  },
  methods: {
    init(){
      this.bankCardList = []
      this.bankCardData = {
        phone: "",
        user_id: ""
      }
      this.pageIndex = 1
    },
    mySearch(){
      canClickFn(() => {
        this.pageIndex = 1
        this.getCharge()
      })
    },
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex, bankCardData } = this;
      staffgetBankCard({
          size:pageSize,
          page: pageIndex,
          phone: bankCardData.phone,
          user_id: bankCardData.user_id
        }).then((res) => {
        if (res.code === 200) {
          this.bankCardList = res.data.data;
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
    }
  },
};
</script>

<style lang="scss" scoped>
</style>