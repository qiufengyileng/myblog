<template>
   <article >
    <h1 id="title">{{articleData.title}}</h1>
    <div v-for="paragraph in articleData.paragraphs" :id="paragraph.id" :key="paragraph.id">
      <h2>{{paragraph.subtitle}}</h2>
      <section>
      {{paragraph.content}}
    </section>
    </div>
</article>
</template>

<script>
export default {
  name: 'articlePage',
  props: {
    articleData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    console.log('articlePage', this.articleData)
  }
}
</script>

<style scoped>
article {
  padding: 2vw 4vw;
  background-color: #dcf1a2;
  border-radius: 0.5vw;
  font: 1em '宋体';

}
#title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1em;
}
section {
  margin: 1em 0;
  text-indent: 2em;
}
</style>
