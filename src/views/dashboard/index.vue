  
<template>
  <div class="homeBox">
    <!-- <components :is="componentOn" /> -->
     <components is="userComponent" />
    <!-- <userComponent /> -->
  </div>
</template>

<script>
// import adminComponent from "./admin";
import userComponent from "./user";
// import { mapGetters } from "vuex";
export default {
  computed: {
    // ...mapGetters(["userName"]),
    // componentOn() {
    //   let roleId = localStorage.getItem("roleId");
    //   if (roleId == "1") {
    //     return "adminComponent";
    //   } else {
    //     return "userComponent";
    //   }
    // },
  },
  components: {
    // adminComponent,
    userComponent,
  },
};
</script>