<template>
  <div ref="myCharts" :style="{ width: width, height: height }"></div>
</template>

<script>
import getDay from "@/utils/getDay.js";
import echarts from "echarts";
import resize from "@/mixins/resize";
require("echarts/theme/macarons");
import { getBarGame } from "@/api/dashboard";
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
    pieCharts: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mycharts: null,
      formDataTime: [],
      dataList: [],
    };
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
    ];
    getBarGame().then((res) => {
      this.dataList = res.data;
    });
  },
  watch: {
    pieCharts: {
      deep: true,
      handler(val) {
        this._setOption(val.datas);
      },
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts();
    });
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.myCharts, "macarons");
      if (Object.keys(this.pieCharts).length > 0) {
        this._setOption(this.pieCharts.datas);
      }
    },
    _setOption(datas) {
      this.mycharts.setOption({
        title: {
          text: "7日用户下注总额",
          left: "16",
        },
        legend: {
          data: ["一级", "二级", "三级"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "20",
          right: "20",
          bottom: "3",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.formDataTime,
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: "bar",
            name: "总额",
            data: datas || this.dataList,
          },
        ],
      });
    },
  },
};
</script>
