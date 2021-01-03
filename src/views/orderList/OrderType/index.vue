<template>
  <div>orderType</div>
</template>

<script>
export default {
  name: "orderType",
  data: () => ({}),
  created() {
    this.$router.push({
      path: "/activity/order-list",
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>