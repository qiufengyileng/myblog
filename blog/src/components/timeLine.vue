<template>
  <div class="shell">
    <div class="header">
      <h2 class="title">秋风易冷</h2>
      <h3 class="subtitle">时间线</h3>
    </div>
    <div class="timeLine">
      <div class="item" :data-text="item['data-text']" v-for="(item,index) in guidangData" :key="index">
        <div class="contnet">
          <img :src="item.imgLink" alt="" class="img">
          <h2 class="year">{{ item.year }}<h6 class="day">-{{item.day}}</h6></h2>
          <p class="contnet-desc">{{ item.describe }}</p>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('guiDang/fetchGuiDangData')
  },
  computed: {
    ...mapGetters('guiDang', ['guidangData'])
  },
  data () {
    return {
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.guidangData !== null) {
        timeLineRender()
        console.log(this.guidangData)
        clearInterval(this.timer)
      }
    }, 300)
  },
  methods: {
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
function timeLineRender () {
  const timeLine = document.querySelector('.shell')
  const items = timeLine.querySelectorAll('.item')
  const activeClass = 'item--active'
  const imgSelector = '.img'

  // 将第一个时间轴设置为激活状态，并将时间轴背景设置为第一个项目
  items[0].classList.add(activeClass)
  timeLine.style.backgroundImage = `url(${items[0].querySelector(imgSelector).src})`

  // 获取时间轴项目的总数
  const itemLength = items.length

  // 当页面滚动时，触发滚动事件
  window.addEventListener('scroll', function () {
    const pos = window.scrollY
    items.forEach((item, i) => {
      const min = item.offsetTop
      const max = item.offsetHeight + min

      if (i === itemLength - 2 && pos > min + item.offsetHeight / 2) {
        items.forEach(item => item.classList.remove(activeClass))
        timeLine.style.backgroundImage = `url(${items[itemLength - 1].querySelector(imgSelector).src})`
        items[itemLength - 1].classList.add(activeClass)
      } else if (pos >= min && pos <= max - 20) {
        items.forEach(item => item.classList.remove(activeClass))
        timeLine.style.backgroundImage = `url(${item.querySelector(imgSelector).src})`
        item.classList.add(activeClass)
      }
    })
  })
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.shell {
  width: 100%;
  position: relative;
  padding: 80px 0;
  background-attachment: fixed;
  background-size: cover;
  transition: 0.3s ease 0s;
}

.shell::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(99, 99, 99, 0.8);
  left: 0;
  top: 0;
}

.header {
  width: 100%;
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.title {
  color: #fff;
  font-size: 46px;
  font-weight: normal;
  margin: 0;
}

.timeLine {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 700px;
  position: relative;
}
.year {
  font-weight: normal;
  font-size: 66px;
  margin: -10px 0 0 0;
  transform: 0.4s;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
}
.day{
  display: inline-block;
  font-size: 18px;
  margin-left: -3px;
}
.conent-desc {
  margin: 0;
  color: rgb(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 25px;
  box-sizing: border-box;
}

.timeLine::before {
  position: absolute;
  width: 2px;
  left: 50%;
  height: 100%;
  margin-left: -1px;
  content: "";
  background-color: rgba(255, 255, 255, 0.7);
}

.item {
  padding: 40px 0;
  opacity: 0.3;
  filter: blur(2px);
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(50% - 40px);
  display: flex;
  position: relative;
  transform: translateY(-80px);
}

.item::before {
  content: attr(data-text);
  letter-spacing: 3px;
  width: 100%;
  position: absolute;
  color: rgb(255, 255, 255, 0.5);
  font-size: 13px;
  border-left: 2px solid rgb(255, 255, 255, 0.5);
  top: 70%;
  margin-top: -5px;
  padding-left: 15px;
  opacity: 0;
  right: calc(-100% - 56px);
  font: 900 20px '';
  letter-spacing: 5px;
}

.item:nth-child(even) {
  align-self: flex-end;
}

.item:nth-child(even)::before {
  right: auto;
  text-align: center;
  left: calc(-100% - 56px);
  padding-left: 0;
  border-left: none;
  border-right: 2px solid rgb(255, 255, 255, 0.5);
  padding-right: 15px;
}

.item--active {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}

.item--active::before {
  top: 50%;
  transition: 0.3s all 0.7s;
  opacity: 1;
}

.item--active .year {
  margin: -50px 0 20px 0;
}

.img {
  max-width: 100%;
  box-shadow: 0 10px 15px rgba(255, 255, 255, 0.4);
}

.subtitle {
  color: rgb(255, 255, 255, 0.5);
  font-size: 16px;
  letter-spacing: 5px;
  margin: 10px 0 0 0;
  font-weight: normal;
}

.footer {
  padding: 95px 0;
  text-align: center;
}

.footer a {
  color: #999;
  display: inline-block;
}

@media only screen and (max-width: 767px) {
  .item {
    align-self: baseline !important;
    width: 100%;
    padding: 0 30px 150px 80px;
  }

  .item::before {
    left: 10px !important;
    padding: 0 !important;
    top: 50px;
    text-align: center !important;
    width: 60px;
    border: none !important;
  }

  .item:last-child {
    padding-bottom: 40px;
  }
}

@media only screen and (max-width: 767px) {
  .timeLine::before {
    left: 40px;
  }
}
</style>
