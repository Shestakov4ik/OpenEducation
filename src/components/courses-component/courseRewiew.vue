<template>
  <div class="reviews-container">
    <h2>Отзывы о курсе</h2>
    <div class="reviews-wrapper">
      <div class="arrow left" @click="prevPage" :class="{ disabled: currentPage === 0 }">&#9664;</div>
      <div class="reviews">
        <div class="review" v-for="(review, index) in paginatedReviews" :key="index">
          <div class="review-header">
            <span class="username">{{ review.username }}</span>
            <span class="rating">
              <span v-for="star in 5" :key="star" :class="{'filled': star <= review.rating}">&#9733;</span>
            </span>
          </div>
          <div class="review-body">{{ review.body }}</div>
        </div>
      </div>
      <div class="arrow right" @click="nextPage" :class="{ disabled: isLastPage }">&#9654;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseReview',
  props: {
    reviews: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 0,
      reviewsPerPage: 2
    };
  },
  computed: {
    paginatedReviews() {
      const start = this.currentPage * this.reviewsPerPage;
      return this.reviews.slice(start, start + this.reviewsPerPage);
    },
    isLastPage() {
      return (this.currentPage + 1) * this.reviewsPerPage >= this.reviews.length;
    }
  },
  methods: {
    nextPage() {
      if (!this.isLastPage) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
      }
    }
  }
};
</script>

<style scoped>
.reviews-container {
  box-sizing: border-box;
}

h2 {
  font-size: 32px;
  font-family: Gilroy-ExtraBold, sans-serif;
  margin-bottom: 32px;
}

.reviews-wrapper {
  display: flex;
  align-items: center;
}

.arrow {
  cursor: pointer;
  font-size: 24px;
  color: #888;
  padding: 0 10px;
  user-select: none;
}

.arrow.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.reviews {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

}

.review {
  padding: 20px 20px;
  margin-bottom: 10px;

  box-sizing: border-box;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.username {
  font-size: 20px;
  font-family: Gilroy-Light, sans-serif;
  margin-right: 20px;
}

.rating {
  font-size: 20px;
  color: #78766b;
}

.rating .filled {
  color: #8E49A0;
}

.review-body {
  margin-top: 20px;
  font-size: 16px;
  font-family: Gilroy-Light, sans-serif;
  letter-spacing: 0.5px;
}
</style>
