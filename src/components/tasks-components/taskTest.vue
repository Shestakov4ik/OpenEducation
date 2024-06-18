<template>
  <div class="wrapper">
    <div class="test-container">
      <div class="back">
        <img class="cursor-pointer" src="../../assets/close.svg" alt="" @click="this.$emit('closeTest', 2)">
      </div>
      <!-- Название теста -->
      <div class="test-header">
        <h1>{{ taskName }}</h1>
      </div>

      <!-- Вопросы теста -->
      <div v-if="!isTestCompleted" class="question-section">
        <!-- Номер вопроса -->
        <div class="question-number">
          Вопрос {{ currentQuestionIndex + 1 }} из {{ totalQuestions }}
        </div>

        <!-- Текст вопроса -->
        <div class="question-text">
          {{ currentQuestion.name }}
        </div>

        <!-- Варианты ответа -->
        <div class="answer-options">
          <button @click="selectAnswer(true)" :disabled="answerSelected" id="answer-opt-true">Правда</button>
          <button @click="selectAnswer(false)" :disabled="answerSelected" id="answer-opt-false">Ложь</button>
        </div>

        <!-- Кнопка "Ответить" или "Далее" -->
        <div class="answer-btn">
          <div v-if="!answerSelected">
            <button @click="checkAnswer" :disabled="!isAnswerSelected">Ответить</button>
          </div>
          <div v-else>
            <button @click="nextQuestion">Далее</button>
          </div>
        </div>


        <!-- Обратная связь -->
        <div v-if="feedback" class="feedback" :class="{ incorrect: !isCorrectAnswer }">
          {{ feedback }}
        </div>
      </div>

      <!-- Теги -->
      <div class="tags">
        <div class="type">Задание</div>
        <div class="direction">Мобильная разработка</div>
        <div class="tariff">Базовый</div>
      </div>

      <!-- Результат теста -->
      <div v-if="isTestCompleted" class="test-result">
        <h2>{{ resultMessage }}</h2>
      </div>
    </div>
  </div>

</template>

<script>
import supabase from '@/supabase.js';

export default {
  name: 'TaskTest',
  props: {
    id: Number
  },
  data() {
    return {
      taskName: '',
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answerSelected: false,
      correctAnswers: 0,
      feedback: '',
      isCorrectAnswer: false,
      isTestCompleted: false
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {};
    },
    totalQuestions() {
      return this.questions.length;
    },
    isAnswerSelected() {
      return this.selectedAnswer !== null;
    },
    resultMessage() {
      const correctPercentage = (this.correctAnswers / this.totalQuestions) * 100;
      return correctPercentage >= 80 ? 'Сдал!' : 'Повторите теорию прежде чем попробовать снова';
    }
  },
  async created() {
    await this.fetchTaskData();
    await this.fetchQuestions();
  },
  methods: {
    async fetchTaskData() {
      console.log(this.id)
      try {
        const { data, error } = await supabase
            .from('tasks')
            .select('name')
            .eq('id', this.id)
            .single();
        if (error) throw error;
        this.taskName = data.name;
      } catch (error) {
        console.error('Ошибка при загрузке данных задания:', error.message);
      }
    },
    async fetchQuestions() {
      try {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('id_task', this.id);
        if (error) throw error;
        this.questions = data;
      } catch (error) {
        console.error('Ошибка при загрузке вопросов:', error.message);
      }
    },
    selectAnswer(answer) {
      this.selectedAnswer = answer;
      let trueBtn = document.querySelector('#answer-opt-true')
      let falseBtn = document.querySelector('#answer-opt-false')
      if (answer) {
        trueBtn.classList.add('option-active')
        falseBtn.classList.remove('option-active')
      }
      else {
        trueBtn.classList.remove('option-active')
        falseBtn.classList.add('option-active')
      }
    },
    checkAnswer() {
      const correctAnswer = this.currentQuestion.answer;
      this.isCorrectAnswer = this.selectedAnswer === correctAnswer;

      if (this.isCorrectAnswer) {
        this.correctAnswers += 1;
        this.feedback = 'Верно!';
      } else {
        this.feedback = `Неверно! ${this.currentQuestion.explanation}`;
      }
      this.answerSelected = true;
    },
    nextQuestion() {
      this.feedback = '';
      this.answerSelected = false;
      this.selectedAnswer = null;
      if (this.currentQuestionIndex < this.totalQuestions - 1) {
        this.currentQuestionIndex += 1;
      } else {
        this.isTestCompleted = true;
      }
      document.querySelector('#answer-opt-true').classList.remove('option-active')
      document.querySelector('#answer-opt-false').classList.remove('option-active')
    }
  }
};
</script>

<style scoped>

.cursor-pointer {
  cursor: pointer;
}
.test-container {
  font-family: Gilroy, sans-serif;
  display: flex;
  flex-direction: column;
}

.test-header h1 {
  font-size: 46px;
  font-weight: 900;
}

.question-section {
  border-radius: 20px;
  background-color: #EEEDF2;
  padding: 50px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.question-number {
  font-size: 32px;
  font-weight: 900;
}

.question-text {
  font-size: 18px;
  font-weight: 500;
}

.answer-options {
  display: flex;
  gap: 10px;
}

.answer-options button {
  font-family: Gilroy, sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #78258D;
  line-height: 18px;
  width: 110px;
  height: 30px;
  padding: 0 10px;
  cursor: pointer;
  border: 2px solid #78258D;
  border-radius: 8px;
  background-color: inherit;
  transition: all ease 0.2s;
}
.answer-options button:hover,
.answer-options button:active,
.option-active {
  background-color: #78258d !important;
  color: white !important;
}

.answer-btn button {
  font-family: Gilroy, sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: white;
  line-height: 18px;
  width: 230px;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  border: 2px solid #78258D;
  border-radius: 8px;
  background-color: #78258d;
  transition: all ease 0.2s;
}
.answer-btn button:hover,
.answer-btn button:active {
  background-color: #78258d75;
  border-color: #78258D00;
}

.tags {
  display: flex;
  gap: 30px;
  margin: 30px 0;
}
.tags div {
  border-radius: 8px;
  padding: 5px 20px;
  font-family: Gilroy, sans-serif;
  font-weight: 500;
  font-size: 18px;
}
.tags .type {
  background-color: #EEEDF2;
  color: black;
}
.tags .direction {
  background-color: #0007;
  color: #EEEDF2;
}
.tags .tariff {
  background-color: #2E90D1;
  color: white;
}

.feedback {
  font-size: 18px;
  margin-bottom: 20px;
  color: #007BFF;
}

.feedback.incorrect {
  color: red;
}

.test-result h2 {
  font-size: 32px;
  color: green;
}
</style>
