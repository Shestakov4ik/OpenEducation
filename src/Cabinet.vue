<template>
  <div class="wrapper">
    <Menu/>
    <router-view/>
  </div>
</template>

<script >
import Menu from '@/components/cabinet/cab-menu.vue'
import Home from '@/components/cabinet/menu-home.vue'

  export default {
    name:'cabinet',
    components: {
      Menu,
      Home
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
