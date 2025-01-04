<template>
  <div class="article-list">
    <div
      v-for="item in articles"
      :key="item.id+Math.random()"
      :class="{'article-card':true,'article-card-night':isNight}"
    >
      <h3 class="article-title">
        {{ item.title }}
        <span style="margin-left:1rem;">
          <span style="font-size: medium;">类型:</span>
          <span
            style="font-size: small;"
            v-for="(tag,index) in (' '+item.tags).split(',')"
            :key="index"
          >{{ tag }}</span>
        </span>
      </h3>
      <p>
        <span>作者:{{ item.author }}</span>
        <span style="margin-left:1rem;">{{item.publishedDate.match(/^\d{4}-\d{2}-\d{2}/)[0] }}</span>
      </p>
      <p class="article-excerpt" :style="{color:isNight?'#b0b0b0;':''}">{{ item.content }}</p>
      <div @click="$router.push(`article?id=${item.id}`)" class="Cardmark"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('setting', ['isNight'])
  }
}
</script>

<style scoped>
.article-card {
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(90, 88, 88, 0.1);
  transition: all 0.1s ease;
}
.article-card:hover {
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
}

.article-card-night {
  background-color: #2a2a2a;
  box-shadow: 0 1px 3px rgb(182, 180, 180);
}

.article-card-night:hover {
  box-shadow: 1 4px 6px rgb(182, 180, 180);
}

.article-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.article-excerpt {
  color: #666;
}

.Cardmark {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  background-color: transparent;
  height: 100%;
  width: 100%;
}
</style>
