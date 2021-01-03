<template>
  <div></div>
</template>

<script>
export default {
  name: "types",
  data: () => ({}),
  created() {
    console.log("types");
    this.$router.push({
      path: "/activity/index",
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>