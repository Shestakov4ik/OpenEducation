<template>
  <div class="wrapper">
    <Menu  @change-page="PageChange"/>
    <router-view/>
  </div>
</template>

<script >
import Menu from '@/components/cabinet/cab-menu.vue'
import Header from "@/components/other-components/Header.vue";
import router from "@/router.js";


  export default {
    name:'cabinet',
    components: {
      Header,
      Menu
    },
    methods:{
      PageChange(page){
        switch(page){
          case "cabHome":
            router.push("/cabinet/cabHome");
            break;
          case "cabCourses":
            router.push("/cabinet/cabCourses");
            break;
          case "cabTasks":
            router.push("/cabinet/cabTasks");
            break;
        }
      }
    }
  }

</script>


<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(135deg, #F0E4ED 0%, #F1F7FB 100%);
}


</style>
