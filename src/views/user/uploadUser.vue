<template>
  <div>
    <el-card>
      <el-page-header
        @back="goBack"
        content="修改用户"
        style="margin-left: 40px; margin-bottom: 30px"
      >
      </el-page-header>
      <el-form :model="userData" label-width="120px">
        <el-form-item label="">
          <el-upload
            class="avatar-uploader"
            action="https://api.unicasino.net/admin/upload"
            :show-file-list="false"
            name="head_image"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="GLOBAL.IMG_URL + imageUrl"
              class="avatar"
            />
            <span
              v-if="imageUrl"
              class="el-upload-action"
              @click.stop="handleRemove()"
            >
              <i class="el-icon-delete"></i>
            </span>
            <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="userData.username"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="平台ID">
          <el-select
            v-model="userData.platform_id"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in platform"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="userData.nickname"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input
            v-model="userData.phone"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="userData.password"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="userData.email"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userData.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userData.status">
            <el-radio :label="0">未登录</el-radio>
            <el-radio :label="1">登录</el-radio>
            <el-radio :label="2">封禁</el-radio>
            <el-radio :label="3">在线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户余额">
          <el-input
            v-model="userData.balance"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="分享邀请码">
          <el-input
            v-model="userData.code"
            size="small"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userSubmit" size="small"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { userPlatform, userEdit, userId } from "@/api/user";
export default {
  name: "Adduser",
  data: () => ({
    platform: [],
    value: "",
    imageUrl: "",
    files: [],
    userData: {
      id: "",
      username: "",
      nickname: "",
      phone: "",
      email: "",
      sex: 0,
      status: 0,
      balance: "",
      head_image: "",
      platform_id: "",
      code: "",
      password: "",
    },
  }),
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["userDatas"]),
  },
  created() {
    this.getPlatForm();
    // console.log(this.$route.query.id);
    this.getUser();
  },
  mounted() {},
  methods: {
    /**
     * 根据id获取用户信息
     */
    getUser() {
      userId(this.$route.query.id).then((res) => {
        if (res.code === 200) {
          const data = res.data;
          this.userData.username = data.username;
          this.userData.nickname = data.nickname;
          this.userData.phone = data.phone;
          this.userData.email = data.email;
          this.userData.sex = data.sex;
          this.userData.status = data.status;
          this.userData.balance = data.balance;
          this.imageUrl = data.head_image;
          this.userData.platform_id = data.platform_id;
          this.userData.code = data.code;
          this.userData.id = data.id;
          this.userData.password = data.password;
        }
      });
    },
    // 移除图片
    handleRemove() {
      this.files = [];
      this.imageUrl = "";
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.path;
      this.files.push(file);
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type =
        file.type === "image/jpeg" ||
        "image/jpg" ||
        "image/webp" ||
        "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!type) {
        this.$message.error("图片格式不正确!(只能包含jpg，png，webp，JPEG)");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return type && isLt2M;
    },
    /**
     * 获取平台
     */
    getPlatForm() {
      userPlatform().then((res) => {
        if (res.code === 200) {
          this.platform = res.data;
        }
      });
    },
    /**
     * 提交按钮
     */
    userSubmit() {
      const parameter = {
        id: this.userData.id,
        username: this.userData.username,
        nickname: this.userData.nickname,
        phone: this.userData.phone,
        email: this.userData.email,
        sex: this.userData.sex,
        status: this.userData.status,
        balance: this.userData.balance,
        head_image: this.imageUrl,
        platform_id: this.userData.platform_id,
        code: this.userData.code,
        password: this.userData.password,
      };
      userEdit(parameter).then((res) => {
        if (res.code === 200) {
          this.$router.push({
            path: "/user/index",
          });
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #eee;
  margin-left: 100px;
  border-radius: 50%;
}
.avatar-uploader-icon {
  box-sizing: border-box;
  font-size: 28px;
  color: #b7b7b7;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border: 1px dashed #b7b7b7;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
}
.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  display: block;
}
.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: #fff;
  text-align: center;
  line-height: 100px;
}
.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>