<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button
          type="primary"
          size="medium"
          @click="handelOther"
          :plain="plain1"
          >Classic</el-button
        >
        <el-button
          type="primary"
          size="medium"
          @click="handelGold"
          :plain="plain2"
          >Platinum</el-button
        >
        <el-button
          type="success"
          size="medium"
          @click="handelJewelry"
          :plain="plain3"
          >Gold</el-button
        >
        <el-button
          type="warning"
          size="medium"
          @click="handelSilver"
          :plain="plain4"
          >Silver</el-button
        >
      </div>
      <el-row :gutter="24">
        <el-form :model="activityDatas" ref="stroleRef">
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="issue">
              <el-input
                v-model="activityDatas.issue"
                placeholder="期号"
                size="medium"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
            <el-form-item prop="status">
              <el-select
                v-model="activityDatas.status"
                filterable
                size="small"
                placeholder="开奖状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="6"
            :offset="0"
            :xl="6"
            :lg="8"
            :md="24"
            :sm="24"
            :xs="24"
          >
            <el-form-item size="normal" prop="time">
              <el-date-picker
                v-model="activityDatas.time"
                type="datetimerange"
                align="right"
                unlink-panels
                size="medium"
                range-separator="至"
                start-placeholder="开奖时间"
                end-placeholder="开奖时间"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="3">
            <el-form-item prop="accounType">
              <el-select
                v-model="timeType"
                filterable
                size="small"
                @change="handleChang"
                placeholder="定时时间"
              >
                <el-option
                  v-for="item in timeList"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col
            :span="5"
            :offset="0"
            :xl="6"
            :lg="6"
            :md="24"
            :sm="24"
            :xs="24"
          >
            <el-button type="primary" size="medium" @click="handelSearch"
              >搜索</el-button
            >
            <el-button type="success" size="medium" @click="handelReset"
              >重置</el-button
            >
            <!-- <el-button type="success" size="default" @click="handleStart1"
              >开启</el-button
            >
            <el-button type="success" size="default" @click="handleStart2"
              >关闭</el-button
            > -->
          </el-col>
        </el-form>
      </el-row>
      <el-table :data="activityList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="number" label="期号" width="300">
        </el-table-column>
        <el-table-column prop="status" label="是否开奖" width="170">
          <template slot-scope="scope">
            <el-tag type="success" size="small" effect="dark">{{
              scope.row.status === 0 ? "未开奖" : "已开奖"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prize_number" label="开奖号码" width="170">
          <template slot-scope="scope">
            <span :class="colors[scope.row.prize_number]">{{
              scope.row.prize_number
            }}</span>
          </template></el-table-column
        >

        <el-table-column prop="prize_time" label="开奖时间" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.prize_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="结束时间" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              type="primary"
              size="mini"
              v-if="scope.row.status === 0 && scope.row.is_status === 0"
              @click="handleManualDraw(scope.row)"
              >手动开奖</el-button
            > -->
             <el-button
              type="primary"
              size="mini"
              v-if="scope.row.prize_sd_btn == true"
              @click="handleManualDraw(scope.row)"
              >手动开奖</el-button
            >
            <el-button type="success" size="mini" @click="details(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bottom" v-if='showPagination'>
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
      <!-- 详情数据 -->
      <el-dialog title="中奖详情" :visible.sync="isDetails" width="30%" center>
        <DetailItem :Details="detailData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="isDetails = false">取 消</el-button>
          <el-button type="primary" @click="isDetails = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 手动开奖 -->
      <el-dialog :visible.sync="isDraw" width="35%">
        <div>
          <el-form>
            <el-row :gutter="20">
              <el-form-item label="请输入手动开奖号码0-9:">
                <el-col :span="12" :offset="0">
                  <el-input
                    v-model="activityDatas.num"
                    placeholder=""
                    type="number"
                    size="small"
                    clearable
                  ></el-input
                ></el-col>
                <el-col :span="3" :offset="0">
                  <el-button type="primary" size="mini" @click="handleDraw"
                    >确定</el-button
                  ></el-col
                >
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div>
          <div class="manual-title">
            <div style="font-weight: bold">
              总投注: <span style="color: #2cc747">{{ openData.b_money }}</span>
            </div>
            <div style="font-weight: bold">{{ openData.msg }}</div>
          </div>

          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="12" :offset="0">
              <el-table :data="openLists" border style="width: 100%">
                <el-table-column prop="text" label="开奖号码">
                  <template slot-scope="scope">
                    <span :class="colors[scope.row.text]">{{
                      scope.row.text
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="新用户投注数">
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-table :data="incomeList" border style="width: 100%">
                <el-table-column prop="text" label="开奖号码">
                  <template slot-scope="scope">
                    <span :class="colors[scope.row.text]">{{
                      scope.row.text
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="平台盈利">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getPeriod,
  periodSearch,
  periodId,
  getPrize,
  requestDraw,
} from "@/api/activity";
import DetailItem from "@/components/DetailItem";
import baseUrl from '../../utils/baseUrl'
export default {
  name: "firstStroke",
  components: {
    DetailItem,
  },
  data() {
    return {
      showPagination: true, //显示分页
      plain1: false,
      plain2: true,
      plain3: true,
      plain4: true,

      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      activityList: [],
      openLists: [],
      incomeList: [],
      openData: {}, //手动开奖
      isDetails: false,
      activityDatas: {
        issue: "",
        time: [],
        status: "",
        num: 0,
        game_play_id: "",
      },
      isDraw: false,
      statusList: [
        {
          id: 0,
          label: "未开奖",
        },
        {
          id: 1,
          label: "已开奖",
        },
      ],
      timeList: [
        {
          id: 1,
          text: "5分钟",
        },
        {
          id: 2,
          text: "10分钟",
        },
        {
          id: 3,
          text: "10分钟",
        },
        {
          id: 4,
          text: "不刷新",
        },
      ],
      timeType: "",
      numtTimes: 10000,
      pageshow: true,
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
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      status: 4,
      detailData: {},
      pages: 1,
      es: {},
      timer: null,
    };
  },

  created() {
    // this.setupStream();
    this.handelOther()
  },
  activated() {
    console.log("进入");
  },
  deactivated() {
    console.log("离开");
  },

  // destroyed() {
  //   this.deleteStream();
  // },
  methods: {
    setupStream() {
      this.es = new EventSource(
        `${baseUrl}//period/newests?status=${this.status}`
        // `https://api1.999666.in/admin/period/newests?status=${this.status}`
        // `https://api1.unicasino.in/admin/period/newests?status=${this.status}`
        // `https://api1.huanqiu008.xyz/admin/period/newests?status=${this.status}`
      );

      this.es.addEventListener(
        "message",
        (event) => {
          let data = JSON.parse(event.data);
          this.activityList = data;
          // console.log(data);
        },
        false
      );

      this.es.addEventListener(
        "error",
        (event) => {
          if (event.readyState == EventSource.CLOSED) {
            console.log("Event was closed");
            console.log(EventSource);
          }
        },
        false
      );
      this.es.addEventListener("close", (event) => {
        console.log(event.type);
        this.es.close();
      });
    },
    /**
     * 刷新数据
     */
    updateStream() {
      if (this.es !== "undefined") {
        this.es.close();
        delete this.es;
        this.setupStream();
        // this.$nextTick(() => {
        // });
      }
    },

    deleteStream() {
      if (this.es !== "undefined") {
        this.es.close();
        delete this.es;
      }
    },

    /**
     * 获取充值列
     */
    getCharge() {
      const { pageSize, pageIndex, status } = this;
      getPeriod(pageSize, pageIndex, status).then((res) => {
        if (res.code === 200) {
          this.activityList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCharge();
      // this.deleteStream();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      // this.deleteStream();
      if (this.pages === 1) {
        this.getCharge();
      } else if (this.pages === 2) {
        this.getsearch();
      }

      console.log(`当前页: ${val}`);
    },

    getsearch() {
      const { issue, time, status } = this.activityDatas;
      console.log('time--->',time)
      let times = ''
      if(time){
        times = time.map((item) => {
          return item / 1000;
        });
      }
      this.pageshow = false;
      this.$nextTick(() => {
        this.pageshow = true;
      });
      const params = {
        conditions: {
          number: issue,
          prize_time: times,
          game_id: this.status,
          status: status,
        },
        ops: {
          number: "=",
          prize_time: "between",
          game_id: "=",
          status: "=",
        },
        page: status == 0 ? 1 : this.pageIndex,
        limit: this.pageSize,
      };
      periodSearch(params).then((res) => {
        if (res.code === 200) {
          this.activityList = res.data.list;
          if(status == 0){
            this.showPagination = false
          }else{
            this.showPagination = true
          }
          this.total = res.data.total;
        }
      });
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      this.pages = 2;
      this.getsearch();
      // this.deleteStream();
    },
    /**
     * 重置按钮
     */
    handelReset() {
      this.pages = 1;
      this.$refs.stroleRef.resetFields();
      // this.getCharge();
      // this.setupStream();
      // this.$router.push({
      //   path: "/types/index",
      // });
    },
    /**
     *gold按钮
     */
    handelGold() {
      this.plain1 = true;
      this.plain2 = false;
      this.plain3 = true;
      this.plain4 = true;
      this.status = 1;

      this.getCharge();
      // this.updateStream();
    },
    handelJewelry() {
      this.plain1 = true;
      this.plain2 = true;
      this.plain3 = false;
      this.plain4 = true;
      this.status = 3;
      this.getCharge();
      // this.updateStream();
    },
    handelSilver() {
      this.plain1 = true;
      this.plain2 = true;
      this.plain3 = true;
      this.plain4 = false;
      this.status = 2;
      this.getCharge();
      // this.updateStream();
    },
    handelOther() {
      this.plain1 = false;
      this.plain2 = true;
      this.plain3 = true;
      this.plain4 = true;

      this.status = 4;
      this.getCharge();
      // this.updateStream();
    },
    /**
     * 查看详情
     */
    details(item) {
      const { id } = item;
      periodId(id).then((res) => {
        if (res.code === 200) {
          this.isDetails = true;
          this.detailData = res.data;
        }
      });
    },

    handleManualDraw(item) {
      const { id } = item;

      periodId(id).then((res) => {
        if (res.code === 200) {
          this.activityDatas.num = res.data.b_money;
          const { game_id, id } = res.data;
          this.activityDatas.game_play_id = id;
          const params = {
            game_id: game_id,
            game_play_id: id,
          };
          getPrize(params).then((res) => {
            this.isDraw = true;
            if (res.code === 200) {
              this.openData = res.data;
              const datas = res.data.new_user;
              const result = Object.keys(datas).map((el) => {
                return { name: datas[el], text: el };
              });
              this.openLists = result;
              const income = res.data.sy;
              const result1 = Object.keys(income).map((els) => {
                return { name: Number(income[els]).toFixed(2), text: els };
              });
              this.incomeList = result1;
            }
          });
        }
      });

      //手动开奖按钮
    },
    /**
     * handleManual
     */
    handleDraw() {
      const { num, game_play_id } = this.activityDatas;
      const params = {
        number: num,
        game_play_id,
      };
      requestDraw(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("手动开奖成功");
          this.isDraw = false;
          // this.getCharge();
          this.getsearch()
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// -------- 头部背景
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
.manual-title {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 10px;

  padding: 15px 0;
  color: black;
}
.man-list {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  > li {
    &:first-child > p {
      width: 80px;
      font-weight: bold;
    }
    &:nth-child(2) > p {
      background: linear-gradient(
        180deg,
        #ff5153 0,
        #ff5153 50%,
        #8b6de9 51%,
        #8b6de9
      );
    }
    &:nth-child(3) > p {
      background: #2cc747;
    }
    &:nth-child(4) > p {
      background: #ff5153;
    }
    &:nth-child(5) > p {
      background: #2cc747;
    }
    &:nth-child(6) > p {
      background: #ff5153;
    }
    &:nth-child(7) > p {
      background: linear-gradient(
        180deg,
        #2cc747 0,
        #2cc747 50%,
        #8b6de9 51%,
        #8b6de9
      );
    }
    &:nth-child(8) > p {
      background: #ff5153;
    }
    &:nth-child(9) > p {
      background: #2cc747;
    }
    &:nth-child(10) > p {
      background: #ff5153;
    }
    &:nth-child(11) > p {
      background: #2cc747;
    }
    > p {
      background: green;
      width: 40px;
      height: 30px;
      color: white;
      margin: 5px 0;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
    }
  }
}
</style>