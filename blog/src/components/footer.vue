<template>
  <footer class="footer">
    <div class="container">
      <p class="footer-text">© 2024 秋风易冷</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  width: calc(100vw - 17px);
  padding: 2rem 0;
  background-color: #f1f1f180;
}

.footer-text {
  text-align: center;
}

</style>
