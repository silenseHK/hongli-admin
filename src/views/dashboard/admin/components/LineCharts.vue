<template>
  <div class="lineCharts" :style="{ width: width, height: height }" ref="myCharts"></div>
</template>

<script>
import getDay from "@/utils/getDay.js";
import echarts from "echarts";
import resize from "@/mixins/resize";
require("echarts/theme/macarons");
// import { getLineData } from '@/api/dashboard'
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    lineChartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mycharts: null,
      formDataTime: [],
    };
  },
  watch: {
    lineChartData: {
      deep: true,
      handler(val) {
        this._setOption(val.inPrice);
      },
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts();
    });
  },
  created() {
    this.formDataTime = [
      getDay(-6),
      getDay(-5),
      getDay(-4),
      getDay(-3),
      getDay(-2),
      getDay(-1),
      getDay(-0),
      "",
    ];
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.myCharts, "macarons");
      if (Object.keys(this.lineChartData).length > 0) {
        this._setOption(this.lineChartData.inPrice);
      }
    },
    _setOption(inprice = []) {
      this.mycharts.setOption({
        title: {
          text: "7日会员增涨",
          left: "16",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              background: "#6a7985",
            },
          },
        },
        legend: {
          data: ["数量"],
        },
        grid: {
          left: "20",
          right: "20",
          bottom: "3",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.formDataTime,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "line",
            // areaStyle: {
            //   color: '#f4516c',
            //   opacity: 0.3
            // },
            itemStyle: {
              color: "#f4516c",
            },
            lineStyle: {
              color: "#f4516c",
            },
            smooth: true,
            data: inprice,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>
<style></style>
