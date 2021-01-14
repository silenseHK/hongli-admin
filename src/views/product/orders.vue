<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-input v-model="search.user_id" placeholder="会员ID"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="search.phone" placeholder="会员手机号"></el-input>
          </el-col>
          <el-col :span="7">
            <el-date-picker
                style="height:40px;"
                v-model="search.time"
                type="datetimerange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                size="small"
                end-placeholder="结束日期"
                value-format="timestamp"
                :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-search" circle @click="doSearch"></el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="list" border stripe>
        <el-table-column prop="id" label="#" width="100"> </el-table-column>
        <el-table-column prop="user.id" label="用户ID" width="100">
        </el-table-column>
        <el-table-column prop="user.phone" label="用户手机号" width="140">
        </el-table-column>
        <el-table-column prop="product_data.name" label="商品名" width="200">
        </el-table-column>
        <el-table-column label="商品图" width="180">
          <template slot-scope="scope">
            <el-image
                style="width: 100px; height: 100px;"
                :src="scope.row.product_data.cover_img.path">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="product_data.price" label="单价" width="120"></el-table-column>
        <el-table-column prop="product_data.back_money" label="单返回金额" width="120"></el-table-column>
        <el-table-column prop="num" label="购买数量" width="120"></el-table-column>
        <el-table-column prop="price" label="总价" width="120"></el-table-column>
        <el-table-column prop="back_money" label="总返回金额" width="120"></el-table-column>

        <el-table-column prop="created_at" label="创建时间" width="200"></el-table-column>
      </el-table>
      <div class="pagination-bottom">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 40, 80, 100]"
            :page-size="size"
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
import { orders } from "@/api/product"

export default {

  data: () => ({
    total: 0,
    loading: false,
    page:1,
    size:10,
    list: [],
    search:{
      time: "",
      phone: "",
      user_id: ""
    },

    pickerOptions: {
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
    },
  }),
  created() {
    this.getList();
  },
  computed:{

  },
  methods: {
    doSearch(){
      this.page = 1;
      this.total = 0;
      this.getList();
    },
    getList(){
      let {page, size} = this;
      let {phone, user_id, time} = this.search
      let [start_time , end_time] = [0,0];
      if(time){
        start_time = time[0]/1000
        end_time = time[1]/1000
      }
      orders({start_time, end_time, phone, user_id, size, page}).then((res)=>{
        if(res.code == 200){
          let {data, total} = res.data
          this.list = data
          this.total = total
        }else{
          this.list = [];
        }
      })
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },

  },
}
</script>

<style lang="scss" scoped>

</style>