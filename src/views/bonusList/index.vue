<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="24">
          <el-form :model="bonusData" ref="stroleRef">
            <el-col :span="4" :xl="4" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="phone">
                <el-input
                  v-model="bonusData.phone"
                  placeholder="用户手机号"
                  size="medium"
                  clearable
                ></el-input>
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
                  v-model="bonusData.time"
                  type="datetimerange"
                  align="right"
                  unlink-panels
                  size="medium"
                  range-separator="至"
                  start-placeholder="操作时间"
                  end-placeholder="操作时间"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3" :xl="3" :lg="6" :md="24" :sm="24" :xs="24">
              <el-form-item prop="sourcehType">
                <el-select
                  v-model="bonusData.sourcehType"
                  filterable
                  size="small"
                  placeholder="注册来源"
                >
                  <el-option
                    v-for="item in sourceList"
                    :key="item.id"
                    :label="item.label"
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
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="bonusList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="admin.nickname" label="后台操作员昵称">
        </el-table-column>
        <el-table-column prop="user.phone" label="用户手机号">
        </el-table-column>

        <el-table-column prop="time" label="操作时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.time | formatDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="is_first_recharge" label="是否为首充">
          <template slot-scope="scope">
            <el-tag type="info" size="minni" effect="dark">{{
              scope.row.is_first_recharge === 1 ? "是" : "否"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="操作金额"> </el-table-column>
        <el-table-column prop="dq_balance" label="操作前余额">
        </el-table-column>
        <el-table-column prop="wc_balance" label="操作后余额">
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
import { getGifyAll, searchGif } from "@/api/bonus";
import { objDele } from "@/utils/validate";
export default {
  name: "bonuslist",
  data: () => ({
    bonusList: [],
    bonusData: {
      phone: "",
      time: [],
      sourcehType: "",
    },
    accountList: [
      {
        id: 1,
        text: "是",
      },
      {
        id: 2,
        text: "否",
      },
    ],
    //注册来源
    sourceList: [
      {
        id: 0,
        label: "普通H5注册",
      },
      {
        id: 1,
        label: "网站测试会员",
      },
    ],
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    page: 1,
  }),
  activated() {
    this._getGifAll();
  },
  methods: {
    /**
     *获取列表信息
     */
    _getGifAll() {
      getGifyAll(this.pageSize, this.pageIndex).then((res) => {
        if (res.code === 200) {
          this.bonusList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this._getGifAll();
      console.log(`每页 ${val} 条`);
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      this.pageIndex = val;
      if (this.page === 1) {
        this._getGifAll();
      } else if (this.page === 2) {
        this.getSearchs();
      }
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      this.page = 2;
      this.getSearchs();
    },
    /**
     * 调取搜索接口
     */
    getSearchs() {
      const { phone, time, sourcehType } = this.bonusData;
      const times = time.map((item) => {
        return item / 1000;
      });

      const searchData = {
        phone: phone,
        time: times,
        reg_source_id: sourcehType,
      };
      const paramss = objDele(searchData);
      const params = {
        conditions: paramss,
        ops: {
          phone: "like",
          start_time: "between",
          reg_source_id: "=",
        },
        page: this.pageIndex,
        limit: this.pageSize,
      };
      searchGif(params)
        .then((res) => {
          if (res.code === 200) {
            this.bonusList = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch((error) => console.error(error));
    },
    /**
     * 重置按钮
     */

    handelReset() {
      this.pageIndex = 1;
      this.$refs.stroleRef.resetFields();
      // this._getGifAll();
     
    },
  },
};
</script>

<style lang="scss" scoped>
</style>