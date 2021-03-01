<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="24">
          <el-form :model="orderData" ref="stroleRef">
            <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="user_id">
                <el-input
                    v-model="orderData.user_id"
                    placeholder="会员ID"
                    size="medium"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="phone">
                <el-input
                    v-model="orderData.phone"
                    placeholder="会员手机号"
                    size="medium"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col
                :span="5"
                :offset="0"
                :xl="6"
                :lg="8"
                :md="24"
                :sm="24"
                :xs="24"
            >
              <el-button type="primary" size="medium" @click="handelSearch"
              >搜索</el-button>
              <el-button type="success" size="medium" @click="handelReset"
              >重置</el-button>
            </el-col>

          </el-form>
        </el-row>
      </div>

      <el-table :data="orderLists" border stripe>
        <el-table-column prop="id" label="用户id" width="100"> </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150"> </el-table-column>
        <el-table-column prop="balance" label="当前余额" width="150">
        </el-table-column>
        <el-table-column prop="cl_betting" label="总投注金额" width="150">
        </el-table-column>
        <el-table-column prop="cl_betting_total" label="总投注次数" width="150">
        </el-table-column>
        <el-table-column prop="cl_withdrawal" label="总提现金额" width="150">
        </el-table-column>
        <el-table-column prop="type" label="是否首充" width="150">
          <template slot-scope="scope">
            <el-tag type="info" size="small" effect="dark" v-if="scope.row.is_first_recharge === 0">否</el-tag>
            <el-tag type="success" size="small" effect="dark" v-if="scope.row.is_first_recharge === 1">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" plain @click="showBettingList(scope.row.id)">下注列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bottom">
        <el-pagination
            v-if="pageshow"
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

    <el-dialog title="投注列表" :visible.sync="showBettingDialog" width="70%">

      <el-row :gutter="24">
        <el-form :model="orderData" ref="stroleRef">

          <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="phone">
              <el-select
                  v-model="bettingData.speciesType"
                  filterable
                  size="medium"
                  placeholder="种类"
              >
                <el-option
                    v-for="item in speciesList"
                    :key="item.id"
                    :label="item.lagel"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="phone">
              <el-select
                  v-model="bettingData.sort"
                  filterable
                  size="medium"
                  placeholder="排序"
              >
                <el-option
                    v-for="item in sortList"
                    :key="item.id"
                    :label="item.lagel"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
              :span="5"
              :offset="0"
              :xl="6"
              :lg="8"
              :md="24"
              :sm="24"
              :xs="24"
          >
            <el-button type="primary" size="medium" @click="handelBettingSearch"
            >搜索</el-button>
          </el-col>

        </el-form>
      </el-row>

      <el-table :data="bettingList">
        <el-table-column property="betting_id" label="#" width="70"></el-table-column>
        <el-table-column property="betting_num" label="订单号" width="150"></el-table-column>
        <el-table-column property="game_play.number" label="期数" width="150"></el-table-column>
        <el-table-column property="game_name.name" label="游戏类型" width="100"></el-table-column>
        <el-table-column property="game_play.prize_number" label="开奖结果" width="80"></el-table-column>
        <el-table-column property="game_c_x.name" label="用户投注" width="100"></el-table-column>
        <el-table-column property="win_money" label="用户盈利" fixed="right"></el-table-column>
        <el-table-column prop="win_money" label="下注结果" fixed="right">
          <template slot-scope="scope">
            <el-tag type="error" v-if="scope.row.status == 2">输</el-tag>
            <el-tag type="success" v-if="scope.row.status == 1">赢</el-tag>
            <el-tag type="info" v-if="scope.row.status == 0">待开奖</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="game_play" label="开奖方式" width="100">
          <template slot-scope="scope">
                        {{scope.row.game_play.is_status == 1 ? '手动': '自动'}}
          </template>
        </el-table-column>
        <el-table-column property="money" label="投注金额" width="100" fixed="right"></el-table-column>
        <el-table-column property="service_charge" label="服务费" width="100"></el-table-column>
        <el-table-column property="betting_time_format" label="下注时间" width="160"></el-table-column>
        <el-table-column property="settlement_time_format" label="结算时间" width="160"></el-table-column>

      </el-table>
      <div class="pagination-bottom">
        <el-pagination
            v-if="pageshow"
            @size-change="getBettingList"
            @current-change="getBettingList"
            :current-page.sync="betting_page_index"
            :page-size="betting_size"
            layout="total, prev, pager, next, jumper"
            :total="betting_total"
            background
        >
        </el-pagination>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getBetting, searchBetting, staticBetting } from "@/api/activity";
