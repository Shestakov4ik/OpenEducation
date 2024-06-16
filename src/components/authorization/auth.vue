<template>
  <div class="auth-modal">
    <div class="auth-container">
      <h1 class="auth-title">Вход в кабинет</h1>
      <p class="auth-description">На указанную почту придёт СМС с кодом подтверждения</p>
      <label class="auth-label">Электронная почта</label>
      <input v-model="email" class="auth-input" placeholder="example@mail.com">
      <button class="auth-button" @click="submit">Продолжить</button>
      <button class="auth-close" @click="close">Закрыть</button>
    </div>
  </div>
</template>

//align-self: flex-end;

<script>
import axios from "axios";
export default {
  components: {
    axios,
  },
  data() {
    return {
      email: 'tiurinad2003@mail.ru',
    };
  },
  methods: {
    submit() {
      axios.get(`http://shestaqs.beget.tech/apimail.php?email=${this.email}.com&code=4321`)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            console.log('Запрос выполнен')
          });
    },
    close() {
      this.$emit('close');
      this.$router.back();
    }
  },
};
</script>


<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  letter-spacing: 0.5px;
  font-family: Gilroy-Light;
}

.auth-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.auth-title {
  font-size: 46px;
  margin-bottom: 15px;
  font-family: 'Gilroy-ExtraBold';
}

.auth-description {
  font-size: 16px;
  margin-bottom: 40px;
  font-family: 'Gilroy-Light';
}

.auth-label {
  font-size: 15px;
  margin-bottom: 8px;
  font-family: 'Gilroy-Light';
}

.auth-input {
  width: 100%;
  height: 60px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 40px;
  box-sizing: border-box;
  font-family: Gilroy-Light;
}

.auth-button {
  width: 100%;
  height: 60px;
  background-color: #78258D;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Gilroy-Light';
}

.auth-close {
  width: 100%;
  height: 60px;
  background-color: #ccc;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: Gilroy-Light;
}
</style>
