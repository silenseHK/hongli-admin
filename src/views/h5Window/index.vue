<template>
  <div>
    <el-card>
      <div slot="header">
        <el-tabs v-model="currentNav" @tab-click="clickNav">
          <el-tab-pane
            v-for="(item, index) in navList"
            :key="index"
            :label="item.name"
            :name="item.id"
          ></el-tab-pane>
        </el-tabs> 
      </div>
      <div class="editor-box">
        <quill-editor 
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption" 
        ></quill-editor>
      </div>
      <el-button type="primary" @click="haddleSubmit">提交</el-button>
    </el-card>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor" //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {getH5WindowInfo,submitH5WindowInfo} from '../../api/h5Window'
export default {
  name: "h5Window",
  data: () => ({
    canClick: true,
    //配置富文本
    editorOption: {
      placeholder: "请在这里输入",
      modules:{
        toolbar:[
                  ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                  [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                  [{ 'direction': 'rtl' }],             // 文本方向
                  [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                  [{ 'color': [] }],     // 字体颜色，字体背景颜色
                  [{ 'align': [] }]    //对齐方式
                  ]
              }
    },
    content: '',
    currentNav: "1",
    navList: [ //导航
      {
        name: "已登录弹框",
        id: "1",
      },
      {
        name: "未登录弹框",
        id: "2",
      },
    ]
   
      
  }),
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  activated() {
    this.title = this.$route.meta.title
    this.getH5WindowInfoData()
  },
  methods: {
    //获取填过的h5弹窗信息
    getH5WindowInfoData(){
      getH5WindowInfo().then(resp => {
        if(resp.code == 200){
          let content = (this.currentNav == 1 ? resp.data.loginAlert : resp.data.logoutAlert)
          this.content = (content.length == '' ? '' : this.htmlDecodeByRegExp(content))
        }
      })
    },
     //反转义富文本
    htmlDecodeByRegExp(str) {
      let temp = "";
      if (str.length == 0) return "";
      temp = str.replace(/&amp;/g, "&");
      temp = temp.replace(/&lt;/g, "<");
      temp = temp.replace(/&gt;/g, ">");
      temp = temp.replace(/&nbsp;/g, " ");
      temp = temp.replace(/&#39;/g, "'");
      temp = temp.replace(/&quot;/g, '"');
      return temp;
    },
     //转义为富文本
    htmlEncodeByRegExp(str) {
      let temp = "";
      if (str.length == 0) return "";
      temp = str.replace(/&/g, "&amp;");
      temp = temp.replace(/</g, "&lt;");
      temp = temp.replace(/>/g, "&gt;");
      temp = temp.replace(/\s/g, "&nbsp;");
      temp = temp.replace(/\'/g, "&#39;");
      temp = temp.replace(/\"/g, "&quot;");
      return temp;
    },
    //提交h5弹窗信息
    submitH5WindowInfoData(){
      if(this.content == ''){
        this.$message({
          message: '请输入文本内容',
          type: 'warning'
        });
        return
      }
      if(this.canClick){
        this.canClick = false
        setTimeout(() => {
          this.canClick = true
        },2500)
        let params = {
          type: this.currentNav,
          content: this.htmlEncodeByRegExp(this.content)
        }
        submitH5WindowInfo(params).then(resp => {
          if(resp.code == 200){
            this.$message({
              message: '提交成功',
              type: 'success'
            });
          }
        })
      }
     
    },
    // nav切换
    clickNav(){
      this.getH5WindowInfoData()
    },
    // 点击提交
    haddleSubmit(){
      this.submitH5WindowInfoData()
    }
  }
};
</script>

<style lang="scss" scoped>
 .editor-box{
   width: 375px;
   margin-bottom: 40px;
 }
 
</style>