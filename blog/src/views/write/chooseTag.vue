<template>
<el-row>
<el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.dynamicTags = this.$store.state.write.articleData.tags
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$emit('update:dynamicTags', this.dynamicTags)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    clearTags () {
      this.dynamicTags = []
      this.$emit('update:dynamicTags', this.dynamicTags)
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (this.dynamicTags.length > 5) {
        this.$message.warning('最多只能添加5个标签')
        this.inputVisible = false
        this.inputValue = ''
        return
      }
      if (inputValue) {
        if (this.dynamicTags.includes(inputValue)) {
          this.$message.warning('请勿重复添加标签')
        } else if (inputValue.length > 5) {
          this.$message.warning('标签长度不能超过5个字符')
        } else {
          this.dynamicTags.push(inputValue)
          this.$emit('update:dynamicTags', this.dynamicTags)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
  }
}
</script>

<style scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  padding-left: 3px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
