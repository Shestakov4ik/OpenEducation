<template>
  <div class="wrapper">
    <Menu/>
    <router-view :id="userId"/>
  </div>
</template>

<script >
import Menu from '@/components/cabinet/cab-menu.vue'


  export default {
    name:'cabinet',
    components: {
      Menu
    },
    props: {
      userId: Number
    },
    data() {
      return {
        userid: null
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
