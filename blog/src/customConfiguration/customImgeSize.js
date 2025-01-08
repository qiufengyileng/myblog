// import { IButtonMenu, IDomEditor } from '@wangeditor/editor'
class ChangImgeSize {                     
  constructor () {
    this.title = 'size' // 自定义菜单标题
    // this.iconSvg = '<svg>...</svg>' // 可选
    this.tag = 'button'
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false

  getValue (editor) { // JS 语法
    return ' hello '
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive (editor) { // JS 语法
    return false
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled (editor) { // JS 语法
    return false
  }

  // 点击菜单时触发的函数
  exec (editor, value) { // JS 语法
    if (this.isDisabled(editor)) return
    editor.insertText(value) // value 即 this.value(editor) 的返回值
  }
}

const changImgeSizeConf = {
  key: 'changImgeSize', // 定义 menu key ：要保证唯一、不重复（重要）
  factory () {
    return new ChangImgeSize() // 把 `YourMenuClass` 替换为你菜单的 class
  }
}
// Boot.registerMenu(changImgeSizeConf)
export default changImgeSizeConf
