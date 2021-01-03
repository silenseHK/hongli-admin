<template>
  <div>
    <ul class="details">
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">期数:</h5>
          <p class="details-list-item-right">{{ Details.number }}</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">开奖号码:</h5>
          <p class="details-list-item-right">
            {{ Details.prize_number }}
          </p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">中奖状态:</h5>
          <p class="details-list-item-right">
            {{ Details.status === 0 ? "未开奖" : "已开奖" }}
          </p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">开奖时间:</h5>
          <p class="details-list-item-right">
            {{ Details.prize_time | formatDate }}
          </p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">结束时间:</h5>
          <p class="details-list-item-right">
            {{ Details.end_time | formatDate }}
          </p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">结束时间:</h5>
          <p class="details-list-item-right" v-if="Details.type === 1">赢</p>
          <p class="details-list-item-right" v-else-if="Details.type === 2">
            输
          </p>
          <p class="details-list-item-right" v-else>平</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">投注总金额:</h5>
          <p class="details-list-item-right">{{ Details.b_money }}</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">用户输:</h5>
          <p class="details-list-item-right">{{ Details.lostmoney }}</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text">平台赢:</h5>
          <p class="details-list-item-right">{{ Details.pt_money }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Details: {
      type: Object,
    },
  },
  name: "detailsItems",
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
.details-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 30px;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  &-text {
    font-size: 16px;
    font-weight: bold;
    color: #2cc747;
  }
  &-right {
    font-size: 15px;
    font-weight: bold;
  }
}
</style>