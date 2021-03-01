<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-page-header @back="goBack = $router.go(-1)" content="团队明细页">
      </el-page-header>

      <el-row :gutter="50">
        <el-col :span="11">
          <el-tag type="primary" style="margin-top: 30px">上级</el-tag>
          <el-table
              :data="upList"
              border
          >
            <el-table-column prop="id" label="user_id" width="80"> </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="balance"
                label="余额"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="commission"
                label="佣金"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="cl_betting"
                label="总投注"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="total_recharge"
                label="总充值"
                width="100"
            >
            </el-table-column>
            <el-table-column prop="type" label="用户类型" width="110">
              <template slot-scope="scope">
                <el-tag
                    type="success"
                    size="mini"
                    effect="dark"
                >{{scope.row.is_customer_service == 1? '代理': '玩家'}}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-bottom">
            <el-pagination
                @current-change="handleUpCurrentChange"
                :current-page="upPage"
                :page-size="upSize"
                layout="total, prev, pager, next, jumper"
                :total="upTotal"
            >
            </el-pagination>
          </div>
        </el-col>

        <el-col :span="11">
          <el-tag style="margin-top: 30px" type="primary">下级</el-tag>
          <el-table
              :data="downList"
              border
          >
            <el-table-column prop="id" label="user_id" width="80"> </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="balance"
                label="余额"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="commission"
                label="佣金"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="cl_betting"
                label="总投注"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="total_recharge"
                label="总充值"
                width="100"
            >
            </el-table-column>
            <el-table-column prop="type" label="用户类型" width="110">
              <template slot-scope="scope">
                <el-tag
                    type="success"
                    size="mini"
                    effect="dark"
                >{{scope.row.is_customer_service == 1? '代理': '玩家'}}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-bottom">
            <el-pagination
                @current-change="handleDownCurrentChange"
                :current-page="downPage"
                :page-size="downSize"
                layout="total, prev, pager, next, jumper"
                :total="downTotal"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import { teamUpList, teamDownList } from "@/api/user";
export default {
  name: "team",
  data: () => ({
    id: 0,

    upPage: 1,
    upSize: 10,
    upTotal: 0,
    upList: [],
    downPage: 1,
    downSize: 10,
    downTotal: 0,
    downList: [],
  }),
  activated() {
    this.id = this.$route.query.id;
    this.getUpList();
    this.getDownList();
  },
  methods: {
    getUpList(){
      const {upPage, upSize, id} = this
      teamUpList(upPage, upSize, id).then((res)=>{
        if(res.code == 200){
          this.upList = res.data.data;
          this.upTotal = res.data.total;
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getDownList(){
      const {downPage, downSize, id} = this
      teamDownList(downPage, downSize, id).then((res)=>{
        if(res.code == 200){
          this.downList = res.data.data;
          this.downTotal = res.data.total;
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    handleUpCurrentChange(val) {
      this.upPage = val;
      this.getUpList();
    },

    handleDownCurrentChange(val) {
      this.downPage = val;
      this.getDownList();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>