export function getScrollbarWidth () {
  // 创建一个带有滚动条的 div 元素
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  // 创建一个内部 div 元素
  const inner = document.createElement('div')

  outer.appendChild(inner)
  console.log(outer.offsetWidth, inner.offsetWidth)

  // 计算外部元素和内部元素的宽度差
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // 移除创建的元素
  document.body.removeChild(outer)
  console.log('scrollbarWidth=>', scrollbarWidth)
  return scrollbarWidth
}
