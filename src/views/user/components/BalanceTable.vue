<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-page-header @back="goBack = $router.go(-1)" content="资金详情页">
      </el-page-header>

      <div style="margin-top: 10px;">
        <el-select v-model="type" filterable clearable placeholder="请选择">
          <el-option
              v-for="item in logType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button style="margin-left:10px;" icon="el-icon-search" circle @click="search"></el-button>
      </div>

      <el-table
        :data="userDetailList"
        style="width: 100%; margin-top: 30px"
        border
      >
        <el-table-column prop="id" label="#" width="50"> </el-table-column>
        <el-table-column
          prop="admin.nickname"
          label="操作管理员昵称"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="type" label="类型" width="300">
          <template slot-scope="scope">
            <el-tag
              type="success"
              size="mini"
              effect="dark"
              >{{scope.row.type_map.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_first_recharge" label="是否为首充">
          <template slot-scope="scope">
            <el-tag type="info" size="minni" effect="dark">{{
              scope.row.is_first_recharge === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="操作时间" width="300">
          <template slot-scope="scope">
            <div>
              {{ scope.row.time | formatDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="操作金额" width="150">
        </el-table-column>
        <el-table-column prop="dq_balance" label="操作前余额" width="150">
        </el-table-column>
        <el-table-column prop="wc_balance" label="操作后余额" width="150">
        </el-table-column>
      </el-table>

      <div class="pagination-bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
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
import { requestUserDetails, requestLogType } from "@/api/user";
export default {
  name: "BanceTable",
  data: () => ({
    id: 0,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    userDetailList: [],

    logType: [],

    type: ""
  }),
  activated() {
    this.id = this.$route.query.id;
    //获取数据
    this.getUserDetail();
    this.getLogType();
  },
  methods: {
    search(){
      this.currentPage = 1;
      this.getUserDetail();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserDetail();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserDetail();

      console.log(`当前页: ${val}`);
    },
    getUserDetail() {
      const parmas = {
        id: this.id,
        page: this.currentPage,
        limit: this.pageSize,
        type: this.type?this.type:0
      };
      requestUserDetails(parmas).then((res) => {
        if (res.code === 200) {
          this.userDetailList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    getLogType(){
      requestLogType().then((res)=>{
        if(res.code == 200){
          this.logType = res.data;
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>