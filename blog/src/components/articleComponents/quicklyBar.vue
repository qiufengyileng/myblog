<template>
  <nav class="quick-nav">
    <h3 class="quick-nav-title">快速导航</h3>
    <ul class="quick-nav-list">
      <li class="quick-nav-item" @click="scrollToTop" style="cursor: pointer;">返回顶部</li>
      <li v-for="(section, index) in sections" :key="index" class="quick-nav-item">
        <a href="javascript:void(0)" @click="scrollToSection(`${index+1}`)" style="cursor: pointer;
        text-decoration: none;
        color: inherit;
        ">{{ section }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'QuickNavigation',
  data () {
    return {
      sections: [], // h2标题
      title: ''
    }
  },
  mounted () {
    // window.onload = this.getSections
    this.$nextTick(() => {
      this.sections = this.getSections()
      this.title = document.querySelector('#title').textContent
      // console.log(this.sections)
    })
    // 等待dom结点被渲染猴读取，再执行
  },
  methods: {
    getSections () {
      const headings = document.querySelector('article').querySelectorAll('h2')
      console.log('heading', headings)
      return Array.from(headings).map(h => h.textContent)
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollToSection (sectionId) {
      // console.log(this.sections)
      const element = document.getElementById(sectionId)
      const height = document.body.scrollHeight
      console.log('height', height)
      console.log('off', element.offsetTop)
      if (element) {
        const offset = 65 // 距离视口顶部的距离
        const yPosition = element.offsetTop - offset
        if (height - element.offsetTop <= element.offsetTop - 65) {
          element.scrollIntoView({ behavior: 'smooth' })
          return
        }
        console.log(yPosition)
        window.scrollTo({ top: yPosition, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.quick-nav {
  position: sticky;
  /*
  position: sticky; 是 CSS 中的一种定位方式，它结合了
   position: relative; 和 position: fixed; 的特性
  。当元素滚动到特定位置时，它会“粘”在视口的某个位置，直到其父元素不再包含它为止。
  */
  top: 20px;
  /* background-color: #f8f8f8; */
  padding: 15px;
  border-radius: 8px;
  max-width: 250px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.quick-nav-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color:inherit;
}

.quick-nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.quick-nav-item {
  margin-bottom: 8px;
}

.quick-nav-item a {
  color: #0066cc;
  text-decoration: none;
  font-size: 0.9rem;
}

.quick-nav-item a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .quick-nav {
    position: static;
    max-width: 100%;
    margin-bottom: 20px;
  }
}
</style>
