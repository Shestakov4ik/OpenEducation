<template>
  <div>
    <h2>О курсе</h2>
    <pre>{{ description }}</pre>

  </div>
</template>

<script>
export default {
  name: 'courseDescription',
  props:{
    description: String,
  }
}
</script>


<style scoped>
h2{
  font-size: 32px;
  font-family: Gilroy-ExtraBold, sans-serif;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}
pre{
  font-size: 16px;
  font-family: Gilroy-Light, sans-serif;
  letter-spacing: 0.5px;
}
</style>