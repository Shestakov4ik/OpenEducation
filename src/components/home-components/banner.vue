<template>
  <div id="try-free">
    <div id="text-container">
      <h1 id="openedu">Open Education</h1>
      <h2 id="title">Онлайн-курсы для айтишников</h2>
      <p id="description">Достигайте своих целей с помощью доступных и интересных курсов</p>
      <button id="try">Попробовать бесплатно</button>
    </div>
    <img src="@/assets/men-num1.svg" alt="Men1" id="men-num1">
  </div>
</template>

<script>

</script>

<style scoped>
#try-free {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

#text-container {
  padding-top: 58px;
  padding-bottom: 58px;
  flex: 1;
}

h1 {
  color: #2E90D1;
  font-size: 18px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 600;
  margin-bottom: 15px;
}

h2 {
  color: #232323;
  font-family: 'Gilroy-ExtraBold', sans-serif;
  font-weight: 900;
  font-size: 60px;
  margin-bottom: 20px;
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

#men-num1 {
  width: 701px;
  height: 500px;
}
</style>
