<template>
  <div class="sideBar" id="domSideBar">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#3a3f51"
        text-color="#b5b6bd"
        active-text-color="rgb(79, 148, 212)"
        mode="vertical"
        :collapse-transition="false"
        :collapse="opened"
        @select="menuSelect"
      >
        <sidebar-item
          v-for="item in routes"
          :key="item.path"
          :item="item"
          :basePath="item.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SideBarItem";
import { mapGetters } from "vuex";
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["routes", "opened"]),
    // booleanOpen() {
    //   return this.opened === 'true' ? true : false
    // },
    activeMenu() {
      return this.$route.path;
    },
  },
  created(){
    // console.log('sideBar接收的roules--->',this.routes)
  },
  methods: {
    menuSelect(index, indexPath, item){
      this.addTab(item);
    },
    addTab(item){
      this.$store.commit('pageIndex/addTab', {name: item.$el.textContent, id: item.index})
    }
  }
};
</script>
