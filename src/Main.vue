<template>
  <div>
    <Header @change-page="PageChange"/>
    <router-view/>
    <Auth v-if="authOpened" @close="closeAuth" />
    <Footer class="footer"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import router from './router.js';

import Header from './components/other-components/Header.vue';
import Footer from './components/other-components/Footer.vue';
import Auth from './components/authorization/auth.vue';
import Verification from './components/authorization/verification.vue';

export default {
  components: {
    Header,
    Footer,
    Auth,
    Verification
  },
  setup() {
    const authOpened = ref(false);
    const verOpened = ref(false);

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
</style>
