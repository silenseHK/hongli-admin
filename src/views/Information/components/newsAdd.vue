<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-button
          @click="backNews"
          type="text"
          style="color: #000"
          icon="el-icon-arrow-left"
          >返回资讯列表</el-button
        >
      </div>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="栏目" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择栏目ID">
            <el-option
              v-for="item in chanList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                value-format="timestamp"
                style="width: 400px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="简略标题" prop="name">
          <el-input v-model="ruleForm.name" style="width: 400px"></el-input>
        </el-form-item>
        <!-- 图片 --start -->
        <el-form-item label="上传图片:">
          <el-upload
            action="https://api.mt88.live/api/upload"
            list-type="picture-card"
            :http-request="uploadImg"
            ref="upload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-image
              style="width: 100%; height: 100%"
              :src="GLOBAL.IMG_URL + ruleForm.img"
              v-if="ruleForm.img"
            ></el-image>
            <i class="el-icon-plus" v-else></i>
          </el-upload>
          <el-dialog :visible.sync="ruleForm.Adhidden">
            <img width="100%" :src="ruleForm.addimage" alt />
          </el-dialog>
        </el-form-item>
        <!-- 图片--end -->

        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="ruleForm.keyword" style="width: 800px"></el-input>
        </el-form-item>

        <el-form-item label="内容摘要" prop="abstart">
          <el-input v-model="ruleForm.abstart" style="width: 800px"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="desc" style="margin-top: 90px">
          <!-- <wang-editor
            v-model="ruleForm.desc"
            :disabled="wangDisabled"
          ></wang-editor> -->
          <div id="demo1"></div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

import { InformatioAdd, newsGene } from "@/api/Information";
// 引入 wangEditor
import wangEditor from "wangeditor";

export default {
  name: "newsadd",

  data() {
    return {
      editor: null,

      chanList: [],
      wangDisabled: false,
      ruleForm: {
        title: "",
        name: "",
        abstart: "",
        date1: "",
        resource: "",
        desc: "",
        addimage: "",
        Adhidden: false,
        img: "",
        keyword: "",
        region: "",
      },
      rules: {
        region: [{ required: true, message: "请选择栏目", trigger: "change" }],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 85,
            message: "长度在 2 到 85 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入简略标题", trigger: "blur" },
          {
            min: 2,
            max: 85,
            message: "长度在 2 到 85 个字符",
            trigger: "blur",
          },
        ],
        keyword: [
          { required: true, message: "请输入关键字", trigger: "blur" },
          {
            min: 2,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur",
          },
        ],
        abstart: [
          { required: true, message: "请输入内容摘要", trigger: "blur" },
          {
            min: 2,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur",
          },
        ],

        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],

        desc: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  // computed: {
  //   ...mapState({
  //     goodsForeNo: (state) => state.news.newsLists,
  //   }),
  // },
  mounted() {
    const editor = new wangEditor(`#demo1`);

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.ruleForm.desc = newHtml;
    };
    // 设置上传本地图片地址
    editor.config.uploadImgServer = "https://api.fstng.com/api/upload";
    // 传递验证的 token
    editor.config.uploadImgParams = {
      token: localStorage.getItem("token"),
    };
    // 自定义 fileName
    editor.config.uploadFileName = "head_image";

    editor.config.uploadImgHooks = {
      // 上传图片之前
      // before: function (xhr) {
      //   console.log(xhr);

      //   // 可阻止图片上传
      //   return {
      //     prevent: true,
      //     msg: "需要提示给用户的错误信息",
      //   };
      // },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        console.log("fail", resData);
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function () {
        console.log("timeout");
      },

      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: (insertImgFn, result) => {
        // result 即服务端返回的接口

        if (result.code === 200) {
          console.log("123");
          this.$message.success("上传成功");
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(`https://api.fstng.com/${result.data.path}`);
        } else {
          this.$message.error("上传失败");
        }
      },
    };
    editor.config.showLinkImg = false;

    // 创建编辑器
    editor.create();

    this.editor = editor;
  },
  created() {
    this.ruleForm.addimage = "";
    this.ruleForm.img = "";
    // if (this.goodsForeNo) {
    //   let roter = this.goodsForeNo;
    //   (this.ruleForm.title = roter.title),
    //     (this.ruleForm.name = roter.brief_title),
    //     (this.ruleForm.img = roter.image),
    //     (this.ruleForm.keyword = roter.keyword),
    //     (this.ruleForm.abstart = roter.abstract),
    //     (this.ruleForm.desc = roter.content),
    //     (this.ruleForm.date1 = roter.create_time),
    //     (this.ruleForm.region = roter.channel_id),
    //     console.log(roter);
    // }
    this.$store.dispatch("news/chanList").then((res) => {
      if (res.code === 200) {
        this.chanList = res.data;
      } else {
        this.$message.error(res.msg);
      }
    });
  },
  methods: {
    /**
     * 提交按钮
     */
    submitForm(formName) {
      console.log(this.ruleForm.date1);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let getNewsData = {
            title: this.ruleForm.title,
            brief_title: this.ruleForm.name,
            image: this.ruleForm.addimage,
            keyword: this.ruleForm.keyword,
            abstract: this.ruleForm.abstart,
            content: this.ruleForm.desc,
            create_time: this.ruleForm.date1 / 1000,
            channel_id: this.ruleForm.region,
          };

          InformatioAdd(getNewsData).then((res) => {
            if (res.code === 200) {
              this.$message.success("创建成功");
              newsGene().then((res) => {
                console.log(res.msg);
              });
              this.$router.push({
                path: "index",
              });
              this.$refs.ruleForm.resetFields();
              this.ruleForm.addimage = "";
              this.ruleForm.img = "";
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    /**
     * 重置按钮
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 图片上传
     */

    async uploadImg(f) {
      this.progressFlag = true;
      let formdata = new FormData();
      formdata.append("head_image", f.file);

      await axios({
        url: "https://api.fstng.com/api/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        onUploadProgress: (progressEvent) => {
          this.progressPercent =
            (progressEvent.loaded / progressEvent.total) * 100;
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "上传成功",
          });
          this.ruleForm.addimage = res.data.data.path;
          this.ruleForm.pictuerPath = res.data.data.path;
          this.ruleForm.img = "";
        } else {
          this.$message.error("上传失败");
        }

        // this.pictureData.dialogVisibles = true;
      });
    },

    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.pictureData.Adhidden = true;
    },
    /**
     * 返回按钮
     */

    backNews() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scope>
.home {
  width: 1000px;
  margin: auto;
}
</style>