<template>
    <div>
        <Header></Header>
        <Timeline></Timeline>
</div>
</template>

<script>
import Header from '@/components/header'
import Timeline from '@/components/timeLine'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header,
    Timeline
  },
  computed: {
    ...mapGetters('guiDang', ['guidangData'])
  }
}
</script>

<style scoped>
/* @import '../../style/guiDang/main.css';
@import '../../style/guiDang/normalize.css'; */

/*
，使用 @import 语法确实会将样式集成到当前作用域中，但是它们的作用范围并不会局限于 scoped 样式的定义范围。
<style scoped> 主要用于在 HTML 中限制样式的应用范围，但 CSS 的 @import 并不会遵循这些限制
*/
/* -------------------------------------------- */

</style>
