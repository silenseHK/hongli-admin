<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col style="width: 100px;margin-right:20px;">
            <el-button type="primary" size="medium" @click="showAdd"
            >新增商品</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-table :data="list" border stripe>
        <el-table-column prop="product_id" label="#" width="100"> </el-table-column>
        <el-table-column prop="name" label="商品名" width="200">
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="140">
        </el-table-column>
        <el-table-column prop="back_money" label="返还金额" width="120">
        </el-table-column>
        <el-table-column label="封面" width="140">
          <template slot-scope="scope">
            <el-image
                style="width: 100px; height: 100px;"
                :src="scope.row.cover_img.path">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="sort" label="排序" width="120">
        </el-table-column>
        <el-table-column prop="status" label="商品状态" width="120">
          <template slot-scope="scope">
            <el-tag type="success" size="small" effect="dark">{{
                scope.row.status === 1 ? "上线" : "下线"
              }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="购买状态" width="120">
          <template slot-scope="scope">
            <el-tag type="success" size="small" effect="dark">{{
                scope.row.buy_status === 1 ? "可购买" : "不可购买"
              }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" label="添加时间" width="200"></el-table-column>
        <el-table-column prop="updated_at" label="编辑时间" width="200"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="showEdit(scope)">编辑</el-button>
            <el-button type="primary" plain @click="del(scope)">删除</el-button>
          </template>
        </el-table-column>
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

    <el-drawer
        title="我是标题"
        :visible.sync="showDetail"
        :with-header="false"
        :show-close="true"
        size="50%">
      <div class="demo-drawer__content" style="padding:10px;">
        <el-form :model="product" label-position="top" label-width="120px" :rules="productRule" ref="product">
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="product.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="购买金额" :label-width="formLabelWidth" prop="price">
            <el-input v-model.number="product.price" autocomplete="off" placeholder="请输入购买金额"></el-input>
          </el-form-item>
          <el-form-item label="赠送金额" :label-width="formLabelWidth" prop="back_money">
            <el-input v-model.number="product.back_money" autocomplete="off" placeholder="请输入赠送金额"></el-input>
          </el-form-item>
          <el-form-item label="轮播[点击图片选择封面]" :label-width="formLabelWidth" prop="banner">
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
              <div style=" width: 100px; height: 100px; margin: 5px; position:relative;" :key="key" v-for="(ban,key) in product.banner">
                <el-image
                    @click="chooseCover(key)"
                    style="width: 100px; height: 100px;cursor: pointer;"
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

          <el-form-item label="封面" :label-width="formLabelWidth">
            <el-image
                v-show="product.cover"
                style="width: 100px; height: 100px;"
                :src="product.cover_img">
            </el-image>
          </el-form-item>

          <el-form-item label="商品状态" :label-width="formLabelWidth" prop="status">
            <el-switch
                v-model.number="product.status"
                active-text="上架"
                inactive-text="下架"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="购买状态" :label-width="formLabelWidth" prop="buy_status">
            <el-switch
                v-model.number="product.buy_status"
                active-text="可购买"
                inactive-text="不可购买"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="商品排序[越小越靠前]" :label-width="formLabelWidth" prop="sort">
            <el-input-number v-model="product.sort" :min="1" :max="9999" label="排序"></el-input-number>
          </el-form-item>

          <el-form-item label="商品详情" :label-width="formLabelWidth">
            <quill-editor
                v-model="product.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="primary" @click="submit" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <el-upload
        class="ivu-upload"
        :data="uploadData"
        :show-upload-list="false"
        :on-success="handleEditorSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :action="baseUrl"
        :headers="headers"
    >
      <el-button class="ivu-btn" icon="ios-cloud-upload-outline" ></el-button>
    </el-upload>

  </div>
</template>

<script>
import { add, update, lists, del } from "@/api/product";
import phpUrl from "@/utils/baseUrl";
import store from "@/store"
import { quillEditor } from "vue-quill-editor";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
const token =  store.getters.token

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]

export default {
  components: {
    quillEditor
  },
  data: () => ({
    headers: {token: token},
    uploadData: {name:"file"},

    pageIndex: 1,
    total: 0,

    baseUrl: phpUrl + '/upload',
    showDetail: false,
    loading: false,
    product: {
      product_id: 0,
      name: '',
      price: 0,
      back_money: 0,
      content: '',
      sort: 9999,
      status: 1,
      cover: 0,
      cover_img: '',
      banner: [],
      buy_status: 1
    },
    productRule:{
      name: [
        {required: true, message: '请输入商品名', trigger: 'blur'},
        { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
      ],
      price: [
        {required: true, message: '请输入商品价格', trigger: 'blur'},
        { type:'number', message: '价格需要是数字', trigger: 'blur' }
      ],
      back_money: [
        {required: true, message: '请输入返还金额', trigger: 'blur'},
        { type:'number', message: '返还金额需要是数字', trigger: 'blur' }
      ],
      sort: [
        {required: true, message: '请输入商品排序', trigger: 'blur'},
        { type:'integer', message: '排序需要是整数', trigger: 'blur' }
      ],
      cover: [
        {required: true, message: '请选择封面', trigger: 'blur'},
      ],
      banner: [
        { type: 'array', required: true, message: '请至少上传一张轮播图', trigger: 'change' }
      ]
    },
    formLabelWidth: '80px',
    editorOption: {
      modules: {
        toolbar: {
          container: toolbarOptions,  // 工具栏
          handlers: {
            'image': function (value) {
              if (value) {
                // 调用iview图片上传
                document.querySelector('.ivu-upload .ivu-btn').click()
              } else {
                this.quill.format('image', false);
              }
            }
          }
        }
      }
    },
    page:1,
    size:10,
    list: [],
  }),
  created() {
    this.getList();
  },
  computed:{
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {

    getList(){
      let {page, size} = this;
      lists(size, page).then((res)=>{
        if(res.code == 200){
          let {data, total} = res.data
          this.list = data
          this.total = total
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    showEdit(scope){
      let product = this.list[scope.$index]
      let {product_id, name, sort, content, status, price, back_money, cover, cover_img, banner, buy_status} = product

      this.product = {
        product_id,
        name,
        sort,
        content,
        status,
        price:parseFloat(price),
        back_money:parseFloat(back_money),
        cover,
        cover_img: cover_img.path,
        banner: [],
        buy_status
      }

      let banners = []
      for(var ban of banner){
        banners.push({
          id:ban.image_id,
          path:ban.path,
          name:ban.path
        })
      }
      this.product.banner = banners;
      this.showDetail = true
    },

    del(scope){
      this.$confirm('确定删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({product_id:this.list[scope.$index].product_id}).then((res)=>{
          if(res.code == 200){
            this.$message.success("操作成功")
            this.getList()
          }else{
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {});
    },

    handleEditorSuccess (res) {
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res.data.src)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
    },

    onEditorReady(e) { // 准备编辑器
      console.log(e)
    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件

    handleSuccess(res){
      if(res.code != 200){
        this.$message.error(res.msg)
        return false;
      }
      let data = res.data;
      this.product.banner.push({id:data.id, path:data.src, name:data.src})
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

    chooseCover(idx){
      this.product.cover = this.product.banner[idx].id;
      this.product.cover_img = this.product.banner[idx].path;
    },

    submit(){
      this.$refs['product'].validate((valid) => {
        if (valid) {
          let {name, price, back_money, cover, banner, sort, status, content, buy_status, product_id} = this.product;
          let images = [];
          let ban_sort = 1;
          for(var ban of banner){
            images.push({
              file_id:ban.id,
              sort: ban_sort,
            });
            ban_sort++
          }
          if(!cover){
            this.$message.warning("请选择封面图")
            return false;
          }
          let params = {
            name, price, back_money, cover, images, sort, status, content, buy_status
          };
          if(product_id){//修改
            params.product_id = product_id
            update(params).then((res)=>{
              if(res.code == 200){
                this.$message.success('操作成功')
                this.getList()
              }
            })
          }else{//新增
            add(params).then((res)=>{
              if(res.code == 200){
                this.$message.success('操作成功')
                this.page = 1;
                this.getList()
                //初始化表单
                this.initForm()
              }
            })
          }
        } else {
          this.$message.warning("请将数据补充完整")
        }
      })
    },

    initForm(){
      this.product = {
        product_id: 0,
        name: '',
        price: 0,
        back_money: 0,
        content: '',
        sort: 9999,
        status: 1,
        cover: 0,
        cover_img: '',
        banner: []
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },

    showAdd(){
      this.showDetail = true;
    },
  },
}
</script>

<style lang="scss" scoped>

.ivu-upload {
  display: none;
}
</style>