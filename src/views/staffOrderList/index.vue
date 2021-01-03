<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form :model="orderData" ref="stroleRef" class="w_fW">
          <el-form-item prop="issue" class="w230">
            <el-input
              v-model="orderData.issue"
              placeholder="订单号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" class="w230">
            <el-input
              v-model="orderData.phone"
              placeholder="会员手机号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="speciesType" class="w230">
            <el-select
              v-model="orderData.speciesType"
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
          <el-form-item prop="name" class="w230">
            <el-input
              v-model="orderData.name"
              placeholder="期号"
              size="medium"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="selectionType" class="w230">
            <el-select
              v-model="orderData.selectionType"
              filterable
              size="medium"
              placeholder="下单选择"
            >
              <el-option
                v-for="item in selection"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="drawType" class="w230">
            <el-select
              v-model="orderData.drawType"
              filterable
              size="medium"
              placeholder="开奖状态"
            >
              <el-option
                v-for="item in drawList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="normal" prop="time" class="w450">
            <el-date-picker
              v-model="orderData.time"
              type="datetimerange"
              align="right"
              unlink-panels
              size="medium"
              range-separator="至"
              start-placeholder="下单日期"
              end-placeholder="下单日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="w450">
            <el-button type="primary" size="medium" @click="handelSearch"
              >搜索</el-button
            >
            <el-button type="success" size="medium" @click="handelReset"
              >重置</el-button
            >
            <el-button type="success" size="medium" @click="handelStatistics"
              >统计</el-button
            >
          </el-form-item>
        </el-form>
        <transition name="el-zoom-in-top">
          <ul class="alert-info" v-if="isStatic">
            <li>
              <h1>下单数:</h1>
              <span>{{ staticData.betting_count }}</span>
            </li>
            <li>
              <h1>下单金额:</h1>
              <span>{{ staticData.total_betting_money }}</span>
            </li>
            <li>
              <h1>服务费:</h1>
              <span>{{ staticData.total_service_charge }}</span>
            </li>
            <li>
              <h1>中奖金额:</h1>
              <span>{{ staticData.total_win_money }}</span>
            </li>
          </ul>
        </transition>
      </div>

      <el-table :data="orderLists" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="user_id" label="会员ID" width="130"> </el-table-column>
        <el-table-column prop="betting_num" label="订单号" width="150">
        </el-table-column>
        <el-table-column prop="user.phone" label="会员手机号" width="150">
        </el-table-column>
        <el-table-column prop="user.nickname" label="会员昵称" width="120">
        </el-table-column>

        <el-table-column label="下单时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.betting_time | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="money" label="合约金额" width="120">
        </el-table-column>
        <el-table-column prop="odds" label="倍率" width="120">
        </el-table-column>
        <el-table-column label="下单选择" width="100">
          <template slot-scope="scope">
            <el-tag
              type="success"
              size="small"
              effect="dark"
              v-if="scope.row.game_c_x.name == '奇数'"
              >奇数</el-tag
            >
            <el-tag
              type="danger"
              size="small"
              effect="dark"
              v-else-if="scope.row.game_c_x.name == '偶数'"
              >偶数</el-tag
            >
            <span :class="colors[scope.row.game_c_x.name]" v-else>{{
              scope.row.game_c_x.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="game_name.name" label="种类" width="100">
        </el-table-column>
        <el-table-column prop="game_play.number" label="期号" width="170">
        </el-table-column>
        <el-table-column prop="service_charge" label="服务费" width="100">
        </el-table-column>
        <el-table-column label="订单状态" width="110">
          <template slot-scope="scope">
            <el-tag type="success" size="small" effect="dark">{{
              scope.row.type === 0 ? "未结算" : "已结算"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="game_play.prize_number"
          label="开奖数字"
          width="100"
        >
        </el-table-column>
        <el-table-column label="订单状态" width="110">
          <template slot-scope="scope">
            <el-tag
              type="warning"
              size="small"
              effect="dark"
              v-if="scope.row.status == 0"
              >未知</el-tag
            >
            <el-tag
              type="success"
              size="small"
              effect="dark"
              v-else-if="scope.row.status == 1"
              >赢</el-tag
            >
            <el-tag type="danger" size="small" effect="dark" v-else>输</el-tag>
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
  </div>
</template>

<script>
import {
  staffGetBetting,
  getBetting,
  searchBetting,
  staticBetting,
  staffStaticBetting,
} from "@/api/activity";
import { objDele } from "@/utils/validate";
import baseUrl from "../../utils/baseUrl";
export default {
  name: "staffOrderList",
  data: () => ({
    orderLists: [],
    orderData: {
      phone: "",
      time: [],
      issue: "",
      speciesType: "",
      selectionType: "",
      name: "",
      drawType: "",
      user_id: ""
    },
    pages: 1,
    isStatic: false,
    staticData: {},
    pageshow: true,
    //种类
    speciesList: [
      {
        id: 1,
        lagel: "Gold",
      },
      {
        id: 2,
        lagel: "Silver",
      },
      {
        id: 3,
        lagel: "Jewelry",
      },
      {
        id: 4,
        lagel: "Other",
      },
    ],
    colors: [
      "drawnumber0",
      "drawnumber1",
      "drawnumber2",
      "drawnumber3",
      "drawnumber4",
      "drawnumber5",
      "drawnumber6",
      "drawnumber7",
      "drawnumber8",
      "drawnumber9",
    ],
    //下单选择
    selection: [
      {
        id: "奇数",
        label: "奇数",
      },
      {
        id: "偶数",
        label: "偶数",
      },
      {
        id: "特码",
        label: "特码",
      },
      {
        id: 0,
        label: "单选0",
      },
      {
        id: 1,
        label: "单选1",
      },
      {
        id: 2,
        label: "单选2",
      },
      {
        id: 3,
        label: "单选3",
      },
      {
        id: 4,
        label: "单选4",
      },
      {
        id: 5,
        label: "单选5",
      },
      {
        id: 6,
        label: "单选6",
      },
      {
        id: 7,
        label: "单选7",
      },
      {
        id: 8,
        label: "单选8",
      },
      {
        id: 9,
        label: "单选9",
      },
    ],
    drawList: [
      {
        id: 0,
        label: "未结算",
      },
      {
        id: 1,
        label: "已结算",
      },
    ],
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    es: {},
  }),
  activated() {
    this.init();
    this.getCharge();
    this.getStatic();
    // this.setupStream();
  },

  destroyed() {
    // this.deleteStream();
  },
  // activated() {
  //   console.log("进入");
  //   this.setupStream();
  // },
  // deactivated() {
  //   console.log("离开");
  //   this.deleteStream();
  // },
  // watch: {
  //   $route(newPath) {
  //     if (newPath.name != "/active/order-list") {
  //       // this.es.close();
  //       if (this.es !== "undefined") {
  //         this.deleteStream();
  //       }
  //     } else {
  //       if (this.es !== "undefined") {
  //         this.setupStream();
  //       }
  //       // this.updateStream()
  //     }
  //   },
  // },

  methods: {
    init() {
      this.orderData = {
        phone: "",
        time: [],
        issue: "",
        speciesType: "",
        selectionType: "",
        name: "",
        drawType: "",
        user_id: ""
      };
      this.pages = 1;
      this.isStatic = false;
      this.pageshow = true;
      this.pageIndex = 1;
    },
    setupStream() {
      // Not a real URL, just using for demo purposes
      // this.es = new EventSource("https://api1.999666.in/admin/betting/newests");
      // this.es = new EventSource("https://api1.unicasino.in/admin/betting/newests");
      // this.es = new EventSource("https://api1.huanqiu008.xyz/admin/betting/newests");
      // this.es = new EventSource(baseUrl + "/betting/newests");
      // this.es.addEventListener(
      //   "message",
      //   (event) => {
      //     let data = JSON.parse(event.data);
      //     this.orderLists = data;
      //   },
      //   false
      // );
      // this.es.addEventListener(
      //   "error",
      //   (event) => {
      //     if (event.readyState == EventSource.CLOSED) {
      //       console.log("Event was closed");
      //       console.log(EventSource);
      //     }
      //   },
      //   false
      // );
    },
    /**
     * 刷新数据
     */
    // updateStream() {
    //   if (this.es !== "undefined") {
    //     this.es.close();
    //     delete this.es;
    //     this.setupStream();
    //     // this.$nextTick(() => {
    //     // });
    //   }
    // },

    // deleteStream() {
    //   if (this.es !== "undefined") {
    //     this.es.close();
    //     delete this.es;
    //   }
    // },
    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex } = this;
      let {
        phone,
        time,
        issue,
        speciesType,
        selectionType,
        name,
        drawType,
        user_id
      } = this.orderData;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        betting_num: issue,
        selection: selectionType,
        phone,
        game_id: speciesType,
        number: name,
        type: drawType,
        betting_time_start: time && time.length ? time[0] / 1000 : "",
        betting_time_end: time && time.length ? time[1] / 1000 : "",
        user_id
      };
      staffGetBetting(params).then((resp) => {
        if (resp.code === 200) {
          let res = resp.data;
          this.orderLists = res.list;
          this.total = res.total;
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
     * 获取统计
     */
    getStatic() {
      staffStaticBetting().then((res) => {
        if (res.code === 200) {
          this.staticData = res.data;
        }
      });
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      this.pageIndex = 1;
      this.getCharge();
      // this.deleteStream();
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pageIndex = 1;
      this.$refs.stroleRef.resetFields();
      // this.getCharge();
      // this.setupStream();
      // this.$router.push({
      //   path: "/ordertype/index",
      // });
    },
    /**
     * 点击统计按钮
     */
    handelStatistics() {
      this.isStatic = !this.isStatic;
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