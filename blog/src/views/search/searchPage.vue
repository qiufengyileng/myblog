<template>
  <div>
    <header-component></header-component>
    <div class="blog-search" style="margin-top: 15vh;">
      <h1>博客文章搜索</h1>
      <div class="search-container">
        <input v-model.trim="searchQuery" @keyup.enter="search" type="text" placeholder="搜索文章...">
        <button class="search" @click="search"><i class="el-icon-search"
            style="margin-right: 5px;margin-left: -5px;"></i>搜索</button>
        <button class="moble-search" @click="search"><i class="el-icon-search"></i></button>
      </div>
      <h2 v-if="JSON.stringify(history) !== '[]'">搜索历史<i @click="delAllHistory" class="el-icon-delete"
          style="cursor: pointer;font-size: medium;"></i></h2>
      <div class="tags-container">
        <div class="search-history">
          <span v-for="(item, index) in history" :key="'history-' + index" class="history-tag"
            @click="useHistoryItem(item)">
            {{ item }}
          </span>
        </div>
        <h2>推荐搜索</h2>
        <div class="category-tags">
          <span v-for="(category, index) in categories" :key="'category-' + index" class="category-tag"
            :class="{ active: selectedCategory === category }" @click="selectCategory(category)">
            {{ category }}
          </span>
        </div>
        <h2 v-show="articleList.length !== 0">文章列表</h2>
        <h2 v-show="articleList.length === 0">没有找到对应文章</h2>
        <articleList :articles="articleList"></articleList>
        <div ref="lazyLoad" v-show="next" class="loading-container" v-loading="next" element-loading-text="加载中..."
          element-loading-background="rgba(0, 0, 0, 0.8)">
        </div>
        <div v-show="!next && articleList.length !== 0" style="text-align: center;margin-top: 1rem;">已经到底了
          <span style="font-size: 1.2rem;" ref="kaomoji">{{ selectedKaomoji }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerComponent from '@/components/header.vue'
import articleList from '@/components/articleComponents/articleList.vue'
import { mapState } from 'vuex'
export default {
  components: {
    headerComponent,
    articleList

  },
  data () {
    return {
      searchQuery: '',
      searchQueryStore: '',
      categories: ['全部', '前端', '设计', '性能', '后端'],
      // 这个也可以存到store中，方便其他地方使用
      selectedCategory: '',
      currentPage: 1,
      isLoading: false,
      selectedKaomoji: '',
      KaomojiTable: [
        '(๑•̀ㅂ•́)و✧', '(・̀ ω・́ ) y', '(づ｡◕‿‿◕｡) づ',
        'φ(≧ω≦*)♪', '︿(￣︶￣)︿', 'o(*^＠^*)o', 'Ψ(￣∀￣)Ψ',
        'o(￣▽￣)ｄ', '(o゜▽゜)o☆[BINGO!]', 'Ciallo～(∠・ω< )⌒★',
        'ヽ(*´▽｀*)ﾉ', '٩(๑❛ᴗ❛๑)۶', '๑•̀ㅁ•́ฅ✧', '｡◕‿◕｡',
        'ヾ(≧▽≦*)o', '(*^_^*)', '∑(っ °Д °;)っ', 'ಠ_ಠ', '¬‿¬', 'ʕ •ᴥ•ʔ']
    }
  },
  created () {
    if (this.articleList.length === 0) {
      this.$store.dispatch('search/fetchArticleList')
    }
  },
  computed: {
    ...mapState('user', ['history']),
    ...mapState('search', ['articleList', 'next'])
  },
  methods: {
    selectCategory (e) {
      console.log(e)
      this.$store.commit('user/addHistory', e)
      this.searchQuery = e
      // 选择分类,开始搜索
      this.search()
    },
    search () {
      console.log('搜索', this.searchQuery)
      if (this.searchQuery === '') {
        return
      }
      this.$store.commit('user/addHistory', this.searchQuery)
      // page默认为1，不用传
      // 发送请求
      this.searchQueryStore = this.searchQuery
      this.$store.commit('search/setChange')
      this.getArticleList({ keyword: this.searchQueryStore })
      this.searchQuery = ''
      // 如果搜索词变了重置动画
      this.observer.disconnect()
      // 添加懒加载
      this.$nextTick(() => {
        debugger
        this.currentPage = 1
        this.addLazyLoad()
      })
    },
    getKaomoji () {
      this.selectedKaomoji = this.KaomojiTable[Math.floor(Math.random() * this.KaomojiTable.length)]
    },
    // 懒加载
    async lazyLoad () {
      // 如果正在加载，则直接返回,当让这个要不要无所谓，因为会有一层判断
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      // 发送请求
      try {
        await this.getArticleList({ keyword: this.searchQueryStore, page: ++this.currentPage })
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        this.isLoading = false
        // 如果next为0，则停止加载
        if (!this.next) {
          // 停止加载
          console.log('停止加载')
          // 表情
          this.getKaomoji()
          this.observer.unobserve(this.$refs.lazyLoad)
          // 卸载加载事件的监听，添加对加载完成元素的监听
          this.observer.observe(this.$refs.kaomoji)
        }
      }
    },
    delAllHistory (index) {
      this.$store.commit('user/delAllHistory', index)
    },
    async getArticleList (keyword) {
      try {
        await this.$store.dispatch('search/fetchArticleList', keyword)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    useHistoryItem (item) {
      console.log('使用历史记录', item)
      this.searchQuery = item
      this.search()
    },
    addLazyLoad () {
      this.observer = new IntersectionObserver(entries => {
        console.log('entries', '添加懒加载状态', this.next)
        if (entries[0].isIntersecting && !this.isLoading && this.next) {
          this.lazyLoad()
        }
        if (entries[0].isIntersecting && !this.next) {
          this.getKaomoji()
        }
      }, {
        // 设置阈值，当元素的10%进入可视区域时触发
        threshold: 0.1
      })

      if (this.$refs.lazyLoad) {
        this.observer.observe(this.$refs.lazyLoad)
      }
    }
  },
  mounted () {
    this.addLazyLoad()
  },
  destroyed () {
    // 停止对所有元素的监听
    this.observer.disconnect()
  }
}
</script>

<style scoped>
.blog-search {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: normal;
}

.search-container {
  margin-bottom: 20px;
}

input {
  width: 80%;
  padding: 12px 20px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.search {
  border: none;
  border-radius: 3px;
  display: inline-block;
  font-size: 14px;
  margin-left: 0.6rem;
  padding: 9px 20px;
  transition: all 0.2s;
}

.search:active {
  background-color: skyblue;
  scale: 1.02;
}

input:focus {
  border-color: #1890ff;
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.search-history,
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.history-tag {
  background-color: #f5f5f5;
  color: #666;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.history-tag:active {
  background-color: #e8e8e8;
}

.moble-search {
  display: none;
}

.category-tag {
  color: #1890ff;
  border: 1px solid #1890ff;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tag:hover,
.category-tag.active {
  background-color: #1890ff;
  color: white;
}

@media screen and (max-width: 740px) {
  .search {
    display: none;
  }

  .moble-search {
    display: inline-block;
    border: none;
    height: 38.4px;
    margin-left: 1px;
    border-radius: 2px;
    width: 39px;
  }
}

@media (max-width: 480px) {
  .blog-search {
    margin: 20px auto;
  }

  input {
    padding: 10px 15px;
  }

  .history-tag,
  .category-tag {
    padding: 4px 10px;
    font-size: 12px;
  }
}

@media screen and (max-width: 420px) {
  input {
    width: 70%;
  }
}
</style>
