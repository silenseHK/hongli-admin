<template>
  <div>
    <el-card>
      <div slot="header">
        <div class="header-box">
          <el-date-picker
            v-model="strokeData.time"
            type="datetimerange"
            align="right"
            unlink-panels
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            style="margin-right:30px"
          >
          </el-date-picker>

          <el-button type="primary" size="small" @click="mySearch"
            >搜索</el-button
          >
          <el-button type="success" size="small" @click="handelReset"
            >重置</el-button
          >
        </div>
      </div>
      <el-table :data="journal" border stripe>
        <el-table-column prop="id" label="id">
        </el-table-column>
         <el-table-column prop="path" label="请求uri">
        </el-table-column>
         <el-table-column prop="method" label="请求方式">
        </el-table-column>
         <el-table-column prop="ip" label="请求者IP">
        </el-table-column>
         <el-table-column prop="admin_id" label="admin_id">
        </el-table-column>
         <el-table-column prop="admin_user.username" label="管理员姓名">
        </el-table-column>
        <el-table-column prop="c_time" label="时间" width="200">
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.c_time | formatDate }}</span>
          </template> -->
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
import { getJournalData } from "@/api/system";
import { objDele } from "@/utils/validate";
import { canClickFn } from "@/utils/myAPI";
export default {
  name: "staffFirstStroke",
  data: () => ({
    journal: [],
    strokeData: {
      time: [],
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
  created() {
    this.getJournal();
  },
  methods: {
    mySearch() {
      canClickFn(() => {
        this.pageIndex = 1
        this.getJournal();
      });
    },
    getJournal() {
      let { time } = this.strokeData;
      let params = {
        page: this.pageIndex,
        size: this.pageSize,
        time_start: time && time.length != 0 ? time[0] / 1000 : "",
        time_end: time && time.length != 0 ? time[1] / 1000 : "",
      };
      getJournalData(params).then((res) => {
        if (res.code === 200) {
          this.journal = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getJournal();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getJournal();
      console.log(`当前页: ${val}`);
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1;
      this. strokeData.time = [] 
    }
  },
};
</script>

<style lang="scss" scoped>
.header-box {
  display: flex;
}
</style>