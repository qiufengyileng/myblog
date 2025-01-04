<template>
  <div class="article-footer">
    <h3>相关文章</h3>
    <ul class="related-articles">
      <li v-for="article in articles" :key="article.id">
        <a href="#" @click="loadArticle(article.id,article.title,$event)">{{ article.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RelatedArticles',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  methods: {
    loadArticle (id, title, event) {
      event.preventDefault() // 阻止浏览器默认行为,以避免url后面加上#号
      const fullPath = `/article?id=${id}&name=${title}`
      // 完整路径
      window.open(fullPath, '_blank').focus()
    }
  }
}
</script>

<style scoped>
.article-footer {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.related-articles {
  list-style-type: none;
  padding: 0;
}

.related-articles li {
  margin-bottom: 10px;
}

.related-articles a {
  color: #0066cc;
  text-decoration: none;
}

.related-articles a:hover {
  text-decoration: underline;
}
</style>
