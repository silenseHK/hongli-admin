<template>
  <div>
    <ul class="details">
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text w86">用户昵称:</h5>
          <p class="details-list-item-right">{{ userInfoData.nickname }}</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text w86">用户余额:</h5>
          <p class="details-list-item-right">{{ userInfoData.balance }}</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text w86">手机号:</h5>
          <p class="details-list-item-right">{{ userInfoData.phone }}</p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text w86">注册时间:</h5>
          <p class="details-list-item-right">
            {{ userInfoData.last_time | formatDate }}
          </p>
        </div>
      </li>
      <li class="details-list">
        <div class="details-list-item">
          <h5 class="details-list-item-text w86">邀请码:</h5>
          <p class="details-list-item-right">
            {{ userInfoData.code }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "userinfj",
  props: {
    userInfoData: {
      type: Object,
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
.w86{width: 120px;}
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