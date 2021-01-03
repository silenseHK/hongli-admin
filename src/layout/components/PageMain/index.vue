<template>
  <div class="pageMain">
    <!-- 取消了div标签 -->
    <transition name="fade-page" mode="out-in">
      <keep-alive>
        <router-view v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {};
</script>
