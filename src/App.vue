<template>
  <div id="app">
    <router-view></router-view>

    <!-- 消息提示音 -->
    <audio
      webkit-playsinline="true"
      playsinline="true"
      controls="controls"
      hidden
      src="./assets/mp3/11299.mp3"
      ref="audio"
    ></audio>
  </div>
</template>

<script>
import baseUrl from './utils/baseUrl'
export default {
  name: "app",
  data() {
    return {
      totls: 0,
      time: 0,
    };
  },

  mounted() {
    this.setupStream();
    // this.$refs.audio.play();
    // const h = this.$createElement;
    // this.$notify({
    //   title: "消息提示",
    //   message: h(
    //     "a",
    //     {
    //       on: {
    //         click: this.onClick,
    //       },
    //     },
    //     "你有新的充值消息未审核，请及时审核"
    //   ),
    // });
  },
  methods: {
    /**
     * 点击通知消息进行路由跳转
     */
    onClick() {
      this.$router.push({
        name: "/withdraw/list",
      });
    },
    /**
     * 1. 定时刷新后台数据
     * 2. 后台数据又未审核的弹出提示及提示音
     */
    setupStream() {
      // Not a real URL, just using for demo purposes
      let es = new EventSource(
        baseUrl + '/withdrawal/auditnotice'
        // "https://api1.999666.in/admin/withdrawal/auditnotice"
        // "https://api1.unicasino.in/admin/withdrawal/auditnotice"
        // "https://api1.huanqiu008.xyz/admin/withdrawal/auditnotice"
      );
      es.addEventListener(
        "message",
        (event) => {
          let data = JSON.parse(event.data);
          if (data.create_time > this.time && this.time !== 0) {
            this.time = data.create_time;
            this.time = data.create_time;
            this.$refs.audio.play(); //播放
            const h = this.$createElement;
            this.instance = this.$notify({
              title: "消息提示",
              message: h(
                "a",
                {
                  on: {
                    click: this.onClick,
                  },
                },
                "你有新的提现订单未审核，请及时审核"
              ),
            });
          } else {
            this.time = data.create_time;
          }
        },
        false
      );

      es.addEventListener(
        "error",
        (event) => {
          if (event.readyState == EventSource.CLOSED) {
            console.log("Event was closed");
            console.log(EventSource);
          }
        },
        false
      );
    },
  },
};
</script>

<style>
  .w_fW{
    display: flex;
    flex-wrap: wrap;
  }
  .w230{
    width: 230px;
    margin-right: 30px;
  }
  .w450{
    width: 450px;
    margin-right: 30px;
  }
  .el-drawer__body{
    overflow-y: auto !important;
  }
  /*2.隐藏滚动条，太丑了*/

  .el-drawer__container ::-webkit-scrollbar{
    display: none;
  }
</style>
