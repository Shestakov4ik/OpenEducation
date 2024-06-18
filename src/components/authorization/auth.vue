<template>
  <div class="auth-modal">
    <div v-if="check===true" class="auth-container">
      <form ref="form" @submit.prevent="sendEmail">
        <h1 class="auth-title">Вход в кабинет</h1>
        <p class="auth-description">На указанную почту придёт СМС с кодом подтверждения</p>
        <label class="auth-label">Электронная почта</label>
        <input v-model="email" type="email"
               name="email"
               class="auth-input"
               @input="activeBtn"
               placeholder="example@mail.com">
        <input v-model="code" type="number" name="code" style="display: none;">
        <div class="btn">
          <button id="authBtn" class="deactive-btn" type="submit" @click="submit">Продолжить</button>
          <button class="active-btn" @click="close">Закрыть</button>
        </div>
      </form>
    </div>
    <div v-else class="verification-modal">
      <div class="verification-container">
        <h1 class="verification-title">Введите код</h1>
        <p class="verification-description">Код отправлен на вашу почту {{ email }}</p>
        <button class="verification-change" @click="changeNumber">Изменить</button>
        <div class="pin-inputs">
          <input v-model="pin1" ref="pin1" class="pin-input" maxlength="1" @input="focusNext($event, 1)">
          <input v-model="pin2" ref="pin2" class="pin-input" maxlength="1" @input="focusNext($event, 2)">
          <input v-model="pin3" ref="pin3" class="pin-input" maxlength="1" @input="focusNext($event, 3)">
          <input v-model="pin4" ref="pin4" class="pin-input" maxlength="1" @input="submitt">
        </div>
        <button class="resend-sms" @click="confirm">Подтвердить</button>
      </div>
    </div>
  </div>
</template>


<script>
import emailjs from '@emailjs/browser';
import supabase from '@/supabase.js';


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
      check: true,
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      allPin: null,
      userId: null

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
        this.check = false



      } else {
        alert("Введите email!")
      }

    },
    close() {
      this.$emit('close');
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    },
    activeBtn(){
      document.querySelector('#authBtn').classList.remove('deactive-btn');
      document.querySelector('#authBtn').classList.add('active-btn');
    },
    focusNext(event, index) {
      const inputLength = event.target.value.length;
      if (inputLength === 1 && index < 4) {
        this.$refs[`pin${index + 1}`].focus();
      }
    },
    submitt() {
      this.allPin = Number(this.pin1 + this.pin2 + this.pin3 + this.pin4);
      console.log('Submitted PIN:', this.allPin);

    },
    async confirm() {
      if (this.code === this.allPin) {
        console.log("WORKED")
        this.$emit('auth', true)
        this.$emit('close');



        const {data: user, error: checkError} = await supabase
            .from('users')
            .select('id')
            .eq('email', this.email)
            .single();

        if (checkError) {
          console.error('Error checking email:', checkError);
        } else if (user) {
          this.userId = user.id;
          console.log('User ID:', this.userId);
        } else {

          const { data: insertData, error: insertError } = await supabase
              .from('users')
              .insert({ email: this.email }) // Добавляем пользователя с указанным email

          const {data: userIn} = await supabase
              .from('users')
              .select('id')
              .eq('email', this.email)
              .single();


          if (insertError) {
            console.error('Error inserting email:', insertError);
          } else {
            this.userId = userIn.id;
            console.log('New User ID:', this.userId);
          }

        }

        this.$emit('userId', this.userId);
      }
      else
        {
          alert("Коды не совпадают!")
        }
      }
    ,
      changeNumber()
      {
        this.check = true
      }
    ,
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
  font-family: 'Gilroy-Light', sans-serif;
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
  font-family: Gilroy-Light, sans-serif;
}

.btn{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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
  z-index: 1001;
  letter-spacing: 0.5px;
  font-family: Gilroy-Light;
}

.verification-container {
  background: white;
  padding: 40px;

  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Gilroy-Light, sans-serif;
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
  margin-bottom: 20px;
  cursor: pointer;
  border: none;
  font-family: 'Gilroy-Light';
}
</style>
