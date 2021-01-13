<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-form :model="bankCardData" ref="stroleRef">
            <el-col style="width: 100px;margin-right:20px;">
              <el-button type="primary" size="medium" @click="showAdd"
              >新增商品</el-button
              >
            </el-col>

            <el-col style="width:300px;margin-right:20px;">
              <el-form-item prop="phone">
                <el-input
                    v-model="bankCardData.phone"
                    placeholder="用户手机号"
                    size="medium"
                    clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col style="width: 100px">
              <el-button type="primary" size="medium" @click="handelSearch"
              >搜索</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="bankCardList" border stripe>
        <el-table-column prop="id" label="#" width="70"> </el-table-column>
        <el-table-column prop="account_holder" label="开户人" width="120">
        </el-table-column>
        <el-table-column prop="user.nickname" label="银行所属用户" width="200">
        </el-table-column>
        <el-table-column prop="bank_num" label="银行卡号" width="320">
        </el-table-column>
        <el-table-column prop="bank_opening" label="开户行" width="170">
        </el-table-column>

        <el-table-column prop="phone" label="预留手机号" width="170">
        </el-table-column>
        <el-table-column prop="status" label="银行卡状态" width="150">
          <template slot-scope="scope">
            <el-tag type="success" size="small" effect="dark">{{
                scope.row.status === 0 ? "正常" : "删除"
              }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="add_time" label="添加时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="编辑时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | formatDate }}</span>
          </template>
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

    <el-drawer
        title="我是标题"
        :visible.sync="showDetail"
        :with-header="false"
        size="50%">
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form :model="product" label-position="top" label-width="120px">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="product.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="购买金额" :label-width="formLabelWidth">
            <el-input v-model="product.price" autocomplete="off" placeholder="请输入购买金额"></el-input>
          </el-form-item>
          <el-form-item label="赠送金额" :label-width="formLabelWidth">
            <el-input v-model="product.back_money" autocomplete="off" placeholder="请输入赠送金额"></el-input>
          </el-form-item>
          <el-form-item label="轮播" :label-width="formLabelWidth">
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
              <div style=" width: 100px; height: 100px; margin: 5px; position:relative;" :key="key" v-for="(ban,key) in product.banner">
                <el-image
                    style="width: 100px; height: 100px;"
                    :src="ban.path">
                </el-image>
                <i class="el-icon-delete" style="position:absolute; right:3px; top:3px; cursor: pointer;color:red; padding:3px;" @click="delBanner(key)"></i>
              </div>
            </div>

            <el-upload
                class="upload-demo"
                :data="uploadData"
                :action="baseUrl"
                :multiple="false"
                :on-success="handleSuccess"
                :file-list="product.banner"
                accept=".jpg,.png"
                :headers="headers"
                :limit="5"
                :show-file-list="false"
                :on-exceed="limitUploadNum"
                list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>

          </el-form-item>
          <el-form-item label="商品排序[越小越靠前]" :label-width="formLabelWidth">
            <el-input-number v-model="product.sort" :min="1" :max="9999" label="排序"></el-input-number>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import { getBankCard, bankCardSearch } from "@/api/bankCard";
import phpUrl from "@/utils/baseUrl";
import store from "@/store"
const token =  store.getters.token
export default {
  data: () => ({
    headers: {token: token},
    uploadData: {name:"file"},

    bankCardList: [],
    bankCardData: {
      phone: "",
      time: [],
    },
    pageSize: 10,
    pageIndex: 1,
    total: 0,

    baseUrl: phpUrl + '/upload',
    showDetail: false,
    loading: false,
    product: {
      name: '',
      price: 0,
      back_money: 0,
      content: '',
      sort: 9999,
      status: 1,
      cover: 0,
      cover_img: '',
      banner: [

      ],
      banner_list: [],
    },
    formLabelWidth: '80px',
    fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  }),
  created() {
    this.getCharge();
  },
  methods: {
    handleSuccess(res){
      console.log(this.product.banner)
      console.log(res)
      if(res.code != 200){
        this.$message.error(res.msg)
        return false;
      }
      let data = res.data;
      this.product.banner.push({id:data.id, path:data.src, name:data.src})
      this.product.banner_list.push(data.src)
      console.log(this.product.banner)
    },
    delBanner(idx){
      this.product.banner.splice(idx,1)
    },
    limitUploadNum(){
      this.$message({
        type: 'warning',
        message: '最多上传5张轮播图'
      })
    },

    /**
     * 获取充值列j
     */
    getCharge() {
      const { pageSize, pageIndex } = this;
      getBankCard(pageSize, pageIndex).then((res) => {
        if (res.code === 200) {
          this.bankCardList = res.data.list;
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
      this.getCharge();
      console.log(`当前页: ${val}`);
    },
    /**
     * 搜索按钮
     */
    handelSearch() {
      const { phone } = this.bankCardData;
      const params = {
        phone,
        limit: this.pageSize,
        page: this.pageIndex,
      };
      bankCardSearch(params).then((res) => {
        if (res.code === 200) {
          this.bankCardList = res.data.list;
          this.total = res.data.total;
        }
      });
      //   const params = {
      //     conditions: {
      //       phone: phone,
      //       time: time,
      //     },
      //     ops: {
      //       phone: "like",
      //       time: "between",
      //     },
      //     page: this.pageIndex,
      //     limit: this.pageSize,
      //   };
      // bankCardId(phone).then((res) => {
      //   if (res.code === 200) {
      //     this.bankCardList = res.data;
      //     //   this.total = res.data.total;
      //   }
      // });
    },
    /**
     * 重置按钮
     */
    handelReset() {
      // this.getCharge();
      this.pageIndex = 1
      this.$refs.stroleRef.resetFields();
    },

    showAdd(){
      this.showDetail = true;
    },

    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  },
}
</script>

<style scoped>

</style>