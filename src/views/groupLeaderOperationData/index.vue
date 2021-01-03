<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span class="w-title">组长运营数据</span> 
      </div>
      <!-- card body -->
      <el-table :data="perFormanceList" border stripe>
        <el-table-column prop="id" label="#" width="80"> </el-table-column>
        <el-table-column prop="nickname" label="账号昵称" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="total_invite" label="总邀请人数" width="120">
        </el-table-column>
        <el-table-column prop="invite" label="今日邀请人数" width="120">
        </el-table-column>
        <el-table-column prop="cl_withdrawal" label="员工历史提现" width="120">
        </el-table-column>
        <el-table-column prop="balance" label="员工余额" width="120">
        </el-table-column>
        <el-table-column prop="commission" label="员工佣金" width="120">
        </el-table-column>
        <el-table-column prop="one_number" label="一级推荐人数" width="120">
        </el-table-column>
        <el-table-column prop="two_number" label="二级推荐人数" width="120">
        </el-table-column>
        <el-table-column prop="one_commission" label="一级佣金" width="120">
        </el-table-column>
         <el-table-column prop="two_commission" label="二级佣金" width="120">
        </el-table-column>
        <el-table-column prop="cl_commission" label="累计提现佣金" width="120">
        </el-table-column>
         <el-table-column prop="total_recharge" label="下属用户总充值" width="120">
        </el-table-column>
         <el-table-column prop="total_betting" label="下属用户总下注金额" width="150">
        </el-table-column>
         <el-table-column prop="total_win_money" label="下属用户总输赢情况" width="150">
        </el-table-column>
         <el-table-column prop="betting" label="下属用户今日投注金额" width="170">
        </el-table-column>
         <el-table-column prop="recharge" label="下属用户今日充值" width="150">
        </el-table-column>
         <el-table-column prop="win_money" label="下属用户今日输赢情况" width="170">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="150" fixed='right'>
            <template slot-scope="scope">
                <el-button
                    type='primary'
                    icon="el-icon-user-solid"
                    size="mini"
                    @click="seePerformance(scope.row)"
                    >业绩</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- card body -->
      <div class="pagination-bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOperation } from "@/api/statistical";
export default {
  name: "groupLeaderOperationData",
  data: () => ({
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    perFormanceList: []
  }),
  activated() {
    this.getOperationData();
  },
  methods: {
    seePerformance(item){
      this.$router.push({path: '../myPerformance/index',query:{id: item.id}})
    },
    getOperationData() {
      getOperation({
          is_group_leader: localStorage.getItem("roleType") == 2 ? 1 : 0,
          page: this.pageIndex,
          size: this.pageSize
      }).then((res) => {
        if (res.code === 200) {
          this.perFormanceList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOperationData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getOperationData();
      console.log(`当前页: ${val}`);
    }
  },
};
</script>

<style lang="scss" scoped>
    .w-title{
        font-size: 20px;
        font-weight: bold;
    }
</style>