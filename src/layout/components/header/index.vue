<template>
  <div class="header" style="min-width:1100px">
    <div class="header_l">
      <a href="javascript:;" class="logoLink"> 后台管理系统 </a>
    </div>
    <div class="header_r flexC">
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <!-- 顶部面包屑导航 -->
        <bread-crumb class="bread"></bread-crumb>
      </div>
      <div class="myTime">
        <span class="myText">印度当地时间：</span>  
        <Clock></Clock>
      </div>
      <div class="headr_d2">
        <ul class="headrUl clearFixed">
          <!-- 播放消息提示音 -->
          <!-- <audio controls="controls" hidden ref="audio"></audio> -->
          <!-- <li id="domMessage">
            <el-badge is-dot @click.native="toggleMsgShow">
              <i class="el-icon-message-solid iconFont"></i>
            </el-badge>
          </li>-->
          <li id="domFullScreen">
            <full-screen></full-screen>
          </li>
          <li id="domPersonal">
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import Clock from '@/components/Clock'
import Clock from '@/components/FlipClock'
import SideCollapse from "@/components/SideCollapse";
import BreadCrumb from "@/components/BreadCrumb"; //顶部面包屑导航
import UserDropdown from "@/components/UserDropdown";
import FullScreen from "@/components/FullScreen";

export default {
  components: {
    Clock,
    SideCollapse,
    BreadCrumb,
    UserDropdown,
    FullScreen,
  },
  methods: {
   
    toggleMsgShow() {
      // this.$refs.audio.currentTime = 0; //从头开始播放提示音
      // this.$refs.audio.play(); //播放
      this.$store.commit("app/SET_MSGISOPEN");
    },
  },
};
</script>
<style lang="scss" scoped>
  .flexC{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .myTime{
    font-size: 20px;
    margin-left: auto;
    margin-right: 30px;
    display: flex;
    align-items: center;
  }
  .myText{
    font-size:14px;
    color: #606266;
  }
 
</style>
