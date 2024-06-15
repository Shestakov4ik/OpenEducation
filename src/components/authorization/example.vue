<template>
  <div class="auth-modal">
    <div class="auth-container">
      <h1 class="auth-title">Вход в кабинет</h1>
      <p class="auth-description">На указанный номер придёт СМС с кодом подтверждения</p>
      <label class="auth-label">Телефон</label>
      <input v-model="phone" class="auth-input" v-mask="'+7 (###) ###-##-##'" placeholder="+7 (___) ___-__-__">
      <button class="auth-button" @click="submit">Продолжить</button>
      <button class="auth-close" @click="close">Закрыть</button>
    </div>
  </div>
</template>

//align-self: flex-end;

<script>
export default {
  data() {
    return {
      phone: '',
    };
  },
  methods: {
    async submit() {
      const formattedPhone = this.phone.replace(/\D/g, '');
      console.log('Formatted Phone:', formattedPhone);

      if (formattedPhone.length === 11) {
        const username = 'shestakov4ij@mail.ru';
        const password = 'y7Vi-PDb2uENSJPtaz0Gv7NYVPkQKb2M';
        const sign = 'SMS Aero';
        const message = 'Ваш код подтверждения: 1234';

        const url = `https://gate.smsaero.ru/v2/sms/send?number=${formattedPhone}&text=${message}&sign=${sign}&channel=DIRECT`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('HTTP Response Status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('HTTP Error Response Text:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response Data:', data);

        if (data.success) {
          alert('СМС с кодом подтверждения отправлено!');
        } else {
          console.error('Ошибка при отправке СМС:', data.message);
          alert('Произошла ошибка при отправке СМС. Пожалуйста, попробуйте еще раз.');
        }
      } else {
        alert('Пожалуйста, введите корректный номер телефона.');
      }
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
