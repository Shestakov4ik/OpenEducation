<template>
  <div v-if="this.Check">
    <Header class="header"
            :auth="auth"
            :userId="userId"
            @checK="check"
            @change-page="PageChange"/>
    <router-view :userId="userId" :checkReg="userId"/>
    <Auth v-if="authOpened"
          @close="closeAuth"
          @userId="UserId"
          @auth="logIn"/>
    <Footer   class="footer"/>
  </div>
  <div v-else class="cab">
    <router-view/>
  </div>
</template>

<script>
import { ref } from 'vue';
import router from './router.js';

import Header from './components/other-components/Header.vue';
import Footer from './components/other-components/Footer.vue';
import Auth from './components/authorization/auth.vue';
import CoursesInfo  from "@/components/course-info/CoursesInfo.vue";
import CourseBanner from "@/components/home-components/coursBanner.vue"

export default {
  components: {
    Header,
    Footer,
    Auth,
    CoursesInfo,
    CourseBanner,
  },
  data(){
    return{
      auth: false,
      Check:true,
      userId:null
    }
  },


  methods:{
    check(value){
      this.Check=value
    },
    logIn(auth){
      this.auth=auth
      console.log(this.auth)
    },
    UserId(id){
      this.userId=id
      console.log("MainUserId: ", this.userId)
      console.log("MainId: ", id)
    }
  },
  setup() {
    const authOpened = ref(false);
    const verOpened = ref(false);
    const infoOpened = ref(false);

    const PageChange = (page) => {
      if (page === 'auth') {
        authOpened.value = true;
      } else if (page === 'verification') {
        verOpened.value = true;
      } else{
        authOpened.value = false;
        router.push({name: page});
      }
    };

    const closeAuth = () => {
      authOpened.value = false;

    };

    return {
      authOpened,
      PageChange,
      closeAuth
    };


  }
};
</script>

<style scoped>

.footer {
  padding: 100px 240px;
}

.header{
  z-index: 900;
}
</style>
