<template>
  <div class="auth-modal">
    <div class="auth-container">
      <form ref="form" @submit.prevent="sendEmail">
        <h1 class="auth-title">Вход в кабинет</h1>
        <p class="auth-description">На указанную почту придёт СМС с кодом подтверждения</p>
        <label class="auth-label">Электронная почта</label>
        <input v-model="email" type="email" name="email" class="auth-input" placeholder="example@mail.com">
        <input v-model="code" type="number" name="code" style="display: none;">
        <button class="deactive-btn" type="submit" @click="submit">Продолжить</button>
        <button class="active-btn" @click="close">Закрыть</button>
      </form>
    </div>
  </div>
</template>


<script>
import emailjs from '@emailjs/browser';

export default {
  components: {
    emailjs,
  },
  data() {
    return {
      email: null,
      code: this.getRandomInt(1000, 9999),
      SERVICE_ID: 'service_h9thmof',
      TEMPLATE_ID: 'template_hnilla1',
      PUBLIC_KEY: 'wiKXGL1xjXwRni4xB',
    };
  },
  methods: {
    submit() {
      if (this.email!=null){
        emailjs
            .sendForm(this.SERVICE_ID, this.TEMPLATE_ID, this.$refs.form, {
              publicKey: this.PUBLIC_KEY,
            })
            .then(
                () => console.log('SUCCESS!'),
                (error) => console.log('FAILED...', error.text)
            );


      } else {
        alert("Введите email!")
      }

    },
    close() {
      this.$emit('close');
      this.$router.back();
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
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

.active-btn {
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

.deactive-btn {
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
