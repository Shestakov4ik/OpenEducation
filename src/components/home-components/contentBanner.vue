<template>
  <div id="banner">
    <div id="text">
      <h1 id="title">Кому подойдет <span id="openEdu">OpenEdu</span></h1>
      <p id="description"><span id="openEduMini">OpenEdu</span>
        подойдет всем, кто хочет за короткий срок
        качественно изменить свою жизнь, освоив специальность.</p>
      <button id="try">Попробовать бесплатно</button>
    </div>
    <div id="blocks-container">
      <div class="block" v-for="(block, index) in blocks" :key="index">
        <img :src="block.image" alt="Block Image" class="block-image">
        <h3 class="block-title">{{ block.title }}</h3>
        <p class="block-description">{{ block.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import presentationImage from '@/assets/banner-blocks/presentation.svg';
import graduationcupImage from '@/assets/banner-blocks/graduationcup.svg';
import briefcaseImage from '@/assets/banner-blocks/briefcase.svg';
import shipImage from '@/assets/banner-blocks/ship.svg';

export default {
  name: "BannerWithBlocks",
  data() {
    return {
      blocks: [
        {
          image: presentationImage,
          title: "Школьникам",
          description: "Которые увлекаются программированием и информационными технологиями"
        },
        {
          image: graduationcupImage,
          title: "Студентам",
          description: "Для более глубокого изучения предмета или приобретения дополнительных навыков"
        },
        {
          image: briefcaseImage,
          title: "Взрослым",
          description: "Которые хотят сменить профессию и влиться в IT-индустрию"
        },
        {
          image: shipImage,
          title: "IT-специалистам",
          description: "Для расширения своих навыков и повышения компетентности"
        }
      ]
    };
  }
}

</script>

<style scoped>
#banner {
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 50px 0;
}

#text {
  padding-bottom: 58px;
  flex: 1;
  align-items: flex-start;
}

#blocks-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-left: 40px;


}

.block {
  width: 456px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 40px;
  box-sizing: border-box;
  font-family: 'Gilroy-Light', sans-serif;
}
.block:nth-child(2n+1) {
  margin-right: 20px;
}


.block-image {
  width: 60px;
  height: 60px;
  object-fit: contain;

}


.block-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
  font-family: Gilroy-Bold;
  font-weight: bold;
}

.block-description {
  font-size: 16px;
  font-weight: 500;
}

h1 {
  color: black;
  font-size: 46px;
  font-family: 'Gilroy-ExtraBold', sans-serif;
  font-weight: 900;
  margin-top: 0px;
  margin-bottom: 0px;
}

#openEdu {
  color: #007BFF;
}

p {
  color: #828282;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 56px;
}

#try {
  width: 268px;
  height: 60px;
  background-color: #78258D;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 600;
  cursor: pointer;
}
</style>
