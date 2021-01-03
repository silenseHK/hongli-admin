<template>
  <div>
    <slot name="child" :privilege="privilege"> </slot>
  </div>
</template>

<script>
export default {
  name: "privilege",
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>