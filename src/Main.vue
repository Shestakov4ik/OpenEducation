<template>
  <div>
    <Header v-if="auth!==true" class="header" :auth="auth" @change-page="PageChange"/>
    <router-view/>
    <Auth v-if="authOpened" @close="closeAuth" @auth="logIn"/>
    <Footer v-if="auth!==true" class="footer"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import router from './router.js';

import Header from './components/other-components/Header.vue';
import Footer from './components/other-components/Footer.vue';
import Auth from './components/authorization/auth.vue';
import Verification from './components/authorization/verification.vue';
import CoursesInfo  from "@/components/course-info/CoursesInfo.vue";
import CourseBanner from "@/components/home-components/coursBanner.vue"

export default {
  components: {
    Header,
    Footer,
    Auth,
    Verification,
    CoursesInfo,
    CourseBanner,
  },
  data(){
    return{
      auth: false
    }
  },

  methods:{
    logIn(auth){
      this.auth=auth
      console.log(this.auth)
    }
  },
  setup() {
    const authOpened = ref(false);
    const verOpened = ref(false);
    const infoOpened = ref(false);

    const PageChange = (page) => {
      if (page === 'auth') {
        authOpened.value = true;
      } else if (page === 'cabinet') {
        verOpened.value = true;
      } else{
        authOpened.value = false;
        router.push({name: page});
      }
    };

    const closeAuth = () => {
      authOpened.value = false;
      router.back();
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
