<template>
  <div class="verification-modal" v-show="visible">
    <div class="verification-container">
      <h1 class="verification-title">Введите код</h1>
      <p class="verification-description">Отправлено СМС на номер {{ phone }}</p>
      <button class="verification-change" @click="changeNumber">Изменить</button>
      <div class="pin-inputs">
        <input v-model="pin1" class="pin-input" maxlength="1" @input="focusNext($event, 1)">
        <input v-model="pin2" class="pin-input" maxlength="1" @input="focusNext($event, 2)">
        <input v-model="pin3" class="pin-input" maxlength="1" @input="focusNext($event, 3)">
        <input v-model="pin4" class="pin-input" maxlength="1" @input="submit">
      </div>
      <button class="resend-sms" @click="resendSMS">Отправить СМС еще раз</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phone: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: ''
    };
  },
  methods: {
    focusNext(event, index) {
      const inputLength = event.target.value.length;
      if (inputLength === 1 && index < 4) {
        this.$refs[`pin${index + 1}`].focus();
      }
    },
    submit() {
      const pin = this.pin1 + this.pin2 + this.pin3 + this.pin4;
      console.log('Submitted PIN:', pin);

    },
    resendSMS() {

      alert('СМС с кодом подтверждения отправлено!');
    },
    changeNumber() {
      this.$emit('change-number');
    }
  }
};
</script>

<style scoped>
.verification-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Установим значение z-index повыше, чем у компонента Auth */
  letter-spacing: 0.5px;
  font-family: Gilroy-Light;
}

.verification-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.verification-title {
  font-size: 46px;
  margin-bottom: 15px;
  font-family: 'Gilroy-ExtraBold';
}

.verification-description {
  font-size: 16px;
  margin-bottom: 20px;
  font-family: 'Gilroy-Light';
}

.pin-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.pin-input {
  width: calc(25% - 10px);
  height: 60px;
  padding: 0 10px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: center;
  font-family: Gilroy-Light;
}

.resend-sms {
  width: 100%;
  height: 60px;
  background-color: #78258D;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-family: 'Gilroy-Light';
}

.verification-change {
  font-size: 16px;
  color: #78258D;
  cursor: pointer;
  font-family: 'Gilroy-Light';
}
</style>
