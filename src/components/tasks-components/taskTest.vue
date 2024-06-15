<template>
  <div class="test-container">
    <div class="back">
      <p class="close" @click="this.$emit('closeTest', 2)">Закрыть</p>
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
        <button @click="selectAnswer(true)" :disabled="answerSelected">Правда</button>
        <button @click="selectAnswer(false)" :disabled="answerSelected">Ложь</button>
      </div>

      <!-- Кнопка "Ответить" или "Далее" -->
      <div v-if="!answerSelected">
        <button @click="checkAnswer" :disabled="!isAnswerSelected">Ответить</button>
      </div>
      <div v-else>
        <button @click="nextQuestion">Далее</button>
      </div>

      <!-- Обратная связь -->
      <div v-if="feedback" class="feedback" :class="{ incorrect: !isCorrectAnswer }">
        {{ feedback }}
      </div>
    </div>

    <!-- Результат теста -->
    <div v-if="isTestCompleted" class="test-result">
      <h2>{{ resultMessage }}</h2>
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
    }
  }
};
</script>

<style scoped>
.close{
  font-family: Gilroy-Light, sans-serif;
  font-size: 20px;
  letter-spacing: 0.5px;
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
}
.test-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.test-header {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
}

.question-section {
  margin-top: 50px;
}

.question-number {
  font-size: 24px;
  margin-bottom: 10px;
}

.question-text {
  font-size: 20px;
  margin-bottom: 20px;
}

.answer-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.answer-options button {
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
}

.feedback {
  font-size: 18px;
  margin-bottom: 20px;
}

.feedback.incorrect {
  color: red;
}

.test-result h2 {
  font-size: 32px;
  color: green;
}
</style>