import { noticeUser, noticeUserBetting } from "@/api/bettingNotice";
import baseUrl from '../../utils/baseUrl'
export default {
  name: "bettingNoticeList",
  data: () => ({
    orderLists: [],
    orderData: {
      user_id:"",
      phone: ""
    },
    pages: 1,
    isStatic: false,
    staticData: {},
    pageshow: true,
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    es: {},

    showBettingDialog: false,
    bettingList: [

    ],
    user_id: 0,
    betting_page_index: 1,
    betting_size: 10,
    betting_total: 0,

    //种类
    speciesList: [
      {
        id: '',
        lagel: "所有",
      },
      {
        id: 1,
        lagel: "Platinum",
      },
      {
        id: 2,
        lagel: "Silver",
      },
      {
        id: 3,
        lagel: "Gold",
      },
      {
        id: 4,
        lagel: "Classic",
      },
    ],
    sortList: [
      {
        id: 1,
        lagel: "下注金额",
      },
      {
        id: 2,
        lagel: "下注时间",
      },
    ],
    bettingData: {
      sort: 1,
      speciesType: ''
    },
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
      let {
        user_id,
        phone
      } = this.orderData;
      user_id = user_id?parseInt(user_id):0;
      noticeUser(pageSize, pageIndex, user_id, phone).then((res) => {
        if (res.code === 200) {
          this.orderLists = res.data.data;
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
      if (this.pages === 1) {
        this.getCharge();
      } else if (this.pages === 2) {
        this.getSearshs();
      }
      console.log(`当前页: ${val}`);
    },

    getSearshs() {
      this.pageIndex = 1;
      this.getCharge()
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      this.pages = 1;
      this.getSearshs();
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.$refs.stroleRef.resetFields();
      this.pages = 1;
      this.getCharge();
    },

    showBettingList(user_id){
      this.showBettingDialog = true;
      this.user_id = user_id
      this.betting_page_index = 1;
      this.getBettingList()
    },

    handelBettingSearch(){
      this.betting_page_index = 1;
      this.getBettingList()
    },

    getBettingList(){
      let {user_id, betting_page_index, betting_size} = this;
      let {speciesType, sort} = this.bettingData;
      noticeUserBetting(betting_size, betting_page_index, user_id, speciesType, sort).then((res)=>{
        if (res.code === 200) {
          this.bettingList = res.data.data;
          this.betting_total = res.data.total;
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-info {
  widows: 100%;
  margin: 20px 0;
  height: 50px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  > li {
    display: flex;
    font-weight: bold;
    font-size: 20px;
    padding: 0 30px;
  }
}
.drawnumber0 {
  background: linear-gradient(
          180deg,
          #ff5153 0,
          #ff5153 50%,
          #8b6de9 51%,
          #8b6de9
  );
  border-radius: 50%;
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}

.drawnumber1 {
  display: inline-block;
  background: #2cc747 !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}

.drawnumber2 {
  display: inline-block;
  background: #ff5153 !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}

.drawnumber3 {
  display: inline-block;
  background: #2cc747 !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}

.drawnumber4 {
  display: inline-block;
  background: #ff5153 !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}

.drawnumber5 {
  display: inline-block;
  background: linear-gradient(
          180deg,
          #2cc747 0,
          #2cc747 50%,
          #8b6de9 51%,
          #8b6de9
  ) !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  color: white;
  line-height: 30px;
}

.drawnumber6 {
  display: inline-block;
  background: #ff5153 !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
}

.drawnumber7 {
  display: inline-block;
  background: #2cc747 !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  color: white;
  line-height: 30px;
}

.drawnumber8 {
  display: inline-block;
  background: #ff5153 !important;
  border-radius: 50%;
  width: 30px;
  color: white;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.drawnumber9 {
  display: inline-block;
  background: #2cc747 !important;
  border-radius: 50%;
  width: 30px;
  color: white;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
</style>