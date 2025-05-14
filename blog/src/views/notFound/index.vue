<template>
  <div class="container">
    <h2>这里暂时还是一片空白!!!</h2>
    <router-link to="/blog" id="goBack">
      返回首页
    </router-link>
  </div>
</template>

<script>

export default {
  name: '404Page'
}
</script>

<style scoped>
* {
  text-decoration: none;
  color: inherit;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  color: #000;
  text-align: center;
}

#goBack {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  outline: 1px solid #ffffff;
  transition: all .5s;
  text-decoration: none;
  font-size: 16px;
}
</style>
