<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header">
            <div class="static-header">
              <p>当日会员盈利榜</p>
              <el-button type="primary" size="mini" @click="refresh"
                >刷新</el-button
              >
            </div>
          </div>
          <!-- card body -->
          <el-table :data="profitList" border stripe>
            <el-table-column prop="user_id" label="#" width="80"> </el-table-column>
            <el-table-column prop="phone" label="会员手机号" width="230">
            </el-table-column>
            <el-table-column prop="cha" label="盈利" width="230">
            </el-table-column>
            <el-table-column prop="total_service_charge" label="手续费" width="230">
            </el-table-column>
          </el-table>
          <div class="pagination-bottom">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pageIndex1"
              :page-sizes="[10, 20, 100, 200]"
              :page-size="pageSize1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header">
            <div class="static-header">
              <p>当日会员亏损榜</p>
              <el-button type="primary" size="mini" @click="refresh1"
                >刷新</el-button
              >
            </div>
          </div>
          <el-table :data="lossList" border stripe>
            <el-table-column prop="user_id" label="#" width="80"> </el-table-column>
            <el-table-column prop="phone" label="会员手机号" width="230">
            </el-table-column>
            <el-table-column prop="cha" label="亏损" width="230">
            </el-table-column>
            <el-table-column prop="total_service_charge" label="手续费" width="230">
            </el-table-column>
          </el-table>
          <!-- card body -->
          <div class="pagination-bottom">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="pageIndex2"
              :page-sizes="[10, 40, 100, 200]"
              :page-size="pageSize2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { staffGetProfit, staffGetLoss } from "@/api/statistical";
export default {
  name: "staffStatistical",
  data: () => ({
    pageSize1: 10,
    pageIndex1: 1,
    pageSize2: 10,
    pageIndex2: 1,
    lossList: [],
    profitList: [],
    total1: 0,
    total2: 0,
  }),
  activated() {
    this.pageIndex1 = 1
    this.pageIndex2 = 1
    this.obtainProfit();
    this.obtainLoss();
  },
  methods: {
    /**
     * 获取当日盈利 亏损
     */
    obtainProfit() {
      // const { pageSize1, pageIndex1 } = this;
      staffGetProfit({
        page: this.pageIndex1,
        size: this.pageSize1
      }).then((res) => {
        if (res.code === 200) {
          this.profitList = res.data.list;
          this.total1 = res.data.total;
        }
      });
    },
    obtainLoss() {
      const { pageSize2, pageIndex2 } = this;
      staffGetLoss({
        page: this.pageIndex2,
        size: this.pageSize2
      }).then((res) => {
        if (res.code === 200) {
          this.lossList = res.data.list;
          this.total2 = res.data.total;
        }
      });
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.obtainProfit();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.pageIndex1 = val;
      this.obtainProfit();
      console.log(`当前页: ${val}`);
    },
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.obtainLoss();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.pageIndex2 = val;
      this.obtainLoss();
      console.log(`当前页: ${val}`);
    },
    /**
     * 刷新按钮
     */
    refresh() {
      this.obtainProfit();
    },
    refresh1() {
      this.obtainLoss();
    },
  },
};
</script>

<style lang="scss" scoped>
.static-header {
  display: flex;
  padding: 0 20px 0 0;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>