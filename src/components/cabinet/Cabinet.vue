<template>
  <div class="wrapper">
    <Menu/>

    <router-view  :id="courseid" @openLess="open"/>

  </div>
</template>

<script >
import Menu from '@/components/cabinet/cab-menu.vue'
import LEss from '@/components/cabinet/lessons.vue'
import router from "@/router.js";


  export default {
    name:'cabinet',
    components: {
      Menu,
      LEss
    },
    props: {
      userId: Number
    },
    data() {
      return {
        courseid: null
      }
    },
    methods:{
      open(id){
        this.courseid=id
        if (this.courseid!==null){
          router.push("/cabinet/lessons")
        }
        else{
          console.log("Error ska")
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
