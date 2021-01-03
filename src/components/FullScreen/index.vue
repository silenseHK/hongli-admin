<template>
  <div>
    <i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    toggleFull() {
      if (!screenfull.enabled) {
        this.$message({
          type: 'warning',
          message: '不支持全屏'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>
