<template>
  <div class="clock-container">
    <div class="clock-display">
      <div class="weekdays">
        <span v-for="day in weekDays" :key="day" :class="{ active: currentDay === day }">
          {{ day }}
        </span>
      </div>
      <div class="time-display" :style="isNight? 'background-color: #000': ''">
        <span class="alarm-icon"><i class="el-icon-alarm-clock"></i></span>
        <div class="lcd-time">
          <template v-for="(digit, index) in formattedTime">
            <div v-if="digit === ':'" :key="'colon' + index" class="lcd-colon">:</div>
            <div v-else :key="'digit' + index" class="lcd-digit">
              <div v-for="segment in 7" :key="segment"
                   :class="['segment', `s${segment}`, { active: isSegmentActive(digit, segment) }]" :style="isNight? 'background-color: #fff': ''">
              </div>
            </div>
          </template>
        </div>
        <span class="period">{{ period }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ClockPage',
  data () {
    return {
      weekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      currentDay: '',
      time: new Date(),
      timer: null
    }
  },
  computed: {
    formattedTime () {
      const hours = this.time.getHours() % 12 || 12
      const minutes = this.time.getMinutes()
      const seconds = this.time.getSeconds()
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    period () {
      return this.time.getHours() >= 12 ? 'PM' : 'AM'
    },
    ...mapState('setting', ['isNight'])
  },
  mounted () {
    this.updateTime()
    this.timer = setInterval(this.updateTime, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    updateTime () {
      this.time = new Date()
      this.updateCurrentDay()
    },
    updateCurrentDay () {
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      this.currentDay = days[this.time.getDay()]
    },
    isSegmentActive (digit, segment) {
      const segmentMap = {
        0: [1, 2, 3, 5, 6, 7],
        1: [3, 6],
        2: [1, 3, 4, 5, 7],
        3: [1, 3, 4, 6, 7],
        4: [2, 3, 4, 6],
        5: [1, 2, 4, 6, 7],
        6: [1, 2, 4, 5, 6, 7],
        7: [1, 3, 6],
        8: [1, 2, 3, 4, 5, 6, 7],
        9: [1, 2, 3, 4, 6, 7]
      }
      return segmentMap[digit].includes(segment)
    }
  }
}
</script>

<style scoped>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  /* background-color: #f0f0f0; */
  background-color:initial;
}

.clock-display {
  /* background-color: #e0e0e0; */
  background-color:initial;
  border-radius: 10px;
  padding: 15px 20px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  box-shadow: inherit;
  width: 350px;
}

.weekdays {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.weekdays span {
  font-size: 13px;
  font-weight: 700!important;
  color: #999!important;
}

.weekdays span.active {
  color: #333!important;
}

.time-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d4d4d4;
  padding: 10px;
  border-radius: 5px;
}

.alarm-icon {
  font-size: 16px;
  color: #666;
}

.lcd-time {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lcd-digit {
  width: 30px;
  height: 50px;
  position: relative;
  margin: 0 2px;
}

.lcd-colon {
  font-size: 36px;
  line-height: 50px;
  color: #333;
  margin: 0 2px;
}

.segment {
  position: absolute;
  background-color:#292626;
  opacity: 0.15;
}
.segment.active {
  opacity: 1;
}

.s1 { top: 0; left: 4px; right: 4px; height: 4px; }
.s2 { top: 3px; left: 0; width: 4px; height: 21px; }
.s3 { top: 3px; right: 0; width: 4px; height: 21px; }
.s4 { top: 23px; left: 4px; right: 4px; height: 4px; }
.s5 { bottom: 3px; left: 0; width: 4px; height: 21px; }
.s6 { bottom: 3px; right: 0; width: 4px; height: 21px; }
.s7 { bottom: 0; left: 4px; right: 4px; height: 4px; }

.period {
  font-size: 14px;
  color: #666;
}
</style>
